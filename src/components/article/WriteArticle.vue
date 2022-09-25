<template>
  <div id="write-article">
    <div class="left">
      <a-input class="write-item" v-model="articleTitle" :placeholder="$t('common.enterArticleTitle')" size="large"/>
      <a-popover v-model="visible" :title="$t('common.releaseArticle')" trigger="click" placement="bottomRight">
        <div slot="content" style="width: 500px;">
          <ArticleBasicInfo
              :articleLabel="articleLabel"
              :articleTitleMap="articleTitleMap"
              :articleTitle="articleTitle"
              :htmlCode="htmlCode"
              :markdownCode="markdownCode"/>
        </div>
        <a-button class="write-item" type="primary" style="height: 30px;"
                  v-text="$route.params.id ? $t('common.update') : $t('common.release')"></a-button>
      </a-popover>
      <a-icon class="write-item" type="swap"/>
      <a-tooltip placement="bottom">
        <template slot="title">
          {{ $t("common.homePage") }}
        </template>
        <div style="cursor: pointer;" @click="routerUserCenter($store.state.userId)">
          <a-avatar :size="46" slot="avatar" class="write-item"
                    :src="$store.state.picture ? $store.state.picture : require('@/assets/img/default_avatar.png')"/>
        </div>
      </a-tooltip>
    </div>
    <div class="right">
      <mavon-editor ref=md @imgAdd="imgAdd" @change="markdownChange" v-model="markdownCode"
                    :toolbars="toolbars"
                    toolbarsBackground="#f4f4f4"
                    codeStyle="obsidian"
                    boxShadowStyle=""
                    :placeholder="$t('common.startEditing')"></mavon-editor>
    </div>

    <!-- 登录Model -->
    <Login />
    <!-- 注册Model -->
    <Register />
  </div>
</template>

<script>
import articleService from "@/service/articleService";
import ArticleBasicInfo from "@/components/article/ArticleBasicInfo";
import Login from "@/components/login/Login";
import Register from "@/components/login/Register";

export default {
  components: {ArticleBasicInfo, Login, Register},

  data() {
    return {
      // 文章标签
      articleLabel: [],
      // 题图
      articleTitleMap: '',
      // 文章标题
      articleTitle: '',
      // 文章内容
      markdownCode: '',
      htmlCode: '',
      visible: false,
      toolbars: {
        // 粗体
        bold: true,
        // 斜体
        italic: true,
        // 标题
        header: true,
        // 下划线
        underline: true,
        // 中划线
        strikethrough: true,
        // 标记
        mark: true,
        // 上角标
        superscript: true,
        // 下角标
        subscript: true,
        // 引用
        quote: true,
        // 有序列表
        ol: true,
        // 无序列表
        ul: true,
        // 链接
        link: true,
        // 图片链接
        imagelink: true,
        // code
        code: true,
        // 表格
        table: true,
        // 全屏编辑
        fullscreen: true,
        // 沉浸式阅读
        readmodel: true,
        // 展示html源码
        htmlcode: true,
        // 帮助
        help: true,
        /* 1.3.5 */
        // 上一步
        undo: true,
        // 下一步
        redo: true,
        // 清空
        trash: true,
        // 保存（触发events中的save事件）
        save: false,
        /* 1.4.2 */
        // 导航目录
        navigation: true,
        /* 2.1.8 */
        // 左对齐
        alignleft: true,
        // 居中
        aligncenter: true,
        // 右对齐
        alignright: true,
        /* 2.2.1 */
        // 单双栏模式
        subfield: false,
        // 预览
        preview: true,
      }
    };
  },

  methods: {
    // 绑定@imgAdd event
    imgAdd(pos, $file) {
      // 校验图片大小（不能超过5M）
      if ($file.size > 5 * 1024 * 1024) {
        this.$message.warning(this.$t("common.avatarSizeTip"));
        this.$refs.md.$img2Url(pos, null);
        return;
      }
      // 第一步.将图片上传到服务器.
      const formData = new FormData();
      formData.append('picture', $file);
      articleService.uploadPicture(formData)
          .then((res) => {
            /**
             * $vm指为mavonEditor实例，可以通过如下两种方式获取
             * 1、通过引入对象获取: import {mavonEditor} from ... 等方式引入后，此时$vm即为mavonEditor
             * 2、通过$refs获取: html声明ref : <mavon-editor ref=md ></mavon-editor>， 此时$vm为 this.$refs.md`（我使用$vm反正是不行的）
             */
            // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
            this.$refs.md.$img2Url(pos, res.data);
          })
          .catch(err => {
            this.$message.error(err.desc);
          });
    },

    // 获取文章详细信息
    getArticleById() {
      articleService.getArticleById({id: this.$route.params.id})
          .then(res => {
            // 标题
            this.articleTitle = res.data.title;
            // 内容
            this.markdownCode = res.data.markdown;
            // 标签
            res.data.labelDTOS.forEach((item) => {
              this.articleLabel.push(item.id);
            })
            // 题图
            this.articleTitleMap = res.data.titleMap;
          })
          .catch(err => {
            this.$message.error(err.desc);
          });
    },

    // markdown编辑改变事件
    markdownChange() {
      this.htmlCode = this.$refs.md.d_render;
      // this.markdownCode = this.$refs.md.d_value;
    },

    // 路由到用户中心页面
    routerUserCenter(userId) {
      if (this.$store.state.isLogin) {
        let routeData = this.$router.resolve("/user/" + userId);
        window.open(routeData.href, '_blank');
      } else {
        this.$store.state.loginVisible = true;
      }
    }
  },

  mounted() {
    // 地址栏有值（更新文章）才调用
    if (this.$route.params.id) {
      this.getArticleById();
    }
  }
}
</script>

<style>
#write-article {
  height: 100%;
}

#write-article .left {
  height: 8%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

#write-article .right {
  height: 92%;
}

#write-article .write-item {
  height: auto;
  margin: 0 15px;
}

#write-article .ant-input {
  height: 50px;
  border: none;
  font-size: 26px;
}

/* 让markdown占满 */
#write-article .v-note-wrapper.markdown-body.shadow {
  height: 100%
}

/* 代码高亮部分设置样式 */
#write-article .markdown-body .highlight pre, .markdown-body pre {
  padding: 0!important;
}
#write-article .hljs {
  padding: 10px;
}

/* markdown */
#write-article .v-note-wrapper {
  z-index: 900;
}

/* markdown */
#write-article .v-note-wrapper.markdown-body.shadow {
  z-index: 0!important;
}
</style>