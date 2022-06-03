import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/Login.vue";
import User from "./components/User.vue"
const Profile = () => import("./components/Profile.vue")
const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/user",
    component: User,
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;