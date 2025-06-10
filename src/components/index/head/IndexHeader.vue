<template>
  <a-layout-header>
    <div class="main-header">
      <div class="header-right-logo">
        <!-- logo -->
        <div @click="refresh" class="header-item-logo" v-if="!$store.state.collapsed">
          <img slot="avatar" src="@/assets/img/logo-lanse.png" alt="默认图片" style="height: 100%"/>
        </div>

        <IndexMenu v-if="!$store.state.collapsed"/>
        <IndexSider v-else/>
      </div>

      <div class="header-right-content">
        <!-- 搜索框 -->
        <div class="header-search">
          <a-space direction="vertical">
            <a-input-search v-model="searchContentTemp" :placeholder="$t('common.searchPlaceholder')"
                            style="min-width: 100px; width: 100%"
                            @search="onSearch"
            />
          </a-space>
        </div>

        <!-- 写文章 -->
        <div v-if="$store.state.isLogin && !$store.state.collapsed" class="header-item" @click="routerWrite">
          <div class="options">
            <span>{{ $t("common.writeArticle") }}</span>
          </div>
        </div>

        <!-- 管理端 -->
        <div v-if="!$store.state.isLogin && !$store.state.collapsed" class="header-item" @click="routerManage">
          <div class="options">
            <span>{{ $t("common.management") }}</span>
          </div>
        </div>

        <!-- 主题色 -->
        <div class="header-item">
          <a-dropdown overlayClassName="header-theme-color-config" :placement="'bottomRight'"
                      :trigger="['click']">
            <div class="ant-dropdown-menu" slot="overlay">
              <p>{{ $t("common.themeColor") }}</p>
              <div class="color-options">
                <div @click="changeColor(color)" v-for="color of colorOptions" :key="color"
                     :style="'background: ' + color">
                  <a-icon v-if="themeColor === color" style="color: white" type="check"/>
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
          <a-dropdown class="dropdown" v-model="visible" overlayClassName="header-message-box"
                      :placement="'bottomRight'" :trigger="['click']">
            <div class="ant-dropdown-menu" slot="overlay">
              <MessageBox :visible.sync="visible"/>
            </div>
            <div class="options">
              <a-badge class="badge" :count="$store.state.isLogin ? messageNumbers : 0" :overflow-count="99">
                <i
                    class="iconfont icon-bell"></i></a-badge>
            </div>
          </a-dropdown>
        </div>

        <!-- 头像 -->
        <div class="header-item avatar-container" v-if="$store.state.isLogin">
          <a-dropdown :placement="'bottomRight'" :trigger="['click']">
            <a-menu @click="handleClick" slot="overlay">
              <a-menu-item key="writeArticle">
                <i class="iconfont icon-writeArticle"></i>{{ ' ' + $t("common.writeArticle") }}
              </a-menu-item>
              <a-menu-item key="PROFILE">
                <i class="iconfont icon-user-picture"></i>{{ ' ' + $t("common.profile") }}
              </a-menu-item>
              <a-divider style="margin: 3px 0 3px 0"/>
              <a-menu-item key="setUp">
                <i class="iconfont icon-setUp"></i>{{ ' ' + $t("common.setUp") }}
              </a-menu-item>
              <a-menu-item key="about">
                <i class="iconfont icon-about"></i>{{ ' ' + $t("common.about") }}
              </a-menu-item>
              <a-divider style="margin: 3px 0 3px 0"/>
              <a-menu-item key="management">
                <i class="iconfont icon-setUp"></i>{{ ' ' + $t("common.management") }}
              </a-menu-item>
              <a-divider style="margin: 3px 0 3px 0"/>
              <a-menu-item key="LOG_OUT">
                <i class="iconfont icon-quit"></i>{{ ' ' + $t("common.logOut") }}
              </a-menu-item>
            </a-menu>
            <div class="options">
              <a-avatar class="avatar" v-if="$store.state.picture"
                        :src="$store.state.picture"/>
              <img v-else src="@/assets/img/default_avatar.png" class="default-avatar" width="32"/>
            </div>
          </a-dropdown>
        </div>

        <!-- 国际化 -->
        <div v-if="!$store.state.collapsed" class="header-item languages"
             style="display: flex; align-items: center" @click="changeLanguage">
          <a-icon type="global"/>
          <span style="padding-left: 3px">{{ languageTitle }}</span>
        </div>

        <!-- 登录 -->
        <div class="header-item-login" v-if="!$store.state.isLogin">
          <div class="options" @click="showLoginModal">
            <a-button style="border: 1px solid rgba(30,128,255,.3); background: rgba(30,128,255,.05); color: #007fff;">
              {{ $t("common.login") }}
            </a-button>
          </div>
          <!-- 登录Model -->
          <Login/>
          <!-- 注册Model -->
          <Register/>
          <!-- 手机重置密码Model -->
          <MobileResetPassword/>
          <!-- 邮箱重置密码Model -->
          <EmailResetPassword/>
        </div>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import loginService from "@/service/loginService";
