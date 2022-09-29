<template>
  <a-affix :offset-top="70" :target="getAppEl">
    <div id="markdown-toc">
      <header class="article-toc-header" :style="`transition:all 0.2s;margin: 0;margin-top:${$store.state.headerVisible ? '0' : '-60'}px`">
        {{ $t('common.toc') }}
      </header>
      <a-divider style="margin: 10px 0 0 0" />
      <div class="toc-content" v-html="articleHtml"></div>
    </div>
  </a-affix>
</template>

<script>
export default {
  name: 'MarkdownToc',

  props: {
    articleHtml: { type: String, default: '' },
  },

  methods: {
    getAppEl() {
      return document.getElementById('app');
    },
  },
};
</script>

<style lang="less" scoped>
#markdown-toc {
  padding-bottom: 10px;
  background-color: #fff;

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

    ul,
    li {
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

<style lang="less">
#markdown-toc {
  .active,
  .active > a {
    color: #0366d6 !important;
  }
}
</style>
