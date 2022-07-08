<template>
  <a-layout id="label-index">
    <IndexHeader class="header"/>
    <a-layout-content>
      <main class="content">
        <LabelContent v-if="finish"
                      :searchContent="searchContent"
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
  import LabelContent from "@/components/label/LabelContent";
  import labelService from "@/service/labelService";

  export default {
    components: {IndexHeader, LabelContent, FooterButtons, CustomEmpty},
    data() {
      return {
        listData: [],
        // 子组件搜索框内容
        searchContent: '',
        hasNext: false,
        finish: false,
        params: {currentPage: 1, pageSize: 16},
      };
    },

    methods: {
      //加载更多（滚动加载）
      loadMore() {
        this.params.currentPage++;
        this.getLabelList(this.params, true);
      },

      // 获取标签
      getLabelList(params, isLoadMore) {
        if (!isLoadMore) {
          this.params.currentPage = 1;
        }
        labelService.getLabelList(params)
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
      refresh(labelName) {
        this.searchContent = labelName;
        this.params = {currentPage: 1, pageSize: 16};
        if (labelName) {
          this.params.labelName = labelName;
        }
        this.getLabelList(this.params);
      },
    },

    mounted() {
      this.getLabelList(this.params);
      // 监听滚动，做滚动加载
      this.$utils.scroll.call(this, document.querySelector('#app'));
    },

  };
</script>


<style>
  #label-index .header {
    position: fixed;
    z-index: 999;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #00000021;
  }

  #label-index .content {
    margin-top: 64px;
    width: 900px;
  }

  #label-index .ant-layout-header, .ant-layout-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #label-index .ant-layout-header {
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