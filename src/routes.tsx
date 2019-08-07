import loadable from "@loadable/component";

const router = [
  {
    path: "/home",
    component: loadable(() => import('./webviews/home'))
  },
  {
    path: "/list",
    component: loadable(() => import('./webviews/list'))
  },
];

export default router;