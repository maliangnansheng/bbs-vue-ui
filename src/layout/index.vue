<template>
  <a-layout>
    <index-header />
    <a-layout-content>
      <router-view class="content" />
    </a-layout-content>
    <footer-buttons v-if="!$store.state.collapsed" />
  </a-layout>
</template>

<script>
import IndexHeader from './components/head/index';
import FooterButtons from '@/components/utils/FooterButtons';

export default {
  name: 'Layout',
  components: {
    IndexHeader,
    FooterButtons,
  },
};
</script>

<style lang="less" scoped>
.ant-layout-content {
  padding: 64px 0 32px;
}
.content {
  width: 1100px;
  margin: 0 auto;
}
</style>
