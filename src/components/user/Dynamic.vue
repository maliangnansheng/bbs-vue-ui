<template>
  <div id="user-dynamic">
    <CustomEmpty v-if="spinning"/>
    <a-empty :description="false" v-if="data.length === 0"/>
    <div v-for="(item, index) in data" :key="index">
      <div class="author-info" :style="index === 0 ? 'padding: 0 20px 8px 20px;' : 'padding: 8px 20px;'">
        <div class="dynamic-notTime">
          <a-avatar class="userHead" slot="avatar" :src="item.picture ? item.picture : require('@/assets/img/default_avatar.png')" :size="56"/>
          <span target="_blank" rel="" class="username" style="padding-left: 10px; color: #000">{{ item.userName }}</span>

          <div class="template">
            <span style="padding: 0 10px; color: #8a9aa9" v-if="item.type === 'writeArticle'">{{ $t("common.dynamicWritten") }}</span>
            <span style="padding: 0 10px; color: #8a9aa9" v-if="item.type === 'likeArticle'">{{ $t("common.dynamicLiked") }}</span>
            <span style="padding: 0 10px; color: #8a9aa9" v-if="item.type === 'likeComment'">{{ $t("common.dynamicLiked") }}</span>
            <span style="padding: 0 10px; color: #8a9aa9" v-if="item.type === 'commentArticle'">{{ $t("common.dynamicCommented") }}</span>
            <span style="padding: 0 10px; color: #8a9aa9" v-if="item.type === 'commentReply'">{{ $t("common.dynamicReply") }}</span>
            <span style="padding: 0 10px; color: #8a9aa9" v-if="item.type === 'followUser'">{{ $t("common.dynamicFollowed") }}</span>
          </div>

          <div class="title">
            <a @click="routerArticleDetail(item.objectId)" v-if="item.type === 'writeArticle'">{{ item.title }}</a>
            <a @click="routerArticleDetail(item.objectId)" v-if="item.type === 'likeArticle'">{{ item.title }}</a>
            <a @click="routerArticleDetail(item.objectId, item.commentId)" v-if="item.type === 'likeComment'">{{ item.title }}</a>
            <a @click="routerArticleDetail(item.objectId, item.commentId)" v-if="item.type === 'commentArticle'">{{ item.title }}</a>
            <a @click="routerArticleDetail(item.objectId, item.commentId)" v-if="item.type === 'commentReply'">{{ item.title }}</a>
            <a @click="routerUserCenter(item.objectId)" v-if="item.type === 'followUser'">{{ item.title }}</a>
          </div>
        </div>
        <small style="color: #b5b9b9; padding-left: 10px;flex-shrink: 0" v-text="$utils.showtime(item.createTime)"></small>
      </div>
      <div style="height: 10px; background: #f0f2f5;" v-if="index !== total - 1"></div>
    </div>
    <div style="text-align: center; padding-bottom: 20px;" v-if="!hasNext && finish">
      <a-divider style="margin-top: 0"/>
      {{ $t("common.noAgain") }}
    </div>
  </div>
</template>

<script>
import CustomEmpty from "@/components/utils/CustomEmpty";

export default {
  name: "Dynamic",

  components: { CustomEmpty },

  props: {
    // 加载中...
    spinning: true,
    data: {type: Array, default: []},
    total: {type: Number, default: 0},
    finish: {type: Boolean, default: false},
    hasNext: {type: Boolean, default: false},
  },

  methods: {
    // 路由到用户中心页面
    routerUserCenter(userId) {
      let routeData = this.$router.resolve("/user/" + userId);
      window.open(routeData.href, '_blank');
    },

    // 路由到文章详情页面
    routerArticleDetail(articleId, commentId) {
      let url = "/detail/" + articleId;
      if (commentId) {
        url = url + '#reply-' + commentId;
      }
      window.open(this.$router.resolve(url).href, '_blank');
    },
  }
}
</script>

<style lang="less" scoped>
#user-dynamic {
  .author-info {
    display: flex;
    align-items: center;
    justify-content: space-between;

    line-height: 30px;
    border-radius: 3px;
    background: #ffffff;
    box-shadow:  9px 9px 18px #ffffff,
      -9px -9px 18px #ffffff;

    .dynamic-notTime {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .userHead, .username, .template {
        /* 防止被压缩 */
        flex-shrink: 0;
      }

      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        /* 实现长英文字母自动换行*/
        word-break: break-all;
      }
    }

  }
}
</style>