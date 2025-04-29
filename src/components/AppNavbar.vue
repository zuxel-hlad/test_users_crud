<template>
    <div class="mx-auto max-w-md space-y-4 rounded-xl bg-white p-4 shadow-md">
        <div>
            <label for="option" class="mb-1 block font-medium">Choose Option:</label>
            <select
                id="option"
                v-model="selectedOption"
                @change="onSaveToCookie"
                class="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
                <option disabled :value="null" selected class="text-center">-- Choose from list --</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>
        </div>
        <div class="flex flex-col items-center justify-between space-x-2 md:flex-row">
            <label for="saveToCookie" class="flex items-center justify-start gap-1.5 text-gray-700">
                Save to cookie
                <input id="saveToCookie" type="checkbox" @change="toggleSaveToCookie" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            </label>
            <span class="text-gray-700"
                >Now saved: <span class="text-black">{{ selectedOption ?? '-' }}</span></span
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toast, type Id } from 'vue3-toastify'
import { COOKIE_MAX_AGE_SECONDS } from '@/constants'

const selectedOption = ref<string | null>(null)
const isSavedToCookie = ref<boolean>(false)

const onSaveToCookie = async (e: Event): Promise<void> => {
    const selectedValue = (e.target as HTMLSelectElement).value
    if (isSavedToCookie.value && selectedValue) {
        selectedOption.value = selectedValue
        try {
            await cookieStore.set({
                name: 'selected-option',
                value: selectedOption.value,
                expires: new Date(Date.now() + COOKIE_MAX_AGE_SECONDS * 1000),
            })
            toast.success(`${selectedOption.value} saved to cookie successfully!`)
        } catch {
            toast.error('Error saving data to cookie!')
            toast.success('Error saving data to cookie!')
        }
    }

    if (!isSavedToCookie.value && selectedValue) {
        selectedOption.value = selectedValue
        toast.success(`${selectedOption.value} successfully saved locally!`)
    }
}

const toggleSaveToCookie = (): Id | undefined => {
    if (!isSavedToCookie.value) {
        isSavedToCookie.value = true
        return toast.info(`Cookie saving mode is enabled!`)
    }

    if (isSavedToCookie.value) {
        isSavedToCookie.value = false
        return toast.warn(`Cookie saving mode is disabled!`)
    }
}

const setInitialOption = async (): Promise<void> => {
    const data = await cookieStore.get('selected-option')
    if (data.value) {
        selectedOption.value = data.value
    }
}

// onMounted(() => {
//     setInitialOption()
// })
</script>
