<template>
  <resource-content v-if="finish" :data="listData" @refresh="refresh" />
</template>

<script>
import ResourceContent from '@/components/resource/ResourceContent';

import resourceService from '@/service/resourceService';

export default {
  components: { ResourceContent },
  data() {
    return {
      listData: [],
      hasNext: false,
      finish: false,
      params: { currentPage: 1, pageSize: 32 },
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
      resourceService
        .getResourceList(params)
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
      this.params = { currentPage: 1, pageSize: 32 };
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
