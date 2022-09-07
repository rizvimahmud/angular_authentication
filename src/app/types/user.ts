export interface UserDocument {
  id: string
  name: string
  email: string
  password: string
  tokenVersion: number
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  isActive: Boolean
}
