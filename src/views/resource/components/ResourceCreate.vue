<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 17 }" @submit="handleSubmit">
    <!-- 添加资源导航 -->
    <a-form-item :label="$t('common.resourceName')">
      <a-input v-decorator="['resourceName', validatorRules.resourceName]" :placeholder="$t('common.pleaseResource')" />
    </a-form-item>
    <a-form-item :label="$t('common.resourceCategory')">
      <a-input v-decorator="['category', validatorRules.resourceCategory]" :placeholder="$t('common.pleaseCategory')" />
    </a-form-item>
    <a-form-item :label="$t('common.resourceDesc')">
      <a-input v-decorator="['desc', validatorRules.resourceDesc]" :placeholder="$t('common.pleaseDesc')" />
    </a-form-item>
    <a-form-item :label="$t('common.resourceLink')">
      <a-input v-decorator="['link', validatorRules.resourceDesc]" :placeholder="$t('common.pleaseLink')" />
    </a-form-item>
    <!-- 资源封面 -->
    <a-form-item :label="$t('common.resourceLogo')">
      <image-upload ref="child" :resource-logo="resourceLogo" @resourceLogoFn="resourceLogoFn" />
    </a-form-item>
    <a-divider style="margin: 10px 0"></a-divider>
    <a-form-item class="form-item-submit">
      <a-button type="primary" html-type="submit">{{ $t('common.sureAndAdd') }}</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import resourceService from '@/service/resourceService';
import ImageUpload from './ImageUpload';

export default {
  components: { ImageUpload },

  props: {
    // 资源导航id
    resourceId: { type: Number, default: 0 },
    // 资源导航名称
    resourceName: { type: String, default: '' },
    // 资源导航名称
    category: { type: String, default: '' },
    // 资源导航名称
    desc: { type: String, default: '' },
    // 资源导航名称
    link: { type: String, default: '' },
    // 资源导航logo
    resourceLogoInit: { type: String, default: null },
  },

  data() {
    return {
      // 资源导航logo
      resourceLogo: this.resourceLogoInit,
      form: this.$form.createForm(this, { name: 'coordinated' }),
      // 表单验证
      validatorRules: {
        resourceName: {
          // 检验规则
          rules: [
            // 是否必须填写
            { required: true, message: this.$t('common.pleaseResource') },
          ],
        },
        resourceCategory: {
          // 检验规则
          rules: [
            // 是否必须填写
            { required: true, message: this.$t('common.resourceCategory') },
          ],
        },
        resourceDesc: {
          // 检验规则
          rules: [
            // 是否必须填写
            { required: true, message: this.$t('common.resourceDesc') },
          ],
        },
        resourceLink: {
          // 检验规则
          rules: [
            // 是否必须填写
            { required: true, message: this.$t('common.resourceLink') },
          ],
        },
      },
    };
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();

      this.form.validateFields((err, values) => {
        if (!err) {
          const data = {
            logo: this.resourceLogo,
            resourceName: values.resourceName,
            category: values.category,
            desc: values.desc,
            link: values.link,
          };
          if (this.resourceLogo) {
            // 更新
            if (this.resourceId) {
              data.id = this.resourceId;
              this.resourceUpdate(data);
              // 新增
            } else {
              this.resourceCreate(data);
            }
          } else {
            this.$message.warning('请上传资源导航Logo');
          }
        }
      });
    },

    // 新增资源导航
    resourceCreate(data) {
      resourceService
        .resourceCreate(data)
        .then(res => {
          // 清空表单
          this.form.resetFields();
          // 清空logo
          this.$refs.child.clearFileList();
          // 隐藏气泡框
          this.$emit('hideResourceVisibleFn');
          this.refresh();
        })
        .catch(err => {
          this.$message.error(err.desc);
        });
    },

    // 更新资源导航
    resourceUpdate(data) {
      resourceService
        .resourceUpdate(data)
        .then(res => {
          this.$emit('hideResourceVisibleFn', data.id);
          this.refresh();
        })
        .catch(err => {
          this.$message.error(err.desc);
        });
    },

    resourceLogoFn(logo) {
      this.resourceLogo = logo;
    },

    refresh() {
      this.$emit('refresh');
    },
  },

  mounted() {
    // v-mode和v-decorator冲突问题解决方案
    this.form.setFieldsValue({
      resourceName: this.resourceName,
      category: this.category,
      desc: this.desc,
      link: this.link,
    });
  },
};
</script>

<style scoped>
/* 提交按钮样式 */
.form-item-submit {
  display: flex;
  text-align: right;
  justify-content: right;
  margin-bottom: 0;
}
</style>
