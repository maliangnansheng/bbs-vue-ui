<template>
  <div id="article-detail"
       :style="$store.state.collapsed ? 'padding: 10px' : 'padding: 20px;'">
    <div v-if="finish">
      <div class="article-title">
        <h1>{{ data.title }}</h1>
      </div>
      <div class="article-user">
        <div class="author-info-box">
          <a-avatar class="avatar" :src="data.picture" :size="46" @click="routerUserCenter(data.createUser)"/>
          <div class="author-name-meta" style="padding-left: 10px;">
            <div class="author-name">
              <a target="_blank" class="username" @click="routerUserCenter(data.createUser)">
                <span class="name" style="font-size: 17px;">{{ data.createUserName }} </span>
                <img :src="require('@/assets/img/level/' + data.articleCountDTO.level + '.svg')" alt=""/>
              </a>
            </div>
            <div class="meta-box" style="color: #8a919f">
            <span class="time">
              {{ data.createTime }}
            </span>
              <span class="views-count">
               {{ $t("common.read") + ' ' + data.pv }}
            </span>
            </div>
          </div>
        </div>
        <div class="follow-box">
          <div class="edit" v-if="$store.state.userId === data.createUser">
            <a-button class="follow-btn" v-if="!data.articleCountDTO.isFollow" @click="routerArticleEdit(data.id)"
                      :style="{color: $store.state.themeColor, border: '1px solid' + $store.state.themeColor}">
              {{ $t("common.edit") }}
            </a-button>
          </div>
          <div class="follow" v-else>
            <a-button class="follow-btn" v-if="!data.articleCountDTO.isFollow"
                      @click="updateFollowState(data.createUser)"
                      :style="{color: $store.state.themeColor, border: '1px solid' + $store.state.themeColor}">
              {{ $t("common.follow") }}
            </a-button>
            <a-button class="follow-btn-close" v-if="data.articleCountDTO.isFollow"
                      @click="updateFollowState(data.createUser)">
              {{ $t("common.haveFollowed") }}
            </a-button>
          </div>
        </div>
      </div>
      <div class="article-titleMap" v-if="data.titleMap">
        <img :src="data.titleMap" style="width: 100%;"/>
      </div>
      <div class="article-content" style="width: 100%" v-if="data.markdown">
        <mavon-editor
            :value="data.markdown"
            :subfield="false"
            defaultOpen="preview"
            :toolbarsFlag="false"
            boxShadowStyle="0"
            previewBackground="#fff"
            codeStyle="obsidian"></mavon-editor>
      </div>
    </div>
    <CustomEmpty v-else/>
  </div>
</template>

<script>
  import articleService from "@/service/articleService";
  import userService from "@/service/userService";
  import CustomEmpty from "@/components/utils/CustomEmpty";

  export default {
    components: {CustomEmpty},

    data() {
      return {
        finish: false,
        data: {},
      };
    },

    methods: {
      // 获取文章详细信息
      getArticleById() {
        this.finish = false;
        articleService.getArticleById({id: this.$route.params.id, isPv: true})
            .then(res => {
              this.data = res.data;
              this.finish = true;
              // 提取标签id
              let labelIds = [];
              res.data.labelDTOS.forEach(label => {
                labelIds.push(label.id);
              });
              this.$emit("initLabelIds", labelIds, this.finish, res.data.createUser, this.$utils.toToc(res.data.html));
            })
            .catch(err => {
              this.finish = true;
              this.$message.error(err.desc);
            });
      },

      // 更新关注状态
      updateFollowState(toUser) {
        userService.updateFollowState({toUser: toUser})
            .then(() => {
              this.getArticleById();
            })
            .catch(err => {
              this.$message.error(err.desc);
            });
      },

      // 路由到文章编辑页面
      routerArticleEdit(articleId) {
        this.$router.push("/edit/" + articleId);
      },

      // 路由到用户中心页面
      routerUserCenter(userId) {
        let routeData = this.$router.resolve("/user/" + userId);
        window.open(routeData.href, '_blank');
      }

    },

    mounted() {
      this.getArticleById();
    }
  }
</script>

<style>
  #article-detail .article-title > h1 {
    font-size: 32px;
    font-weight: 700;
    line-height: 1.31;
    color: #252933;
  }

  #article-detail .article-user {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #article-detail .author-info-box {
    display: flex;
  }

  #article-detail .avatar {
    cursor: pointer;
  }

  /* #article-detail .article-titleMap, .article-content 这样写会窜样式 */
  #article-detail .article-titleMap {
    padding-top: 20px;
  }
  #article-detail .article-content {
    padding-top: 20px;
  }

  /* 关注按钮--start */
  #article-detail .follow-btn {
    width: 77px;
    height: 27px;
    border-radius: 2px;
  }

  #article-detail .follow-btn:hover {
    background: #37c701;
    border: 1px solid rgba(55, 199, 1, .6) !important;
    color: #fff !important;
  }

  #article-detail .follow-btn-close {
    background: #37c701;
    border: 1px solid rgba(55, 199, 1, .6) !important;
    color: #fff !important;
    /*width: 77px;*/
    height: 27px;
    border-radius: 2px;
  }

  #article-detail .follow-btn-close:hover {
    background: #3ee002;
    border: 1px solid rgba(55, 199, 1, 0.7) !important;
  }

  /* 关注按钮--end */

  /* 代码高亮部分设置样式--start */
  #article-detail .markdown-body .highlight pre, .markdown-body pre {
    padding: 0 !important;
  }

  #article-detail .hljs {
    padding: 10px;
  }

  /* 代码高亮部分设置样式--end */

  /* mavon-editor整体样式--start */
  #article-detail .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
    padding: 0;
  }
  #article-detail .v-note-wrapper {
    z-index: 900;
  }
  /* 设置mavon-editor的最小高度 */
  #article-detail .v-note-wrapper.markdown-body.shadow {
    min-height: 0;
  }
  /* mavon-editor整体样式--end */
</style>