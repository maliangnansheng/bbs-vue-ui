<template>
  <a-row type="flex" justify="center">
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
      <toc v-if="articleHtml" :article-html="articleHtml" />
      <a-row>
        <a-col :span="24" style="height: 10px" />
      </a-row>
      <!-- 备案信息 -->
      <filing-info />
    </a-col>
  </a-row>
</template>

<script>
import AuthorsList from '@/components/right/AuthorsList';
import FilingInfo from '@/components/right/FilingInfo';
import AuthorBlock from '@/components/right/AuthorBlock';
import RelatArticle from '@/components/right/RelatArticle';

import ArticleDetail from './components/ArticleDetail';
import LeftButtons from './components/LeftButtons';
import ArticleComment from './components/ArticleComment';
import Toc from './components/MarkdownToc';

export default {
  components: {
    ArticleDetail,
    AuthorBlock,
    AuthorsList,
    FilingInfo,
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
      delta: 0,
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

<style scoped>
.article-left-buttons {
  position: relative;
  right: 70px;
  top: 140px;
}
</style>
