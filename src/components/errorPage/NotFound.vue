<template>
  <a-result status="404" title="404" style="padding-top: 100px" :sub-title="$t('common.pageNotExist')">
    <template #extra>
      <a-button @click="backHome" type="primary">
        {{ $t('common.backHome') }}
      </a-button>
    </template>
  </a-result>
</template>
<script>
export default {
  methods: {
    // 跳转首页方法
    backHome() {
      this.$router.push({ path: '/' });
    },
  },
};
</script>
