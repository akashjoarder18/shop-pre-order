
import { ref,inject } from "vue";
import axios from "axios";
import {useToast} from 'vue-toast-notification';
import { useReCaptcha } from 'vue-recaptcha-v3';



export default function useProducts() {
    const products = ref([]);
    const errors = ref({});
    const $toast = useToast();
    //const recaptcha = useRecaptcha;
    

    const { executeRecaptcha } = useReCaptcha();

    const fetchProducts = async () => {
        let response = await axios.get('/api/products');
        products.value = response.data
    }

    const order = async (credentials) => {

        try {            
            const token = await executeRecaptcha('preorder');
            console.log(token);
            await axios.get('/sanctum/csrf-cookie');
            await axios.post('/api/order', {
                ...credentials,
                recaptchaToken: token
              });
            $toast.success('Ordered Data Successfully Submitted!');
        } catch (error) {
            // validation errors
            console.log(error);
            if (error.response.status == 422) {
                errors.value = error.response.data.errors
            }
        }
    }

    return{
        products,
        fetchProducts,
        errors,
        order
    }
}