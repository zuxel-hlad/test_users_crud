<template>
    <header>
        <div class="container mx-auto px-3">
            <AppNavbar class="mb-9 md:mb-7" />
            <RouterLink
                v-if="route.name === 'home'"
                to="/create-user"
                class="ml-0 flex w-full items-center justify-center gap-2 rounded border border-gray-300 px-4 py-3 text-center transition-colors hover:border-blue-700 hover:bg-blue-700 hover:text-white active:border-blue-700 active:bg-blue-700 active:text-white lg:ml-auto lg:w-max lg:justify-start"
                >Proceed to user creation<AppIcon icon="heroicons:arrow-small-right-20-solid" class="text-2xl" />
            </RouterLink>
        </div>
    </header>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
