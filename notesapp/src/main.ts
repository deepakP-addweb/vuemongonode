import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import axios, {isCancel, AxiosError} from 'axios';


const axiosInstance = axios.create({
baseURL: 'http://localhost:3006',
withCredentials: false,
})


import App from './App.vue'
import router from './router'

const pinia = createPinia()

const app = createApp(App)

app.config.globalProperties.$axios = { ...axiosInstance }

app.use(pinia)
app.use(router)

app.mount('#app')
