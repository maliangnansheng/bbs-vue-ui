import Vue from 'vue';
import Vuex from 'vuex';
import zh_CN from '@/i18n/zh_CN';
import en_US from '@/i18n/en_US';
import userService from '@/service/userService';
import utils from '@/config/utils';
import router from '@/router';
import globalConfig from '@/config';
import { message } from 'ant-design-vue';

import config from './modules/config';

let userInfo = localStorage.getItem('auth_info');
if (userInfo) {
  userInfo = JSON.parse(atob(userInfo));
} else {
  userInfo = {};
}
const langs = { zh_CN, en_US };

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 导航栏是否显示
    headerVisible: true,
    // 判断用户是否已经登录
    isLogin: !!userInfo.isLogin,
    // 登录用户id
    userId: userInfo.userId || '',
    // 用户头像
    picture: userInfo.picture || '',
    // 判断用户是否是管理员
    isManage: !!userInfo.isManage,
    // 用户名称长度限制
    userMaxLength: 10,
    // 主题色
    colorOptions: ['#000000', '#3eaf7c', '#13c2c2', '#1869ff', '#722ed1', '#eb2f96'],
    // 当前使能的主题色
    themeColor: '#13c2c2',
    // 是否启用跑马灯（1：启用，0：禁止）
    isCarousel: globalConfig.isCarousel,
    // 菜单是否收缩
    collapsed: false,
    // 用户屏幕宽度
    width: 0,
    // 用户屏幕高度
    height: 0,
    // 语言
    locale: 'zh_CN',
    // 系统通知数量
    systemNotifyCount: 0,
    // 任务提醒数量
    taskNotifyCount: 0,
    // 南生运营域名
    manageDomain: 'http://manage-test.nanshengbbs.top',
    // 国际化方法
    translate: function (val) {
      // 国际化方法
      if (!val) {
        return '';
      }
      const arr = val.split('.');
      const l = arr.length;
      let re;
      try {
        re = langs[this.locale];
        for (let i = 0; i < l; i++) {
          re = re[arr[i]];
        }
      } catch (err) {
        re = arr[l - 1];
      }
      return re || arr[l - 1];
    },
  },
  getters: {
    formCol(state) {
      if (state.width >= 500) {
        return { label: 6, wrapper: 16 };
      }
      return { label: 8, wrapper: 16 };
    },
    // 自动计算屏幕的内容区域（减取padding、margin和菜单栏的宽度）
    contentWidth(state) {
      if (state.collapsed) {
        return state.width - 120;
      }
      return state.width - 314;
    },
    isPc(state) {
      // 根据用户屏幕宽度判断是pc访问还是移动设备访问
      if (state.width > 750) {
        return true;
      }
      return false;
    },
    // 状态枚举，项目中多出用到，所以存到store里面使用
    stateList(state) {
      return [
        { title: state.translate('common.enabled'), value: 1 },
        { title: state.translate('common.disabled'), value: 0 },
      ];
    },
  },
  mutations: {
    // 更改主题色，同时将配置存在localStorage
    changeColor(state, color) {
      utils.updateTheme(color);
      window.localStorage.themeColor = color;
      state.themeColor = color;
    },
    // 导航栏显示/隐藏
    setHeaderVisible(state, visible) {
      state.headerVisible = visible;
    },
    setUserInfo(state, userInfo) {
      Object.assign(state, userInfo);
    },
  },
  actions: {
    logout({ commit }) {
      userService
        .logout()
        .then(() => {
          commit('setUserInfo', {
            isLogin: false,
            userId: '',
            picture: '',
            isManage: false,
          });
          localStorage.removeItem('auth_info');
          router.go(0);
        })
        .catch(err => {
          message.error(err.desc);
        });
    },
    getAccess({ commit }) {
      return new Promise((resolve, reject) => {
        userService
          .getCurrentUserAccess()
          .then(res => {
            // 判断当前是否在500页面刷新，如果是，刷新后如果返回{code: 200},则跳转到首页
            // 如果当前是服务器错误（500页面），刷新后自动跳转到首页
            if (location.href.split('/').pop() === '500') {
              router.push({ path: '/' });
            }
            const userInfo = {};
            if (res.code === 0) {
              userInfo.userId = res.data.userId;
              userInfo.isLogin = true;
              res.data.roles.forEach(data => {
                if (data.code === 'bbs-admin') {
                  userInfo.isManage = true;
                }
              });
            }
            commit('setUserInfo', userInfo);
            localStorage.setItem('auth_info', btoa(JSON.stringify(userInfo)));
            resolve(userInfo);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
  },
  modules: {
    config,
  },
});
