<template>
  <a-row id="components-layout-basic" type="flex" justify="center" :gutter="20">
    <!-- 左侧文章列表 -->
    <a-col :span="$store.state.collapsed ? 24 : 18">
      <custom-empty v-if="spinning" />
      <div v-else>
        <!-- 轮播图 -->
        <slide-show v-if="!$store.state.collapsed && $store.state.isCarousel" />

        <div v-if="!$store.state.collapsed && $store.state.isCarousel" style="height: 2px"></div>

        <!-- 管理员才需要 -->
        <a-tabs v-if="$store.state.isManage" v-model="curTab" @change="changeTab" style="background: #fff">
          <!-- 已审核通过 -->
          <a-tab-pane :key="tabKeys.approved">
            <span slot="tab">
              {{ $t('common.approved') + '(' + total + ')' }}
            </span>
            <!-- 文章列表 -->
            <front-page-article v-if="!spinning && curTab === tabKeys.approved" :finish="finish" :has-next="hasNext" :data="listData" is-admin-audit />
          </a-tab-pane>

          <!-- 待审核 -->
          <a-tab-pane :key="tabKeys.pendingReview">
            <span slot="tab">
              {{ $t('common.pendingReview') + '(' + pendingReviewTotal + ')' }}
            </span>
            <!-- 文章列表 -->
            <front-page-article v-if="!spinning && curTab === tabKeys.pendingReview" :finish="finish" :has-next="hasNext" :data="listData" is-admin-audit />
          </a-tab-pane>

          <!-- 已拒绝 -->
          <a-tab-pane :key="tabKeys.reviewRejected">
            <span slot="tab">
              {{ $t('common.reviewRejected') + '(' + reviewRejectedTotal + ')' }}
            </span>
            <!-- 文章列表 -->
            <front-page-article v-if="!spinning && curTab === tabKeys.reviewRejected" :finish="finish" :has-next="hasNext" :data="listData" is-admin-audit />
          </a-tab-pane>
        </a-tabs>
        <!-- 文章列表 -->
        <front-page-article v-if="!$store.state.isManage && !spinning" :finish="finish" :has-next="hasNext" :data="listData" />
      </div>
    </a-col>

    <!-- 右侧列表 -->
    <a-col v-if="!$store.state.collapsed" :span="6">
      <a-space direction="vertical" :size="10" style="vertical-align: top">
        <!-- 系统简介 -->
        <project-intro />
        <!-- 作者榜 -->
        <authors-list />
        <!-- 最新评论 -->
        <latest-comment />
        <!-- 友情捐赠 -->
        <friend-donate />
        <!-- 备案信息 -->
        <filing-info />
      </a-space>
    </a-col>
  </a-row>
</template>

<script>
import SlideShow from './components/SlideShow';

import FrontPageArticle from '@/components/article/FrontPageArticle';
import ProjectIntro from '@/components/right/ProjectIntro';
import AuthorsList from '@/components/right/AuthorsList';
import FilingInfo from '@/components/right/FilingInfo';
import LatestComment from '@/components/right/LatestComment';
import FriendDonate from '@/components/right/FriendDonate';
import CustomEmpty from '@/components/utils/CustomEmpty';

import { loadMoreWhenScroll } from '@/mixins/loadMoreWhenScroll';
import articleService from '@/service/articleService';

