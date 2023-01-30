import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import Profile from "../views/Profile.vue";
import ProductInfo from "../views/ProductInfo.vue";
Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
    {
      path: "/product/:id",
      name: "product",
      component: ProductInfo,
    },
  ],
});
