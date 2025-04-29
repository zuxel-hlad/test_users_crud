<template>
    <AppHeader />
    <main class="h-full overflow-x-hidden">
        <Transition name="slide-right">
            <RouterView />
        </Transition>
    </main>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import { RouterView } from 'vue-router'
</script>
