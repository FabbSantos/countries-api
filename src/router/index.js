import { createRouter, createWebHistory } from "vue-router";
import index from "../pages/index.vue";
import countryDetails from "../pages/countryDetails.vue";

const routes = [
  {
    path: "/",
    component: index,
    name: "index"
  },
  {
    path: "/countryDetails/:countryName",
    name: "countryDetails",
    component: countryDetails
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;