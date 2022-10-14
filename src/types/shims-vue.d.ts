import * as utils from '@/utils';

declare module 'vue/types/vue' {
  interface Vue {
    /**
     * 组件库全局配置
     */
    $utils: typeof utils;
  }
}

export {};
