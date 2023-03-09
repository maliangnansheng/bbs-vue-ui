<template>
  <div id="article-detail" ref="scrollDiv"
       :style="$store.state.collapsed ? 'padding: 10px' : 'padding: 20px;'">
    <div v-if="finish">
      <div class="article-title">
        <h1>{{ data.title }}</h1>
        <!-- 待审核 -->
        <span class="iconfont icon-pendingReview" v-if="data.state === -1"
              style="color: #faad14; font-size: 38px;"></span>
        <!-- 审核拒绝 -->
        <span class="iconfont icon-reviewRejected" v-if="data.state === 0" style="color: red; font-size: 38px;"></span>
      </div>
      <div class="article-user">
        <div class="author-info-box">
          <a-avatar class="avatar" :src="data.picture ? data.picture : require('@/assets/img/default_avatar.png')"
                    :size="46" @click="routerUserCenter(data.createUser)"/>
          <div class="author-name-meta" style="padding-left: 10px;">
            <div class="author-name">
              <a target="_blank" class="username" @click="routerUserCenter(data.createUser)">
                <span class="name" style="font-size: 17px;">{{ data.createUserName }} </span>
                <img :src="require('@/assets/img/level/' + data.articleCountDTO.level + '.svg')" alt=""
                     @click.stop="routerBook"/>
              </a>
            </div>
            <div class="meta-box" style="color: #8a919f">
            <span class="time">
              {{ data.createTime }}
            </span>
              <span class="views-count">
               {{ $t("common.read") + ' ' + data.pv }}
            </span>
            </div>
          </div>
        </div>
        <div class="follow-box">
          <div class="edit" v-if="$store.state.userId === data.createUser">
            <a-button class="follow-btn" v-if="!data.articleCountDTO.isFollow" @click="routerArticleEdit(data.id)"
                      :style="{color: $store.state.themeColor, border: '1px solid' + $store.state.themeColor}">
              {{ $t("common.edit") }}
            </a-button>
          </div>
          <div class="follow" v-else>
            <a-button class="follow-btn" v-if="!data.articleCountDTO.isFollow"
                      @click="updateFollowState(data.createUser)"
                      :style="{color: $store.state.themeColor, border: '1px solid' + $store.state.themeColor}">
              {{ $t("common.follow") }}
            </a-button>
            <a-button class="follow-btn-close" v-if="data.articleCountDTO.isFollow"
                      @click="updateFollowState(data.createUser)">
              {{ $t("common.haveFollowed") }}
            </a-button>
          </div>
        </div>
      </div>
      <div class="article-titleMap" v-if="data.titleMap">
        <img :src="data.titleMap" style="width: 100%;"/>
      </div>
      <div class="article-content" style="width: 100%" v-if="data.markdown">
        <mavon-editor
            :value="data.markdown"
            :subfield="false"
            defaultOpen="preview"
            :toolbarsFlag="false"
            boxShadowStyle="0"
            previewBackground="#fff"
            codeStyle="obsidian"
            :xssOptions=false></mavon-editor>
      </div>
    </div>
    <CustomEmpty v-else/>
  </div>
</template>