import Login from "@/components/login/Login";
import MessageBox from "@/components/index/messages/MessageBox";
import Register from "@/components/login/Register";
import MobileResetPassword from "@/components/login/MobileResetPassword";
import EmailResetPassword from "@/components/login/EmailResetPassword";
import IndexMenu from "@/components/index/head/IndexMenu";
import IndexSider from "@/components/index/head/IndexSider";

export default {
  components: {MessageBox, Login, Register, MobileResetPassword, EmailResetPassword, IndexMenu, IndexSider},

  props: {
    searchContent: {type: String, default: ""},
  },

  data() {
    return {
      visible: false,
      params: {currentPage: 1, pageSize: 10},
      // 如果不用watch监听searchContent值的变化,只会在该组件被创建时赋值一次
      searchContentTemp: this.searchContent,
    }
  },

  computed: {
    ...mapState(["userInfo", "locale", "themeColor", "colorOptions", "systemNotifyCount", "taskNotifyCount"]),
    // 总消息数量
    messageNumbers() {
      return Number(this.systemNotifyCount) + Number(this.taskNotifyCount);
    },

    languageTitle() {
      if (this.$store.state.locale === "en_US") {
        return "中";
      }
      return "En";
    }
  },

  methods: {
    ...mapMutations(["changeColor"]),
    // 设置语言
    changeLanguage() {
      if (this.$store.state.locale === "zh_CN") {
        this.$store.state.locale = "en_US";
        localStorage.language = "en_US";
      } else {
        this.$store.state.locale = "zh_CN";
        localStorage.language = "zh_CN";
      }
    },

    // 刷新
    refresh() {
      // 跳转到首页
      this.$router.push('/');
    },

    // 点击菜单根据点击的key做出相应
    handleClick({key}) {
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
      if (key === "LOG_OUT") {
        this.logout();
      }
    },

    // 显示登录框
    showLoginModal() {
      this.$store.state.loginVisible = true;
    },

    // 退出登录
    logout() {
      loginService.logout()
          .then(res => {
            // 刷新当前页面
            this.$router.go(0);
          })
          .catch(err => {
            this.$message.error(err.desc);
          });
    },

    // 搜索
    onSearch(value) {
      this.$router.push({path: "/search", query: {query: value}});
    },

    // 路由到用户中心页面
    routerUserCenter(userId) {
      let routeData = this.$router.resolve("/user/" + userId);
      window.open(routeData.href, '_self');
      // this.$router.push("/user/" + userId);
    },

    // 路由到写文章页面
    routerWrite() {
      this.$router.push("/write");
    },

    // 路由到设置页面
    routerSetUp() {
      this.$router.push("/settings/profile");
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
    // searchContent值改变时触发
    searchContent: {
      handler(newVal, oldVal) {
        this.searchContentTemp = newVal;
      }
    }
  }
};
</script>

<style lang="less">
.ant-layout-header {
  padding: 0 10px;
}

.main-header {
  width: 100%;
  max-width: 1100px;
  background: #fff;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-right-logo {
    display: flex;
    justify-content: space-between;
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

    // 搜索框置白
    .ant-input {
      border: 1px solid #ffffff!important;
    }

    .header-search, .header-item, .header-item-login {
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

  // 国际化
  .avatar-menu-icon {
    font-size: 16px !important;
  }

  /* -------- horizontal-start -------- */
  // 去掉a-menu组件的下划线
  .ant-menu-horizontal {
    border-bottom: 0;
  }
  // 去掉选中active加粗下划线
  .ant-menu-horizontal > .ant-menu-item-active, .ant-menu-horizontal > .ant-menu-item-open, .ant-menu-horizontal > .ant-menu-item-selected, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover, .ant-menu-horizontal > .ant-menu-submenu-active, .ant-menu-horizontal > .ant-menu-submenu-open, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu {
    border-bottom: 2px solid transparent;
  }
  /* 调整a-menu-item的padding */
  .ant-menu-item, .ant-menu-submenu-title {
    padding: 0 16px;
  }
  /* -------- horizontal-end -------- */

  .ant-tabs-nav .ant-tabs-tab {
    margin: 0;
  }
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

// 移动端
@media screen and (max-width: 900px) {
  .header-message-box {
    left: 0 !important;
    position: relative;
    display: flex;
    justify-content: center;
  }

  .header-right-content {
    .header-search, .header-item, .header-item-login {
      padding: 0 8px;
    }
  }
}

</style>
