export type Contact = {
  id: string
  name: string
  surname: string
  email: string
  phone: string
  city: string
  country: string
  address: string
  imageSrc?: string
  gender: "male" | "female"
  bio?: string
  authorizedOnly: boolean
}

export interface PaginationInfo {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ContactsResponse {
  data: Contact[]
  pagination: PaginationInfo
}

