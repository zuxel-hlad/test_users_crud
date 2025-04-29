import type { IUser } from '@/types'

export interface IUsersStore {
    users: IUser[]
    usersLoading: boolean
}
