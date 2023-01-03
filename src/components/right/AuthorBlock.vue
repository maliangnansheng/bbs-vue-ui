<template>
  <div id="authors-block" v-if="data.length !== 0">
    <div class="user" @click="routerUserCenter(data.id)">
      <div>
        <a-avatar :size="46" class="avatar"
                  :src="data.picture ? data.picture : require('@/assets/img/default_avatar.png')"/>
      </div>
      <div class="intro">
        <span class="name" style="font-size: 17px;">{{ data.name }} </span>
        <img :src="require('@/assets/img/level/' + data.level + '.svg')" alt="" @click.stop="routerBook"/>
        <div v-if="data.intro">{{ data.intro }}</div>
      </div>
    </div>
    <a-divider style="margin: 20px 0 10px 0;"/>
    <div class="like">
      <div :style="{ background: $store.state.themeColor}">
        <i class="iconfont icon-like" style="color: #fff; font-size: 12px;"></i>
      </div>
      <span>{{ $t("common.getLikes") + ' ' +  data.likeCount }}</span>
    </div>
    <div class="pageview">
      <div :style="{ background: $store.state.themeColor}">
        <i class="iconfont icon-eye" style="color: #fff; font-size: 12px;"></i>
      </div>
      <span>{{ $t("common.articleRead") + ' ' +  data.readCount }}</span>
    </div>
  </div>
</template>

<script>
  import userService from "@/service/userService";

  export default {
    name: "",

    props: {
      userId: {type: Number, default: 0},
    },

    data() {
      return {
        data: [],
        finish: false,
      };
    },

    methods: {
      // 获取用户信息
      getAuthorBlockList() {
        this.finish = false;
        userService.getUserInfo({ userId: this.userId})
            .then(res => {
              this.data = res.data;
              this.finish = true;
            })
            .catch(err => {
              this.finish = true;
              this.$message.error(err.desc);
            });
      },

      // 路由到用户中心页面
      routerUserCenter(userId) {
        let routeData = this.$router.resolve("/user/" + userId);
        window.open(routeData.href, '_blank');
      },

      // 路由到Book说明页面
      routerBook() {
        let routeData = this.$router.resolve("/book");
        window.open(routeData.href, '_blank');
      },
    },

    mounted() {
      this.getAuthorBlockList();
    },

  }
</script>

<style lang="less" scoped>
  #authors-block {
    padding: 20px 15px;
  }

  #authors-block .user {
    display: flex;
    cursor: pointer;

    .intro {
      padding-left: 10px;

      p {
        padding-top: 3px;
        color: #00000085;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
    }
  }

  #authors-block .like, .pageview {
    display: flex;
    align-items: center;
    padding-top: 10px;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 11px;
      width: 22px;
      height: 22px;
    }

    span {
      padding-left: 8px;
    }
  }
</style>