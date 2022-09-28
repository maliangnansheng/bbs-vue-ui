<template>
  <div id="main-article-content">
    <a-list item-layout="vertical" size="large" :data-source="tempData">
      <a-list-item slot="renderItem" key="item.title" slot-scope="item, index" style="cursor: pointer;" @click="routerArticleDetail(item.id)">
        <!-- 浏览量/点赞/评论 -->
        <template v-for="{ type } in actions" slot="actions">
          <span class="collectLikeComment" :key="type">
            <span v-if="type === 'eye'">
              <a-icon :type="type" style="margin-right: 8px;" />
              <span v-text="item.pv"></span>
            </span>
            <span v-if="type === 'like-o'" @click.stop="pageViewsLikeComment(type, item.id, index)">
              <span v-if="item.articleCountDTO.isLike" :style="{ color: $store.state.themeColor }">
                <a-icon :type="type" style="margin-right: 8px" />
                <span v-text="item.articleCountDTO.likeCount"></span>
              </span>
              <span v-if="!item.articleCountDTO.isLike">
                <a-icon :type="type" style="margin-right: 8px" />
                <span v-text="item.articleCountDTO.likeCount"></span>
              </span>
            </span>
            <span v-if="type === 'message'">
              <a-icon :type="type" style="margin-right: 8px;" />
              <span v-text="item.articleCountDTO.commentCount"></span>
            </span>
          </span>
        </template>
        <!-- 标签/题图 -->
        <div slot="extra" class="label-titleMap">
          <div slot="title">
            <a v-for="(label, ind) in item.labelDTOS" :key="ind" style="float: right" @click.stop="routerLabelToArticle(label.id)">
              <span class="label-name">{{ label.labelName }}</span>
              <a-divider v-if="ind !== 0" type="vertical" />
            </a>
          </div>
          <div>
            <img style="padding-top: 10px" :width="$store.state.collapsed ? 80 : 150" alt="logo" v-if="item.titleMap" :src="item.titleMap" />
          </div>
        </div>
        <!-- 用户/标题 -->
        <a-list-item-meta :description="item.title">
          <a-avatar slot="avatar" :src="item.picture ? item.picture : require('@/assets/img/default_avatar.png')" @click.stop="routerUserCenter(item.createUser)" />
          <a slot="title" class="username" @click.stop="routerUserCenter(item.createUser)">
            <div class="left">
              <span slot="title" style="padding-right: 2px;"> {{ item.createUserName }} </span>
              <img :src="require('@/assets/img/level/' + item.level + '.svg')" alt="" @click.stop="routerBook" />
              <small style="color: #b5b9b9; padding-left: 10px" v-text="$utils.showtime(item.createTime)"></small>
              <!-- 用户中心 -->
              <div v-if="isUserCenter && ($store.state.userId === userId || $store.state.isManage)">
                <small style="color: #faad14; padding-left: 10px" v-if="item.state === -1">{{ $t('common.pendingReview') }}</small>
                <small style="color: red; padding-left: 10px" v-if="item.state === 0">{{ $t('common.reviewRejected') }}</small>
                <small style="color: #3eaf7c; padding-left: 10px" v-if="item.state === 1">{{ $t('common.approved') }}</small>
              </div>
              <!-- 文章审核 -->
              <div v-if="$store.state.isManage && isAdminAudit">
                <a-button type="primary" size="small" style="margin-left: 5px" @click.stop="updateState(item.id, item.state, 1)" v-if="item.state === -1 || item.state !== 1">
                  {{ $t('common.pass') }}
                </a-button>
                <a-button type="danger" size="small" style="margin-left: 5px" @click.stop="updateState(item.id, item.state, 0)" v-if="item.state === -1 || item.state !== 0">
                  {{ $t('common.reject') }}
                </a-button>
              </div>
            </div>
            <!-- 置顶图标 -->
            <a-tooltip placement="left">
              <template slot="title">
                {{ $t('common.top') }}
              </template>
              <a-icon type="fire" :style="{ color: $store.state.themeColor }" v-if="item.top" />
              <!--              <a-icon type="thunderbolt" :style="{color: $store.state.themeColor}" v-if="item.top" />-->
              <!--              <i class="iconfont icon-right-triangle" :style="{color: $store.state.themeColor}" v-if="item.top"></i>-->
            </a-tooltip>
          </a>
        </a-list-item-meta>
        <div class="article-content">
          {{ item.content }}
        </div>
      </a-list-item>
    </a-list>
    <div style="text-align: center; padding-bottom: 20px;" v-if="!hasNext && finish">
      <a-divider />
      {{ $t('common.noAgain') }}
    </div>
  </div>
