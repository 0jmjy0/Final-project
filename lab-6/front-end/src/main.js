import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import VueCookies from 'vue-cookies';

Vue.config.productionTip = false;
Vue.use(VueCookies);
let data = {
  user: null,
};

new Vue({
  data,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
