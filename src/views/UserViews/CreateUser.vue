<template>
    <section class="pt-8">
        <div class="container mx-auto px-6">
            <CreateUserForm @save="onCreateNewUser" />
        </div>
    </section>
</template>

<script setup lang="ts">
import CreateUserForm from '@/components/user-form/UserForm.vue'
import { useUsersStore } from '@/store/users'
import type { User } from '@/types'

const usersStore = useUsersStore()

const onCreateNewUser = (user: User): void => usersStore.createUser(user)
</script>
