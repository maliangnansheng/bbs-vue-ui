<template>
  <div id="article-comment" :style="`padding: ${$store.state.collapsed ? '60px 10px 10px' : '60px 20px 20px'};margin-top: -60px`">
    <p class="text">{{ $t('common.comment') }}</p>
    <create-comment @refresh="refresh" />
    <p class="text">{{ $t('common.hotComment') }}</p>
    <a-empty :description="false" v-if="comments.length === 0" />
    <template v-else>
      <child-comment v-for="(item, index) of comments" :data="item" :key="index" @getCommentByArticleId="getCommentByArticleId" />
    </template>
  </div>
</template>

<script>
import ChildComment from '@/components/comment/ChildComment';
import commentService from '@/service/commentService';
import CreateComment from '@/components/comment/CreateComment';

export default {
  components: { ChildComment, CreateComment },

  data() {
    return {
      comments: {},
    };
  },

  methods: {
    // 获取文章的评论信息
    getCommentByArticleId() {
      commentService
        .getCommentByArticleId({ articleId: this.$route.params.id })
        .then(res => {
          this.comments = res.data;
        })
        .catch(err => {
          this.$message.error(err.desc);
        });
    },

    // 刷新
    refresh() {
      this.getCommentByArticleId();
      // 获取文章一些统计数据(刷新)
      this.$emit('refresh');
    },
  },

  mounted() {
    this.getCommentByArticleId();
  },
};
</script>

<style scoped>
#article-comment .text {
  font-size: 18px;
  line-height: 30px;
  font-weight: 600;
  color: #252933;
}
</style>
