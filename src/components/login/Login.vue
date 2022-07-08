<template>
  <div @click="showLoginModal">
    <div class="options">
      <a-button style="border: 1px solid rgba(30,128,255,.3); background: rgba(30,128,255,.05); color: #007fff;">
        {{ $t("common.login") }}
      </a-button>
    </div>
    <a-modal v-model="$store.state.loginVisible" @ok="handleOk" :footer="null" :width="'320px'">
      <a-form id="login-form-content"
              :form="form"
              class="login-form"
              @submit="handleSubmit"
      >
        <h1 class="title">{{ $t("common.accountPasswordLogin") }}</h1>
        <a-form-item>
          <a-input
              v-decorator="['name',{ rules: [{ required: true, message: $t('common.pleaseInputYourUsername') }] },]"
              :placeholder="$t('common.username')" size="large">
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
              v-decorator="['password', { rules: [{ required: true, message: $t('common.pleaseInputYourPassword') }] },]"
              type="password" :placeholder="$t('common.password')" size="large">
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox v-decorator="[ 'remember', { valuePropName: 'checked', initialValue: true, }, ]">
            {{ $t("common.rememberMe") }}
          </a-checkbox>
          <span class="login-form-forgot">
            {{ $t("common.forgotPassword") }}
          </span>
          <a-button type="primary" html-type="submit" class="login-form-button" size="large">
            {{ $t("common.login") }}
          </a-button>
          Or
          <a @click="register">
            {{ $t("common.registerNow") }}
          </a>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
  import loginService from "@/service/loginService";

  export default {
    beforeCreate() {
      this.form = this.$form.createForm(this, {name: 'normal_login'});
    },

    methods: {
      // 显示登录框
      showLoginModal() {
        this.$store.state.loginVisible = true;
      },

      // 隐藏登录框
      handleOk() {
        this.$store.state.loginVisible = false;
      },

      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            loginService.login(values)
                .then(res => {
                  // 登录用户id
                  this.$store.state.userId = res.data.userId;
                  // 用户是否已经登录
                  this.$store.state.isLogin = true;
                  // 关闭登录modal
                  this.$store.state.loginVisible = false;
                  // 刷新
                  this.$emit("refresh");
                  this.$message.success(this.$t('common.loginSuccess'));
                })
                .catch(err => {
                  this.$message.error(err.desc);
                });
          }
        });
      },

      register() {
        this.$store.state.loginVisible = false;
        this.$store.state.registerVisible = true;
      },

    },
  }
</script>

<style>
  #login-form-content .title {
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 15px;
  }

  #login-form-content .ant-input-affix-wrapper .ant-input {
    font-size: 14px;
  }

  #login-form-content .login-form-forgot {
    float: right;
  }

  #login-form-content .login-form-button {
    width: 100%;
  }

  #login-form-content .ant-form-item {
    margin-bottom: 10px;
  }
</style>