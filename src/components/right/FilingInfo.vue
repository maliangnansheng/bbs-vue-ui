<template>
  <div class="div-content">
    <a-row>
      <a-tooltip placement="bottom">
        <template slot="title">
          {{ $t("common.inDevelopment") }}
        </template>
        <a-col class="user_agreement" :span="6">用户协议</a-col>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template slot="title">
          {{ $t("common.inDevelopment") }}
        </template>
        <a-col class="user_guidance" :span="6">使用指南</a-col>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template slot="title">
          {{ $t("common.inDevelopment") }}
        </template>
        <a-col class="links" :span="6">友情链接</a-col>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template slot="title">
          {{ $t("common.inDevelopment") }}
        </template>
        <a-col class="about_us" :span="6">关于我们</a-col>
      </a-tooltip>
    </a-row>
    <a-row>
      版权 © <a href="#" target="_blank"> 南生论坛 </a>丨
      <a href="https://beian.miit.gov.cn" target="_blank">蜀ICP备19014736号-1 </a>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "FilingInfo"
}
</script>

<style scoped>
.div-content, a {
  font-size: 12px;
  line-height: 2;
  color: #909090;
  cursor: pointer;
}

.user_agreement:hover, .user_guidance:hover, .links:hover, .about_us:hover, a:hover {
  color: #13c2c2;
}

</style>