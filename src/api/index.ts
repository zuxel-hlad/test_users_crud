import axios, { AxiosError } from 'axios'
import { BASE_URL } from '@/constants'

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
})

api.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
        let message = 'Unknown error'

        if (!error.response) {
            message = 'Network error. Please check your internet connection.'
        } else {
            const { status, data } = error.response

            switch (status) {
                case 400:
                    message = data && typeof data === 'object' && 'message' in data && typeof data.message === 'string' ? data.message : 'Bad Request'
                    break
                case 401:
                    message = `${status}: Unauthorized. Please login again.`
                    break
                case 403:
                    message = `${status}: Forbidden. You don’t have access to this resource.`
                    break
                case 404:
                    message = `${status}: Resource not found.`
                    break
                case 500:
                    message = `${status}: Server error. Please try again later.`
                    break
                default:
                    message =
                        data && typeof data === 'object' && 'message' in data && typeof data.message === 'string' ? `${status}: ${data.message}` : `${status} Unexpected error`
            }
        }
        return Promise.reject(new Error(message))
    },
)

export default api
