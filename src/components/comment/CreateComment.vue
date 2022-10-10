<template>
  <div id="create-comment">
    <div class="top">
      <a-form :form="form" @submit="handleSubmit" style="width: 100%">
        <a-form-item>
          <a-textarea
            allow-clear
            @keydown.enter.native="keyDown"
            v-decorator="['content', validatorRules.comment]"
            :placeholder="$t('common.commentPlaceholder')"
            :auto-size="{ minRows: 3, maxRows: 10 }"
            :auto-focus="autoFocus"
            @blur="handleBlur"
          />
          <a-button class="button" type="primary" html-type="submit" style="float: right">
            {{ $t('common.postComment') }}
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { useLogin } from '@/components/login';

import commentService from '@/service/commentService';

export default {
  name: 'CreateComment',

  props: {
    preId: { type: Number, default: 0 },
    autoFocus: { type: Boolean, default: false },
  },

  data() {
    return {
      data: {},
      form: this.$form.createForm(this, { name: 'coordinated' }),
      // 表单验证
      validatorRules: {
        comment: {
          // 检验规则
          rules: [
            // 是否必须填写
            { required: true, message: this.$t('common.pleaseEnterComment') },
          ],
        },
      },
    };
  },

  methods: {
    // 用户点击了ctrl+enter触发
    keyDown(e) {
      if (e.ctrlKey && e.keyCode === 13) {
        this.handleSubmit(e);
      }
    },

    // 失焦判断是否为空，为空则隐藏
    handleBlur() {
      const val = this.form.getFieldsValue().content;
      if (!val) {
        this.$emit('hidden');
      }
    },

    // 发表评论
    handleSubmit(e) {
      e.preventDefault();
      if (this.$store.state.isLogin) {
        this.form.validateFields((err, values) => {
          if (!err) {
            if (this.preId) {
              this.data.preId = this.preId;
            } else {
              this.data.preId = 0;
            }
            this.data.articleId = this.$route.params.id;
            this.data.content = values.content;
            this.createComment();
          }
        });
      } else {
        useLogin();
      }
    },

    // 添加评论
    createComment() {
      commentService
        .createComment(this.data)
        .then(res => {
          // 清空表单
          this.form.resetFields();
          this.$emit('refresh');
        })
        .catch(err => {
          this.$message.error(err.desc);
        });
    },
  },
};
</script>

<style lang="less" scoped>
#create-comment .top {
  display: flex;
  justify-content: center;
  align-items: center;

  .avatar {
    margin-right: 15px;
  }
}
</style>
