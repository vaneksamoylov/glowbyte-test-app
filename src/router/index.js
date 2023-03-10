import { createRouter, createWebHistory } from "vue-router";
import Index from "@/views/Index.vue";
import TableScreen from "@/views/TableScreen.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Index,
    },
    {
      path: "/table",
      name: "tableScreen",
      component: TableScreen,
    },
  ],
});
