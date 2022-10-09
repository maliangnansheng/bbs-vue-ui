<template>
  <a-row type="flex" justify="center">
    <a-col :span="$store.state.collapsed ? 24 : 16" :offset="$store.state.collapsed ? 0 : 4">
      <custom-empty v-if="spinning" />
      <authors-list-content v-else :finish="finish" :has-next="hasNext" :data="{ list: listData }" @refresh="refresh" style="background: #fff" />
    </a-col>
  </a-row>
</template>

<script>
import AuthorsListContent from './components/AuthorsListContent.vue';
import CustomEmpty from '@/components/utils/CustomEmpty';

import userService from '@/service/userService';

export default {
  components: { AuthorsListContent, CustomEmpty },
  data() {
    return {
      // 加载中...
      spinning: true,
      listData: [],
      hasNext: false,
      finish: false,
      params: { currentPage: 1, pageSize: 10 },
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
      userService
        .getHotAuthorsList(params)
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
      this.params = { currentPage: 1, pageSize: 10 };
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
