<template>
    <Form :validation-schema="validationSchema" v-slot="{ handleSubmit, meta }">
        <form @submit.prevent="handleSubmit(onSubmit)" class="mx-auto max-w-xl space-y-6 rounded-xl bg-white p-6 shadow">
            <div class="flex items-center justify-between gap-2.5">
                <h2 class="text-xl font-bold">Create new User</h2>
                <Router-link to="/" class="flex items-center justify-start gap-2 transition-colors hover:text-blue-700 active:text-blue-700"
                    ><AppIcon icon="heroicons:arrow-small-left-20-solid" class="text-2xl" />To all users
                </Router-link>
            </div>
            <div v-for="field in fields" :key="field.name" class="flex flex-col gap-1">
                <label :for="field.name" class="font-medium text-gray-700">{{ field.label }}</label>
                <Field
                    :id="field.name"
                    :name="field.name"
                    :type="field.type"
                    :placeholder="field.label"
                    class="rounded border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <ErrorMessage :name="field.name" class="text-sm text-red-600" />
            </div>

            <button
                :disabled="!meta.valid"
                type="submit"
                class="pointer-events-auto w-full cursor-pointer rounded bg-blue-600 py-2 text-white transition-colors hover:bg-blue-700 active:bg-blue-700 disabled:pointer-events-none disabled:bg-gray-500 disabled:text-black"
            >
                Submit
            </button>
        </form>
    </Form>
</template>

<script setup lang="ts">
import { Field, ErrorMessage, Form } from 'vee-validate'
import { validationSchema } from './validation-schema'
import type { IFormField } from './types'
import type { INewUser } from '@/types'

const emit = defineEmits<{ (e: 'create', payload: INewUser): void }>()

const fields: IFormField[] = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'company', label: 'Company', type: 'text' },
    { name: 'catchPhrase', label: 'Catch Phrase', type: 'text' },
    { name: 'bs', label: 'BS', type: 'text' },
]

function onSubmit(values: Record<string, string>) {
    const { name, bs, catchPhrase, company, email } = values
    emit('create', {
        name,
        id: Date.now(),
        email,
        company: {
            name: company,
            bs,
            catchPhrase,
        },
    })
}
</script>
