<template>
  <div id="personal-achievement" v-if="data.points !== undefined">
    <header class="personal-achievement-header">
      <i class="iconfont icon-achievement" :style="{ color: $store.state.themeColor }"></i>
      {{ $t('common.personalAchievement') }}
    </header>
    <a-divider style="margin: 0 0 5px 0;" />
    <div class="like">
      <div :style="{ background: $store.state.themeColor }">
        <i class="iconfont icon-like" style="color: #fff; font-size: 12px;"></i>
      </div>
      <span>{{ $t('common.getLikes') + ' ' + data.likeCount }}</span>
    </div>
    <div class="pageview">
      <div :style="{ background: $store.state.themeColor }">
        <i class="iconfont icon-eye" style="color: #fff; font-size: 12px;"></i>
      </div>
      <span>{{ $t('common.articleRead') + ' ' + data.readCount }}</span>
    </div>
    <div class="rise" @click="routerBook">
      <div :style="{ background: $store.state.themeColor }">
        <i class="iconfont icon-rise" style="color: #fff; font-size: 12px;"></i>
      </div>
      <span>{{ $t('common.nanshengValue') + ' ' + data.points }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  props: {
    data: { type: Object, default: () => {} },
  },

  methods: {
    // 路由到Book说明页面
    routerBook() {
      const routeData = this.$router.resolve('/book');
      window.open(routeData.href, '_blank');
    },
  },
};
</script>

<style lang="less" scoped>
#personal-achievement {
  padding: 15px;

  .personal-achievement-header {
    padding-bottom: 15px;
  }

  .like,
  .pageview,
  .rise {
    display: flex;
    align-items: center;
    padding-top: 10px;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 11px;
      width: 22px;
      height: 22px;
    }

    span {
      padding-left: 8px;
    }
  }

  .rise {
    cursor: pointer;
  }
}
</style>
