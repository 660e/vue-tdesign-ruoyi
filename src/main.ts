import './styles/index.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import directives from './directives';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(directives);
app.use(router);
app.mount('#app');
