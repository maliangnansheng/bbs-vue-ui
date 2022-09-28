<template>
  <div id="child-comment">
    <a-comment>
      <a class="username" slot="author">
        {{ data.commentUserName }}
        <img :src="require('@/assets/img/level/' + data.level + '.svg')" alt="" />
        <small class="time" slot="title" style="color: #b5b9b9" v-text="$utils.showtime(data.createTime)"></small>
      </a>
      <a-avatar slot="avatar" :src="data.picture ? data.picture : require('@/assets/img/default_avatar.png')" />
      <p class="comment-content" slot="content">
        <span>{{ data.content }}</span>
        <span class="del" v-if="data.commentUser === $store.state.userId" @click="deleteComment(data.id)">{{ $t('common.delete') }}</span>
      </p>
      <span slot="content">
        <a class="operate comment-like">
          <i class="iconfont icon-like" @click="likeCommentAction(data.id)" :style="data.isLike ? 'color:' + $store.state.themeColor : 'color: #8a919f;'">
            <small> {{ data.likeCount === 0 ? '' : data.likeCount }}</small>
          </i>
        </a>
        <a class="operate comment-comment" v-if="data.depth < 2" @click="isShowFn(data.id)">
          <i class="iconfont icon-comment" style="color: #8a919f;">
            <small v-if="isShow"> {{ $t('common.cancelReply') }}</small>
            <small v-else> {{ $t('common.reply') }}</small>
            <small> {{ data.repliesCount }}</small>
          </i>
        </a>
      </span>
      <create-comment v-show="isShow" :pre-id="preId" @refresh="getCommentByArticleId" />
      <template v-if="data.depth < 2">
        <child-comment v-for="(item, index) of data.child" :data="item" :key="index" @getCommentByArticleId="getCommentByArticleId" />
      </template>
    </a-comment>
  </div>
</template>

<script>
import userService from '@/service/userService';
import CreateComment from '@/components/comment/CreateComment';
import store from '@/store';
import commentService from '@/service/commentService';

export default {
  name: 'ChildComment',

  components: { CreateComment },

  props: {
    data: { type: Object, default: () => ({}) },
  },

  data() {
    return {
      isShow: false,
      preId: 0,
    };
  },

  methods: {
    // 点赞/取消点赞
    likeCommentAction(commentId) {
      userService
        .updateLikeCommentState({ commentId: commentId })
        .then(() => {
          this.$emit('getCommentByArticleId');
        })
        .catch(err => {
          this.$message.error(err.desc);
        });
    },

    // 刷新评论数据
    getCommentByArticleId() {
      this.$emit('getCommentByArticleId');
    },

    // 评论回复 的显示与否
    isShowFn(id) {
      if (this.$store.state.isLogin) {
        this.isShow = !this.isShow;
        this.preId = id;
      } else {
        store.state.loginVisible = true;
      }
    },

    //  删除评论
    deleteComment(commentId) {
      this.$confirm({
        centered: true,
        title: this.$t('common.deleteCommentTitle'),
        content: this.$t('common.deletePrompt'),
        onOk: () => {
          commentService
            .deleteComment(commentId)
            .then(() => {
              this.$emit('getCommentByArticleId');
            })
            .catch(err => {
              this.$message.error(err.desc);
            });
        },
      });
    },
  },
};
</script>

<style lang="less">
#child-comment .ant-comment-content-author-name {
  width: 100%;

  .username {
    font-size: 14px;
  }

  .time {
    float: right;
    cursor: auto;
  }
}

#child-comment .operate .iconfont:hover {
  color: #8a919fb3 !important;
}

#child-comment .comment-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;

  .del {
    cursor: pointer;
    color: red;
    padding-right: 8px;
  }
}

#child-comment .comment-comment {
  margin-left: 16px;
}

#child-comment .ant-comment-nested {
  margin-left: 20px;
}

#child-comment .ant-comment-inner {
  padding: 5px 0;
}
</style>
