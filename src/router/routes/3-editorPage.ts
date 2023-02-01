import { PageEnum } from '@/dict/pageEnum';
import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { concatObjectValue } from '@/utils/helper';
export const routes: RouteRecordRaw[] = [
  {
    path: PageEnum.EDITOR_PAGE,
    redirect: PageEnum.EDITOR_PAGE + '/index',
    component: Layout,
    children: concatObjectValue<RouteRecordRaw>(
      import.meta.glob('./editorPage/*.ts', { eager: true, import: 'routes' }),
    ),
    meta: { title: '' },
  },
];