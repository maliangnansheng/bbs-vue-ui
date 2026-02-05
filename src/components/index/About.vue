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
                  <div class="title">目的</div>
                  <div class="sub"><span style="color: #cb2222">开源</span>之门敞，为迷途者照亮星光道；技术之海深，助进取者收获智慧果。
                  </div>
                  <div class="sub"><span style="color: #cb2222">运营</span>之志向，为南友们筑一方净土，笔耕生活琐碎，论道技术星辰，闲时悠然摸鱼，忙里偷闲赏花。
                  </div>
                </div>
                <div class="author-content">
                  <div class="title">作者</div>
                  <div class="sub">马亮南生（maliangnansheng）</div>
                  <img title="微信" src="https://76.nansin.top/bbs_ssm/wx-mlns.png" width="30%"
                       style="margin-right: 10px"/>
                  <img title="QQ" src="https://76.nansin.top/bbs_ssm/qq-mlns.jpg" width="30%"/>
                </div>
                <div class="code-content">
                  <div class="title">源码地址</div>
                  <div class="sub">
                    后端源码(GitHub)：
                    <a target="_blank" href="https://github.com/maliangnansheng/bbs-springboot">bbs-springboot</a>
                    、
                    前端源码(GitHub)：
                    <a target="_blank" href="https://github.com/maliangnansheng/bbs-vue-ui">bbs-vue-ui</a>
                  </div>
                  <div class="sub">
                    后端源码(Gitee)：
                    <a target="_blank" href="https://gitee.com/maliangnansheng/bbs-springboot">bbs-springboot</a>
                    、
                    前端源码(Gitee)：
                    <a target="_blank" href="https://gitee.com/maliangnansheng/bbs-vue-ui">bbs-vue-ui</a>
                  </div>
                </div>
                <div class="code-content">
                  <div class="title">重点阅读</div>
                  <div class="sub">
                    深入了解：
                    <a target="_blank" href="https://bbs.nansin.top/detail/171">南生运营的理念</a>
                    、
                    <a target="_blank" href="https://bbs.nansin.top/detail/679">如何进行南生论坛管理维护？</a>
                    、
                    <a target="_blank" href="https://bbs.nansin.top/detail/369">10分钟搞懂南生论坛</a>
                    、
                    <a target="_blank" href="https://bbs.nansin.top/detail/521">南生运营功能介绍</a>
                    、
                    <a target="_blank" href="https://bbs.nansin.top/detail/600">获取<span style="color: #cb2222">商用授权</span></a>
                    、
                    <a target="_blank" href="https://bbs.nansin.top/detail/641">其他<span style="color: #cb2222">技术方案</span></a>
                    、
                    <a target="_blank" href="https://bbs.nansin.top/detail/122">南生论坛<span style="color: #cb2222">日常迭代</span></a>
                    、
                    <a target="_blank" href="https://76.nansin.top/doc/ns_bbs_doc.docx">南生论坛设计文档</a>
                  </div>
                  <div class="sub">
                    部署教程：
                    <a target="_blank" href="https://bbs.nansin.top/detail/158">【后端】安装部署教程</a>
                    、
                    <a target="_blank" href="https://bbs.nansin.top/detail/45">【前端】安装部署教程</a>
                  </div>
                  <div class="sub">
                    视频教程：
                    <a target="_blank" href="https://www.bilibili.com/video/BV1ThYQzfEvR">南生系列视频合集</a>
                  </div>
                </div>
                <div class="code-content">
                  <div class="title">学习路线</div>
                  <div class="sub">
                    <a target="_blank" href="https://bbs.nansin.top/detail/158">Java学习路线</a>
                    、
                    <a target="_blank" href="https://bbs.nansin.top/detail/159">前端学习路线</a>
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
