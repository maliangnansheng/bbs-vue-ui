<template>
  <div id="personal-info-display">
    <a-tabs default-active-key="followed" @change="changeTab">
      <a-tab-pane key="followed">
        <span slot="tab">
          {{ $t("common.follow") + ' ' + followedTotal }}
        </span>
        <FollowAuthorsListContent
            :getBigCow="getBigCow"
            :finish="finish"
            :hasNext="hasNext"
            :data="followData"
            @refresh="refresh"
            style="background: #fff;"/>
      </a-tab-pane>
      <a-tab-pane key="fan">
      <span slot="tab">
        {{ $t("common.fan") + ' ' + fanTotal }}
      </span>
        <FollowAuthorsListContent
            :getBigCow="getBigCow"
            :finish="finish"
            :hasNext="hasNext"
            :data="fanData"
            @refresh="refresh"
            style="background: #fff;"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import userService from "@/service/userService";
import FollowAuthorsListContent from "@/components/user/FollowAuthorsListContent";

export default {
  name: "",
  components: {FollowAuthorsListContent},

  props: {
    userId: {type: Number, default: 0},
    // 我关注的人数
    followedTotal: {type: Number, default: 0},
    // 我的粉丝数
    fanTotal: {type: Number, default: 0},
  },

  data() {
    return {
      // 我关注的人
      followData: [],
      // 关注我的人
      fanData: [],
      hasNext: true,
      finish: false,
      params: {currentPage: 1, pageSize: 10},
      // 获取我关注的
      getBigCow: Number(this.userId),
      // 关注我的
      getFan: Number,
    };
  },

  methods: {
    // 加载更多（滚动加载）
    loadMore() {
      this.params.currentPage++;
      this.getFollowUsers(this.params, true);
    },

    // 获取关注用户列表信息
    getFollowUsers(params, isLoadMore) {
      if (!isLoadMore) {
        this.params.currentPage = 1;
      }
      this.finish = false;
      if (this.getBigCow) {
        params.getBigCow = this.getBigCow
        this.$delete(params, 'getFan');
      } else {
        params.getFan = this.getFan
        this.$delete(params, 'getBigCow');
      }
      userService.getFollowUsers(params)
          .then(res => {
            if (isLoadMore) {
              if (this.getBigCow) {
                this.followData = this.followData.concat(res.data.list);
              } else {
                this.fanData = this.fanData.concat(res.data.list);
              }
              this.hasNext = res.data.list.length !== 0;
            } else {
              if (this.getBigCow) {
                this.followData = res.data.list;
              } else {
                this.fanData = res.data.list;
              }
            }
            this.spinning = false;
            this.finish = true;
          })
          .catch(err => {
            this.finish = true;
            this.$message.error(err.desc);
          });
    },

    // 刷新列表
    refresh() {
      this.params = {currentPage: 1, pageSize: 10};
      this.getFollowUsers(this.params);
      this.$emit("getFollowCount");
    },

    // tab切换回调
    changeTab(activeKey) {
      if (activeKey === 'followed') {
        this.getBigCow = this.userId;
        this.getFan = 0;
        this.getFollowUsers(this.params);
        this.$emit("getFollowCount");
      }
      if (activeKey === 'fan') {
        this.getFan = this.userId;
        this.getBigCow = 0;
        this.getFollowUsers(this.params);
        this.$emit("getFollowCount");
      }
    }
  },

  mounted() {
    this.getFollowUsers(this.params);
    // 监听滚动，做滚动加载
    this.$utils.scroll.call(this, document.querySelector('#app'));
  },
}
</script>

<style scoped>

</style>