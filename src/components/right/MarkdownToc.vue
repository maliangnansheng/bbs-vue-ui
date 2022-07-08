<template>
  <div id="markdown-toc" :style="top ? 'position: fixed; z-index: 999;top: 64px;width: 275px;' : ''">
    <header class="article-toc-header">
      {{ $t("common.toc") }}
    </header>
    <a-divider style="margin: 10px 0 0 0;"/>
    <div class="toc-content" v-html="articleHtml"></div>
  </div>
</template>

<script>
  export default {
    name: "MarkdownToc",

    props: {
      articleHtml: {type: String, default: ''},
    },

    data() {
      return {
        top: false,
      }
    },

    methods: {
      handleScroll(el) {
        el.onscroll = ({target}) => {
          /**
           * scrollTop:滚动条滚动距离;
           * scrollHeight:文档内容实际高度（包括超出视窗的溢出部分）;
           * clientHeight:窗口可视范围高度
           */
          const {scrollTop, scrollHeight, clientHeight} = target;
          /**
           * @property hasNext 列表是否还有没加载完的（是否已经加载完最后一项），是后台返回的结果
           * @property finish 上个请求是否完成，完成后才可以进行下个请求
           * @function loadMore 加载下一页的方法
           */
          if (scrollTop > 850) {
            this.top = true;
          } else {
            this.top = false;
          }
        };
      }
    },

    mounted() {
      // 监听滚动
      this.handleScroll.call(this, document.querySelector('#app'));
    },

  }
</script>

<style lang="less" scoped>
  #markdown-toc {
    padding-bottom: 10px;

    .toc-content {
      max-height: 700px;
      overflow: auto;
    }
  }

  #markdown-toc .article-toc-header {
    padding: 15px 10px 0 15px;
  }

  // 深度选择器 >>>
  #markdown-toc {
    /deep/ * {
      .catalog-list {
        font-weight: 600;
        position: relative;
        font-size: 15px;
      }

      & > li > a {
        position: relative;
        padding-left: 15px;
        line-height: 20px;
      }

      ul, li {
        padding: 0;
        margin: 0;
        list-style: none;
      }

      ul > li > a {
        font-size: 14px;
        color: #333333;
        padding-left: 15px;
        font-weight: 500;
        position: relative;
      }

      ul > ul > li > a {
        line-height: 20px;
        font-size: 14px;
        color: #333333;
        padding-left: 30px;
        font-weight: normal;
      }

      a {
        color: #000;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 6px 0;

        &:hover {
          background-color: #8b87870a;
        }
      }
    }
  }
</style>