import Vue from 'vue';
import VueRouter from 'vue-router';

// 每次调用Vue.$router.push方法跳转路由的时候先判断是不是已经在目标路由，避免重复跳转（Vue会有警告）
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/index/Index'),
  },
  {
    path: '/search',
    component: () => import('@/components/index/Index'),
  },
  {
    path: '/recommended',
    component: () => import('@/components/index/AuthorsListIndex'),
  },
  {
    path: '/write',
    component: () => import('@/components/index/WriteArticleIndex'),
  },
  {
    path: '/edit/:id',
    component: () => import('@/components/index/WriteArticleIndex'),
  },
  {
    path: '/detail/:id',
    component: () => import('@/components/index/ArticleDetailIndex'),
  },
  {
    path: '/empty',
    component: () => import('@/components/utils/CustomEmpty'),
  },
  {
    path: '/user/:id',
    component: () => import('@/components/index/UserCenterIndex'),
  },
  {
    path: '/label',
    name: 'label',
    component: () => import('@/components/index/LabelIndex'),
  },
  {
    path: '/label/:id',
    component: () => import('@/components/index/LabelToArticleIndex'),
  },
  {
    path: '/settings',
    component: () => import('@/components/index/SetUpIndex'),
    children: [
      {
        path: '',
        redirect: 'profile',
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/components/user/ProfileContent'),
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('@/components/user/AccountSettings'),
      },
    ],
  },
  {
    path: '/resource',
    name: 'resource',
    component: () => import('@/components/index/ResourceIndex'),
  },
  {
    path: '/book',
    name: 'book',
    component: () => import('@/components/index/Book'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/components/index/About'),
  },
  {
    path: '/500',
    component: () => import('@/components/errorPage/ServerError'),
  },
  {
    path: '*',
    component: () => import('@/components/errorPage/NotFound'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
