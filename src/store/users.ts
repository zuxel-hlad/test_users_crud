import { defineStore } from 'pinia'
import { getUser, getUsers } from '@/api/users'
import { toast } from 'vue3-toastify'
import type { UsersStore } from './types'
import type { User } from '@/types'

export const useUsersStore = defineStore('users', {
    state: () =>
        ({
            user: null,
            users: [],
            usersLoading: false,
            userLoading: false,
        }) as UsersStore,

    actions: {
        async setUsers() {
            this.usersLoading = true
            await getUsers()
                .then(users => (this.users = users))
                .catch(e => toast.error(e.message))
                .finally(() => (this.usersLoading = false))
        },

        async setUser(id: number) {
            const localUser = this.users.find(user => user.id === id)
            if (localUser) {
                this.user = localUser
                return
            }

            this.userLoading = false

            await getUser(id)
                .then(user => (this.user = user))
                .catch(e => toast.error(e.message))
                .finally(() => (this.userLoading = false))
        },

        createUser(user: User) {
            this.users.push(user)
            toast.success(`User "${user.name}" successfully Added!`)
        },

        editUser(updatedUser: User) {
            this.users = this.users.map(user => {
                if (user.id === updatedUser.id) {
                    return {
                        ...updatedUser,
                    }
                }
                return user
            })
            toast.success(`User "${this.user?.name}" successfully updated!`)
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
