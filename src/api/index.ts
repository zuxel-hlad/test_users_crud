import { BASE_URL } from '@/constants'
import type { IUser } from '@/types'
import axios, { AxiosError } from 'axios'

export default {
    async getUsers(): Promise<IUser[] | undefined> {
        try {
            const { data: users } = await axios.get<IUser[]>(`${BASE_URL}/users`)
            return users
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                console.error('Failed to fetch Users:', error.message)
                throw Error(error.message)
            }
            console.error('Unknown error while fetching Users')
            throw Error('Unknown error while fetching Users')
        }
    },

    async getUser(id: number): Promise<IUser | undefined> {
        try {
            if (!id) {
                throw new Error('Unknown error while fetching User.')
            }
            const { data: user } = await axios.get<IUser>(`${BASE_URL}/users/${id}`)
            return user
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                console.error('Failed to fetch User:', error.message)
                throw Error(error.message)
            }
            console.error('Unknown error while fetching User. User ID not received.')
            throw Error('Unknown error while fetching User')
        }
    },
}
