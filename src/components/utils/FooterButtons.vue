<template>
  <div class="footer-buttons">
    <BackTop/>
    <a-tooltip placement="left">
      <template slot="title">
        {{ $t("common.feedback") }}
      </template>
      <div @click="createFeedback" class="feedback-icon-container" style="background: #fff">
        <i class="iconfont icon-bug" style="color: red"></i>
      </div>
    </a-tooltip>
    <a-tooltip placement="left">
      <template slot="title">
        {{ $t("common.chat") }}
      </template>
      <div @click="routerChat" class="chat-icon-container" style="background: #fff">
        <i class="iconfont icon-chat" style="color: #2d9d92"></i>
      </div>
    </a-tooltip>
    <a-tooltip placement="left">
      <template slot="title">
        {{ $t("common.githubCode") }}
      </template>
      <div @click="routerGithub" class="github-icon-container" style="background: #fff">
        <i class="iconfont icon-GitHub" style="color: #000"></i>
      </div>
    </a-tooltip>
    <a-tooltip placement="left">
      <template slot="title">
        {{ $t("common.giteeCode") }}
      </template>
      <div @click="routerGitee" class="gitee-icon-container" style="background: #fff">
        <i class="iconfont icon-gitee" style="color: #c71d23"></i>
      </div>
    </a-tooltip>
  </div>
</template>

<script>
import BackTop from "@/components/utils/BackTop";

export default {
  components: {BackTop},
  methods: {
    // 点击底部按钮跳转到创建反馈的页面
    createFeedback() {
      if (this.$store.state.isLogin) {
        window.open(this.$store.state.manageDomain + '/createFeedback', '_blank');
      } else {
        this.$store.state.loginVisible = true;
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

    // 点击底部按钮跳转到源码页面
    routerGitee() {
      window.open('https://gitee.com/maliangnansheng/bbs-springboot', '_blank');
    }
  }
};
</script>

<style lang="less">
.footer-buttons {
  position: fixed;
  bottom: 3.6rem;
  right: 6.6rem;
  z-index: 888;

  .feedback-icon-container, .github-icon-container, .chat-icon-container, .gitee-icon-container {
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

  .chat-icon-container, .github-icon-container, .gitee-icon-container {
    margin-top: 10px;
  }
}
</style>
