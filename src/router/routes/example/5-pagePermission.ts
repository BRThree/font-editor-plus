import { RouteRecordRaw } from 'vue-router';
export const routes: RouteRecordRaw[] = [
  {
    path: 'pagePermission',
    component: () => import('@/views/example/pagePermission.vue'),
    meta: { title: '้กต้ขๆ้', rule: ['edit'] },
  },
];
