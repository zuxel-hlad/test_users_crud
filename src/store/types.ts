import type { User } from '@/types'

export interface UsersStore {
    users: User[]
    usersLoading: boolean
    userLoading: boolean
    user: User | null
}
