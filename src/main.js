import Vue from 'vue';
import App from './App.vue';
import store from './store'
import Trend from 'vuetrend';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';

Vue.component('multiselect', Multiselect);
Vue.use(Trend);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
