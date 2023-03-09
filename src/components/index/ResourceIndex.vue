<template>
  <a-layout id="resource-index">
    <IndexHeader class="header"/>
    <a-layout-content>
      <main class="content">
        <ResourceContent v-if="finish"
                      :data="listData"
                      @refresh="refresh"/>
      </main>
    </a-layout-content>
    <FooterButtons v-if="!$store.state.collapsed"/>
  </a-layout>
</template>

<script>
  import IndexHeader from "@/components/index/head/IndexHeader";
  import FooterButtons from "@/components/utils/FooterButtons";
  import CustomEmpty from "@/components/utils/CustomEmpty";
  import resourceService from "@/service/resourceService";
  import ResourceContent from "@/components/resource/ResourceContent";

  export default {
    components: {IndexHeader, ResourceContent, FooterButtons, CustomEmpty},
    data() {
      return {
        listData: [],
        hasNext: false,
        finish: false,
        params: {currentPage: 1, pageSize: 32},
      };
    },

    methods: {
      //加载更多（滚动加载）
      loadMore() {
        this.params.currentPage++;
        this.getResourceList(this.params, true);
      },

      // 获取资源导航
      getResourceList(params, isLoadMore) {
        if (!isLoadMore) {
          this.params.currentPage = 1;
        }
        resourceService.getResourceList(params)
            .then(res => {
              if (isLoadMore) {
                this.listData = this.listData.concat(res.data.list);
              } else {
                this.listData = res.data.list;
              }
              this.finish = true;
              this.hasNext = res.data.list.length !== 0;
            })
            .catch(err => {
              this.finish = true;
              this.$message.error(err.desc);
            });
      },

      // 刷新列表
      refresh(category) {
        this.params = {currentPage: 1, pageSize: 32};
        if (category) {
          this.params.category = category;
        }
        this.getResourceList(this.params);
      },
    },

    mounted() {
      this.getResourceList(this.params);
      // 监听滚动，做滚动加载
      this.$utils.scroll.call(this, document.querySelector('#app'));
    },

  };
</script>


<style>
  #resource-index .header {
    position: fixed;
    z-index: 999;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #00000021;
  }

  #resource-index .content {
    margin-top: 64px;
    width: 100%;
    max-width: 1100px;
  }

  #resource-index .ant-layout-header, .ant-layout-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #resource-index .ant-layout-header {
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