<template>
  <div class="header-left-content">
    <a-menu v-model="current" :mode="$store.state.collapsed ? 'inline' : 'horizontal'">
      <!-- 首页 -->
      <a-menu-item key="frontPage" @click="refresh">{{ $t("common.home") }}</a-menu-item>
      <!-- 标签 -->
      <a-menu-item key="boilingPoint" @click="routerLabel">{{ $t("common.label") }}</a-menu-item>
      <!-- 资源 -->
      <a-menu-item key="liveStreaming" @click="routerResource">{{ $t("common.resource") }}</a-menu-item>
      <!-- 作者榜 -->
      <a-menu-item key="authorList" @click="routerAuthorList" v-if="$store.state.collapsed">{{ $t("common.authorList") }}</a-menu-item>
      <!-- 最新评论 -->
      <a-menu-item key="commentDonate" @click="routerCommentDonate" v-if="$store.state.collapsed">{{ $t("common.commentDonate") }}</a-menu-item>
      <!-- 写文章 -->
      <a-menu-item key="writeArticle" @click="routerWriteArticle" v-if="$store.state.collapsed">{{ $t("common.writeArticle") }}</a-menu-item>
      <a-divider style="margin: 3px 0 3px 0" v-if="$store.state.collapsed"/>
      <!-- 管理端 -->
      <a-menu-item key="management" @click="routerManagement" v-if="$store.state.collapsed">{{ $t("common.management") }}</a-menu-item>
      <!-- 源码 -->
      <a-dropdown>
        <a-menu-item key="course">{{ $t("common.sourceCode") }}</a-menu-item>
        <a-menu slot="overlay">
          <a-menu-item>
            <a target="_blank" href="https://github.com/maliangnansheng/bbs-springboot">
              <i class="iconfont icon-GitHub" style="color: #000"></i><b style="color: #000"> {{ $t("common.backEnd") }}</b>{{ $t("common.sourceCode") }}
            </a>
          </a-menu-item>
          <a-menu-item>
            <a target="_blank" href="https://github.com/maliangnansheng/bbs-vue-ui">
              <i class="iconfont icon-GitHub" style="color: #000"></i><b style="color: #000"> {{ $t("common.frontEnd") }}</b>{{ $t("common.sourceCode") }}
            </a>
          </a-menu-item>
          <a-divider style="margin: 3px 0 3px 0"/>
          <a-menu-item>
            <a target="_blank" href="https://gitee.com/maliangnansheng/bbs-springboot">
              <i class="iconfont icon-gitee" style="color: #c71d23"></i><b style="color: #000"> {{ $t("common.backEnd") }}</b>{{ $t("common.sourceCode") }}
            </a>
          </a-menu-item>
          <a-menu-item>
            <a target="_blank" href="https://gitee.com/maliangnansheng/bbs-vue-ui">
              <i class="iconfont icon-gitee" style="color: #c71d23"></i><b style="color: #000"> {{ $t("common.frontEnd") }}</b>{{ $t("common.sourceCode") }}
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <!-- 关于 -->
      <a-menu-item key="about" @click="routerAbout">{{ $t("common.about") }}</a-menu-item>
      <!-- 国际化 -->
      <a-menu-item key="globalization" @click="changeLanguage" v-if="$store.state.collapsed">
        <a-icon type="global"/>
        <span>{{ languageTitle }}</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
  export default {
    name: "",

    data() {
      return {
        current: ['frontPage'],
      }
    },

    computed: {
      languageTitle() {
        if (this.$store.state.locale === "en_US") {
          return "中文";
        }
        return "English";
      }
    },

    methods: {
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

      // 路由到标签页面
      routerLabel() {
        this.$router.push("/label");
      },

      // 路由到资源导航页面
      routerResource() {
        this.$router.push("/resource");
      },

      // 路由到作者榜页面
      routerAuthorList() {
        this.$router.push("/recommended");
      },

      // 路由到写文章页面
      routerWriteArticle() {
        this.$router.push("/write");
      },

      // 路由到管理端页面
      routerManagement() {
        window.open(this.$store.state.manageDomain, '_blank');
      },

      // 路由到最新评论页面
      routerCommentDonate() {
        this.$router.push("/commentDonate");
      },

      // 路由到关于页面
      routerAbout() {
        this.$router.push("/about");
      },
    },

    mounted() {
      let name = this.$route.name;

      // 清空数组
      this.current.pop();
      // 首页
      if (name === 'home') {
        // 添加新值
        this.current.push('frontPage');
      }
      // 标签
      if (name === 'label') {
        // 添加新值
        this.current.push('boilingPoint');
      }
      // 资源导航
      if (name === 'resource') {
        // 添加新值
        this.current.push('liveStreaming');
      }
      // 作者榜（手机）
      if (name === 'recommended') {
        // 添加新值
        this.current.push('authorList');
      }
      // 评论捐赠（手机）
      if (name === 'commentDonate') {
        // 添加新值
        this.current.push('commentDonate');
      }
      // 关于
      if (name === 'about') {
        // 添加新值
        this.current.push('about');
      }
    },
  }
</script>

<style lang="less" scoped>
  .header-left-content {
    display: flex;
    justify-content: left;
    align-items: center;
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

  /* -------- inline-start -------- */
  // 去掉a-menu组件的下划线
  .ant-menu-inline {
    border-right: 0;
  }
  // 去掉选中active加粗下划线
  .ant-menu-inline .ant-menu-item::after, .ant-menu-vertical .ant-menu-item::after, .ant-menu-vertical-left .ant-menu-item::after, .ant-menu-vertical-right .ant-menu-item::after {
    border-right: 3px solid transparent;
  }
  // 去掉选中active背景色
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: transparent;
  }
  /* -------- inline-end -------- */
</style>