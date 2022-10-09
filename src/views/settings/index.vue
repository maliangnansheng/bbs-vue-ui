<template>
  <div id="settings">
    <div class="return">
      <span class="return-span" @click="routerUserCenter($store.state.userId)">
        <a-icon type="left" />
        <span>{{ $t('common.backPersonalHomepage') }}</span>
      </span>
    </div>
    <a-row>
      <a-col :span="24" style="height: 20px" />
    </a-row>
    <a-col :span="6" style="border-right: 20px solid #f0f2f5; height: 600px; background: #fff">
      <set-up-menu />
    </a-col>
    <a-col :span="18" style="background: #fff; height: 600px">
      <router-view></router-view>
    </a-col>
  </div>
</template>

<script>
import SetUpMenu from './components/SetUpMenu';

export default {
  components: { SetUpMenu },

  methods: {
    // 路由到用户中心页面
    routerUserCenter(userId) {
      this.$router.push('/user/' + userId);
    },
  },
};
</script>

<style lang="less">
#settings {
  .return {
    display: flex;
    align-items: center;
    margin-top: 10px;
    padding-left: 20px;
    background: #fff;
    height: 46px;

    .return-span {
      display: flex;
      align-items: center;
      cursor: pointer;
      text-decoration: none;
      color: #909090;
    }
    .return-span:hover {
      color: #07c19a;
    }
  }
}
</style>
