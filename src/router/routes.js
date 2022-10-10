import Layout from '@/layout/index.vue';

export const routes = [
  {
    path: '/write',
    component: () => import('@/views/write/index.vue'),
    meta: {
      title: '写文章',
    },
  },
  {
    path: '/edit/:id',
    component: () => import('@/views/write/index.vue'),
    meta: {
      title: '编辑文章',
      auth: true,
    },
  },
  {
    path: '/empty',
    component: () => import('@/components/utils/CustomEmpty'),
    meta: {
      title: '空页面',
    },
  },
  {
    path: '/500',
    component: () => import('@/components/errorPage/ServerError'),
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
        },
      },
      {
        path: 'search',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '搜索',
        },
      },
      {
        path: '/recommended',
        component: () => import('@/views/recommended/index.vue'),
        meta: {
          title: '推荐',
        },
      },
      {
        path: '/detail/:id',
        component: () => import('@/views/detail/index.vue'),
        meta: {
          title: '文章详情',
        },
      },
      {
        path: '/user/:id',
        component: () => import('@/views/user/index.vue'),
        meta: {
          title: '用户中心',
        },
      },
      {
        path: '/label',
        name: 'label',
        component: () => import('@/views/label/index.vue'),
        meta: {
          title: '标签',
        },
      },
      {
        path: '/label/:id',
        name: 'labelDetail',
        component: () => import('@/views/label/detail/index.vue'),
        meta: {
          title: '标签详情',
        },
      },
      {
        path: '/settings',
        component: () => import('@/views/settings/index.vue'),
        redirect: '/settings/profile',
        children: [
          {
            path: 'profile',
            name: 'profile',
            component: () => import('@/views/settings/profile/index.vue'),
            meta: {
              title: '个人设置',
              auth: true,
            },
          },
          {
            path: 'account',
            name: 'account',
            component: () => import('@/views/settings/account/index.vue'),
            meta: {
              title: '账号设置',
              auth: true,
            },
          },
        ],
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import('@/views/resource/index.vue'),
        meta: {
          title: '资源',
        },
      },
      {
        path: '/book',
        name: 'book',
        component: () => import('@/views/book/index.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about/index.vue'),
        meta: {
          title: '关于',
        },
      },
    ],
  },
  {
    path: '*',
    component: () => import('@/components/errorPage/NotFound'),
  },
];
