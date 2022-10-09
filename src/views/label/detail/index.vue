<template>
  <div v-if="!spinning" id="label-to-article-index">
    <div class="top">
      <div class="left">
        <a-avatar class="avatar" :size="100" :src="labelData.logo" />
      </div>
      <div class="right">
        <div class="title">{{ labelData.labelName }}</div>
        <div class="meta-article">{{ labelData.articleUseCount + ' ' + $t('common.article') }}</div>
      </div>
    </div>
    <div class="bottom">
      <!-- 文章列表 -->
      <front-page-article :finish="finish" :has-next="hasNext" :data="listData" @refresh="refresh" />
    </div>
  </div>
</template>

<script>
import FrontPageArticle from '@/components/article/FrontPageArticle';

import articleService from '@/service/articleService';
import labelService from '@/service/labelService';

export default {
  components: { FrontPageArticle },
  data() {
    return {
      labelId: this.$route.params.id,
      // 加载中...
      spinning: true,
      listData: [],
      hasNext: true,
      finish: false,
      params: { currentPage: 1, pageSize: 10 },
      labelData: {},
    };
  },

  methods: {
    //加载更多（滚动加载）
    loadMore() {
      this.params.currentPage++;
      this.getArticleList(this.params, true);
    },

    // 获取文章列表信息
    getArticleList(params, isLoadMore) {
      if (!isLoadMore) {
        this.params.currentPage = 1;
      }
      this.finish = false;
      params.labelIds = this.labelId;
      articleService
        .getArticleList(params)
        .then(res => {
          if (isLoadMore) {
            this.listData = this.listData.concat(res.data.list);
            this.hasNext = res.data.list.length !== 0;
          } else {
            this.listData = res.data.list;
          }
          this.spinning = false;
          this.finish = true;
        })
        .catch(err => {
          this.finish = true;
          this.$message.error(err.desc);
        });
    },

    // 获取标签
    getLabelList() {
      labelService
        .getLabelList({ id: this.labelId, currentPage: 1, pageSize: 10 })
        .then(res => {
          this.labelData = res.data.list[0];
        })
        .catch(err => {
          this.$message.error(err.desc);
        });
    },

    // 刷新列表
    refresh() {
      this.params = { currentPage: 1, pageSize: 10 };
      this.getArticleList(this.params);
    },
  },

  mounted() {
    this.getLabelList();
    this.getArticleList(this.params);
    // 监听滚动，做滚动加载
    this.$utils.scroll.call(this, document.querySelector('#app'));
  },
};
</script>

<style lang="less">
#label-to-article-index {
  background-color: #fff;
  width: 900px;
}
#label-to-article-index .top {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #eee;

  .left {
    .avatar {
      border-radius: 0;
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-size: 20px;
      line-height: 40px;
      color: #333;
    }

    .meta-article {
      font-size: 16px;
      color: #909090;
    }
  }
}
</style>
