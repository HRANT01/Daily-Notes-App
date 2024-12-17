import { RouteRecordRaw } from "vue-router";

type RouteNamesFlat<R extends RouteRecordRaw[]> = R[number]["name"];

export type RouteNames<R extends RouteRecordRaw[]> =
  | RouteNamesFlat<R>
  | (R[number]["children"] extends RouteRecordRaw[]
      ? RouteNames<R[number]["children"]>
      : never);
