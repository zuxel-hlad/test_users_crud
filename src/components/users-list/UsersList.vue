<template>
    <div v-if="usersLoading" class="mx-auto animate-pulse text-center text-2xl">Loading...</div>
    <div v-else class="container mx-auto flex flex-wrap gap-5 px-3">
        <h4 v-if="!users.length" class="mx-auto text-center text-2xl">No users yet.</h4>
        <UserCard
            v-for="user in users"
            :key="user.id"
            :user="user"
            class="w-full md:w-[calc(50%-0.875rem)] lg:w-[calc(33.3333%-0.875rem)]"
            @delete="usersStore.deleteUser"
            @edit="push(`/${user.id}/edit-user`)"
        />
    </div>
</template>

<script setup lang="ts">
import UserCard from '@/components/user-card/UserCard.vue'
import { onMounted } from 'vue'
import { useUsersStore } from '@/store/users'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const { push } = useRouter()
const usersStore = useUsersStore()
const { usersLoading, users } = storeToRefs(usersStore)

onMounted(() => {
    if (users.value.length) return
    usersStore.setUsers()
})
</script>
