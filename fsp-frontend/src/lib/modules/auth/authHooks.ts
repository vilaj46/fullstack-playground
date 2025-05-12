import { useMutation, type UseMutationOptions } from "@tanstack/react-query"

import { login } from "@/lib/modules/auth/authService"
import type { TCredentialsDto } from "@/shared/types"

const usePostLogin = (options?: UseMutationOptions) =>
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

export { usePostLogin }
