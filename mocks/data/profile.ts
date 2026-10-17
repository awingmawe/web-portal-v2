import { Badge } from '@/constant/types/NotificationProps'
import { Permissions, Profile } from '@/contexts/auth/shared/type'

export const mockProfile: Profile = {
  id: 'usr-001',
  name: 'Ahmad Fauzi',
  username: 'ahmadfauzi',
  email: 'ahmad.fauzi@example.com',
  role: 'customer',
  isActive: true,
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
  provider: 'local',
  emailVerified: true,
  phonenumberVerified: true,
  havePassword: true,
  persona: {
    id: 'per-001',
    phoneNumber: '081234567890',
    gender: 'male',
    address: 'Jl. Sudirman No. 45, Jakarta Selatan',
  },
}

export const mockPermissions: Permissions = {
  role: 'customer',
  permissions: ['view_dashboard', 'book_package', 'view_transaction'],
} as any

export const mockBadge: Badge = {
  notification: 0,
  transaction: 0,
} as any
