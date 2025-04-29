<template>
    <section class="pt-8">
        <div class="container mx-auto px-6">
            <CreateUserForm @create="onCreateNewUser" />
        </div>
    </section>
</template>

<script setup lang="ts">
import CreateUserForm from '@/components/create-user-form/CreateUserForm.vue'
import { useUsersStore } from '@/store/users'
import type { INewUser } from '@/types'

const usersStore = useUsersStore()

const onCreateNewUser = (user: INewUser): void => usersStore.createUser(user)
</script>