</template>
<script>
import userService from '@/service/userService';
import articleService from '@/service/articleService';

export default {
  props: {
    data: { type: Array, default: () => [] },
    pageSize: { type: Number, default: 0 },
    current: { type: Number, default: 1 },
    finish: { type: Boolean, default: false },
    hasNext: { type: Boolean, default: false },
    isUserCenter: { type: Boolean, default: false },
    userId: { type: Boolean, default: false },
    isAdminAudit: { type: Boolean, default: false },
  },
  data() {
    return {
      tempData: this.data,
      actions: [
        { type: 'eye', text: '156' },
        { type: 'like-o', text: '156' },
        { type: 'message', text: '2' },
      ],
    };
  },

  methods: {
    // 浏览点赞评论按钮的点击操作
    pageViewsLikeComment(type, articleId, index) {
      // 浏览量
      if (type === 'eye') {
        console.log('浏览量');
      }
      // 点赞
      if (type === 'like-o') {
        userService
          .updateLikeState({ articleId: articleId })
          .then(() => {
            // this.$emit("refresh");
            const isLike = this.tempData[index].articleCountDTO.isLike;
            // 取消点赞操作
            if (isLike) {
              this.tempData[index].articleCountDTO.likeCount--;
            } else {
              this.tempData[index].articleCountDTO.likeCount++;
            }
            this.tempData[index].articleCountDTO.isLike = !isLike;
          })
          .catch(err => {
            this.$message.error(err.desc);
          });
      }
      // 评论
      if (type === 'message') {
        console.log('评论');
      }
    },

    // 路由到文章详情页面
    routerArticleDetail(articleId) {
      const routeData = this.$router.resolve('/detail/' + articleId);
      window.open(routeData.href, '_blank');
    },

    // 路由到用户中心页面
    routerUserCenter(userId) {
      const routeData = this.$router.resolve('/user/' + userId);
      window.open(routeData.href, '_blank');
    },

    // 路由到标签文章页面
    routerLabelToArticle(labelId) {
      const routeData = this.$router.resolve('/label/' + labelId);
      window.open(routeData.href, '_blank');
    },

    // 路由到Book说明页面
    routerBook() {
      const routeData = this.$router.resolve('/book');
      window.open(routeData.href, '_blank');
    },

    // 修改文章审批状态
    updateState(articleId, state, toState) {
      this.$confirm({
        centered: true,
        title: this.$t('common.confirmReject'),
        onOk: () => {
          articleService
            .updateState({ id: articleId, state: toState })
            .then(() => {
              this.tempData = this.tempData.filter(article => article.id !== articleId);
              // 待审核
              if (state === -1) {
                this.$emit('updatePendingReviewData', this.tempData);
                // 通过
                if (toState === 1) {
                  this.$emit('updatePendingReviewTotal', -1);
                  this.$emit('updateTotal', 1);
                  this.$emit('updateReviewRejectedTotal', -1);
                }
                // 拒绝
                if (toState === 0) {
                  this.$emit('updatePendingReviewTotal', -1);
                  this.$emit('updateTotal', -1);
                  this.$emit('updateReviewRejectedTotal', 1);
                }
              }
              // 审核拒绝
              if (state === 0) {
                this.$emit('updateReviewRejectedData', this.tempData);
                // 通过
                if (toState === 1) {
                  this.$emit('updateTotal', 1);
                  this.$emit('updateReviewRejectedTotal', -1);
                }
                // 拒绝
                if (toState === 0) {
                  this.$emit('updateTotal', -1);
                  this.$emit('updateReviewRejectedTotal', 1);
                }
              }
              // 审核通过
              if (state === 1) {
                this.$emit('updateData', this.tempData);
                // 通过
                if (toState === 1) {
                  this.$emit('updateTotal', 1);
                  this.$emit('updateReviewRejectedTotal', -1);
                }
                // 拒绝
                if (toState === 0) {
                  this.$emit('updateTotal', -1);
                  this.$emit('updateReviewRejectedTotal', 1);
                }
              }
              this.$message.success(this.$t('common.approvalSuccessed'));
            })
            .catch(err => {
              this.$message.error(err.desc);
            });
        },
      });
    },
  },

  mounted() {},

  watch: {
    // data值改变时触发
    data: {
      handler(newVal, oldVal) {
        this.tempData = newVal;
      },
    },
  },
};
</script>

<style lang="less">
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
  justify-content: space-between;

  .left {
    display: flex;
    align-items: baseline;
  }
}

#main-article-content .ant-list-item-meta-description {
  font-weight: 700;
  font-size: 16px;
  color: #1d2129;
  line-height: 22px;
}

#main-article-content .ant-list-item-meta-description,
.article-content {
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
