<template>
  <a-layout>
    <a-layout id="about-index">
      <IndexHeader class="header"/>
      <a-layout-content>
        <main class="content" :style="$store.state.collapsed ? 'width: 100%;' : 'width: 800px;'">
          <div style="background: #fff">
            <section class="mission">
              <div class="inner">
                <div class="mission-content">
                  <div class="title">我们的使命</div>
                  <div class="sub">南生论坛，个人程序人生的点滴记录和时光储备。淡泊明志，宁静致远。珍惜原创，矢志不渝。</div>
                </div>
                <div class="vision-content">
                  <div class="title">我们的愿景</div>
                  <div class="sub">
                    让所有迷失方向的同学找到前进的小路<br>
                    让需要提升技术的同学能有所收获<br>
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
          <a-row>
            <a-col :span="24" style="height: 10px;"/>
          </a-row>
        </main>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import IndexHeader from "@/components/index/head/IndexHeader";

export default {
  name: "About",
  components: {IndexHeader},
};
</script>


<style lang="less">
#about-index {
  .header {
    position: fixed;
    width: 100%;
    z-index: 999;
    background: #fff;
    border-bottom: 1px solid #00000021;
  }

  .content {
    margin-top: 64px;
  }

  .ant-layout-header, .ant-layout-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ant-layout-header {
    background: #fff;
    height: auto;
    line-height: 2.3;
  }

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