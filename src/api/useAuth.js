import axios from "axios";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {useToast} from 'vue-toast-notification';


const $toast = useToast();
const state = reactive({
    authenticated: false,
    user: {}
});

export default function useAuth() {
    const router = useRouter();
    const errors = ref({

    })
    const getAuthenticated = computed(() => state.authenticated)
    const getUser = computed(() => state.user)
    const setAuthenticate = (authenticated) => {
        state.authenticated = authenticated
    }

    const setUser = (user) => {
        state.user = user
    }
    const users = async () => {
        try {           
            let response = await axios.get('/api/user');
            setAuthenticate(true)
            setUser(response.data)
            return response;

        } catch (error) {
            // error
            setAuthenticate(false)
            setUser({})            
        }
    }
    const login = async (credentials) => {

        try {
            await axios.get('/sanctum/csrf-cookie');
            await axios.post('login', credentials);
            await users();
            await router.push({ name: 'orders' })
        } catch (error) {
            // validation errors
            if (error.response.status == 422) {
                errors.value = error.response.data.errors
            }
        }
    }

    const logout = async () => {
        try {
            await axios.post('/logout');
            setAuthenticate(false)
            setUser({})

            await router.push({ name: 'login' })
        } catch (error) {
            // error
        }
    }

    const register = async (credentials) => {

        try {
            await axios.get('/sanctum/csrf-cookie');
            await axios.post('/api/register', credentials);
            await users();
            await router.push({ name: 'user' })
        } catch (error) {
            // validation errors
            if (error.response.status == 422) {
                errors.value = error.response.data.errors
            }else{
                $toast.error('You are not authenticated user to access resgitration!');
            }
        }
    }

    return {
        login,
        getUser,
        getAuthenticated,
        users,
        errors,
        logout,
        register
    }
}