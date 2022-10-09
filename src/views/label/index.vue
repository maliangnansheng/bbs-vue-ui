<template>
  <label-content v-if="finish" :search-content="searchContent" :data="listData" @refresh="refresh" />
</template>

<script>
import LabelContent from './components/LabelContent';

import labelService from '@/service/labelService';

export default {
  components: { LabelContent },
  data() {
    return {
      listData: [],
      // 子组件搜索框内容
      searchContent: '',
      hasNext: false,
      finish: false,
      params: { currentPage: 1, pageSize: 25 },
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
      labelService
        .getLabelList(params)
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
      this.params = { currentPage: 1, pageSize: 25 };
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
