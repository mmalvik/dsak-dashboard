import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import axios from 'axios'

import 'vuetify/dist/vuetify.min.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'lodash'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faLink)

Vue.use(Vuetify)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

export const httpClient = axios.create({
  baseURL: 'http://dashboard:1337/api/v1/dsak'
})

new Vue({
  render: h => h(App)
}).$mount('#app')
