<template>
  <div id="components-back-top-demo-custom">
    <a-back-top :visibilityHeight="600" :target="targetFn">
      <div class="ant-back-top-inner" :style="{background: $store.state.themeColor}">
        <i class="iconfont icon-backTop"></i>
      </div>
    </a-back-top>
  </div>
</template>


<script>
  export default {
    methods: {
      targetFn() {
        // 设置监听滚动的元素
        return document.querySelector("#app");
      },
    }
  }
</script>

<style scoped>
  #components-back-top-demo-custom .ant-back-top {
    /* 44px */
    bottom: 184px;
  }
  #components-back-top-demo-custom .ant-back-top-inner {
    height: 34px;
    width: 34px;
    line-height: 34px;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    font-size: 20px;
  }
</style>