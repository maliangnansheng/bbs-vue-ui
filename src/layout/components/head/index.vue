<template>
  <a-layout-header class="header" :class="{ 'header-visible': $store.state.headerVisible }">
    <div class="main-header">
      <div class="header-left-content">
        <!-- logo -->
        <div @click="refresh" class="header-item-logo">
          <img slot="avatar" src="@/assets/img/logo-lanse.png" alt="默认图片" style="height: 100%" />
        </div>

        <!-- 首页 -->
        <div>
          <a-menu v-if="!$store.state.collapsed" :value="current" :default-selected-keys="current" mode="horizontal">
            <a-menu-item key="home" @click="refresh">{{ $t('common.home') }}</a-menu-item>
            <a-menu-item key="label" @click="routerLabel">{{ $t('common.label') }}</a-menu-item>
            <a-menu-item key="resource" @click="routerResource">{{ $t('common.resource') }}</a-menu-item>
            <a-tooltip placement="bottom">
              <template slot="title">
                {{ $t('common.inDevelopment') }}
              </template>
              <a-menu-item key="course">{{ $t('common.course') }}</a-menu-item>
            </a-tooltip>
          </a-menu>
          <a-select class="phone-frontPage" v-if="$store.state.collapsed" :default-value="current" style="min-width: 90px; width: 100%">
            <a-select-option value="home" @click="refresh">{{ $t('common.home') }}</a-select-option>
            <a-select-option value="label" @click="routerLabel">{{ $t('common.label') }}</a-select-option>
            <a-select-option value="resource" @click="routerResource">{{ $t('common.resource') }}</a-select-option>
            <a-select-option value="course">{{ $t('common.course') }}</a-select-option>
          </a-select>
        </div>
      </div>

      <div class="header-right-content">
        <!-- 搜索框 -->
        <div class="header-search">
          <a-space direction="vertical">
            <a-input-search v-model="searchContentTemp" :placeholder="$t('common.searchPlaceholder')" style="min-width: 100px; width: 100%" @search="onSearch" />
          </a-space>
        </div>

        <!-- 写文章 -->
        <div v-if="!$store.state.collapsed" class="header-item" @click="routerWrite">
          <div class="options">
            <span>{{ $t('common.writeArticle') }}</span>
          </div>
        </div>

        <!-- 管理端 -->
        <div v-if="!$store.state.isLogin && !$store.state.collapsed" class="header-item" @click="routerManage">
          <div class="options">
            <span>{{ $t('common.management') }}</span>
          </div>
        </div>

        <!-- 主题色 -->
        <div class="header-item">
          <a-dropdown overlay-class-name="header-theme-color-config" :placement="'bottomRight'" :trigger="['click']">
            <div class="ant-dropdown-menu" slot="overlay">
              <p>{{ $t('common.themeColor') }}</p>
              <div class="color-options">
                <div @click="changeColor(color)" v-for="color of colorOptions" :key="color" :style="'background: ' + color">
                  <a-icon v-if="themeColor === color" style="color: white" type="check" />
                </div>
              </div>
            </div>
            <div class="options theme-color">
              <i class="iconfont icon-theme" :style="{ color: themeColor }"></i>
            </div>
          </a-dropdown>
        </div>

        <!-- 消息通知 -->
        <div class="header-item badge-container" v-if="$store.state.isLogin">
          <a-dropdown class="dropdown" v-model="visible" overlay-class-name="header-message-box" :placement="'bottomRight'" :trigger="['click']">
            <div class="ant-dropdown-menu" slot="overlay">
              <message-box :visible.sync="visible" />
            </div>
            <div class="options">
              <a-badge class="badge" :count="$store.state.isLogin ? messageNumbers : 0" :overflow-count="99"> <i class="iconfont icon-bell"></i></a-badge>
            </div>
          </a-dropdown>
        </div>

        <!-- 头像 -->
        <div class="header-item avatar-container" v-if="$store.state.isLogin">
          <a-dropdown :placement="'bottomRight'" :trigger="['click']">
            <a-menu @click="handleClick" slot="overlay">
              <a-menu-item key="writeArticle"> <i class="iconfont icon-writeArticle"></i>{{ ' ' + $t('common.writeArticle') }} </a-menu-item>
              <a-menu-item key="PROFILE"> <i class="iconfont icon-user-picture"></i>{{ ' ' + $t('common.profile') }} </a-menu-item>
              <a-divider style="margin: 3px 0 3px 0" />
              <a-menu-item key="setUp"> <i class="iconfont icon-setUp"></i>{{ ' ' + $t('common.setUp') }} </a-menu-item>
              <a-menu-item key="about"> <i class="iconfont icon-about"></i>{{ ' ' + $t('common.about') }} </a-menu-item>
              <a-divider style="margin: 3px 0 3px 0" />
              <a-menu-item key="management"> <i class="iconfont icon-setUp"></i>{{ ' ' + $t('common.management') }} </a-menu-item>
              <a-divider style="margin: 3px 0 3px 0" />
              <a-menu-item key="LOG_OUT"> <i class="iconfont icon-quit"></i>{{ ' ' + $t('common.logOut') }} </a-menu-item>
            </a-menu>
            <div class="options">
              <a-avatar class="avatar" v-if="$store.state.picture" :src="$store.state.picture" />
              <img v-else src="@/assets/img/default_avatar.png" class="default-avatar" width="32" />
            </div>
          </a-dropdown>
        </div>

        <!-- 语言 -->
        <div v-if="!$store.state.collapsed" class="header-item languages">
          <a-dropdown :placement="'bottomRight'" :trigger="['click']">
            <a-menu @click="changeLanguage" slot="overlay">
              <a-menu-item key="zh_CN">
                <i class="iconfont icon-chinese avatar-menu-icon"></i>
                <span>中文</span>
              </a-menu-item>
              <a-menu-item key="en_US">
                <i class="iconfont icon-english avatar-menu-icon"></i>
                <span>English</span>
              </a-menu-item>
            </a-menu>
            <div class="options">
              <a-icon type="global" />
              <span style="padding-left: 6px">{{ languageTitle }}</span>
            </div>
          </a-dropdown>
        </div>

        <!-- 登录 -->
        <div class="header-item-login" v-if="!$store.state.isLogin">
          <div class="options" @click="showLoginModal">
            <a-button style="border: 1px solid rgba(30, 128, 255, 0.3); background: rgba(30, 128, 255, 0.05); color: #007fff">
              {{ $t('common.login') }}
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import MessageBox from './components/MessageBox/index.vue';

