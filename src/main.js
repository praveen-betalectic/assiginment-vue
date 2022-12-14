import Vue from "vue";
import App from "./App.vue";
import "./index.css";
import VueRouter from "vue-router";

Vue.config.productionTip = false;

const routes = [
  {
    path: "/",
    name: "home",
    component: require("./components/HomeComponent.vue").default,
  },
  {
    path: "/add-fav-package",
    name: "add-fav-package",
    component: require("./components/AddFavPackage.vue").default,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

Vue.use(VueRouter);

new Vue({
  render: (h) => h(App),
  router: router,
}).$mount("#app");
