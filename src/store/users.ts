import { defineStore } from 'pinia'
import api from '@/api'
import { toast } from 'vue3-toastify'
import type { IUsersStore } from './types'
import type { IUser } from '@/types'

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
            const localUser = this.users.find(user => user.id === id)
            this.userLoading = false
            try {
                if (localUser) {
                    this.user = localUser
                    return
                }
                this.userLoading = true
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

        createUser(user: IUser) {
            this.users.push(user)
            toast.success(`User "${user.name}" successfully Added!`)
        },

        editUser(updatedUser: IUser) {
            this.users = this.users.map(user => {
                if (user.id === updatedUser.id) {
                    return {
                        ...updatedUser,
                    }
                }
                return user
            })
            toast.success(`User "${this.user?.name}" successfully updated!`)
            this.user = null
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
