import Sai from "./Signin.vue";
import Hello from "./Hello.vue";
import Signout from "./signout.vue";
import Welcome from "./Welcome.vue";

const routes = [
  { path: "/", component: Sai },
  { path: "/signin", component: Sai },
  { path: "/signout", component: Signout, meta: { requiresAuth: true } },
  { path: "/home", component: Hello, meta: { requiresAuth: true } }
];

export default routes;
