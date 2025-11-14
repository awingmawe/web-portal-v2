export type GenericResponse<T> = {
  results: T[]
  total: number
}

export type GenericResponseV2<T> = {
  success?: boolean
  message?: string
  responseObject: T[]
  statusCode?: number
  total: number
}

export type GetListQuery = {
  page: number
  size: number
} & Record<string, any>

export type OtherProps = {
  colorIcon?: string
  className?: string
  whatPage: string // this is for where's page is used
}

export type DisableDate = {
  id: string
  title: string
  year: string
  startDate: string
  endDate: string
  reason: string
  createdAt: string
  modifiedAt: string
  createdBy: string
  modifiedBy: string
}

export type ReferenceDisableDate = {
  year: string
  date: DisableDate[]
}
