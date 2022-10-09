<template>
  <div id="about-index">
    <section class="mission">
      <div class="inner">
        <div class="mission-content">
          <div class="title">我们的使命</div>
          <div class="sub">南生论坛，个人程序人生的点滴记录和时光储备。淡泊明志，宁静致远。珍惜原创，矢志不渝。</div>
        </div>
        <div class="vision-content">
          <div class="title">我们的愿景</div>
          <div class="sub">
            让所有迷失方向的同学找到前进的小路<br />
            让需要提升技术的同学能有所收获<br />
            让同学们有一个学习知识、分享技术的地方
          </div>
        </div>
        <div class="author-content">
          <div class="title">作者</div>
          <div class="sub">马亮南生（maliangnansheng）</div>
        </div>
        <div class="code-content">
          <div class="title">源码地址</div>
          <div class="sub">后端源码(GitHub)：<a href="https://github.com/maliangnansheng/bbs-springboot">bbs-springboot</a></div>
          <div class="sub">前端源码(GitHub)：<a href="https://github.com/maliangnansheng/bbs-vue-ui">bbs-vue-ui</a></div>
          <div class="sub">后端源码(Gitee)：<a href="https://gitee.com/maliangnansheng/bbs-springboot">bbs-springboot</a></div>
          <div class="sub">前端源码(Gitee)：<a href="https://gitee.com/maliangnansheng/bbs-vue-ui">bbs-vue-ui</a></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'About',
};
</script>

<style lang="less">
#about-index {
  background-color: #fff;
  .mission {
    padding: 30px 30px;
    box-sizing: border-box;

    .title {
      font-size: 32px;
      font-weight: bold;
    }

    .sub {
      margin: 10px 0;
      font-size: 16px;
      color: #999;
    }
  }
}
</style>
