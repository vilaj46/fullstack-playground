import {
  useMutation,
  useQuery,
  type QueryKey,
  type QueryOptions,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query"

import { getMe, login, postLogout } from "@/lib/modules/auth/authService"
import type { TCredentialsDto } from "@/shared/types"

const queryKeys = {
  me: ["me"],
} as const

const useGetMe = (options?: Partial<UseQueryOptions>) =>
  useQuery({
    ...options,
    queryFn: getMe,
    queryKey: queryKeys.me,
    staleTime: 0, // TODO: Update to expiration on the server?
  })

const usePostLogin = (options?: UseMutationOptions<unknown>) =>
  useMutation({
    mutationFn: login,
    onSuccess: (
      data: unknown,
      _variables: TCredentialsDto,
      context: unknown
    ) => {
      if (options?.onSuccess) {
        options.onSuccess(data, undefined, context)
      }
    },
  })

const usePostLogout = (options?: UseMutationOptions) =>
  useMutation({
    mutationFn: postLogout,
    onSuccess: (data: unknown, variables: void, context: unknown) => {
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
  })

export { useGetMe, usePostLogin, usePostLogout }
