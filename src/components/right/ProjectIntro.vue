<template>
  <div>
    <a-row class="about_nsbbs_img">
      <img src="@/assets/img/about-nsbbs.png" style="width: 100%;" />
    </a-row>
    <a-row>
      <a-col :span="24" style="position: relative; top: -25px; text-align: center">
        <a-avatar :size="80" :src="require('@/assets/img/nan.jpg')" />
      </a-col>
      <a-col :span="24" style="text-align: center">
        <div style="line-height: 28px; padding: 0 10px 10px 10px;">
          {{ $t('common.projectIntro') }}
        </div>
      </a-col>
      <a-divider style="font-size: 12px;">{{ $t('common.commonCount') }}</a-divider>
      <a-col :span="24" style="text-align: center">
        <a-col :span="6">
          <p>{{ $t('common.article') }}</p>
          <a-badge :overflow-count="9999999" :count="data.articleCount" :number-style="{ backgroundColor: $store.state.themeColor }" />
        </a-col>
        <a-col :span="6">
          <p>{{ $t('common.comment') }}</p>
          <a-badge :overflow-count="9999999" :count="data.commentCount" :number-style="{ backgroundColor: $store.state.themeColor }" />
        </a-col>
        <a-col :span="6">
          <p>{{ $t('common.visit') }}</p>
          <a-badge :overflow-count="9999999" :count="data.visitCount" :number-style="{ backgroundColor: $store.state.themeColor }" />
        </a-col>
        <a-col :span="6">
          <p>{{ $t('common.carousel') }}</p>
          <a-switch default-checked @change="carouselSwitch" v-if="$store.state.isCarousel" />
          <a-switch @change="carouselSwitch" v-else />
        </a-col>
      </a-col>
    </a-row>
    <br />
  </div>
</template>

<script>
import articleService from '@/service/articleService';

export default {
  props: {},
  data() {
    return {
      data: {},
    };
  },

  methods: {
    getArticleCommentVisitTotal() {
      articleService
        .getArticleCommentVisitTotal()
        .then(res => {
          this.data = res.data;
        })
        .catch(err => {
          this.$message.error(err.desc);
        });
    },

    // 轮播图开关
    carouselSwitch(checked) {
      this.$store.state.isCarousel = checked ? 1 : 0;
      window.localStorage.isCarousel = checked ? 1 : 0;
    },
  },

  mounted() {
    this.getArticleCommentVisitTotal();
  },
};
</script>

<style scoped>
.about_nsbbs_img:after {
  position: absolute;
  content: '';
  width: 100%;
  height: 130px;
  top: 0;
  left: 0;
  box-shadow: 0 -25px 35px 10px #ffffff inset;
}

/* 走马灯 */
.ant-switch {
  margin-top: 3px;
}
</style>
