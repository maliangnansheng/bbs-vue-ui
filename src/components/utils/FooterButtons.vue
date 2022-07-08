<template>
  <div class="footer-buttons">
    <BackTop/>
    <a-tooltip placement="left">
      <template slot="title">
        {{ $t("common.feedback") }}
      </template>
      <div @click="createFeedback" class="feedback-icon-container" :style="{background: $store.state.themeColor}">
        <i class="iconfont icon-feed-back"></i>
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
    }
  }
};
</script>

<style lang="less">
.footer-buttons {
  position: fixed;
  bottom: 3.6rem;
  right: 6.6rem;
  z-index: 999;

  .feedback-icon-container {
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
}
</style>
