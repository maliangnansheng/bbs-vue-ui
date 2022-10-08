<template>
  <a-carousel class="slideshow-content" arrows>
    <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px; z-index: 1">
      <a-icon type="left-circle" />
    </div>
    <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
      <a-icon type="right-circle" />
    </div>
    <img src="http://76.nanshengbbs.top/slider-20200706000714_1.png" alt="轮播图" />
    <img src="http://76.nanshengbbs.top/slider-20200819113519_%E5%8D%97%E7%94%9F%E6%94%B6%E6%AC%BE2.png" alt="轮播图" />
    <img src="http://76.nanshengbbs.top/slider-20200706001316_2.png" alt="轮播图" />
    <img src="http://76.nanshengbbs.top/slider-20200706001324_3.png" alt="轮播图" />
    <img src="http://76.nanshengbbs.top/slider-20200706001342_5.png" alt="轮播图" />
  </a-carousel>
</template>

<script>
export default {};
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
