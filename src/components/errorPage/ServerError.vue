<template>
  <a-layout>
    <a-layout id="components-layout-basic">
      <IndexHeader class="header"/>
      <a-layout-content>
        <main class="content">
          <a-result status="500" style="padding-top: 100px" title="500" :sub-title="$t('common.serverError')">
            <template #extra>
              <a-button @click="backHome" type="primary">
                {{ $t("common.backHome") }}
              </a-button>
            </template>
          </a-result>
        </main>
      </a-layout-content>
      <FooterButtons v-if="!$store.state.collapsed"/>
    </a-layout>
  </a-layout>
</template>

<script>
  import IndexHeader from "@/components/index/head/IndexHeader";
  import FooterButtons from "@/components/utils/FooterButtons";

  export default {
    name: "",

    components: {IndexHeader, FooterButtons,},

    methods: {
      // 跳转首页方法
      backHome() {
        this.$router.push({path: "/"});
      },
    },
  };
</script>

<style scoped>
  #components-layout-basic .header {
    position: fixed;
    z-index: 999;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #00000021;
  }

  #components-layout-basic .content {
    margin-top: 64px;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  #components-layout-basic .ant-layout-header, .ant-layout-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #components-layout-basic .ant-layout-header {
    background: #fff;
    height: auto;
    line-height: 2.3;
  }
</style>
