<template>
  <div id="article-basic-info">
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 17 }" @submit="handleSubmit">
      <!-- 添加标签 -->
      <a-form-item :label="$t('common.addLabel')">
        <a-select mode="multiple"
                  v-decorator="['lableId', validatorRules.label]"
                  :placeholder="$t('common.selectLabel')"
                  @change="handleSelectChange">
          <a-select-option v-for="item of listData" :key="item.id">
            {{ item.labelName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <!-- 文章封面 -->
      <a-form-item :label="$t('common.articleCover')">
        <UploadImage
            :articleTitleMap="articleTitleMap"
            @titleMap="titleMap"/>
      </a-form-item>
      <a-divider style="margin: 10px 0;"></a-divider>
      <a-form-item class="form-item-submit">
        <a-button type="primary" html-type="submit">
          {{ $route.params.id ? $t('common.sureAndUpdate') : $t('common.sureAndRelease') }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import labelService from "@/service/labelService";
import articleService from "@/service/articleService";
import UploadImage from "@/components/article/UploadImage";

export default {
  components: {UploadImage},

  props: {
    // 文章创建者
    articleUser: {type: Number, default: 0},
    // 文章标签
    articleLabel: {type: Array, default: []},
    // 题图
    articleTitleMap: {type: String, default: ""},
    // 文章标题
    articleTitle: {type: String, default: ""},
    // 文章内容
    markdownCode: {type: String, default: ""},
    htmlCode: {type: String, default: ""},
  },

  data() {
    return {
      // 题图
      articleFile: null,
      // 标签
      listData: [],
      params: {currentPage: 1, pageSize: 10},
      form: this.$form.createForm(this, {name: 'coordinated'}),
      // 表单验证
      validatorRules: {
        label: {
          // 检验规则
          rules: [
              // 是否必须填写
              { required: true, message: this.$t('common.selectLabel') }
          ]
        }
      }
    }
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();

      if (this.articleTitle.length === 0) {
        this.$message.warning("标题不能为空");
        return;
      }

      if (this.htmlCode.length === 0 || this.markdownCode.length === 0) {
        this.$message.warning("内容不能为空");
        return;
      }

      // 校验图片大小（不能超过5M）
      if (this.articleFile !== null && this.articleFile.size > 5 * 1024 * 1024) {
        this.$message.warning(this.$t("common.avatarSizeTip"));
        return;
      }

      this.form.validateFields((err, values) => {
        if (!err) {
          const data = new FormData();
          data.append("file", this.articleFile);
          data.append("title", this.articleTitle);
          data.append("markdown", this.markdownCode);
          data.append("html", this.htmlCode);
          data.append("labelIds", values.lableId);
          // 地址栏有值（更新文章）才调用
          let articleId = this.$route.params.id;
          if (articleId) {
            data.append("id", articleId);
            this.articleUpdate(data);
          } else {
            this.articleCreate(data);
          }
        }
      });
    },

    handleSelectChange(value) {
      if (value.length > 3) {
        this.$message.warning("最多只能添加3个标签");
        value.splice(-1);
      }
    },

    getLabelList(params) {
      labelService.getLabelList(params)
          .then(res => {
            this.listData = res.data.list;
          })
          .catch(err => {
            this.$message.error(err.desc);
          });
    },

    // 写文章
    articleCreate(data) {
      articleService.articleCreate(data)
          .then(res => {
            this.$router.push("/user/" + this.$store.state.userId + "/article");
          })
          .catch(err => {
            this.$message.error(err.desc);
          });
    },

    // 更新文章
    articleUpdate(data) {
      if (this.$store.state.userId !== this.articleUser) {
        this.$message.warning("你无权编辑他人撰写的文章");
        return;
      }
      articleService.articleUpdate(data)
          .then(res => {
            // 返回上一页
            this.$router.go(-1);
          })
          .catch(err => {
            this.$message.error(err.desc);
          });
    },

    titleMap(file) {
      this.articleFile = file;
    },
  },

  mounted() {
    this.params.pageSize = 100;
    this.getLabelList(this.params);
    // v-mode和v-decorator冲突问题解决方案
    this.form.setFieldsValue({
      lableId: this.articleLabel,
    })
  }
}
</script>

<style>
/* 提交按钮样式 */
#article-basic-info .form-item-submit {
  display: flex;
  text-align: right;
  justify-content: right;
  margin-bottom: 0;
}
</style>