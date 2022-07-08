<template>
  <a-layout id="label-to-article-index">
    <IndexHeader class="header"/>
    <a-layout-content>
      <main class="content">
<!--        <CustomEmpty v-if="spinning"/>-->
        <div v-if="!spinning">
          <div class="top">
            <div class="left">
              <a-avatar class="avatar" :size="100" :src="labelData.logo"/>
            </div>
            <div class="right">
              <div class="title">{{ labelData.labelName }}</div>
              <div class="meta-article">{{ labelData.articleUseCount + ' ' + $t('common.article') }}</div>
            </div>
          </div>
          <div class="bottom">
            <!-- 文章列表 -->
            <FrontPageArticle
                :finish="finish"
                :hasNext="hasNext"
                :data="{ list: listData }"
                @refresh="refresh"/>
          </div>
        </div>
      </main>
    </a-layout-content>
    <FooterButtons v-if="!$store.state.collapsed"/>
  </a-layout>
</template>

<script>
import IndexHeader from "@/components/index/head/IndexHeader";
import FooterButtons from "@/components/utils/FooterButtons";
import CustomEmpty from "@/components/utils/CustomEmpty";
import articleService from "@/service/articleService";
import FrontPageArticle from "@/components/article/FrontPageArticle";
import labelService from "@/service/labelService";

export default {
  components: {IndexHeader, FrontPageArticle, FooterButtons, CustomEmpty},
  data() {
    return {
      labelId: this.$route.params.id,
      // 加载中...
      spinning: true,
      listData: [],
      hasNext: true,
      finish: false,
      params: {currentPage: 1, pageSize: 10},
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
      articleService.getArticleList(params)
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
      labelService.getLabelList({id: this.labelId, currentPage: 1, pageSize: 10})
          .then(res => {
            this.labelData = res.data.list[0];
          })
          .catch(err => {
            this.$message.error(err.desc);
          });
    },

    // 刷新列表
    refresh() {
      this.params = {currentPage: 1, pageSize: 10};
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
#label-to-article-index .header {
  position: fixed;
  z-index: 999;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #00000021;
}

#label-to-article-index .content {
  margin-top: 64px;
  width: 900px;
  background: #fff;
}

#label-to-article-index .ant-layout-header, .ant-layout-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

#label-to-article-index .ant-layout-header {
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

#label-to-article-index .content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

#label-to-article-index .top {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;

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