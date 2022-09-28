<template>
  <a-layout>
    <a-layout id="article-detail-index">
      <index-header class="header" />
      <a-layout-content>
        <!-- 解决手机端mavonEditor代码块code布局问题 -->
        <main class="content" :style="$store.state.collapsed ? 'width: 100%;' : 'width: 1100px;'">
          <div class="article-left-buttons">
            <!-- 左边浮着的那些按钮 -->
            <left-buttons ref="child" />
          </div>
          <a-col :span="$store.state.collapsed ? 24 : 18" :style="$store.state.collapsed ? '' : 'border-right: 20px solid #f0f2f5'">
            <!-- 文章详情 -->
            <article-detail @initLabelIds="initLabelIds" style="background: #fff" />
            <br />
            <!-- 文章评论 -->
            <article-comment @refresh="refresh" style="background: #fff" />
            <a-row>
              <a-col :span="24" style="height: 10px" />
            </a-row>
          </a-col>
          <a-col v-if="!$store.state.collapsed" :span="6">
            <!-- 作者板块 -->
            <author-block v-if="finishArticleDetail" :user-id="userId" style="background: #fff" />
            <a-row>
              <a-col :span="24" style="height: 10px" />
            </a-row>
            <!-- 相关文章 -->
            <relat-article v-if="finishArticleDetail" :label-ids="labelIds" style="background: #fff" />
            <a-row>
              <a-col :span="24" style="height: 10px" />
            </a-row>
            <!-- 作者榜 -->
            <authors-list style="background: #fff" />
            <a-row>
              <a-col :span="24" style="height: 10px" />
            </a-row>
            <!-- 目录 -->
            <toc v-if="articleHtml" :article-html="articleHtml" style="background: #fff" />
            <a-row>
              <a-col :span="24" style="height: 10px" />
            </a-row>
            <!-- 备案信息 -->
            <filing-info />
          </a-col>
        </main>
      </a-layout-content>
      <footer-buttons v-if="!$store.state.collapsed" />
    </a-layout>
  </a-layout>
</template>

<script>
import IndexHeader from '@/components/index/head/IndexHeader';
import AuthorsList from '@/components/right/AuthorsList';
import FilingInfo from '@/components/right/FilingInfo';
import ArticleDetail from '@/components/article/ArticleDetail';
import FooterButtons from '@/components/utils/FooterButtons';
import LeftButtons from '@/components/article/LeftButtons';
import ArticleComment from '@/components/comment/ArticleComment';
import AuthorBlock from '@/components/right/AuthorBlock';
import RelatArticle from '@/components/right/RelatArticle';
import Toc from '@/components/right/MarkdownToc';

export default {
  components: {
    IndexHeader,
    ArticleDetail,
    AuthorBlock,
    AuthorsList,
    FilingInfo,
    FooterButtons,
    LeftButtons,
    ArticleComment,
    RelatArticle,
    Toc,
  },

  data() {
    return {
      articleHtml: '',
      finishArticleDetail: false,
      labelIds: [],
      userId: 0,
    };
  },

  mounted() {
    this.handleAnchor();
  },

  methods: {
    // 初始化标签等
    initLabelIds(labelIds, finishArticleDetail, userId, articleHtml) {
      this.labelIds = labelIds;
      this.finishArticleDetail = finishArticleDetail;
      this.userId = userId;
      this.articleHtml = articleHtml;
    },

    // 刷新后判断是否有锚点，有则跳转到锚点
    handleAnchor() {
      const hash = location.hash;
      if (hash && hash.startsWith('#')) {
        const timer = setInterval(() => {
          const anchor = document.getElementById(hash.slice(1));
          if (anchor) {
            anchor.scrollIntoView(true);
            clearInterval(timer);
          }
        }, 1200);
      }
    },

    refresh() {
      // 获取文章一些统计数据
      this.$refs.child.getArticleCountById();
    },
  },
};
</script>

<style>
#article-detail-index .header {
  position: fixed;
  width: 100%;
  z-index: 999;
  background: #fff;
  border-bottom: 1px solid #00000021;
}

#article-detail-index .content {
  margin-top: 64px;
}

#article-detail-index .ant-layout-header {
  display: flex;
  align-items: center;
  justify-content: center;
}

#article-detail-index .ant-layout-content {
  display: flex;
  justify-content: center;
}

#article-detail-index .article-left-buttons {
  position: relative;
  right: 70px;
  top: 140px;
}

#article-detail-index .ant-layout-header {
  background: #fff;
  height: auto;
  line-height: 2.3;
}

.index-drawer-wrap .ant-drawer-content-wrapper {
  width: 250px !important;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0;
}
</style>
