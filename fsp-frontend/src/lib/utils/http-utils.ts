import axios from "axios"
import type { AxiosRequestConfig, AxiosResponse } from "axios"

import ApiError from "@/lib/classes"

const request = async <Response, Data = undefined, Errors = undefined>(
  config: AxiosRequestConfig<Data>
): Promise<Response> => {
  try {
    const response = await axios<Response, AxiosResponse<Response>, Data>({
      ...config,
      baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    })

    return response.data
  } catch (err) {
    const errors =
      axios.isAxiosError(err) && "errors" in err.response?.data
        ? err.response?.data.errors
        : {}

    const message: string =
      axios.isAxiosError(err) && err.response?.data.errors
        ? err.response?.data.errors.message
        : "Unknown error"
    throw new ApiError<Errors>({ message, ...errors, testing: "string" })
  }
}

const getRequest = <Response, Errors = undefined>(
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
  data: Data,
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
