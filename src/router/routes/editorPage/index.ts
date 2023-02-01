import { RouteRecordRaw } from 'vue-router';
export const routes: RouteRecordRaw[] = [
  {
    path: 'index',
    component: () => import('@/views/EditorPage/index.vue'),
    meta: { title: '编辑字形' },
  },
];