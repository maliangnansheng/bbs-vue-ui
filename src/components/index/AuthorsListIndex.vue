<template>
  <a-layout id="authors-list-index">
    <IndexHeader class="header"/>
    <a-layout-content>
      <main class="content">
        <a-col :span="$store.state.collapsed ? 24 : 16" :offset="$store.state.collapsed ? 0 : 4">
          <CustomEmpty v-if="spinning"/>
          <AuthorsListContent v-else
                              :finish="finish"
                              :hasNext="hasNext"
                              :data="listData"
                              @refresh="refresh"
                              style="background: #fff;"/>
        </a-col>
      </main>
    </a-layout-content>
    <FooterButtons v-if="!$store.state.collapsed"/>
  </a-layout>
</template>

<script>
import IndexHeader from "@/components/index/head/IndexHeader";
import AuthorsListContent from "@/components/user/AuthorsListContent";
import userService from "@/service/userService";
import FooterButtons from "@/components/utils/FooterButtons";
import CustomEmpty from "@/components/utils/CustomEmpty";

export default {
  components: {IndexHeader, AuthorsListContent, FooterButtons, CustomEmpty},
  data() {
    return {
      // 加载中...
      spinning: true,
      userService,
      listData: [],
      hasNext: false,
      finish: false,
      params: {currentPage: 1, pageSize: 10},
    };
  },

  methods: {
    //加载更多（滚动加载）
    loadMore() {
      this.params.currentPage++;
      this.getHotAuthorsList(this.params, true);
    },

    // 获取热门作者列表信息
    getHotAuthorsList(params, isLoadMore) {
      if (!isLoadMore) {
        this.params.currentPage = 1;
      }
      this.finish = false;
      userService.getHotAuthorsList(params)
          .then(res => {
            if (isLoadMore) {
              this.listData = this.listData.concat(res.data.list);
            } else {
              this.listData = res.data.list;
            }
            this.spinning = false;
            this.finish = true;
            this.hasNext = res.data.list.length !== 0;
          })
          .catch(err => {
            this.finish = true;
            this.$message.error(err.desc);
          });
    },

    // 刷新列表
    refresh() {
      this.params = {currentPage: 1, pageSize: 10};
      this.getHotAuthorsList(this.params);
    },
  },

  mounted() {
    this.getHotAuthorsList(this.params);
    // 监听滚动，做滚动加载
    this.$utils.scroll.call(this, document.querySelector('#app'));
  },

};
</script>


<style>
#authors-list-index .header {
  position: fixed;
  z-index: 999;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #00000021;
}

#authors-list-index .content {
  margin-top: 64px;
  width: 1100px;
}

#authors-list-index .ant-layout-header, .ant-layout-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

#authors-list-index .ant-layout-header {
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