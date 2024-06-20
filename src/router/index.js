import {createRouter,createWebHistory,useRouter} from 'vue-router';
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Order from '../pages/admin/Order.vue';
import Admin from '../pages/admin/Admin.vue';
import Logout from '../pages/admin/Logout.vue';
import Register from '../pages/admin/Register.vue';
import useAuth from '../api/useAuth';



const router = createRouter({
    history: createWebHistory(),
    routes: [
       
        {
            path:'/',
            name: 'home',
            component: Home
        },
        {
            path:'/admin/users',
            name: 'user',
            component: Admin ,
            beforeEnter(){
                const {getAuthenticated:authenticated} = useAuth();
                if(authenticated.value == false){
                    router.push('/admin/login');
                }
            }
        },
        {
            path:'/register',
            name: 'register',
            component: Register,
            beforeEnter(){
                const {getAuthenticated:authenticated} = useAuth();
                if(authenticated.value == false){
                    router.push('/admin/login');
                }
            }
        },
        {
            path:'/admin/login',
            name: 'login',
            component: Login,
            beforeEnter(){
                const {getAuthenticated:authenticated} = useAuth();
                if(authenticated.value == true){
                    router.push('/admin/orders');
                }
            }
        },
        {
            path:'/admin/orders',
            name: 'orders',
            component: Order,
            beforeEnter(){
                const {getAuthenticated:authenticated} = useAuth();
                if(authenticated.value == false){
                    router.push('/admin/login');
                }
            }
        },
        {
            path:'/admin/logout',
            name: 'logout',
            component: Logout,
            beforeEnter(){
                const {getAuthenticated:authenticated} = useAuth();
                if(authenticated.value == false){
                    router.push('/admin/login');
                }
            }
        },

    ]
});

export default router;