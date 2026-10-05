import { userType } from '@/types/user'

export type authType =
  | (userType & {
      token: string
    })
  | null
