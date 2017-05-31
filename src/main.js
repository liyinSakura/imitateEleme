// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';

import axios from 'axios';
Vue.config.productionTip = false;
import './common/stylus/icon.styl';
Vue.prototype.$http = axios;
import VueRouter from 'vue-router';

import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: goods },
  { path: '/goods', component: goods },
  { path: '/seller', component: seller },
  { path: '/ratings', component: ratings }
];
const router = new VueRouter({
  routes
});
const app = new Vue({
    router,
    render: h => h(App),
    data: {
      eventHub: new Vue()
    }
}).$mount('#app');
