import axios from "axios"
import type { AxiosRequestConfig, AxiosResponse } from "axios"

import ApiError from "@/shared/classes/ApiError"
import type { TStatusCode } from "@/shared/types"
import { isValidStatusCode } from "@/shared/utils"

const request = async <Response, Data = undefined, Errors = undefined>(
  config: AxiosRequestConfig<Data>
): Promise<Response> => {
  try {
    const response = await axios<Response, AxiosResponse<Response>, Data>({
      ...config,
      baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
      withCredentials: true,
    })

    return response.data
  } catch (error) {
    // HandleError function
    const errors =
      axios.isAxiosError(error) && "errors" in error.response?.data
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
