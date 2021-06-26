import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import AuthPlugin from './plugin';
import AuthWrapper from './components/AuthWrapper.vue';
// import App from './App.vue';
import router from './router';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap-vue/node_modules/bootstrap/dist/css/bootstrap.css';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(AuthPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(AuthWrapper), // h(App),
}).$mount('#app');