import store from '@/store';
import loginService from '@/service/loginService';

import { trimString } from '@/utils/regExp';
import { useLogin } from '@/components/login';

const menuKeys = {
  home: 'home',
  label: 'label',
  resource: 'resource',
  course: 'course',
};

export default {
  components: { MessageBox },

  data() {
    return {
      visible: false,
      params: { currentPage: 1, pageSize: 10 },
      searchContentTemp: this.$route.query?.query || '',
    };
  },

  computed: {
    ...mapState(['userInfo', 'locale', 'themeColor', 'colorOptions', 'systemNotifyCount', 'taskNotifyCount']),
    // 总消息数量
    messageNumbers() {
      return Number(this.systemNotifyCount) + Number(this.taskNotifyCount);
    },
    languageTitle() {
      if (this.locale === 'zh_CN') {
        return '中文';
      }
      return 'English';
    },
    current() {
      const name = this.$route.name;
      if (Object.keys(menuKeys).indexOf(name) > -1) {
        return [name];
      }
      return [];
    },
  },

  methods: {
    ...mapMutations(['changeColor']),
    // 设置语言
    changeLanguage({ key }) {
      this.$store.state.locale = key;
      localStorage.language = key;
    },

    // 点击菜单根据点击的key做出相应
    handleClick({ key }) {
      if (key === 'writeArticle') {
        this.routerWrite();
      }
      if (key === 'PROFILE') {
        this.routerUserCenter(this.$store.state.userId);
      }
      if (key === 'setUp') {
        this.routerSetUp();
      }
      if (key === 'about') {
        this.routerAbout();
      }
      if (key === 'management') {
        this.routerManage();
      }
      if (key === 'LOG_OUT') {
        this.logout();
      }
    },

    // 显示登录框
    showLoginModal() {
      useLogin();
    },

    // 退出登录
    logout() {
      this.$store.dispatch('logout');
    },

    // 搜索
    onSearch(value) {
      const kw = trimString(value);
      if (kw) {
        this.$router.push({ path: '/search', query: { query: kw } });
      }
    },

    // 处理文章顶部导航栏页面下滑时隐藏
    handleHeaderAnimation() {
      const { hideHeaderWhenScroll } = this.$store.state.config.config || {};
      if (!hideHeaderWhenScroll) return;
      const { headerVisible } = this.$store.state;
      const app = document.getElementById('app');
      const scrollEventCB = ev => {
        const scrollTop = ev.target.scrollTop;
        if (this.delta === 0) {
          this.delta = scrollTop;
          return;
        }
        if (scrollTop > this.delta && headerVisible) {
          this.$store.commit('setHeaderVisible', false);
        } else {
          this.$store.commit('setHeaderVisible', true);
        }
        this.delta = scrollTop;
      };
      app.addEventListener('scroll', scrollEventCB);
      this.$once('hook:beforeDestroy', () => {
        app.removeEventListener('scroll', scrollEventCB);
      });
    },

    // 刷新
    refresh() {
      // 跳转到首页
      this.$router.push('/');
      // 刷新首页数据（登录后需要）
      this.$emit('refresh');
    },

    // 路由到用户中心页面
    routerUserCenter(userId) {
      const routeData = this.$router.resolve('/user/' + userId);
      window.open(routeData.href, '_self');
      // this.$router.push("/user/" + userId);
    },

    // 路由到写文章页面
    routerWrite() {
      this.$router.push('/write');
    },

    // 路由到标签页面
    routerLabel() {
      this.$router.push('/label');
    },

    // 路由到资源导航页面
    routerResource() {
      this.$router.push('/resource');
    },

    // 路由到设置页面
    routerSetUp() {
      this.$router.push('/settings/profile');
    },

    // 点击跳转到 关于我们 页面
    routerAbout() {
      window.open('/about', '_blank');
    },

    // 路由到管理端
    routerManage() {
      window.open(this.$store.state.manageDomain, '_blank');
    },
  },

  watch: {
    // 路由变化时触发
    '$route.fullPath': {
      handler(newVal, oldVal) {
        const { query } = this.$route || {};
        this.searchContentTemp = this.searchContentTemp || query.query || '';
      },
    },
  },

  mounted() {
    this.handleHeaderAnimation();
  },
};
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: auto;
  background: #fff;
  border-bottom: 1px solid #00000021;
  transition: all 0.2s;
  transform: translate3d(0, -100%, 0);
}

