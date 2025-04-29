<template>
    <div class="rounded border border-gray-300 p-5 shadow-md">
        <div class="mb-2.5 flex w-full items-start justify-end gap-3">
            <button
                type="button"
                v-tooltip="'Delete'"
                class="flex h-6 w-6 cursor-pointer items-center justify-center rounded border border-gray-300"
                @click="emit('delete', user?.id)"
            >
                <AppIcon icon="wpf:delete" class="text-sm" />
            </button>
            <button type="button" v-tooltip="'Edit'" class="flex h-6 w-6 cursor-pointer items-center justify-center rounded border border-gray-300" @click="emit('edit', user?.id)">
                <AppIcon icon="fa-solid:edit" class="text-sm" />
            </button>
        </div>
        <h4><strong>Name:</strong>&nbsp;{{ user?.name ?? '--' }}</h4>
        <a :href="user?.email ? `mailto:${user.email}` : '#'" class="group inline-block">
            <strong>Email:</strong>&nbsp;
            <span
                class="relative transition-colors group-hover:text-gray-300 group-active:text-gray-300 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-black before:transition-colors group-hover:before:bg-gray-300 group-active:before:bg-gray-300"
            >
                {{ user?.email ?? '--' }}
            </span>
        </a>
        <div class="flex flex-col" v-if="user?.company">
            <span><strong>Company:</strong>&nbsp;{{ user?.company?.name ?? '--' }}</span>
            <span><strong>Catch Phrase:</strong>&nbsp;{{ user?.company?.catchPhrase ?? '--' }}</span>
            <span><strong>BS:</strong>&nbsp;{{ user?.company?.bs ?? '--' }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IUser } from '@/types'

const { user } = defineProps<{ user: IUser }>()
const emit = defineEmits<{ (e: 'edit', value: number): void; (e: 'delete', value: number): void }>()
</script>
