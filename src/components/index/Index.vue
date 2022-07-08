<template>
  <a-layout>
    <a-layout id="components-layout-basic">
      <IndexHeader class="header"
                   @refresh="refresh"
                   :searchContent="searchContent"/>
      <a-layout-content>
        <main class="content">
          <a-col :span="$store.state.collapsed ? 24 : 18"
                 :style="$store.state.collapsed ? '' : 'border-right: 20px solid #f0f2f5'">
            <CustomEmpty v-if="spinning"/>
            <div v-else>
              <!-- 轮播图 -->
              <SlideShow v-if="!$store.state.collapsed"/>
              <a-row>
                <a-col :span="24" style="height: 2px;"/>
              </a-row>
              <!-- 文章列表 -->
              <FrontPageArticle v-if="!spinning"
                                :finish="finish"
                                :hasNext="hasNext"
                                :data="{ list: listData }"
                                :service="articleService"
                                @refresh="refresh"
                                style="background: #fff;"/>
            </div>
          </a-col>
          <a-col v-if="!$store.state.collapsed" :span="6">
            <!-- 系统简介 -->
            <ProjectIntro style="background: #fff;"/>
            <a-row>
              <a-col :span="24" style="height: 10px;"/>
            </a-row>
            <!-- 作者榜 -->
            <AuthorsList style="background: #fff;"/>
            <a-row>
              <a-col :span="24" style="height: 10px;"/>
            </a-row>
            <!-- 最新评论 -->
            <LatestComment style="background: #fff;"/>
            <a-row>
              <a-col :span="24" style="height: 10px;"/>
            </a-row>
            <!-- 备案信息 -->
            <FilingInfo/>
          </a-col>
        </main>
      </a-layout-content>
      <FooterButtons v-if="!$store.state.collapsed"/>
    </a-layout>
  </a-layout>
</template>

<script>
import IndexHeader from "@/components/index/head/IndexHeader";
import SlideShow from "@/components/concern/SlideShow";
import FrontPageArticle from "@/components/article/FrontPageArticle";
import ProjectIntro from "@/components/right/ProjectIntro";
import articleService from "@/service/articleService";
import AuthorsList from "@/components/right/AuthorsList";
import FilingInfo from "@/components/right/FilingInfo";
import FooterButtons from "@/components/utils/FooterButtons";
import CustomEmpty from "@/components/utils/CustomEmpty";
import LatestComment from "@/components/right/LatestComment";

export default {
  components: {
    IndexHeader,
    FooterButtons,
    SlideShow,
    FrontPageArticle,
    ProjectIntro,
    AuthorsList,
    FilingInfo,
    CustomEmpty,
    LatestComment
  },
  data() {
    return {
      // 加载中...
      spinning: true,
      articleService,
      listData: [],
      hasNext: true,
      finish: false,
      params: {currentPage: 1, pageSize: 10},
      searchContent: '',
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

    // 刷新列表
    refresh() {
      this.params = {currentPage: 1, pageSize: 10};
      this.getArticleList(this.params);
    },
  },

  mounted() {
    let query = this.$route.query.query;
    this.searchContent = query;
    this.params.title = query;
    this.getArticleList(this.params);
    // 监听滚动，做滚动加载
    this.$utils.scroll.call(this, document.querySelector('#app'));
  },

  watch: {
    // 路由值改变时触发
    $route() {
      // 跳转到该页面后需要进行的操作
      let query = this.$route.query.query;
      this.searchContent = query;
      this.params.title = query;
      this.getArticleList(this.params);
    }
  }
};
</script>


<style>
#components-layout-basic .header {
  position: fixed;
  z-index: 999;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #00000021;
}

#components-layout-basic .content {
  margin-top: 64px;
  width: 1100px;
}

#components-layout-basic .ant-layout-header, .ant-layout-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

#components-layout-basic .ant-layout-header {
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