<script>
  import articleService from "@/service/articleService";
  import userService from "@/service/userService";
  import CustomEmpty from "@/components/utils/CustomEmpty";

  export default {
    components: {CustomEmpty},

    data() {
      return {
        finish: false,
        data: {},
      };
    },

    methods: {
      // 获取文章详细信息
      getArticleById() {
        this.finish = false;
        articleService.getArticleById({id: this.$route.params.id, isPv: true})
            .then(res => {
              this.data = res.data;
              this.finish = true;
              // 提取标签id
              let labelIds = [];
              res.data.labelDTOS.forEach(label => {
                labelIds.push(label.id);
              });
              this.$emit("initLabelIds", labelIds, this.finish, res.data.createUser, this.$utils.toToc(res.data.html));

              if (res.data.html) {
                setTimeout(() => {
                  // 设置标题目录追踪滚动高亮当前标题
                  this.monitorScrollForTopicHighlight();
                  // 代码块复制
                  this.$nextTick(() => {
                    clearInterval(this.timer);
                    this.getCodes();
                  });
                }, 800);
              }

            })
            .catch(err => {
              this.finish = true;
              // 没有该文章
              if (err.code === 4) {
                this.$router.push({
                  name: '404',
                  // 保留当前路径并删除第一个字符，以避免目标 URL 以 `//` 开头。
                  params: {pathMatch: this.$route.path.substring(1).split('/')},
                })
              } else {
                this.$message.error(err.desc);
              }
            });
      },

      // 设置标题目录追踪滚动高亮当前标题
      monitorScrollForTopicHighlight() {
        const toc = document.querySelector('#markdown-toc');
        if (!toc) return;
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
          if (!activeAnchor) {
            lis[0].classList.add('active');
          } else {
            const activeAnchorParent = activeAnchor.parentNode;
            if (activeAnchor) {
              removeActive();
              activeAnchorParent.classList.add('active');
            }
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

      // 更新关注状态
      updateFollowState(toUser) {
        userService.updateFollowState({toUser: toUser})
            .then(() => {
              this.getArticleById();
            })
            .catch(err => {
              this.$message.error(err.desc);
            });
      },

      // 路由到文章编辑页面
      routerArticleEdit(articleId) {
        this.$router.push("/edit/" + articleId);
      },

      // 路由到用户中心页面
      routerUserCenter(userId) {
        let routeData = this.$router.resolve("/user/" + userId);
        window.open(routeData.href, '_blank');
      },

      // 路由到Book说明页面
      routerBook() {
        let routeData = this.$router.resolve("/book");
        window.open(routeData.href, '_blank');
      },


      // 为什么要这么写呢？
      // 是因为mavon-editor需要获取到katex.min.js等文件
      // 然后又是cdn获取的，所以有些时候请求慢
      // 导致dom先加载，然后才加载js、css这些mavon-editor所需要的文件
      // 因此需要写setInterval去等katex.min.js等文件加载完成
      // 这样才能获取到offsetHeight的问题。
      // 不然你可以试试去掉这段代码
      // 你的offsetHeight一直为0，没有代码块序号。
      getCodes() {
        this.codes = document.querySelectorAll("pre code");
        if (this.codes.length > 0) {
          for (let i = 0; i < this.codes.length; i++) {
            if (this.codes[i].offsetHeight !== 0) {
              return this.init();
            } else {
              this.timer = setInterval(() => {
                for (let j = 0; j < this.codes.length; j++) {
                  if (this.codes[j].offsetHeight !== 0) {
                    clearInterval(this.timer);
                    return this.init();
                  }
                }
              }, 500);
              return;
            }
          }
        }
      },

      init() {
        let thisTemp = this;
        this.$nextTick(() => {
          clearInterval(this.timer);
          this.codes.forEach((item) => {
            // 取出 code 的父元素 pre（后面方便使用）
            let pre = item.parentElement;
            let icon =
                `<div class="code-icon">` +
                `<i class="iconfont icon-copy copy-button"></i>` +
                `</div>`;

            pre.insertAdjacentHTML("afterbegin", icon);
            // 获取复制元素
            let copyButton = pre.firstElementChild.getElementsByClassName("copy-button")[0];
            copyButton.onclick = function () {
              thisTemp.$copyText(pre.lastElementChild.innerText).then(() => {
                thisTemp.$message.success(
                    'copy成功',
                    1,
                );
              }).catch(() => {
                thisTemp.$message.error(
                    'copy失败',
                    1,
                );
              });
            };
          });
        });
      },
    },

    mounted() {
      this.getArticleById();
    },

    watch: {
      data: function () {
        this.$nextTick(() => {
          // 锁定位置
          let hash = location.hash;
          if (hash) {
            this.$nextTick(() => {
              setTimeout(() => {
                // querySelector是按css规范来实现的，所以它传入的字符串中第一个字符不能是数字、特殊字符，修改成用属性匹配即可解决
                hash = "[id='" + hash.substring(1, hash.length) + "']"
                if (!hash.includes('reply-')) {
                  document.querySelector(hash).scrollIntoView({behavior: "smooth"});
                } else {
                  document.querySelector(hash).scrollIntoView({behavior: "smooth", block: "center"});
                  /* 锁定评论位置（背景色逐渐消失） */
                  document.querySelector(hash).setAttribute('class', 'selectedComment');
                }
              }, 400);
            });
          }
        });
      }
    },
  }
</script>

<style lang="less">
  #article-detail .article-title {
    display: flex;
    //align-items: center;
    justify-content: space-between;

    h1 {
      font-size: 32px;
      font-weight: 700;
      line-height: 1.31;
      color: #252933;
    }

    h2 {
      font-weight: 700;
    }
  }

  #article-detail .article-user {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #article-detail .author-info-box {
    display: flex;
  }

  #article-detail .avatar {
    cursor: pointer;
  }

  /* #article-detail .article-titleMap, .article-content 这样写会窜样式 */
  #article-detail .article-titleMap {
    padding-top: 20px;
  }

  #article-detail .article-content {
    padding-top: 20px;

    /* 优化文章标题锚点跳转时被顶部导航栏遮挡 */

    h1 > a,
    h2 > a,
    h3 > a,
    h4 > a,
    h5 > a,
    h6 > a {
      margin-top: -60px;
      padding-top: 60px;
    }
  }

  /* 关注按钮--start */
  #article-detail .follow-btn {
    width: 77px;
    height: 27px;
    border-radius: 2px;
  }

  #article-detail .follow-btn:hover {
    background: #37c701;
    border: 1px solid rgba(55, 199, 1, .6) !important;
    color: #fff !important;
  }

  #article-detail .follow-btn-close {
    background: #37c701;
    border: 1px solid rgba(55, 199, 1, .6) !important;
    color: #fff !important;
    /*width: 77px;*/
    height: 27px;
    border-radius: 2px;
  }

  #article-detail .follow-btn-close:hover {
    background: #3ee002;
    border: 1px solid rgba(55, 199, 1, 0.7) !important;
  }

  /* 关注按钮--end */

  /* 代码高亮部分设置样式--start */
  #article-detail .markdown-body .highlight pre, .markdown-body pre {
    padding: 0 !important;
  }

  #article-detail .hljs {
    padding: 10px;
  }

  /* 代码高亮部分设置样式--end */

  /* mavon-editor整体样式--start */
  #article-detail .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
    padding: 0;
  }

  #article-detail .v-note-wrapper {
    z-index: 900;
  }

  /* 设置mavon-editor的最小高度 */
  #article-detail .v-note-wrapper.markdown-body.shadow {
    min-height: 0;
  }

  /* mavon-editor整体样式--end */

  /* 代码块-复制按钮 */
  .code-icon {
    .copy-button {
      padding: 2px 8px;
      color: #ffffff;
      border-radius: 5px;
      float: right;
    }

    .copy-button:hover {
      cursor: pointer;
      background-color: black;
    }
  }

  /* 代码块-复制按钮 */
</style>