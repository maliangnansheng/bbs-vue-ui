<template>
  <div id="personal-info-display">
    <a-tabs default-active-key="article" @change="changeTab">
      <a-tab-pane key="article">
        <span slot="tab">
          <i class="iconfont icon-relat-article"></i>
          {{ $t('common.article') + ' ' + writeArticleTotal }}
        </span>
        <!-- 文章列表 -->
        <front-page-article
          v-if="isArticleTab"
          :finish="finish"
          :has-next="hasNext"
          :data="articleData"
          :service="articleService"
          :is-user-center="true"
          :user-id="userId"
          @refresh="articleRefresh"
          style="background: #fff"
        />
      </a-tab-pane>
      <a-tab-pane key="follow">
        <span slot="tab">
          <i class="iconfont icon-follow"></i>
          {{ $t('common.follow') + ' ' + Number(followedTotal + fanTotal) }}
        </span>
        <follow-tabs v-if="isFollowTab" ref="child" :followed-total="followedTotal" :fan-total="fanTotal" :user-id="userId" @getFollowCount="getFollowCount" />
      </a-tab-pane>
      <a-tab-pane key="like">
        <span slot="tab">
          <i class="iconfont icon-like"></i>
          {{ $t('common.like') + ' ' + likeArticleTotal }}
        </span>
        <!-- 文章列表 -->
        <front-page-article v-if="isLikeTab" :finish="finish" :has-next="hasNext" :data="likeData" :service="articleService" @refresh="likeRefresh" style="background: #fff" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import FrontPageArticle from '@/components/article/FrontPageArticle';
import FollowTabs from '@/components/user/FollowTabs';

import articleService from '@/service/articleService';
import userService from '@/service/userService';

export default {
  name: '',

  components: { FrontPageArticle, FollowTabs },

  props: {
    userId: { type: Number, default: 0 },
  },

  data() {
    return {
      // 是否在文章tab下
      isArticleTab: true,
      // 是否在关注tab下
      isFollowTab: false,
      // 是否在点赞tab下
      isLikeTab: false,
      articleService,
      // 我的文章
      articleData: [],
      // 我点赞的文章
      likeData: [],
      // hasNext和finish名称不能改(和滚动加载相关)
      hasNext: true,
      finish: false,
      params: { currentPage: 1, pageSize: 10 },
      // 发表文章总数
      writeArticleTotal: 0,
      // 点赞文章总数
      likeArticleTotal: 0,
      // 我关注的人数
      followedTotal: 0,
      // 我的粉丝数
      fanTotal: 0,
    };
  },

  methods: {
    // 加载更多（滚动加载）
    loadMore() {
      this.params.currentPage++;
      if (this.isLikeTab) {
        this.getLikesArticle(this.params, true);
      }
      if (this.isArticleTab) {
        this.getPersonalArticles(this.params, true);
      }
    },

    // 获取个人发布的文章（所有）
    getPersonalArticles(params, isLoadMore) {
      if (!isLoadMore) {
        this.params.currentPage = 1;
      }
      this.finish = false;
      params.createUser = this.userId;
      this.$delete(params, 'likeUser');
      // 不是管理员
      if (!this.$store.state.isManage) {
        // 只看启用的文章
        params.articleStateEnum = 'enable';
      }
      articleService
        .getPersonalArticles(params)
        .then(res => {
          if (isLoadMore) {
            this.articleData = this.articleData.concat(res.data.list);
            this.hasNext = res.data.list.length !== 0;
          } else {
            this.articleData = res.data.list;
          }
          this.writeArticleTotal = res.data.total;
          this.finish = true;
        })
        .catch(err => {
          this.finish = true;
          this.$message.error(err.desc);
        });
    },

    // 获取点赞过的文章
    getLikesArticle(params, isLoadMore) {
      if (!isLoadMore) {
        this.params.currentPage = 1;
      }
      this.finish = false;
      params.likeUser = this.userId;
      this.$delete(params, 'createUser');
      articleService
        .getLikesArticle(params)
        .then(res => {
          if (isLoadMore) {
            this.likeData = this.likeData.concat(res.data.list);
            this.hasNext = res.data.list.length !== 0;
          } else {
            this.likeData = res.data.list;
          }
          this.likeArticleTotal = res.data.total;
          this.finish = true;
        })
        .catch(err => {
          this.finish = true;
          this.$message.error(err.desc);
        });
    },

    // 获取关注/粉丝数量
    getFollowCount() {
      userService
        .getFollowCount({ userId: this.userId })
        .then(res => {
          this.followedTotal = res.data.followCount;
          this.fanTotal = res.data.fanCount;
        })
        .catch(err => {
          this.$message.error(err.desc);
        });
    },

    // 刷新列表
    articleRefresh() {
      this.params = { currentPage: 1, pageSize: 10 };
      this.getPersonalArticles(this.params);
      this.getLikesArticle(this.params);
    },
    likeRefresh() {
      this.params = { currentPage: 1, pageSize: 10 };
      this.getLikesArticle(this.params);
    },

    // tab切换回调
    changeTab(activeKey) {
      if (activeKey === 'article') {
        this.isArticleTab = true;
        this.isLikeTab = false;
        this.isFollowTab = false;
        this.hasNext = true;
        this.getPersonalArticles(this.params);
        // 监听滚动，做滚动加载
        this.$utils.scroll.call(this, document.querySelector('#app'));
      }
      if (activeKey === 'like') {
        this.isArticleTab = false;
        this.isLikeTab = true;
        this.isFollowTab = false;
        this.hasNext = true;
        this.getLikesArticle(this.params);
        // 监听滚动，做滚动加载
        this.$utils.scroll.call(this, document.querySelector('#app'));
      }
      if (activeKey === 'follow') {
        this.isArticleTab = false;
        this.isLikeTab = false;
        this.isFollowTab = true;
      }
    },
  },

  mounted() {
    this.getPersonalArticles(this.params);
    this.getLikesArticle(this.params);
    this.getFollowCount();
    // 监听滚动，做滚动加载
    this.$utils.scroll.call(this, document.querySelector('#app'));
  },
};
</script>

<style scoped></style>
