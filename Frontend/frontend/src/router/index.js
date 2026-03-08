import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import EmployeeDashboard from "../views/EmployeeDashboard.vue";
import AdminDashboard from "../views/AdminDashboard.vue";
import ApplyLeave from "../views/ApplyLeave.vue";
import MyLeaves from "../views/MyLeaves.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/signup", component: Signup },

  { path: "/employee", component: EmployeeDashboard },
  { path: "/admin", component: AdminDashboard },

  { path: "/apply", component: ApplyLeave },
  { path: "/myleaves", component: MyLeaves },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;