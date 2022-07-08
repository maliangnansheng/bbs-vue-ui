<template>
  <div class="img-container">
    <label for="avatarFile">
      <img v-if="!articlePicture"
           style="width: 100%"
           src="@/assets/img/avatar-bg.png"
           alt=""
      />
      <img v-else style="width: 100%;" :src="articlePicture" alt=""/>
    </label>
    <input
        style="display: none"
        accept=".jpg, .jpeg, .png"
        @change="onFileChange"
        type="file"
        name="avatarFile"
        id="avatarFile"
    />
  </div>
</template>

<script>
export default {
  props: {
    // 题图
    articleTitleMap: {type: String, default: ""},
  },

  data() {
    return {
      articlePicture: this.articleTitleMap,
    };
  },
  methods: {
    // 用户选择图片的回调
    onFileChange(e) {
      let file = e.target.files[0];
      this.$emit('titleMap', file);
      this.articlePicture = window.URL.createObjectURL(file);
    },
  },
};
</script>

<style lang="less" scoped>
.img-container {
  padding: 0 10px;

  img {
    cursor: pointer;
  }

}
</style>