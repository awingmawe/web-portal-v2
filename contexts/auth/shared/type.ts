export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export type Persona = {
  id?: string
  gender?: string
  born?: string
  phoneNumber?: string
  modifiedAt?: string
  modifiedBy?: string
  address?: string
  job?: string
  travelId?: string
  desc?: string
  code?: string
  fee?: number
  webVisit?: number
  activatedAt?: string
  discount?: number
  parentId?: string
  feeType?: string
  discountType?: string
  bdmUserId?: string
  alias?: string
  identityNumber?: string
  instagram?: string
  accountBank?: string
  accountNumber?: string
  accountName?: string
  city?: any
  cityId?: string
  province?: any
  provinceId?: string
  approvedBy?: string
  approvedAt?: string
  bankLogo?: string
}

export type Profile = {
  id?: string
  name?: string
  username?: string
  email?: string
  role?: string
  isActive?: boolean
  avatar?: string
  provider?: string
  createdAt?: Date
  modifiedAt?: Date
  createdBy?: string
  modifiedBy?: string
  avatarProvider?: string
  emailVerified?: boolean
  havePassword?: boolean
  persona?: Persona
}

export type Permissions = {
  identity: string[]
}

export enum RoleSlug {
  SUPER_ADMIN = 'super_admin',
  ADMIN_SUPPORT = 'admin_support',
  WUKALA = 'wukala',
  BDM = 'bdm',
  USER = 'user',
}
