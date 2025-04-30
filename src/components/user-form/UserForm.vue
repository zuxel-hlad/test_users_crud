<template>
    <Form
        ref="formRef"
        :key="Date.now()"
        @submit="onSave"
        :validation-schema="validationSchema"
        :initial-values="initialValues"
        v-slot="{ meta }"
        class="mx-auto max-w-xl space-y-6 rounded-xl bg-white p-6 shadow"
    >
        <div class="flex items-center justify-between gap-2.5">
            <h2 class="text-xl font-bold">{{ user ? 'Edit User' : 'Create new User' }}</h2>
            <RouterLink to="/" class="flex items-center justify-start gap-2 transition-colors hover:text-blue-700 active:text-blue-700">
                <AppIcon icon="heroicons:arrow-small-left-20-solid" class="text-2xl" />To all users
            </RouterLink>
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
            {{ isEditMode ? 'Save Changes' : 'Submit' }}
        </button>
    </Form>
</template>

<script setup lang="ts">
import { Field, ErrorMessage, Form } from 'vee-validate'
import { computed, ref, watch } from 'vue'
import { validationSchema } from './validation-schema'
import type { FormField } from './types'
import type { User } from '@/types'

const props = defineProps<{
    user?: User | null
}>()

const emit = defineEmits<{
    (e: 'save', payload: User): void
}>()

const formRef = ref<typeof Form | null>(null)

const fields: FormField[] = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'company', label: 'Company', type: 'text' },
    { name: 'catchPhrase', label: 'Catch Phrase', type: 'text' },
    { name: 'bs', label: 'BS', type: 'text' },
]

const initialValues = ref({
    name: '',
    email: '',
    company: '',
    catchPhrase: '',
    bs: '',
})

const isEditMode = computed<boolean>(() => {
    return props.user ? true : false
})

watch(
    props,
    () => {
        if (props.user) {
            initialValues.value = {
                name: props.user.name ?? '',
                email: props.user.email ?? '',
                company: props.user.company?.name ?? '',
                catchPhrase: props.user.company?.catchPhrase ?? '',
                bs: props.user?.company?.bs ?? '',
            }
        }
    },
    { immediate: true },
)

const onSave = (values: Record<string, string>): void => {
    const id = props.user?.id ?? Date.now()
    const newUser: User = {
        id,
        name: values.name,
        email: values.email,
        company: {
            name: values.company,
            catchPhrase: values.catchPhrase,
            bs: values.bs,
        },
    }
    emit('save', newUser)
    formRef.value?.resetForm()
    initialValues.value = {
        name: '',
        email: '',
        company: '',
        catchPhrase: '',
        bs: '',
    }
}
</script>
