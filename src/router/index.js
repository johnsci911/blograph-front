import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ "../views/AboutView.vue");
    },
  },
  {
    path: "/post/:id",
    name: "post",
    component: () => import("../views/PostView.vue"),
  },
  {
    path: "/create",
    name: "create",
    component: () => import("../views/CreateView.vue"),
  },
  {
    path: "/post/:id/edit",
    name: "update",
    component: () => import("../views/UpdateView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
