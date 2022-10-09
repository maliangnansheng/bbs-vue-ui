<template>
  <a-row type="flex" justify="center" id="components-layout-basic">
    <a-col :span="$store.state.collapsed ? 24 : 18" :style="$store.state.collapsed ? '' : 'border-right: 20px solid #f0f2f5'">
      <custom-empty v-if="spinning" />
      <div v-else>
        <!-- 轮播图 -->
        <slide-show v-if="!$store.state.collapsed && $store.state.isCarousel" />
        <a-row v-if="!$store.state.collapsed && $store.state.isCarousel">
          <a-col :span="24" style="height: 2px" />
        </a-row>
        <!-- 管理员才需要 -->
        <a-tabs default-active-key="approved" @change="changeTab" style="background: #fff" v-if="$store.state.isManage">
          <a-tab-pane key="approved">
            <span slot="tab">
              {{ $t('common.approved') + '(' + total + ')' }}
            </span>
            <!-- 文章列表 -->
            <front-page-article
              v-if="!spinning && isApprovedTab"
              :finish="finish"
              :has-next="hasNext"
              :data="listData"
              :service="articleService"
              :is-admin-audit="true"
              @updateData="updateData"
              @updateTotal="updateTotal"
              @updateReviewRejectedTotal="updateReviewRejectedTotal"
              @refresh="refresh"
              style="background: #fff"
            />
          </a-tab-pane>
          <a-tab-pane key="pendingReview">
            <span slot="tab">
              {{ $t('common.pendingReview') + '(' + pendingReviewTotal + ')' }}
            </span>
            <!-- 文章列表 -->
            <front-page-article
              v-if="!spinning && isPendingReviewTab"
              :finish="finish"
              :has-next="hasNext"
              :data="pendingReviewData"
              :service="articleService"
              :is-admin-audit="true"
              @updatePendingReviewData="updatePendingReviewData"
              @updatePendingReviewTotal="updatePendingReviewTotal"
              @updateTotal="updateTotal"
              @updateReviewRejectedTotal="updateReviewRejectedTotal"
              @refresh="refresh"
              style="background: #fff"
            />
          </a-tab-pane>
          <a-tab-pane key="reviewRejected">
            <span slot="tab">
              {{ $t('common.reviewRejected') + '(' + reviewRejectedTotal + ')' }}
            </span>
            <!-- 文章列表 -->
            <front-page-article
              v-if="!spinning && isReviewRejectedTab"
              :finish="finish"
              :has-next="hasNext"
              :data="reviewRejectedData"
              :service="articleService"
              :is-admin-audit="true"
              @updateReviewRejectedData="updateReviewRejectedData"
              @updateTotal="updateTotal"
              @updateReviewRejectedTotal="updateReviewRejectedTotal"
              @refresh="refresh"
              style="background: #fff"
            />
          </a-tab-pane>
        </a-tabs>
        <!-- 文章列表 -->
        <front-page-article
          v-if="!$store.state.isManage && !spinning"
          :finish="finish"
          :has-next="hasNext"
          :data="listData"
          :service="articleService"
          @refresh="refresh"
          style="background: #fff"
        />
      </div>
    </a-col>
    <a-col v-if="!$store.state.collapsed" :span="6">
      <!-- 系统简介 -->
      <project-intro style="background: #fff" />
      <a-row>
        <a-col :span="24" style="height: 10px" />
      </a-row>
      <!-- 作者榜 -->
      <authors-list style="background: #fff" />
      <a-row>
        <a-col :span="24" style="height: 10px" />
      </a-row>
      <!-- 最新评论 -->
      <latest-comment style="background: #fff" />
      <a-row>
        <a-col :span="24" style="height: 10px" />
      </a-row>
      <!-- 友情捐赠 -->
      <friend-donate style="background: #fff" />
      <a-row>
        <a-col :span="24" style="height: 10px" />
      </a-row>
      <!-- 备案信息 -->
      <filing-info />
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
      // 是否在审批通过tab下
      isApprovedTab: true,
      isPendingReviewTab: false,
      isReviewRejectedTab: false,
      // 加载中...
      spinning: true,
      articleService,
      listData: [],
      pendingReviewData: [],
      reviewRejectedData: [],
      total: 0,
      pendingReviewTotal: 0,
      reviewRejectedTotal: 0,
      hasNext: true,
      finish: false,
      params: { currentPage: 1, pageSize: 12 },
      searchContent: '',
    };
  },

  methods: {
    // 加载更多（滚动加载）
    loadMore() {
      this.params.currentPage++;
      if (this.isApprovedTab) {
        this.getArticleList(this.params, true);
      }
      if (this.isPendingReviewTab) {
        this.getPendingReviewArticles(this.params, true);
      }
      if (this.isReviewRejectedTab) {
        this.getDisabledArticles(this.params, true);
      }
    },

    // 获取文章列表信息
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
          this.spinning = false;
          this.finish = true;
        })
        .catch(err => {
          this.finish = true;
          this.$message.error(err.desc);
        });
    },

    // 获取待审核的文章
    getPendingReviewArticles(params, isLoadMore) {
      if (!isLoadMore) {
        this.params.currentPage = 1;
      }
      this.finish = false;
      articleService
        .getPendingReviewArticles(params)
        .then(res => {
          if (isLoadMore) {
            this.pendingReviewData = this.pendingReviewData.concat(res.data.list);
            this.hasNext = res.data.list.length !== 0;
          } else {
            this.pendingReviewData = res.data.list;
          }
          this.pendingReviewTotal = res.data.total;
          this.spinning = false;
          this.finish = true;
        })
        .catch(err => {
          this.finish = true;
          this.$message.error(err.desc);
        });
    },

    // 获取禁用的文章
    getDisabledArticles(params, isLoadMore) {
      if (!isLoadMore) {
        this.params.currentPage = 1;
      }
      this.finish = false;
      articleService
        .getDisabledArticles(params)
        .then(res => {
          if (isLoadMore) {
            this.reviewRejectedData = this.reviewRejectedData.concat(res.data.list);
            this.hasNext = res.data.list.length !== 0;
          } else {
            this.reviewRejectedData = res.data.list;
          }
          this.reviewRejectedTotal = res.data.total;
          this.spinning = false;
          this.finish = true;
        })
        .catch(err => {
          this.finish = true;
          this.$message.error(err.desc);
        });
    },

    // 刷新列表
    refresh() {
      this.params = { currentPage: 1, pageSize: 10 };
      this.getArticleList(this.params);
    },

    // tab切换回调
    changeTab(activeKey) {
      if (activeKey === 'approved') {
        this.isApprovedTab = true;
        this.isPendingReviewTab = false;
        this.isReviewRejectedTab = false;
        this.hasNext = true;
        this.getArticleList(this.params);
        // 监听滚动，做滚动加载
        this.$utils.scroll.call(this, document.querySelector('#app'));
      }
      if (activeKey === 'pendingReview') {
        this.isApprovedTab = false;
        this.isPendingReviewTab = true;
        this.isReviewRejectedTab = false;
        this.hasNext = true;
        this.getPendingReviewArticles(this.params);
        // 监听滚动，做滚动加载
        this.$utils.scroll.call(this, document.querySelector('#app'));
      }
      if (activeKey === 'reviewRejected') {
        this.isApprovedTab = false;
        this.isPendingReviewTab = false;
        this.isReviewRejectedTab = true;
        this.hasNext = true;
        this.getDisabledArticles(this.params);
        // 监听滚动，做滚动加载
        this.$utils.scroll.call(this, document.querySelector('#app'));
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
      this.reviewRejectedData = tempData;
    },
    // 待审核
    updatePendingReviewTotal(count) {
      this.pendingReviewTotal += count;
    },
    updatePendingReviewData(tempData) {
      this.pendingReviewData = tempData;
    },
  },

  mounted() {
    const query = this.$route.query.query;
    this.searchContent = query;
    this.params.title = query;
    this.getArticleList(this.params);
    if (this.$store.state.isManage) {
      this.getPendingReviewArticles(this.params);
      this.getDisabledArticles(this.params);
    }
    // 监听滚动，做滚动加载
    this.$utils.scroll.call(this, document.querySelector('#app'));
  },

  watch: {
    // 路由值改变时触发
    $route() {
      // 跳转到该页面后需要进行的操作
      const query = this.$route.query.query;
      this.searchContent = query;
      this.params.title = query;
      this.getArticleList(this.params);
    },
  },
};
</script>
