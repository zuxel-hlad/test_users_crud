import { defineStore } from 'pinia'
import api from '@/api'
import { toast } from 'vue3-toastify'
import type { IUsersStore } from './types'

export const useUsersStore = defineStore('users', {
    state: () =>
        ({
            user: null,
            users: [],
            usersLoading: false,
            userLoading: false,
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

        async setUser(id: number) {
            this.userLoading = false
            try {
                this.usersLoading = true
                const userData = await api.getUser(id)
                if (userData) {
                    this.user = userData
                }
            } catch (e: unknown) {
                const error = e as string
                toast.error(error)
            } finally {
                this.userLoading = false
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
