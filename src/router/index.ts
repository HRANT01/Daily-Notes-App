import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { RouteNames } from "../utils/route-types";

import NotesList from "../views/NotesList.vue";
import NoteView from "../views/NoteView.vue";
import AddNote from "../views/AddNote.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "NotesList",
    component: NotesList,
  },
  {
    path: "/todo/:slug",
    name: "NoteView",
    component: NoteView,
    props: true,
  },
  {
    path: "/add",
    name: "AddNote",
    component: AddNote,
  },
];

type AppLinks = RouteNames<typeof routes>;

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

export type { AppLinks };
