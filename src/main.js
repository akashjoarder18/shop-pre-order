import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index';
import axios from 'axios';
import useAuth from './api/useAuth'
import { VueReCaptcha } from 'vue-recaptcha-v3';
import ToastPlugin  from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css';

const { users } = useAuth();

axios.defaults.baseURL = 'http://localhost:8081';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
const app = createApp(App)
app.use(router)
app.use(VueReCaptcha, {
    siteKey: '6LeRWfcpAAAAANpVRKEzezCKQhD6Dfogvq0Svwpc'
  });
app.use(ToastPlugin);
users().then(() => {
    app.mount('#app')
})

