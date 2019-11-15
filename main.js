import Vue from 'vue';
import App from './App';

import API from './common/api'
import util from './common/util'
Vue.prototype.$api = API //全局引用api.js
Vue.prototype.util = util //全局引用util.js

import buttonDiy from "./components/button-diy.vue";
Vue.component("buttonDiy", buttonDiy);

import toolbar from "./components/toolbar.vue";
Vue.component("toolbar", toolbar);

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
    ...App
});
app.$mount();
