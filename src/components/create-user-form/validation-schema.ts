import * as yup from 'yup'

export const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    company: yup.string().required('Company is required'),
    catchPhrase: yup.string().required('Catch phrase is required'),
    bs: yup.string().required('BS is required'),
})
