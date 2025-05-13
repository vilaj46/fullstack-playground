import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query"

import type { TCredentialsDto, TPersonResponse } from "@/shared/types"

import {
  getPerson,
  postLogin,
  postLogout,
  postSignup,
} from "@/lib/modules/auth/authService"

const queryKeys = {
  person: ["person"],
} as const

const useGetPerson = (options?: Partial<UseQueryOptions>) =>
  useQuery({
    ...options,
    queryFn: getPerson,
    queryKey: queryKeys.person,
    staleTime: 30 * 60 * 1000, // 30min TODO: Move to config
  })

const usePostLogin = (
  options?: Partial<UseMutationOptions<TPersonResponse, Error, TCredentialsDto>>
) =>
  useMutation({
    ...options,
    mutationFn: postLogin,
  })

const usePostLogout = (
  options?: Partial<
    UseMutationOptions<{
      message: string
    }>
  >
) => {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: postLogout,
    onMutate: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.person,
      }),
  })
}

const useSignup = (
  options?: Partial<UseMutationOptions<TPersonResponse, Error, TCredentialsDto>>
) =>
  useMutation({
    ...options,
    mutationFn: postSignup,
  })

export { useGetPerson, usePostLogin, usePostLogout, useSignup }
