import {defineStore} from "pinia";
import axios from "axios";
import {useRouter} from "vue-router";
import {computed, ref} from "vue";

export type User = {
    userName: string,
    userEmail: string,
    token: string
}
export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()

    const isAuthenticated = ref(!!localStorage.getItem('token'))
    const userName = computed(() => localStorage.getItem('userName'))

    const login = async (user: User) => {
        try {

            const res = await axios.post('http://127.0.0.1:8000/api/login', user)
            const currentUser = res.data.user
            localStorage.setItem('userName', currentUser.userName)
            localStorage.setItem('userEmail', currentUser.userEmail)
            localStorage.setItem('token', currentUser.token)

            isAuthenticated.value = true
            await router.push({path: '/listings/create', replace: true})

        } catch (e: any) {
            throw e.response;
        }
    }

    const logout = async () => {
        localStorage.removeItem('userName')
        localStorage.removeItem('userEmail')
        localStorage.removeItem('token')

        await router.push({path: '/login', replace: true})
    }

    return {isAuthenticated, userName, login, logout}
})