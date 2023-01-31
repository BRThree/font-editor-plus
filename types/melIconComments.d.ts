import { icons } from '@element-plus/icons-vue/global';
declare module '@vue/runtime-core' {
  type GlobalComponentsTypes = {
    [k in `MelIcon${keyof typeof icons}`]: Icon;
  };
  // eslint-disable-next-line
  interface GlobalComponents extends GlobalComponentsTypes {}
}
export {};
