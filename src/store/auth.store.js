import {defineStore} from "pinia";
import axios from "axios";
import {useRouter} from "vue-router";
import {ref} from "vue";

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()

    const isAuthenticated = ref()
    const login = async (user) => {
        try {

            const res = await axios.post('http://127.0.0.1:8000/api/login', user)
            const currentUser = res.data.user
            localStorage.setItem('userName', currentUser.userName)
            localStorage.setItem('userEmail', currentUser.userEmail)
            localStorage.setItem('token', currentUser.token)

            isAuthenticated.value = true
            await router.push({path: '/listings/create', replace: true})

        } catch (e) {
            throw e.response;
        }
    }

    return {
        isAuthenticated,
        login
    }
})