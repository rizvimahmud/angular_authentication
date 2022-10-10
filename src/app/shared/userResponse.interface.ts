import { User } from '../auth/types/user.interface'

export interface UsersResponse {
  status: string
  users: User[]
  totalRecords: number
}
