/*!

=========================================================
* Vue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import store from './store'
import defaultState from './store/defaultState'
import formParser from './utils/formParser'
import JSONfn from 'json-fn'
import fs from 'fs'
import Toasted from 'vue-toasted';
import axios from 'axios';
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

Vue.use(Toasted)
Vue.use(axios)




Vue.config.productionTip = false

Vue.use(ArgonDashboard)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
