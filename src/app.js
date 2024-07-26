import { createApp } from 'vue';
import App from './App.vue';
import { createVue3Head } from './plugins/Vue3Head.ts';

const app = createApp(App);

const head = createVue3Head()
app.use(head)

app.mount('#app')