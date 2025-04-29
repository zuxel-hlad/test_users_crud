import { BASE_URL } from '@/constants'
import type { IUser } from '@/types'
import axios, { AxiosError } from 'axios'

export default {
    async getUsers(): Promise<IUser[] | undefined> {
        try {
            const { data } = await axios.get<IUser[]>(`${BASE_URL}/users`)
            return data
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                console.error('Failed to fetch Users:', error.message)
                throw Error(error.message)
            }
            console.error('Unknown error while fetching Users')
            throw Error('Unknown error while fetching Users')
        }
    },
}
