<template>
  <div id="relat-article" v-if="data.length !== 0">
    <header class="article-block-header">
      <i class="iconfont icon-relat-article" :style="{ color: $store.state.themeColor }"></i>
      {{ $t('common.relatArtilce') }}
    </header>
    <a-divider style="margin: 10px 0 0 0;" />
    <a-list item-layout="horizontal" :data-source="data" :split="false">
      <a-list-item slot="renderItem" slot-scope="item" @click="routerArticleDetail(item.id)">
        <a-list-item-meta :description="item.articleCountDTO.likeCount + ' ' + $t('common.like') + ' · ' + item.articleCountDTO.commentCount + ' ' + $t('common.comment')">
          <span slot="title">{{ item.title }}</span>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import articleService from '@/service/articleService';

export default {
  props: {
    labelIds: { type: Array, default: () => [] },
  },

  data() {
    return {
      data: [],
      params: { currentPage: 1, pageSize: 4 },
      finish: false,
    };
  },

  methods: {
    // 获取相关文章列表信息
    getRelatArticleList(params) {
      this.finish = false;
      params.labelIds = this.labelIds.join(',');
      articleService
        .getArticleList(params)
        .then(res => {
          this.data = res.data.list;
          this.finish = true;
        })
        .catch(err => {
          this.finish = true;
          this.$message.error(err.desc);
        });
    },

    // 路由到文章详情页面
    routerArticleDetail(articleId) {
      const routeData = this.$router.resolve('/detail/' + articleId);
      window.open(routeData.href, '_blank');
    },
  },

  mounted() {
    this.getRelatArticleList(this.params);
  },
};
</script>

<style scoped>
#relat-article {
  padding-bottom: 10px;
}

#relat-article .article-block-header {
  padding: 15px 10px 0 15px;
}

#relat-article .ant-list-item {
  padding: 12px 0 6px 0;
}

#relat-article .ant-list-item-meta {
  display: flex;
  align-items: center;
  padding: 0 15px;
}

#relat-article .ant-list-item-meta-title > a,
.ant-list-item-meta-description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

#relat-article .ant-list-item-meta-title {
  line-height: 22px;
  font-size: 14px;
  font-weight: 400;
  color: #252933;
}

#relat-article .ant-list-item-meta-description {
  font-size: 12px;
  color: #909090;
  line-height: 22px;
}

#relat-article .ant-list-item,
.full-list {
  cursor: pointer;
}

#relat-article .ant-list-item:hover {
  background: #8b87870a;
}

#relat-article .full-list:hover {
  background: #8b87870a;
}
</style>
