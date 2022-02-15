import Vue from 'vue'
import App from './App.vue'

import router from "./router";

import Lottie from "vue-lottie";
import Loading from "./components/Loading.vue";

Vue.component('Lottie', Lottie);
Vue.component('Loading', Loading)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
