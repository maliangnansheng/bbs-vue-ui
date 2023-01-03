<template>
  <div id="authors-list" v-if="data.length !== 0">
    <header class="user-block-header">🎖️ {{ $t("common.authorList") }}</header>
    <a-divider style="margin: 10px 0 0 0;"/>
    <a-list item-layout="horizontal" :data-source="data" :split="false">
      <a-list-item slot="renderItem" slot-scope="item, index" @click="routerUserCenter(item.id)">
        <a-list-item-meta :description="item.intro">
          <span class="username" slot="title">
            <span style="padding-right: 2px;">{{ item.name }}</span>
            <img :src="require('@/assets/img/level/' + item.level + '.svg')" alt="" @click.stop="routerBook"/>
          </span>
          <a-avatar slot="avatar"
                    :src="item.picture ? item.picture : require('@/assets/img/default-avatar.png')"/>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <a-divider style="margin: 0;"/>
    <div class="full-list" @click="recommended" style="text-align: center; padding: 10px 0;">
      <a>
        <span>{{ $t("common.fullList") }}</span>
        <a-icon type="right"/>
      </a>
    </div>
  </div>
</template>

<script>
import userService from "@/service/userService";

export default {
  data() {
    return {
      data: [],
      params: {currentPage: 1, pageSize: 3},
      finish: false,
    };
  },

  methods: {
    getHotAuthorsList(params) {
      userService.getHotAuthorsList(params)
          .then(res => {
            this.data = res.data.list;
            this.finish = true;
          })
          .catch(err => {
            this.finish = true;
            this.$message.error(err.desc);
          });
    },

    recommended() {
      let routeData = this.$router.resolve("/recommended");
      window.open(routeData.href, '_blank');
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
    this.getHotAuthorsList(this.params);
  },

};
</script>

<style scoped>
#authors-list .user-block-header {
  padding: 15px 10px 0 15px;
}

#authors-list .username {
  display: flex;
  align-items: baseline;
}

#authors-list .ant-list-item-meta {
  display: flex;
  align-items: center;
  padding: 0 15px;
}

#authors-list .ant-list-item-meta-title > a, .ant-list-item-meta-description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

#authors-list .ant-list-item-meta-description {
  font-weight: 100;
  font-size: 10px;
  color: #909090;
  line-height: 22px;
}

#authors-list .ant-list-item, .full-list {
  cursor: pointer;
}

#authors-list .ant-list-item:hover {
  background: #8b87870a;
}

#authors-list .full-list:hover {
  background: #8b87870a;
}
</style>
