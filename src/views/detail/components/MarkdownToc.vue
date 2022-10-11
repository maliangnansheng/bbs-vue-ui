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

  mounted() {
    const unWatch = this.$watch(
      'articleHtml',
      val => {
        if (val) {
          const timer = setTimeout(() => {
            unWatch();
            clearTimeout(timer);
            this.monitorScrollForTopicHighlight();
          }, 800);
        }
      },
      { immediate: true },
    );
  },

  methods: {
    getAppEl() {
      return document.getElementById('app');
    },

    // 设置标题目录追踪滚动高亮当前标题
    monitorScrollForTopicHighlight() {
      const toc = document.querySelector('#markdown-toc');
      if (!toc) return;
      const app = document.getElementById('app');
      const articleContent = document.querySelector('.article-content');
      const topics = articleContent.querySelectorAll('h1,h2,h3,h4,h5,h6'); // 标题
      const lis = toc.querySelectorAll('li'); // 目录-标题项

      const removeActive = () => {
        for (let i = 0; i < lis.length; i++) {
          lis[i].classList.remove('active');
        }
      };

      // 处理标题内容少，导致高度不足以进入检测区域时，无法高亮的问题
      const tocClickEventCB = ev => {
        if (ev.target.nodeName === 'A') {
          const parentNode = ev.target.parentNode;
          if (parentNode && parentNode.nodeName === 'LI') {
            removeActive();
            parentNode.classList.add('active');
          }
        }
      };
      toc.addEventListener('click', tocClickEventCB);

      // 处理带锚点进入页面，底部高度不足以进入检测区域时，无法高亮的问题
      const hash = location.hash;
      if (hash) {
        const activeAnchor = toc.querySelector(`a[href="${hash}"]`);
        const activeAnchorParent = activeAnchor.parentNode;
        if (activeAnchor) {
          removeActive();
          activeAnchorParent.classList.add('active');
        }
      } else {
        // 解决首次加载时第一个标题和文章title间距太大，未到达预定高度时，目录高亮不正确的问题
        lis[0].classList.add('active');
      }

      // 监听滚动事件，检测标题是否进入/退出检测区域
      const observer = new IntersectionObserver(
        entries => {
          for (const entry of entries) {
            if (entry.intersectionRatio > 0) {
              const anchor = entry.target.firstElementChild;

              if (!anchor) return;
              const id = anchor.getAttribute('id');
              const activeAnchor = toc.querySelector(`a[href="#${id}"]`);
              const activeAnchorParent = activeAnchor.parentNode;
              if (activeAnchor) {
                removeActive();
                // 处理上划页面时标题退出检测区域，高亮上一个标题
                if (!entry.isIntersecting && entry.intersectionRect.top > 0) {
                  const preTopic = activeAnchorParent.previousSibling;
                  if (preTopic) {
                    preTopic.classList.add('active');
                    break;
                  }
                }
                activeAnchorParent.classList.add('active');
              }
              // 避免标题高度太小，导致多个标题出现在检测区域，只高亮第一个
              break;
            }
          }
        },
        {
          rootMargin: '0% 0% -90% 0%', // 把检测区域缩小到顶部的一点点范围(高度的10%)
          threshold: 0.6,
        },
      );
      Array.prototype.forEach.call(topics, target => {
        observer.observe(target);
      });
      this.$once('hook:beforeDestroy', () => {
        observer.disconnect();
        toc.removeEventListener('click', tocClickEventCB);
      });
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
