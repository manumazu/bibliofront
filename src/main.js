import Vue from 'vue';
import AuthPlugin from './plugin';
import AuthWrapper from './components/AuthWrapper.vue';
// import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';

Vue.use(AuthPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(AuthWrapper), // h(App),
}).$mount('#app');
