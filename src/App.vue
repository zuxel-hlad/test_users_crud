<template>
    <AppHeader />
    <main class="h-full">
        <RouterView />
    </main>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import { RouterView } from 'vue-router'
</script>
