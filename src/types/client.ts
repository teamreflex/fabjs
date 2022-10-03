export type FabEvents = {
  error: (error: Error) => void,
  init: (initialized: boolean) => void,
}

export interface ClientParams {
  accessToken?: string
  email?: string
  password?: string
  userId?: number
  userAgent: string
}