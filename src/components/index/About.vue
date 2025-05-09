<template>
  <a-layout>
    <a-layout id="about-index">
      <IndexHeader class="header"/>
      <a-layout-content>
        <main class="about_content" :style="$store.state.collapsed ? 'width: 100%;' : 'width: 800px;'">
          <div style="background: #fff; margin-bottom: 10px">
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
                  <img title="微信" src="https://aid.nansin.top/default/wx-mlns.png" width="50%"/>
                  <img title="QQ" src="https://aid.nansin.top/default/qq-mlns.jpg" width="50%"/>
                </div>
                <div class="code-content">
                  <div class="title">源码地址</div>
                  <div class="sub">后端源码(GitHub)：<a target="_blank"
                                                   href="https://github.com/maliangnansheng/bbs-springboot">bbs-springboot</a>
                  </div>
                  <div class="sub">前端源码(GitHub)：<a target="_blank" href="https://github.com/maliangnansheng/bbs-vue-ui">bbs-vue-ui</a>
                  </div>
                  <div class="sub">后端源码(Gitee)：<a target="_blank"
                                                  href="https://gitee.com/maliangnansheng/bbs-springboot">bbs-springboot</a>
                  </div>
                  <div class="sub">前端源码(Gitee)：<a target="_blank" href="https://gitee.com/maliangnansheng/bbs-vue-ui">bbs-vue-ui</a>
                  </div>
                </div>
                <div class="code-content">
                  <div class="title">学习路线</div>
                  <div class="sub">
                    <a target="_blank" href="https://bbs.nansin.top/detail/158">Java学习路线</a>
                    <br>
                    <a target="_blank" href="https://bbs.nansin.top/detail/159">前端学习路线</a>
                  </div>
                </div>
                <div class="code-content">
                  <div class="title">信息统一整理</div>
                  <div class="sub">
                    设计文档(论文)：
                    <a target="_blank"
                       href="https://76.nansin.top/doc/%E5%8D%97%E7%94%9F%E8%AE%BA%E5%9D%9B%E7%9A%84%E8%AE%BE%E8%AE%A1%E4%B8%8E%E5%AE%9E%E7%8E%B0.doc">南生论坛设计文档</a>
                  </div>
                  <div class="sub">
                    日常迭代：
                    <a target="_blank" href="https://bbs.nansin.top/detail/122">南生论坛日常迭代</a>
                  </div>
                  <div class="sub" style="color: #cb2222">
                    【商用】需看：
                    <a target="_blank" href="https://bbs.nansin.top/detail/171">南生运营的理念</a>
                  </div>
                  <div class="sub">
                    安装部署教程：
                    <br>
                    <a target="_blank" href="https://bbs.nansin.top/detail/44">【后端】安装部署教程</a>
                    <br>
                    <a target="_blank" href="https://bbs.nansin.top/detail/45">【前端】安装部署教程</a>
                  </div>
                  <div class="sub">
                    视频教程：
                    <br>
                    <a target="_blank"
                       href="https://www.bilibili.com/video/BV1pK411C7T4/?spm_id_from=333.999.0.0&vd_source=d0a5d07985a7fbbfb889c874632343c6">南生论坛代码讲解视频</a>
                    <br>
                    <a target="_blank"
                       href="https://www.bilibili.com/video/BV1he4y1C7rk/?spm_id_from=333.999.0.0&vd_source=d0a5d07985a7fbbfb889c874632343c6">南生论坛使用指南视频</a>
                  </div>
                  <div class="sub">
                    南生闲聊：
                    <br>
                    <a target="_blank" href="https://76.nansin.top/jar/chat/ns-chat.zip">南生闲聊项目源码</a>
                    <br>
                    <a target="_blank" href="https://bbs.nansin.top/detail/71">南生闲聊教程</a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </a-layout-content>
      <FooterButtons v-if="!$store.state.collapsed"/>
    </a-layout>
  </a-layout>
</template>

<script>
import IndexHeader from "@/components/index/head/IndexHeader";
import FooterButtons from "@/components/utils/FooterButtons";

export default {
  name: "About",

  components: {IndexHeader, FooterButtons},

  mounted() {
    // 滚动条恢复初始位置的方法
    this.$nextTick(() => {
      let dom = document.querySelector('#app');
      if (dom !== null) {
        dom.scrollTop = 0;
      }
    })
  }
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

  .about_content {
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
