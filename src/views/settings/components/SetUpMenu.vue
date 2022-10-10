<template>
  <div id="setup-menu">
    <a-menu style="width: 100%" v-model="defaultSelectedKeys" mode="inline" @click="handleClick">
      <a-menu-item key="profile">
        <a-icon type="user" />
        <span>{{ $t('common.personalInformation') }}</span>
      </a-menu-item>
      <a-menu-item key="account">
        <a-icon type="setting" />
        <span>{{ $t('common.accountSettings') }}</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
export default {
  name: 'SetUpMenu',

  data() {
    return {
      defaultSelectedKeys: [],
    };
  },

  methods: {
    handleClick(e) {
      if (e.key === 'profile') {
        this.routerSetUpToProfile();
      }
      if (e.key === 'account') {
        this.routerSetUpToAccount();
      }
    },

    // 路由到设置页面(个人资料)
    routerSetUpToProfile() {
      this.$router.push('/settings/profile');
    },

    // 路由到设置页面(账号设置)
    routerSetUpToAccount() {
      this.$router.push('/settings/account');
    },
  },

  mounted() {
    this.defaultSelectedKeys.push(this.$route.name);
  },

  watch: {
    // 监听,当路由发生变化的时候执行
    $route: {
      handler(newVal, oldVal) {
        this.defaultSelectedKeys.pop();
        this.defaultSelectedKeys.push(newVal.name);
      },
    },
  },
};
</script>

<style scoped></style>
