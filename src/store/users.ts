import { defineStore } from 'pinia'
import api from '@/api'
import { toast } from 'vue3-toastify'
import type { IUsersStore } from './types'

export const useUsersStore = defineStore('users', {
    state: () =>
        ({
            users: [],
            usersLoading: false,
        }) as IUsersStore,

    actions: {
        async setUsers() {
            this.usersLoading = false
            try {
                this.usersLoading = true
                const users = await api.getUsers()
                if (users) {
                    this.users = users
                }
            } catch (e: unknown) {
                const error = e as string
                toast.error(error)
            } finally {
                this.usersLoading = false
            }
        },

        deleteUser(id: number) {
            const userToDelete = this.users.find(user => user.id === id)
            if (!userToDelete) {
                toast.error(`User not found.`)
                return
            }

            this.users = this.users.filter(user => user.id !== id)
            toast.success(`User "${userToDelete.name}" successfully deleted!`)
        },
    },
})
