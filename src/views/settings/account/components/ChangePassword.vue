<template>
  <a-modal
    :centered="true"
    :title="$t('common.changePassword')"
    :destroy-on-close="true"
    :mask-closable="true"
    width="360px"
    class="change-password-modal"
    :confirm-loading="loading"
    @cancel="handleCancel"
    @ok="handleOk"
    :cancel-button-props="{ style: { display: 'none' } }"
    :ok-text="$t('common.reset')"
    :body-style="{ padding: '5px 24px' }"
    :visible="visible"
  >
    <a-form :form="form" :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }">
      <a-form-item :label="labels.oldPassword">
        <a-input-password
          :placeholder="$t('common.oldPassword')"
          v-decorator="[
            'oldPassword',
            {
              rules: [
                {
                  required: true,
                  message: $t('common.needOldPassword'),
                },
              ],
              validateTrigger: ['blur'],
            },
          ]"
        ></a-input-password>
      </a-form-item>
      <a-form-item :label="labels.newPassword">
        <a-input-password
          :placeholder="$t('common.newPassword')"
          v-decorator="[
            'newPassword',
            {
              rules: [
                {
                  required: true,
                  message: $t('common.needNewPassword'),
                },
              ],
              validateTrigger: ['blur'],
            },
          ]"
        ></a-input-password>
      </a-form-item>
      <a-form-item :label="labels.confirmPassword">
        <a-input-password
          :placeholder="$t('common.newPasswordAgain')"
          v-decorator="[
            'newPasswordAgain',
            {
              rules: [
                {
                  required: true,
                  message: $t('common.newPasswordAgain'),
                },
              ],
              validateTrigger: ['blur'],
            },
          ]"
        ></a-input-password>
      </a-form-item>
    </a-form>
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
      form: this.$form.createForm(this, { name: 'coordinated' }),
    };
  },

  computed: {
    //由于修改密码modal宽度较小，屏幕小的时候需要将label缩写
    labels() {
      if (this.$store.state.width >= 500) {
        return {
          oldPassword: this.$t('common.oldPassword'),
          newPassword: this.$t('common.newPassword'),
          confirmPassword: this.$t('common.confirmPassword'),
        };
      }
      return {
        oldPassword: this.$t('common.oldPasswordShort'),
        newPassword: this.$t('common.newPasswordShort'),
        confirmPassword: this.$t('common.confirmPasswordShort'),
      };
    },
  },

  methods: {
    // 用户点击确定后校验表单并且发送请求修改密码
    handleOk() {
      this.form.validateFields((err, { oldPassword, newPassword, newPasswordAgain }) => {
        if (err) {
          return;
        }
        if (newPassword !== newPasswordAgain) {
          this.$message.warning(this.$t('common.passwordNotMatch'));
          return;
        }
        userService
          .updatePassword({ oldPassword, newPassword })
          .then(() => {
            this.$message.success(this.$t('common.changePasswordSuccessed'));
            this.$emit('refresh');
            this.handleCancel();
          })
          .catch(err => {
            this.$message.error(err.desc);
          });
      });
    },

    // 点击取消需要充值表单
    handleCancel() {
      this.form.resetFields();
      this.$emit('closeModal');
    },
  },

  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.verifyForm = this.$form.createForm(this, 'verify');
  },
};
</script>

<style lang="less" scoped>
.input-item:first-child {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.change-password-modal {
  .ant-form-item {
    margin-bottom: 0;
  }
}

button {
  margin-left: 10px;
}
</style>
