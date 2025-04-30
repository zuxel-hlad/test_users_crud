<template>
    <section>
        <div v-if="userLoading" class="mx-auto animate-pulse text-center text-2xl">Loading...</div>
        <div v-else class="container mx-auto px-3"><UserForm :user="user" @save="usersStore.editUser" mode="edit" /></div>
    </section>
</template>

<script setup lang="ts">
import UserForm from '@/components/user-form/UserForm.vue'
import { useUsersStore } from '@/store/users'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const usersStore = useUsersStore()
const { user, userLoading } = storeToRefs(usersStore)

const getUserToUpdate = () => {
    const id = route?.params?.userId
    if (!id) {
        router.push('/not-found')
    } else {
        usersStore.setUser(Number(id))
    }
}

onMounted(() => {
    getUserToUpdate()
})
</script>
