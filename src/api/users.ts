import type { User } from '@/types'
import api from './index'

export const getUsers = async (): Promise<User[]> => {
    const { data: users } = await api.get('/users')
    return users
}

export const getUser = async (id: number): Promise<User> => {
    const { data: user } = await api.get(`/users/${id}`)
    return user
}
