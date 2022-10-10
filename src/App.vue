<template>
  <a-config-provider :locale="lang[$store.state.locale]">
    <div v-if="$store.state.width" id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import userService from './service/userService';
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import en_US from 'ant-design-vue/lib/locale-provider/en_US';

export default {
  name: 'App',
  data() {
    return {
      lang: {
        zh_CN: zh_CN,
        en_US: en_US,
      },
    };
  },
  methods: {
    ...mapMutations(['changeColor']),
    ...mapActions(['getAccess']),
    // 初始化获取用户权限状态

    // 初始化页面。获取屏幕尺寸以及监听屏幕尺寸
    initDom() {
      // 在Vue中this始终指向Vue，但一些其他组件如axios中this为undefined,通过let that = this将this保存在that中，再在函数中使用that均可
      const that = this;
      // 利用window.onresize事件监听页面大小变化
      window.onload = setWidth;
      window.onresize = setWidth;

      function setWidth() {
        that.$store.state.width = window.innerWidth;
        that.$store.state.height = window.innerHeight;
        // 900/1050
        that.$store.state.collapsed = window.innerWidth < 1000;
      }
    },
    /**
     * @function setLanguageAndTheme 设置语言和主题色（尝试从localStorage获取，没有就使用默认值）
     */
    setLanguageAndTheme() {
      let navLanguage;
      if (navigator.language === 'zh-CN') {
        navLanguage = 'zh_CN';
      } else {
        navLanguage = 'en_US';
      }
      this.$store.state.locale = localStorage.language ? localStorage.language : navLanguage;
      this.changeColor(localStorage.themeColor || '#13c2c2');
    },
    setIsCarousel() {
      // 禁用
      if (Number(window.localStorage.isCarousel) === 0) {
        this.$store.state.isCarousel = 0;
      } else {
        this.$store.state.isCarousel = 1;
      }
    },
  },
  created() {
    this.setLanguageAndTheme();
    this.setIsCarousel();
  },
  mounted() {
    // 初始化dom，获取用户界面宽高，并且添加监听
    this.initDom();
    // 获取用户权限，判断用户是否是登录状态
    this.getAccess();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: auto;
  background-color: #f0f2f5;
}

/* 默认宽度有：width: 1100px;和width: 900px;两种 */
</style>
