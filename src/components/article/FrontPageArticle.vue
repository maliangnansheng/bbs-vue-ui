<template>
  <div id="main-article-content">
    <a-list item-layout="vertical" size="large" :data-source="data.list">
      <a-list-item slot="renderItem" key="item.title" slot-scope="item, index" style="cursor: pointer;"
                   @click="routerArticleDetail(item.id)">
        <!-- 浏览量/点赞/评论 -->
        <template v-for="{ type, text } in actions" slot="actions">
          <span class="collectLikeComment" :key="type">
              <span v-if="type==='eye'">
                  <a-icon :type="type" style="margin-right: 8px;"/>
                  <span v-text="item.pv"></span>
              </span>
              <span v-if="type==='like-o'" @click.stop="pageViewsLikeComment(type, item.id, index)">
                  <span v-if="item.articleCountDTO.isLike" :style="{color: $store.state.themeColor}">
                      <a-icon :type="type" style="margin-right: 8px"/>
                      <span v-text="item.articleCountDTO.likeCount"></span>
                  </span>
                  <span v-if="!item.articleCountDTO.isLike">
                      <a-icon :type="type" style="margin-right: 8px"/>
                      <span v-text="item.articleCountDTO.likeCount"></span>
                  </span>
              </span>
              <span v-if="type==='message'">
                  <a-icon :type="type" style="margin-right: 8px;"/>
                  <span v-text="item.articleCountDTO.commentCount"></span>
              </span>
          </span>
        </template>
        <!-- 标签/题图 -->
        <div slot="extra" class="label-titleMap">
          <div slot="title">
            <a v-for="(label, index) in item.labelDTOS" :key="item.labelName" style="float: right" @click.stop="routerLabelToArticle(label.id)">
              <span class="label-name">{{ label.labelName }}</span>
              <a-divider v-if="index !== 0" type="vertical"/>
            </a>
          </div>
          <div>
            <img style="padding-top: 10px" :width="$store.state.collapsed ? 80 : 150" alt="logo" v-if="item.titleMap"
                 :src="item.titleMap"/>
          </div>
        </div>
        <!-- 用户/标题 -->
        <a-list-item-meta :description="item.title">
          <a-avatar slot="avatar" :src="item.picture" @click.stop="routerUserCenter(item.createUser)"/>
          <a slot="title" class="username" :href="item.href" @click.stop="routerUserCenter(item.createUser)">
            <span slot="title" style="padding-right: 2px;"> {{ item.createUserName }} </span>
            <img :src="require('@/assets/img/level/' + item.level + '.svg')" alt=""/>
            <small style="color: #b5b9b9; padding-left: 10px" v-text="$utils.showtime(item.createTime)"></small>
          </a>
        </a-list-item-meta>
        <div class="article-content">
          {{ item.content }}
        </div>
      </a-list-item>
    </a-list>
    <div style="text-align: center; padding-bottom: 20px;" v-if="!hasNext && finish">
      <a-divider/>
      {{ $t("common.noAgain") }}
    </div>
  </div>
</template>
<script>
import userService from "@/service/userService";

export default {
  props: {
    data: {type: Object, default: () => ({})},
    pageSize: {type: Number, default: 0},
    current: {type: Number, default: 1},
    finish: {type: Boolean, default: false},
    hasNext: {type: Boolean, default: false},
  },
  data() {
    return {
      actions: [
        {type: 'eye', text: '156'},
        {type: 'like-o', text: '156'},
        {type: 'message', text: '2'},
      ],
    };
  },

  methods: {
    // 浏览点赞评论按钮的点击操作
    pageViewsLikeComment(type, articleId, index) {
      // 浏览量
      if (type === 'eye') {
        console.log("浏览量")
      }
      // 点赞
      if (type === 'like-o') {
        userService.updateLikeState({articleId: articleId})
            .then(() => {
              // this.$emit("refresh");
              let isLike = this.data.list[index].articleCountDTO.isLike;
              // 取消点赞操作
              if (isLike) {
                this.data.list[index].articleCountDTO.likeCount--;
              } else {
                this.data.list[index].articleCountDTO.likeCount++;
              }
              this.data.list[index].articleCountDTO.isLike = !isLike;
            })
            .catch(err => {
              this.$message.error(err.desc);
            });
      }
      // 评论
      if (type === 'message') {
        console.log("评论")
      }
    },

    // 路由到文章详情页面
    routerArticleDetail(articleId) {
      let routeData = this.$router.resolve("/detail/" + articleId);
      window.open(routeData.href, '_blank');
    },

    // 路由到用户中心页面
    routerUserCenter(userId) {
      let routeData = this.$router.resolve("/user/" + userId);
      window.open(routeData.href, '_blank');
    },

    // 路由到标签文章页面
    routerLabelToArticle(labelId) {
      let routeData = this.$router.resolve("/label/" + labelId);
      window.open(routeData.href, '_blank');
    },
  },

  mounted() {
  },

};
</script>

<style>
#main-article-content .label-titleMap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

#main-article-content .label-name {
  color: #8a919f;
}

#main-article-content .label-name:hover {
  color: #13c2c2;
}

#main-article-content .username {
  display: flex;
  align-items: baseline;
}

#main-article-content .ant-list-item-meta-description {
  font-weight: 700;
  font-size: 16px;
  color: #1d2129;
  line-height: 22px;
}

#main-article-content .ant-list-item-meta-description, .article-content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

#main-article-content .collectLikeComment:hover {
  color: #13c2c2;
}

#main-article-content li.ant-list-item {
  padding: 20px;
}

#main-article-content li.ant-list-item:hover {
  background: #f4f5f57a;
}

@media screen and (max-width: 576px) {
  .ant-list-vertical .ant-list-item-extra {
    margin: 0 auto 16px;
  }
}
</style>
