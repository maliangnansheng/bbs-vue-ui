<template>
  <div id="latest-comment" v-if="data.length !== 0">
    <header class="user-block-header">{{ $t("common.latestComment") }}</header>
    <a-divider style="margin: 10px 0 0 0;"/>
    <a-list item-layout="horizontal" :data-source="data" :split="false">
      <a-list-item slot="renderItem" slot-scope="item, index" @click="routerArticleDetail(item.articleId)">
        <a-list-item-meta :description="item.content">
          <a-avatar slot="avatar"
                    :src="item.picture ? item.picture : require('@/assets/img/default-avatar.png')"/>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import commentService from "@/service/commentService";

export default {
  data() {
    return {
      data: [],
      params: {currentPage: 1, pageSize: 6},
    };
  },

  methods: {
    getLatestComment(params) {
      commentService.getLatestComment(params)
          .then(res => {
            this.data = res.data.list;
          })
          .catch(err => {
            this.$message.error(err.desc);
          });
    },

    // 路由到文章详情页面（评论处）
    routerArticleDetail(articleId) {
      let routeData = this.$router.resolve("/detail/" + articleId + "#article-comment");
      window.open(routeData.href, '_blank');
    },
  },

  mounted() {
    this.getLatestComment(this.params);
  },

};
</script>

<style scoped>
#latest-comment {
  padding-bottom: 10px;
}

#latest-comment .user-block-header {
  padding: 15px 10px 0 15px;
}

#latest-comment .ant-list-item-meta {
  display: flex;
  align-items: center;
  padding: 0 15px;
}

#latest-comment .ant-list-item-meta-title > a, .ant-list-item-meta-description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  /* 实现长英文字母自动换行*/
  word-break: break-all;
}

#latest-comment .ant-list-item-meta-description {
  font-weight: 500;
  font-size: 10px;
  color: #909090;
  line-height: 22px;
}

#latest-comment .ant-list-item, .full-list {
  cursor: pointer;
}

#latest-comment .ant-list-item:hover {
  background: #8b87870a;
}

#latest-comment .full-list:hover {
  background: #8b87870a;
}
</style>
