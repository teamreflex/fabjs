import { RawFabUser } from "."

export type HTTPParams = {
  userId: number
  accessToken: string
  userAgent: string
}

export type Request = {
  method: 'GET' | 'POST',
  path: string
  body?: string
  userId: number
  userAgent: string
  accessToken?: string
  key?: string
}

export type Response<TReturnType> = {
  data?: TReturnType
  error?: any
}

export type LoginResult = {
  user: RawFabUser
  login: {
    token: string
  }
}