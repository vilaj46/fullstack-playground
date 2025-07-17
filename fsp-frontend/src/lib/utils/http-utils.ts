import axios from "axios"
import type { AxiosRequestConfig, AxiosResponse } from "axios"

import ApiError from "@/shared/classes/ApiError"
import { isValidStatusCode } from "@/shared/utils"

const isServer = typeof window === "undefined"

const baseURL = isServer
  ? process.env.NEXT_PUBLIC_BACKEND_BASE_URL_DOCKER ?? "http://backend:8080"
  : process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? "http://localhost:8080"

const api = axios.create({ baseURL })

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        await api.post("/refreshtoken", {}, { withCredentials: true })
        return api(originalRequest)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(err)
  }
)

const request = async <Response, Data = undefined, Errors = undefined>(
  config: AxiosRequestConfig<Data>
): Promise<Response> => {
  try {
    const response = await api<Response, AxiosResponse<Response>, Data>({
      ...config,
      withCredentials: true,
    })

    return response.data
  } catch (error) {
    // TODO: HandleError function
    const errors =
      axios.isAxiosError(error) &&
      error.response?.data &&
      "errors" in error.response.data
        ? error.response?.data.errors
        : {}

    const message: string =
      axios.isAxiosError(error) && error.response?.data.errors
        ? error.response?.data.errors.message
        : "Unknown error"

    const statusCode =
      axios.isAxiosError(error) && error.status ? error.status : 500

    throw new ApiError<Errors>(
      isValidStatusCode(statusCode) ? statusCode : 500,
      {
        message,
        ...errors,
      }
    )
  }
}

const getRequest = async <Response, Errors = undefined>(
  url: string,
  config: AxiosRequestConfig = {}
) =>
  request<Response, undefined, Errors>({
    ...config,
    method: "GET",
    url,
  })

const postRequest = <Response, Data = undefined>(
  url: string,
  data?: Data,
  config: AxiosRequestConfig = {}
) =>
  request<Response, Data>({
    ...config,
    method: "POST",
    url,
    data,
  })

const patchRequest = <Response, Data = undefined>(
  url: string,
  data?: Data,
  config: AxiosRequestConfig = {}
) =>
  request<Response, Data>({
    ...config,
    method: "PATCH",
    url,
    data,
  })

const deleteRequest = (url: string, config: AxiosRequestConfig = {}) =>
  request({
    ...config,
    method: "DELETE",
    url,
  })

export { getRequest, postRequest, deleteRequest, patchRequest }
