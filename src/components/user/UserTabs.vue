<template>
  <div id="personal-info-display">
    <a-tabs :default-active-key="defaultActiveKey" @change="changeTab">
      <a-tab-pane key="dynamic">
        <span slot="tab">
          <i class="iconfont icon-dynamic"></i>
          {{ $t("common.dynamic") }}
        </span>
        <!-- 动态列表 -->
        <Dynamic
            v-if="isDynamicTab"
            :spinning="dynamicSpinning"
            :finish="finish"
            :hasNext="hasNext"
            :total="dynamicTotal"
            :data="dynamicData"/>
      </a-tab-pane>
      <a-tab-pane key="article">
        <span slot="tab">
          <i class="iconfont icon-relat-article"></i>
          {{ $t("common.article") + ' ' + writeArticleTotal }}
        </span>
        <!-- 文章列表 -->
        <FrontPageArticle
            v-if="isArticleTab"
            :finish="finish"
            :hasNext="hasNext"
            :data="articleData"
            :service="articleService"
            :isUserCenter="true"
            :userId="userId"
            @refresh="articleRefresh"
            style="background: #fff;"/>
      </a-tab-pane>
      <a-tab-pane key="follow">
        <span slot="tab">
          <i class="iconfont icon-follow"></i>
          {{ $t("common.follow") + ' ' + Number(followedTotal + fanTotal) }}
        </span>
        <FollowTabs
            v-if="isFollowTab"
            ref="child"
            :followedTotal="followedTotal"
            :fanTotal="fanTotal"
            :userId="userId"
            @getFollowCount="getFollowCount"/>
      </a-tab-pane>
      <a-tab-pane key="like">
        <span slot="tab">
          <i class="iconfont icon-like"></i>
          {{ $t("common.like") + ' ' + likeArticleTotal }}
        </span>
        <!-- 文章列表 -->
        <FrontPageArticle
            v-if="isLikeTab"
            :finish="finish"
            :hasNext="hasNext"
            :data="likeData"
            :service="articleService"
            @refresh="likeRefresh"
            style="background: #fff;"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import FrontPageArticle from "@/components/article/FrontPageArticle";
import articleService from "@/service/articleService";
import FollowTabs from "@/components/user/FollowTabs";
import userService from "@/service/userService";
import dynamicService from "@/service/dynamicService";
import Dynamic from "@/components/user/Dynamic";

export default {
  name: "",

  components: {Dynamic, FrontPageArticle, FollowTabs},

  props: {
    userId: {type: Number, default: 0},
  },

  data() {
    return {
      defaultActiveKey: 'dynamic',
      // 是否在动态tab下
      isDynamicTab: true,
      // 是否在文章tab下
      isArticleTab: false,
      // 是否在关注tab下
      isFollowTab: false,
      // 是否在点赞tab下
      isLikeTab: false,
      articleService,
      // 动态
      dynamicData: [],
      dynamicTotal: 0,
      // 我的文章
      articleData: [],
      // 我点赞的文章
      likeData: [],
      // hasNext和finish名称不能改(和滚动加载相关)
      hasNext: true,
      finish: false,
      // 加载中...
      dynamicSpinning: true,
      params: {currentPage: 1, pageSize: 10},
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
      if (this.isDynamicTab) {
        this.getDynamicList(this.params, true);
      }
      if (this.isLikeTab) {
        this.getLikesArticle(this.params, true);
      }
      if (this.isArticleTab) {
        this.getPersonalArticles(this.params, true);
      }
    },

    // 获取动态
    getDynamicList(params, isLoadMore) {
      if (!isLoadMore) {
        this.params.currentPage = 1;
      }
      this.finish = false;
      let tempParams = {};
      tempParams.currentPage = params.currentPage
      tempParams.pageSize = 15;
      tempParams.userId = this.userId;
      dynamicService.getDynamicList(tempParams)
          .then(res => {
            if (isLoadMore) {
              this.dynamicData = this.dynamicData.concat(res.data.list);
              this.hasNext = res.data.list.length !== 0;
            } else {
              this.dynamicData = res.data.list;
            }
            this.dynamicTotal = res.data.total;
            this.dynamicSpinning = false;
            this.finish = true;
          })
          .catch(err => {
            this.finish = true;
            this.$message.error(err.desc);
          });
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
        params.articleStateEnum = "enable";
      }
      articleService.getPersonalArticles(params)
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
      articleService.getLikesArticle(params)
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
      userService.getFollowCount({userId: this.userId})
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
      this.params = {currentPage: 1, pageSize: 10};
      this.getPersonalArticles(this.params);
      this.getLikesArticle(this.params);
    },
    likeRefresh() {
      this.params = {currentPage: 1, pageSize: 10};
      this.getLikesArticle(this.params);
    },

    // tab切换回调
    changeTab(activeKey, isFirst) {
      if (activeKey === 'dynamic') {
        this.routerDynamic();
        this.isDynamicTab = true;
        this.isArticleTab = false;
        this.isLikeTab = false;
        this.isFollowTab = false;
        this.hasNext = true;
        this.getDynamicList(this.params);
        // 解決和mounted()滚动加载重复的问题
        if (!isFirst) {
          // 监听滚动，做滚动加载
          this.$utils.scroll.call(this, document.querySelector('#app'));
        }
      }
      if (activeKey === 'article') {
        this.routerArticle();
        this.isDynamicTab = false;
        this.isArticleTab = true;
        this.isLikeTab = false;
        this.isFollowTab = false;
        this.hasNext = true;
        this.getPersonalArticles(this.params);
        // 解決和mounted()滚动加载重复的问题
        if (!isFirst) {
          // 监听滚动，做滚动加载
          this.$utils.scroll.call(this, document.querySelector('#app'));
        }
      }
      if (activeKey === 'like') {
        this.routerLike();
        this.isDynamicTab = false;
        this.isArticleTab = false;
        this.isLikeTab = true;
        this.isFollowTab = false;
        this.hasNext = true;
        this.getLikesArticle(this.params);
        // 解決和mounted()滚动加载重复的问题
        if (!isFirst) {
          // 监听滚动，做滚动加载
          this.$utils.scroll.call(this, document.querySelector('#app'));
        }
      }
      if (activeKey === 'follow') {
        this.routerFollow();
        this.isDynamicTab = false;
        this.isArticleTab = false;
        this.isLikeTab = false;
        this.isFollowTab = true;
      }
    },

    // 路由到页面(动态)
    routerDynamic() {
      this.$router.push("/user/" + this.userId);
    },
    // 路由到页面(文章)
    routerArticle() {
      this.$router.push("/user/" + this.userId + "/article");
    },
    // 路由到页面(关注)
    routerFollow() {
      this.$router.push("/user/" + this.userId + "/follow");
    },
    // 路由到页面(点赞)
    routerLike() {
      this.$router.push("/user/" + this.userId + "/like");
    },
  },

  mounted() {
    this.getDynamicList(this.params);
    this.getPersonalArticles({currentPage: 1, pageSize: 1});
    this.getLikesArticle({currentPage: 1, pageSize: 1});
    this.getFollowCount();
    // 监听滚动，做滚动加载
    this.$utils.scroll.call(this, document.querySelector('#app'));
  },

  created() {
    this.defaultActiveKey = this.$route.params.userCenterTab === undefined ? 'dynamic' : this.$route.params.userCenterTab;
    this.changeTab(this.defaultActiveKey, true);
  }

}
</script>

<style scoped>

</style>