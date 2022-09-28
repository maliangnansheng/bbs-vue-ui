<template>
  <a-modal :centered="true" :title="null" :destroy-on-close="true" :mask-closable="true" width="360px" @cancel="handleCancel" :visible="visible" :footer="null">
    <p class="title">{{ $t('common.editAvatar') }}</p>
    <p class="tip">{{ $t('common.avatarTip')[0] }}</p>
    <p class="tip">{{ $t('common.avatarTip')[1] }}</p>
    <div class="progress">
      <a-progress v-if="progress > 0" :percent="progress" />
    </div>
    <div class="img-container">
      <label for="avatarFile">
        <img v-if="!picture" style="width: 100%" src="@/assets/img/avatar-bg.png" alt="" />
        <img v-else style="width: 100%" :src="picture" alt="" />
      </label>
      <input style="display: none" accept=".jpg, .jpeg, .png" @change="onFileChange" type="file" name="avatarFile" id="avatarFile" />
    </div>
    <div class="footer">
      <a-button @click="handleOk" :loading="loading" type="primary">{{ $t('common.save') }} </a-button>
    </div>
  </a-modal>
</template>

<script>
import userService from '@/service/userService';

export default {
  props: {
    visible: { type: Boolean, default: false },
  },

  data() {
    return {
      loading: false,
      picture: this.$store.state.picture,
      file: '',
      progress: 0,
    };
  },
  methods: {
    // 用户选择图片的回调
    onFileChange(e) {
      this.file = e.target.files[0];
      this.picture = window.URL.createObjectURL(this.file);
    },

    handleOk() {
      // 上传前先做校验，校验是否选择图片以及图片大小是否合法
      if (!this.picture || this.picture === this.$store.state.picture) {
        this.$message.warning(this.$t('common.noPictureTip'));
        return;
      }
      // 校验图片大小（不能超过5M）
      if (this.file.size > 5 * 1024 * 1024) {
        this.$message.warning(this.$t('common.avatarSizeTip'));
        return;
      }
      const file = new FormData();
      file.append('picture', this.file);
      this.loading = true;
      userService
        .uploadUserPicture(file, this.onUploadProgress.bind(this))
        .then(() => {
          this.$message.success(this.$t('common.uploadSuccessed'));
          this.handleCancel();
          this.$emit('refresh');
          this.loading = false;
        })
        .catch(err => {
          this.progress = 0;
          this.$message.error(err.desc);
          this.loading = false;
        });
    },

    // 上传进度，调用接口的时候传给axios，当接口请求进度变化时axios会调用该回调
    onUploadProgress({ loaded, total }) {
      this.progress = ((loaded / total) * 100).toFixed(2) - 0;
    },

    // 关闭弹窗
    handleCancel() {
      this.progress = 0;
      this.loading = false;
      // 关闭modal
      this.$emit('closeModal');
    },
  },

  watch: {
    visible: function() {
      this.picture = this.$store.state.picture;
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  margin: 16px 32px 12px;
  font-size: 24px;
  font-weight: 500;
  color: #121212;
  text-align: center;
}

.tip {
  text-align: center;
  margin-bottom: 0px;
  color: rgb(161, 63, 63);
}

.progress {
  height: 20px;
  margin: 10px;
  margin-bottom: 0;
}

.img-container {
  padding: 0 10px;

  img {
    cursor: pointer;
  }
}

.footer {
  padding: 32px 10px 0;
  text-align: center;

  button {
    width: 100%;
    height: 36px;
    font-size: 16px;
  }
}
</style>
