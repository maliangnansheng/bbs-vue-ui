<template>
    <div class="message-box" :style="{ width: '310px' }">
        <a-tabs type="line">
            <a-tab-pane v-for="pane in panes" :key="pane.key" :closable="pane.closable">
                <div slot="tab">
                    <span @click="e => tabClick(e, pane.key)">{{ pane.title }}</span>
                    <span style="color: red">{{ messageNum[pane.key] }}</span>
                </div>
                <div class="message-components">
                    <component :visible="visible" @closeDropdown="closeDropdown" :ref="pane.key" :data="data[pane.key]"
                               :is="pane.component"></component>
                </div>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>
    import Notification from "./Notification";
    import Message from "./Message";
    import {mapState} from "vuex";

    export default {
        props: ["visible"],
        components: {Notification, Message},
        data() {
            return {
                newTabIndex: 0,
                data: {
                    taskNotify: [],
                    message: []
                }
            };
        },
        computed: {
            ...mapState(["systemNotifyCount", "taskNotifyCount"]),
            // 总共的消息数量 通知加提醒一起
            messageNum() {
                return {
                    message: Number(this.systemNotifyCount) ? " (" + Number(this.systemNotifyCount) + ") " : "",
                    taskNotify: Number(this.taskNotifyCount) ? " (" + Number(this.taskNotifyCount) + ") " : ""
                };
            },
            // tab.pane 之所以写在计算属性是考虑国际化（语言设置）
            panes() {
                return [
                    {
                        title: this.$t("common.taskNotify"),
                        component: "Notification",
                        key: "taskNotify"
                    },
                    {
                        key: "message",
                        component: "Message",
                        title: this.$t("common.message")
                    }
                ];
            }
        },
        methods: {
            //关闭下拉菜单
            closeDropdown() {
                this.$emit("update:visible", false);
            },
            // 点击tab的时候发送获取请求
            tabClick(e, key) {
                e.preventDefault;
                if (this.$refs[key]) {
                    this.$refs[key][0].getMessageList();
                }
            }
        }
    };
</script>

<style lang="less">
  .message-box {
    .ant-tabs-bar {
      margin-bottom: 0;
    }

    .ant-tabs-nav .ant-tabs-tab {
      margin: 0 12px;
    }

    .ant-tabs-nav-scroll {
      display: flex;
      justify-content: center;
    }

    .container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      min-height: 250px;

      .tip {
        padding: 6px;
        text-align: center;
      }

      .message-content {
        max-height: 200px;
        overflow: hidden;
        overflow-y: auto;
        width: 100%;
      }

      .message-content::-webkit-scrollbar {
        background-color: transparent;
        width: 6px;
      }

      .message-content::-webkit-scrollbar-thumb {
        background-color: #ececec;
        width: 6px;
        border-radius: 3px;
      }

      .empty {
        padding-top: 30px;
      }

      .message-item {
        cursor: pointer;
        display: flex;
        border-bottom: 1px solid #f0f0f0;
        padding: 12px 16px;

        .title {
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          display: -webkit-box;
          overflow: hidden;
        }

        .icon {
          margin-right: 16px;

          img {
            width: 32px;
          }
        }

        .content {
          .title {
            margin-bottom: 5px;
            word-break: break-all;
          }

          .title-copy {
            white-space: nowrap;
            visibility: hidden;
            height: 0;
            position: absolute;
          }

          .time {
            color: rgba(0, 0, 0, 0.45);
            font-size: 13px;
            padding-left: 3px;
          }
        }
      }

      .message-item:last-child {
        border-bottom: none;
      }

      .message-item:hover {
        background-color: #00000006;
      }

      .footer {
        padding: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        // position: fixed;
        // bottom: 0;
        width: 100%;
        border-top: 1px solid #f0f0f0;
        background: white;

        div {
          width: 50%;
          text-align: center;
        }

        a {
          text-align: center;
        }
      }
    }
  }
</style>