export default {
  name: 'Home',
  components: {
    SlideShow,
    FrontPageArticle,
    ProjectIntro,
    AuthorsList,
    FilingInfo,
    CustomEmpty,
    LatestComment,
    FriendDonate,
  },
  data() {
    return {
      tabKeys: {
        approved: 'approved',
        pendingReview: 'pendingReview',
        reviewRejected: 'reviewRejected',
      },
      curTab: 'approved',
      // 加载中...
      spinning: true,
      listData: [],
      total: 0,
      pendingReviewTotal: 0,
      reviewRejectedTotal: 0,
      hasNext: true,
      finish: false,
      params: { currentPage: 1, pageSize: 12 },
    };
  },

  mixins: [loadMoreWhenScroll],

  provide() {
    return {
      auditManage: {
        updateData: this.updateData,
        updateTotal: this.updateTotal,
        updateReviewRejectedTotal: this.updateReviewRejectedTotal,
        updatePendingReviewData: this.updatePendingReviewData,
        updatePendingReviewTotal: this.updatePendingReviewTotal,
        updateReviewRejectedData: this.updateReviewRejectedData,
      },
    };
  },

  methods: {
    /** 加载更多（滚动加载，mixins内调用） */
    loadMore() {
      this.params.currentPage++;
      if (this.curTab === this.tabKeys.approved) {
        this.getArticleList(this.params, true);
      }
      if (this.curTab === this.tabKeys.pendingReview) {
        this.getPendingReviewArticles(this.params, true);
      }
      if (this.curTab === this.tabKeys.reviewRejected) {
        this.getDisabledArticles(this.params, true);
      }
    },

    /** 获取文章列表信息 */
    getArticleList(params, isLoadMore) {
      if (!isLoadMore) {
        this.params.currentPage = 1;
      }
      this.finish = false;
      articleService
        .getArticleList(params)
        .then(res => {
          if (isLoadMore) {
            this.listData = this.listData.concat(res.data.list);
            this.hasNext = res.data.list.length !== 0;
          } else {
            this.listData = res.data.list;
          }
          this.total = res.data.total;
          if (this.total === this.listData.length) {
            this.hasNext = false;
          }
          this.spinning = false;
          this.finish = true;
        })
        .catch(err => {
          this.finish = true;
          this.$message.error(err.desc);
        });
    },

    /** 获取待审核的文章 */
    getPendingReviewArticles(params, isLoadMore) {
      if (!isLoadMore) {
        this.params.currentPage = 1;
      }
      this.finish = false;
      articleService
        .getPendingReviewArticles(params)
        .then(res => {
          if (isLoadMore) {
            this.listData = this.listData.concat(res.data.list);
            this.hasNext = res.data.list.length !== 0;
          } else {
            this.listData = res.data.list;
          }
          this.pendingReviewTotal = res.data.total;
          if (this.pendingReviewTotal === this.listData.length) {
            this.hasNext = false;
          }
          this.spinning = false;
          this.finish = true;
        })
        .catch(err => {
          this.finish = true;
          this.$message.error(err.desc);
        });
    },

    /** 获取禁用的文章 */
    getDisabledArticles(params, isLoadMore) {
      if (!isLoadMore) {
        this.params.currentPage = 1;
      }
      this.finish = false;
      articleService
        .getDisabledArticles(params)
        .then(res => {
          if (isLoadMore) {
            this.listData = this.listData.concat(res.data.list);
            this.hasNext = res.data.list.length !== 0;
          } else {
            this.listData = res.data.list;
          }
          this.reviewRejectedTotal = res.data.total;
          if (this.reviewRejectedTotal === this.listData.length) {
            this.hasNext = false;
          }
          this.spinning = false;
          this.finish = true;
        })
        .catch(err => {
          this.finish = true;
          this.$message.error(err.desc);
        });
    },

    /** tab切换回调 */
    changeTab(activeKey) {
      this.hasNext = true;
      this.listData = [];
      if (activeKey === this.tabKeys.approved) {
        this.getArticleList(this.params);
      }
      if (activeKey === this.tabKeys.pendingReview) {
        this.getPendingReviewArticles(this.params);
      }
      if (activeKey === this.tabKeys.reviewRejected) {
        this.getDisabledArticles(this.params);
      }
    },

    // 通过
    updateTotal(count) {
      this.total += count;
    },
    // 同步data变化
    updateData(tempData) {
      this.listData = tempData;
    },
    // 拒绝
    updateReviewRejectedTotal(count) {
      this.reviewRejectedTotal += count;
    },
    updateReviewRejectedData(tempData) {
      this.listData = tempData;
    },
    // 待审核
    updatePendingReviewTotal(count) {
      this.pendingReviewTotal += count;
    },
    updatePendingReviewData(tempData) {
      this.listData = tempData;
    },
  },

  mounted() {
    const query = this.$route.query.query;
    this.params.title = query;
    this.getArticleList(this.params);
    if (this.$store.state.isManage) {
      // BUG 这里应该加个获取全部tab分类数据总数的接口
    }
    // TODO 这里用mixins更好些，但最好还是将这个滚动加载操作落实到列表组件，暂时不改
    // 监听滚动，做滚动加载
    this.scroll(document.querySelector('#app'));
  },

  watch: {
    // 路由值改变时触发
    $route() {
      // 跳转到该页面后需要进行的操作
      const query = this.$route.query.query;
      this.params.title = query;
      this.hasNext = true;
      this.curTab = this.tabKeys.approved;
      this.getArticleList(this.params);
      if (this.$store.state.isManage) {
        // BUG 这里应该加个获取全部tab分类数据总数的接口
      }
    },
  },
};
</script>
