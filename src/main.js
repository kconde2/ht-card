import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";

import Main from "./MainApp.vue";

import "./assets/main.scss";

Vue.use(PiniaVuePlugin);

new Vue({
  pinia: createPinia(),
  render: (h) => h(Main),
}).$mount("#app");
