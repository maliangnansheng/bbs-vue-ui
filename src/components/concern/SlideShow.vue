<template>
  <!-- autoplay 自动切换的同时滚动页面有重影 -->
  <a-carousel class="slideshow-content" arrows>
    <div
        slot="prevArrow"
        slot-scope="props"
        class="custom-slick-arrow"
        style="left: 10px;zIndex: 1"
    >
      <a-icon type="left-circle"/>
    </div>
    <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 10px">
      <a-icon type="right-circle"/>
    </div>
    <img :src="item.image" alt="轮播图" v-for="item of carouselData"/>
  </a-carousel>
</template>

<script>
  import carouselService from "@/service/carouselService";

  export default {
    data() {
      return {
        carouselData: [],
        finish: false,
      }
    },

    methods: {
      // 获取走马灯
      getCarouselList() {
        carouselService.getCarouselList()
            .then(res => {
              this.carouselData = res.data;
              this.finish = true;
            })
            .catch(err => {
              this.finish = true;
              this.$message.error(err.desc);
            });
      },
    },

    mounted() {
      this.getCarouselList();
    }

  };
</script>

<style scoped>
  .ant-carousel >>> .custom-slick-arrow {
    width: 50px;
    height: 50px;
    font-size: 50px;
    color: #fff;
    opacity: 0.3;
  }

  .ant-carousel >>> .custom-slick-arrow:before {
    display: none;
  }

  .ant-carousel >>> .custom-slick-arrow:hover {
    opacity: 0.5;
  }
</style>
