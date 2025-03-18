import '@/assets/sass/main.scss';
import FloatingVue from 'floating-vue';
import { createApp } from 'vue';
import App from './App.vue';

import router from '@/router';
import { createPinia } from 'pinia';

const app = createApp(App);

app.use(FloatingVue).use(createPinia()).use(router).mount('#app');
