import './plugins/element.js';
import './registerServiceWorker';

import moment from 'moment';
import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';

moment.locale('ru');

Vue.use(require('vue-moment'), {
  moment,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
