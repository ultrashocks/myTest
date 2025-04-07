import '@/assets/sass/main.scss';
import { createApp } from 'vue';
import App from './App.vue';

import router from '@/router';
import { createPinia } from 'pinia';
import globalComponents from './plugins/global-components';

const app = createApp(App);
app.use(globalComponents).use(createPinia()).use(router).mount('#app');
