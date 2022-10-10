import { useLogin } from '@/components/login';
import globalConfig from '@/config';

/** 全局路由拦截器 */
export function routerInterceptor(router) {
  /** 页面鉴权 */
  router.beforeEach((to, from, next) => {
    if (to.meta.auth) {
      useLogin({
        successCB: next,
      });
    } else {
      next();
    }
  });

  /** 标题处理 */
  router.afterEach(to => {
    const title = to.meta?.title || '';
    document.title = title + (title ? ' | ' : '') + globalConfig.title;
  });
}
