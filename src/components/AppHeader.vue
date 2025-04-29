<template>
    <header>
        <div class="container mx-auto">
            <AppNavbar />
            <RouterLink to="/create-user">to create</RouterLink>
        </div>
    </header>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue'
</script>