.header-visible {
  transform: translate3d(0, 0, 0);
}

.main-header {
  width: 1100px;
  margin: 0 auto;
  background: #fff;
  padding: 0;
  line-height: 2.3;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 1100px) {
  .main-header {
    width: 100%;
  }
  .ant-layout-header {
    padding: 0 10px;
  }
}

.header-left-content {
  display: flex;
  justify-content: left;
  align-items: center;

  .header-item-logo {
    cursor: pointer;
    height: 40px;
  }
}

.header-right-content {
  //padding-right: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .header-search,
  .header-item,
  .header-item-login {
    padding: 0 12px;
  }

  .badge-container {
    .badge {
      position: relative;
      top: 3px;
    }

    .ant-avatar {
      background-color: transparent;
      overflow: visible;
    }

    .iconfont {
      color: #807a7a;
      cursor: pointer;
    }
  }

  .avatar-container {
    .default-avatar,
    .avatar {
      cursor: pointer;
      user-select: none;
    }

    .default-avatar {
      border-radius: 50%;
    }
  }

  .languages {
    padding-left: 6px;
    box-sizing: content-box;

    .options {
      div {
        height: 40px;
      }
    }
  }

  .header-item {
    cursor: pointer;
    color: #71777c;

    .options:hover {
      opacity: 0.7;
    }
  }

  .header-item-login {
    cursor: auto;
    color: #71777c;

    .options:hover {
      opacity: 0.7;
    }
  }
}

.header-message-box {
  .ant-tabs-nav-container {
    padding: 0 16px;
  }
}

// 移动端
@media screen and (max-width: 900px) {
  .header-message-box {
    left: 0 !important;
    position: relative;
    display: flex;
    justify-content: center;
  }

  .header-left-content {
    .phone-frontPage {
      padding: 0 8px;
    }
  }

  .header-right-content {
    .header-search,
    .header-item,
    .header-item-login {
      padding: 0 8px 0 4px;
    }
  }
}

.ant-tabs-nav .ant-tabs-tab {
  margin: 0;
}

.header-theme-color-config {
  .ant-dropdown-menu {
    margin-top: -2px;
    padding: 12px;

    .color-options {
      display: flex;
      justify-content: space-around;

      div {
        width: 20px;
        height: 20px;
        margin: 0 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

.avatar-menu-icon {
  font-size: 16px !important;
}

/* 去掉a-menu组件的下划线 */
.ant-menu-horizontal {
  border-bottom: 0;
}

.ant-menu-horizontal > .ant-menu-item-active,
.ant-menu-horizontal > .ant-menu-item-open,
.ant-menu-horizontal > .ant-menu-item-selected,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover,
.ant-menu-horizontal > .ant-menu-submenu-active,
.ant-menu-horizontal > .ant-menu-submenu-open,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu {
  border-bottom: 2px solid transparent;
}

/* 调整a-menu-item的padding */
.ant-menu-item,
.ant-menu-submenu-title {
  padding: 0 16px;
}
</style>
