<template>
  <div id="account-settings" v-if="!spinning">
    <p>{{ $t('common.accountSettings') }}</p>
    <a-divider/>
    <div class="settings-content">
      <section>
        <div class="title">
          {{ $t("common.phone") }}
        </div>
        <div v-if="user.phone" class="phone-fields">
          <div>{{ user.phone }}</div>
        </div>
        <div>
          <a-popconfirm v-if="user.phone" :title="$t('common.unBindPhoneTitle')" @confirm="toggleBindPhone()"
                        class="operation">
            <a-button type="danger" size="small">
              {{ $t("common.unBind") }}
            </a-button>
          </a-popconfirm>
          <a-button v-else @click="toggleBindPhone" type="primary" size="small">
            {{ $t("common.bind") }}
          </a-button>
        </div>
      </section>
      <a-divider/>
      <section>
        <div class="title">
          {{ $t("common.email") }}
        </div>
        <div v-if="user.email" class="email-fields phone-fields">
          <div>{{ user.email }}</div>
        </div>
        <div>
          <a-popconfirm v-if="user.email" :title="$t('common.unBindEmailTitle')" @confirm="toggleBindEmail()"
                        class="operation">
            <a-button type="danger" size="small">
              {{ $t("common.unBind") }}
            </a-button>
          </a-popconfirm>
          <a-button v-else @click="toggleBindEmail" type="primary" size="small">{{ $t("common.bind") }}
          </a-button>
        </div>
      </section>
      <a-divider/>
      <section>
        <div class="title">
          {{ $t("common.userPassword") }}
        </div>
        <div class="password-fields phone-fields">
          <div>{{ "***************" }}</div>
        </div>
        <div class="operation">
          <a-button @click="changePassword" type="primary" size="small">
            {{ $t("common.reset") }}
          </a-button>
        </div>
      </section>
      <a-divider/>
    </div>
    <BindPhone
        :title="user.phone"
        :visible="bindPhoneVisible"
        @refresh="refresh"
        @closeModal="() => (bindPhoneVisible = false)"/>
    <BindEmail
        :title="user.email"
        :visible="bindEmailVisible"
        @refresh="refresh"
        @closeModal="() => (bindEmailVisible = false)"/>
    <ChangePassword
        :visible="changePasswordVisible"
        @refresh="refresh"
        @closeModal="() => (changePasswordVisible = false)"/>
  </div>
</template>

<script>
  import BindPhone from "@/components/user/BindPhone";
  import BindEmail from "@/components/user/BindEmail";
  import ChangePassword from "@/components/user/ChangePassword";
  import userService from "@/service/userService";

  export default {
    name: "",

    components: {BindPhone, BindEmail, ChangePassword},

    data() {
      return {
        // 加载中...
        spinning: true,
        userId: this.$store.state.userId,
        // 用户信息
        user: {},
        visible: false,
        bindPhoneVisible: false,
        bindEmailVisible: false,
        changePasswordVisible: false,
      }
    },

    methods: {
      // 获取用户信息
      getUserInfo() {
        userService.getUserInfo({userId: this.userId})
            .then(res => {
              this.spinning = false;
              this.user = res.data;
            })
            .catch(err => {
              this.$message.error(err.desc);
            });
      },

      // 更改密码
      changePassword() {
        this.changePasswordVisible = true;
      },

      // 绑定|解绑邮箱
      toggleBindEmail() {
        if (this.user.email) {
          userService.untieEmail()
              .then(() => {
                this.$message.success(this.$t("common.unBindEmailSuccessed"));
                this.refresh();
                this.editMode = false;
              })
              .catch((err) => {
                this.$message.error(err.desc);
              });
        } else {
          this.bindEmailVisible = true;
        }
      },

      // 绑定|解绑手机
      toggleBindPhone() {
        if (this.user.phone) {
          userService.untiePhone()
              .then(() => {
                this.$message.success(this.$t("common.unBindPhoneSuccessed"));
                this.refresh();
                this.editMode = false;
              })
              .catch((err) => {
                this.$message.error(err.desc);
              });
        } else {
          this.bindPhoneVisible = true;
        }
      },

      refresh() {
        this.getUserInfo();
      },

    },

    mounted() {
      this.getUserInfo();
    }
  }
</script>

<style lang="less" scoped>
  #account-settings {
    padding: 30px;

    p {
      font-weight: 600;
      font-size: 20px;
      line-height: 18px;
      color: #333;
    }

    .settings-content {
      section {
        margin: 24px 0;
        display: flex;
        align-items: center;

        .title {
          width: 150px;
          padding: 0 10px;
        }

        .operation {
          margin-left: 20px;
        }

        @media screen and(min-width: 750px) {
          .title {
            width: 150px;
          }
        }
        @media screen and(max-width: 750px) {
          .title {
            width: 110px;
          }
        }
      }
    }

  }
</style>