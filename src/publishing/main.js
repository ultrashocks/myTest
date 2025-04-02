import '@/assets/sass/main.scss';
import { createApp } from 'vue';
import App from './App.vue';

import getPublishingRoutes from '@/publishing/router';
import { createPinia } from 'pinia';

const app = createApp(App);
console.log('퍼블 진입');
app.use(createPinia()).use(getPublishingRoutes).mount('#app');
