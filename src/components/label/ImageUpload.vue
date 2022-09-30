<template>
  <div class="clearfix">
    <a-upload list-type="picture-card" :file-list="fileList" :custom-request="uploadLabelLogo" :remove="remove" @preview="handlePreview" @change="handleChange">
      <div v-if="fileList.length < 1">
        <a-icon type="plus" />
        <div class="ant-upload-text">
          Upload
        </div>
      </div>
    </a-upload>
    <a-modal :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script>
import labelService from '@/service/labelService';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  props: {
    // 标签logo
    labelLogo: { type: String, default: null },
  },

  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  },

  methods: {
    // 标签logo上传
    uploadLabelLogo(info) {
      // 校验图片大小（不能超过5M）
      if (info.file.size > 5 * 1024 * 1024) {
        this.$message.warning(this.$t('common.avatarSizeTip'));
        // TODO: Bug unknown refs.md
        // this.$refs.md.$img2Url(pos, null);
        return;
      }

      const data = new FormData();
      data.append('logo', info.file);

      labelService
        .uploadLabelLogo(data)
        .then(res => {
          this.fileList[0].status = 'done';
          this.fileList[0].url = res.data;
          this.$emit('labelLogoFn', res.data);
        })
        .catch(err => {
          this.fileList[0].status = 'error';
          this.$message.error(err.desc);
        });
    },

    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },

    handleChange({ fileList }) {
      this.fileList = fileList;
    },

    remove() {
      this.$emit('labelLogoFn', null);
    },

    // 清空fileList
    clearFileList() {
      this.fileList = [];
    },
  },

  mounted() {
    // 编辑
    if (this.labelLogo) {
      this.fileList = [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: this.labelLogo,
        },
      ];
    }
  },
};
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
