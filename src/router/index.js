import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import { routerInterceptor } from './permission';

// 每次调用Vue.$router.push方法跳转路由的时候先判断是不是已经在目标路由，避免重复跳转（Vue会有警告）
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

routerInterceptor(router);

export default router;
