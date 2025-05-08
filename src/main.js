
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import './assets/tailwind.css';
import './assets/main.css' //
import 'primeicons/primeicons.css'
import routers from './views/routes/routes';
import { createPinia } from 'pinia'
import ToastService from 'primevue/toastservice';
// import 'primevue/resources/primevue.min.css';
// import 'primeicons/primeicons.css';
import 'quill/dist/quill.snow.css'; // for Editor
import Editor from 'primevue/editor'

const pinia = createPinia();

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  }
})

app.use(ToastService)
app.use(routers)
app.use(pinia);
app.component('Editor', Editor)
app.mount('#app')
