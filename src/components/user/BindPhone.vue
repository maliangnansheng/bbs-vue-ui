<template>
  <a-modal
      :centered="true"
      :title="$t('common.bindPhone')"
      :destroyOnClose="true"
      :maskClosable="true"
      width="360px"
      :confirmLoading="loading"
      @cancel="handleCancel"
      :cancelButtonProps="{ style: { display: 'none' } }"
      :okText="$t('common.bind')"
      :bodyStyle="{ padding: '5px 24px' }"
      @ok="handleOk"
      :visible="visible"
  >
    <a-form :form="form">
      <a-form-item class="user-config-form-item">
        <a-input
            :placeholder="$t('common.phone')"
            v-decorator="[
            'phone',
            {
              rules: [
                {
                  required: true,
                  validator
                }
              ],
              validateTrigger: ['blur']
            }
          ]"
        ></a-input>
        <a-button @click="sendSmsVerifyCode">{{ $t("common.getValidateCode") }}</a-button>
      </a-form-item>
    </a-form>
    <a-form v-if="sentVerifyCode" :form="verifyForm">
      <a-form-item class="user-config-form-item">
        <a-input
            :placeholder="$t('common.validateCode')"
            v-decorator="[
            'code',
            {
              rules: [
                {
                  required: true,
                  message: $t('common.needVerifyCode')
                }
              ],
              validateTrigger: ['blur']
            }
          ]"
        ></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import userService from "@/service/userService";

  export default {
    props: {
      visible: {type: Boolean, default: false},
    },

    data() {
      return {
        form: this.$form.createForm(this, {name: 'coordinated'}),
        loading: false,
        // sentVerifyCode 标志位,验证码是否发送成功
        sentVerifyCode: false,
        phoneReg: /^((13[0-9])|(15[^4,\D])|(14[57])|(17[0])|(17[7])|(18[0,0-9]))\d{8}$/
      };
    },

    methods: {
      handleOk() {
        // 请求前先做校验  校验合法再做请求
        let phone, code;
        this.form.validateFields((err, values) => {
          if (err) {
            return;
          }
          phone = values.phone;
        });
        this.verifyForm.validateFields((err, values) => {
          if (err) {
            return;
          }
          code = values.code;
        });
        if (!phone) {
          return;
        }
        if (!this.sentVerifyCode) {
          this.$message.warning(this.$t("common.sendVerifyCodeFirst"));
          return;
        }
        if (!code) {
          return;
        }
        // 校验通过后发送请求绑定手机
        userService.bindPhone({phone, code})
            .then(() => {
              this.$message.success(this.$t("common.bindPhoneSuccessed"));
              this.$emit("refresh");
              this.handleCancel();
            })
            .catch(err => {
              this.$message.error(err.desc);
            });
      },

      // 点击取消需要重置数据
      handleCancel() {
        this.form.resetFields();
        this.verifyForm.resetFields();
        this.sentVerifyCode = false;
        this.$emit("closeModal");
      },

      // 发送验证码
      sendSmsVerifyCode() {
        this.form.validateFields((err, values) => {
          if (!err) {
            userService.sendSmsVerifyCode(values)
                .then(() => {
                  this.$message.success(this.$t("common.verifyCodeSendSuccessed"));
                  this.sentVerifyCode = true;
                })
                .catch(err => {
                  this.$message.error(err.desc);
                });
          }
        });
      },

      // 自定义校验规则
      validator(rule, value, callback) {
        if (!value) {
          callback(this.$t("common.phone") + this.$t("common.required"));
          return;
        }
        if (!this.phoneReg.test(value)) {
          callback(this.$t("common.phoneInvalid"));
          return;
        }
        const phone = {phone: value};
        this.isValidPhone(phone)
            .then(() => {
              callback();
            })
            .catch(reason => {
              if (reason.desc) {
                callback(reason.desc);
              }
              callback();
            });
      },

      // 发送数据判断该手机号是否已经被绑定
      isValidPhone(phone) {
        return new Promise((resolve, reject) => {
          userService.isValidPhone(phone)
              .then(res => {
                if (res.code === 0) {
                  resolve(res);
                } else {
                  throw res;
                }
              })
              .catch(err => {
                reject(err);
              });
        });
      }
    },

    beforeCreate() {
      this.form = this.$form.createForm(this);
      this.verifyForm = this.$form.createForm(this, "verify");
    }
  };
</script>

<style scoped>
  .input-item:first-child {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  input {
    width: 200px;
  }

  button {
    margin-left: 10px;
  }
</style>
