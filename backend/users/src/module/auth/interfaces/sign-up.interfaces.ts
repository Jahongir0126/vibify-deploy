export declare interface SignUpRequest {
  username: string
  password: string
  role?: string
}

export declare interface SignUpResponse {
  accessToken: string
  refreshToken: string
}
