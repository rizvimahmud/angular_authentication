import {Roles} from './roles'

export interface UserSignupRequest {
  email: string
  name: string
  password: string
  role: Roles
}
