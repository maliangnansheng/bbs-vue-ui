<template>
  <div id="friend-donate">
    <header class="user-block-header">{{ $t("common.friendDonate") }}</header>
    <a-divider style="margin: 10px 0 0 0;"/>
    <p>
      <small class="text-warning">无论捐赠金额多少都足够表达您这份心意，非常感谢 ：）</small>
      <br>
      <small class="text-warning">你的捐赠将用于项目后期的维护和更新...</small>
    </p>
    <div class="donate">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="10 元">
          <!--10元-->
          <div role="tabpanel" class="tab-pane active" id="rmb-10">
            <img src="http://76.nanshengbbs.top/donate-zhifubao-10.jpg" alt="支付宝" style="width: 100%">
            <a-divider style="margin: 5px;"/>
            <img src="http://76.nanshengbbs.top/donate-weixin-10.png" alt="微信" style="width: 100%">
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="20 元" force-render>
          <!--20元-->
          <div role="tabpanel" class="tab-pane" id="rmb-20">
            <img src="http://76.nanshengbbs.top/donate-zhifubao-20.jpg" alt="支付宝" style="width: 100%">
            <a-divider style="margin: 5px;"/>
            <img src="http://76.nanshengbbs.top/donate-weixin-20.png" alt="微信" style="width: 100%">
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="😏">
          <!--我是土豪-->
          <div role="tabpanel" class="tab-pane" id="rmb-99">
            <img src="http://76.nanshengbbs.top/donate-zhifubao-99.jpg" alt="支付宝" style="width: 100%">
            <a-divider style="margin: 5px;"/>
            <img src="http://76.nanshengbbs.top/donate-weixin-99.png" alt="微信" style="width: 100%">
          </div>
        </a-tab-pane>
        <a-tab-pane key="4" tab="随意">
          <!--我是土豪-->
          <div role="tabpanel" class="tab-pane" id="rmb-custom">
            <img src="http://76.nanshengbbs.top/donate-zhifubao-custom.jpg" alt="支付宝" style="width: 100%">
            <a-divider style="margin: 5px;"/>
            <img src="http://76.nanshengbbs.top/donate-weixin-custom.png" alt="微信" style="width: 100%">
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>

</script>

<style lang="less">
  #friend-donate {
    padding-bottom: 10px;

    .user-block-header {
      padding: 15px 10px 0 15px;
    }

    p {
      padding: 15px 15px 0 15px;

      .text-warning {
        color: #8a6d3b;
        line-height: 30px;
      }
      .text-info {
        color: #31708f;
        line-height: 30px;
      }
    }
  }

  #friend-donate .ant-tabs-nav .ant-tabs-tab {
    margin: 0;
  }
</style>
