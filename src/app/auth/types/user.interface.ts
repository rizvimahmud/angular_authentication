export interface User {
  id: string
  name: string
  email: string
  role: string
  isActive: boolean
  avatar: Avatar
}

export interface Avatar {
  imageUrl: string
  publicId: string
}
