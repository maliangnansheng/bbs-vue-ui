<template>
  <div class="footer-buttons">
    <back-top />
    <a-tooltip placement="left">
      <template slot="title">
        {{ $t('common.feedback') }}
      </template>
      <div @click="createFeedback" class="feedback-icon-container" :style="{ background: $store.state.themeColor }">
        <i class="iconfont icon-bug"></i>
      </div>
    </a-tooltip>
    <a-tooltip placement="left">
      <template slot="title">
        {{ $t('common.chat') }}
      </template>
      <div @click="routerChat" class="chat-icon-container" :style="{ background: $store.state.themeColor }">
        <i class="iconfont icon-chat"></i>
      </div>
    </a-tooltip>
    <a-tooltip placement="left">
      <template slot="title">
        {{ $t('common.githubCode') }}
      </template>
      <div @click="routerGithub" class="github-icon-container" :style="{ background: $store.state.themeColor }">
        <i class="iconfont icon-GitHub"></i>
      </div>
    </a-tooltip>
  </div>
</template>

<script>
import BackTop from '@/components/utils/BackTop';
import { useLogin } from '@/components/login';

export default {
  components: { BackTop },
  methods: {
    // 点击底部按钮跳转到创建反馈的页面
    createFeedback() {
      if (this.$store.state.isLogin) {
        window.open(this.$store.state.manageDomain + '/createFeedback', '_blank');
      } else {
        useLogin();
      }
    },

    // 点击底部按钮跳转到闲聊页面
    routerChat() {
      window.open('http://chat.nanshengbbs.top', '_blank');
    },

    // 点击底部按钮跳转到源码页面
    routerGithub() {
      window.open('https://github.com/maliangnansheng/bbs-springboot', '_blank');
    },
  },
};
</script>

<style lang="less">
.footer-buttons {
  position: fixed;
  bottom: 3.6rem;
  right: 6.6rem;
  z-index: 888;

  .feedback-icon-container,
  .github-icon-container,
  .chat-icon-container {
    border-radius: 50%;
    width: 34px;
    height: 34px;
    text-align: center;
    cursor: pointer;

    i {
      line-height: 34px;
      color: white;
    }
  }

  .chat-icon-container,
  .github-icon-container {
    margin-top: 10px;
  }
}
</style>
