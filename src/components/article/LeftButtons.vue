<template>
  <div id="left-buttons">
    <!-- 点赞 -->
    <div class="like-div">
      <a-badge
        class="badge"
        :count="data.likeCount"
        :overflow-count="999"
        :number-style="
          data.isLike
            ? {
                backgroundColor: $store.state.themeColor,
                boxShadow: '0 0 0 1px ' + $store.state.themeColor + ' inset',
              }
            : {
                backgroundColor: '#c2c8d1',
                boxShadow: '0 0 0 1px #c2c8d1 inset',
              }
        "
      >
        <div @click="likeAction" class="like-icon-container" style="background: #fff;">
          <i class="iconfont icon-like" :style="data.isLike ? 'color:' + $store.state.themeColor : 'color: #8a919f;'"></i>
        </div>
      </a-badge>
    </div>

    <!-- 评论 -->
    <div class="comment-div">
      <a-badge
        class="badge"
        :count="data.commentCount"
        :overflow-count="999"
        :number-style="{
          backgroundColor: '#c2c8d1',
          boxShadow: '0 0 0 1px #c2c8d1 inset',
        }"
      >
        <a href="#article-comment">
          <div class="comment-icon-container" style="background: #fff;">
            <i class="iconfont icon-comment" style="color: #8a919f;"></i>
          </div>
        </a>
      </a-badge>
    </div>
  </div>
</template>

<script>
import userService from '@/service/userService';
import articleService from '@/service/articleService';

export default {
  data() {
    return {
      data: {},
    };
  },

  methods: {
    // 获取文章一些统计数据
    getArticleCountById() {
      articleService
        .getArticleCountById({ id: this.$route.params.id })
        .then(res => {
          this.data = res.data;
        })
        .catch(err => {
          this.$message.error(err.desc);
        });
    },

    // 点赞/取消点赞
    likeAction() {
      userService
        .updateLikeState({ articleId: this.$route.params.id })
        .then(() => {
          this.getArticleCountById();
        })
        .catch(err => {
          this.$message.error(err.desc);
        });
    },
  },

  mounted() {
    this.getArticleCountById();
  },
};
</script>

<style lang="less">
#left-buttons {
  position: fixed;
  z-index: 888;

  .like-icon-container {
    border-radius: 50%;
    width: 45px;
    height: 45px;
    text-align: center;
    cursor: pointer;

    i {
      font-size: 20px;
      line-height: 45px;
    }
  }

  .comment-div {
    margin-top: 20px;
  }

  .comment-icon-container {
    border-radius: 50%;
    width: 45px;
    height: 45px;
    text-align: center;
    cursor: pointer;

    i {
      line-height: 45px;
      font-size: 20px;
    }
  }
}
</style>
