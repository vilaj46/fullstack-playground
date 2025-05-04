import axios from "axios"
import type { AxiosRequestConfig } from "axios"

import type { TApiResponse, TApiSuccessResponse } from "@/shared/types"

const isApiResponseSuccess = (
  response: unknown
): response is TApiSuccessResponse<unknown> =>
  typeof response === "object" && response !== null && "result" in response

const request = async <Data>(
  config: AxiosRequestConfig
): Promise<TApiResponse<Data>> => {
  try {
    const response = await axios<TApiResponse<Data>>({
      ...config,
      baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    })

    if (!isApiResponseSuccess(response.data)) {
      return {
        code: response.status,
        errors: response.data.errors ?? { message: "Unknown error" },
        status: "error",
      }
    }

    return {
      code: response.status,
      result: response.data.result,
      status: "success",
    }
  } catch (err) {
    return {
      code: axios.isAxiosError(err) && err.response ? err.response.status : 500,
      errors:
        axios.isAxiosError(err) && err.response?.data.errors
          ? err.response?.data.errors
          : {
              message: "Unknown error",
            },
      status: "error",
    }
  }
}

const getRequest = async <Data>(url: string, config: AxiosRequestConfig = {}) =>
  await request<Data>({
    ...config,
    url,
  })

export { getRequest }
