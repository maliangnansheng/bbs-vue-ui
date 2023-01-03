<template>
  <a-layout>
    <a-layout id="components-layout-basic">
      <IndexHeader class="header"/>
      <a-layout-content>
        <main class="content">
          <div class="return">
            <span class="return-span" @click="routerUserCenter($store.state.userId)">
              <a-icon type="left"/>
              <span>{{ $t('common.backPersonalHomepage') }}</span>
            </span>
          </div>
          <!-- 小屏幕 -->
          <a-row v-if="$store.state.collapsed">
            <br/>
            <SetUpMenu style="background: #fff;"/>
            <router-view style="background: #fff;"></router-view>
          </a-row>
          <!-- 大屏幕 -->
          <a-row v-else>
            <a-col :span="24" style="height: 20px;"/>
            <a-col :span="6" style="border-right: 20px solid #f0f2f5; height: 635px; background: #fff">
              <SetUpMenu/>
            </a-col>
            <a-col :span="18" style="background: #fff; height: 635px;">
              <router-view></router-view>
            </a-col>
          </a-row>
        </main>
      </a-layout-content>
      <FooterButtons v-if="!$store.state.collapsed"/>
    </a-layout>
  </a-layout>
</template>

<script>
  import IndexHeader from "@/components/index/head/IndexHeader";
  import FooterButtons from "@/components/utils/FooterButtons";
  import SetUpMenu from "@/components/user/SetUpMenu";

  export default {
    components: {IndexHeader, FooterButtons, SetUpMenu},

    methods: {
      // 路由到用户中心页面
      routerUserCenter(userId) {
        this.$router.push("/user/" + userId);
      },
    },

  };
</script>


<style lang="less">
  #components-layout-basic .header {
    position: fixed;
    z-index: 999;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #00000021;
  }

  #components-layout-basic .content {
    margin-top: 64px;
    width: 1100px;

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

  .index-drawer-wrap .ant-drawer-content-wrapper {
    width: 250px !important;
  }

  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .logo {
    height: 64px;
    background: rgba(255, 255, 255, 0.2);
    margin: 0;
  }
</style>