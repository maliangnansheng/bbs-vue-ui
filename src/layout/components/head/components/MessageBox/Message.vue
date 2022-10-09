<template>
  <div class="container">
    <div class="message-content" v-show="list.length">
      <div v-for="(item, index) of list" :key="index" class="message-item">
        <div class="icon">
          <img src="@/assets/img/message/header-message.svg" alt="" />
        </div>
        <div class="content">
          <a-tooltip @mouseenter="onMouseOver" :title="showTitle ? item.message : null" class="title">{{ item.message }} </a-tooltip>
          <div class="title-copy">{{ item.message }}</div>
          <div class="time">
            {{ $moment(item.createTime).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
        </div>
      </div>
      <div class="tip" v-if="!hasNext && finish">{{ $t('common.noAgain') }}</div>
    </div>
    <div class="empty" v-if="!list.length">
      <a-empty></a-empty>
    </div>
    <div class="footer">
      <div>
        <a :disabled="!list.length" @click="makeAllRead" href="">{{ $t('common.makeAllRead') }}</a>
      </div>
      <div>
        <a href="" @click="viewMore">{{ $t('common.more') }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import messageService from '@/service/messageService';

export default {
  props: {
    visible: Boolean,
  },
  data() {
    return {
      list: [],
      hasNext: false,
      finish: false,
      current: 1,
      size: 10,
      showTitle: false,
    };
  },
  methods: {
    // 查看更多，跳转到消息页面
    viewMore(e) {
      e.preventDefault();
      this.$emit('closeDropdown');
      window.open(this.$store.state.manageDomain + '/messages', '_blank');
    },
    // 鼠标移入的时候判断是不是需要显示tooltip（通过文字是否超出来判断）
    onMouseOver(e) {
      this.showTitle = this.$utils.isClamp(e);
    },
    //调用后台api将所有的消息状态改为已读
    makeAllRead(e) {
      e.preventDefault();
      messageService
        .makeAllRead({ type: 1 })
        .then(() => {
          this.getMessageList();
        })
        .catch(err => {
          this.$message.error(err.desc);
        });
    },
    //加载更多（滚动加载）
    loadMore() {
      this.current++;
      this.getMessageList(true);
    },
    // 获取消息列表信息
    getMessageList(isLoadMore) {
      if (!isLoadMore) {
        this.current = 1;
      }
      this.finish = false;
      messageService
        .getMessageList({ current: this.current, size: this.size, type: 1, isRead: false })
        /**
         * @type {type} 1: 系统通知 0： 任务提醒
         */
        .then(res => {
          if (isLoadMore) {
            this.list = this.list.concat(res.data.list);
          } else {
            this.list = res.data.list;
          }
          this.finish = true;
          this.hasNext = res.data.list.length;
        })
        .catch(err => {
          this.finish = true;
          this.$message.error(err.desc);
        });
    },
  },

  mounted() {
    this.getMessageList();
    // 监听滚动，做滚动加载
    this.$utils.scroll.call(this, this.$el.querySelector('.message-content'));
  },

  watch: {
    visible: function () {
      if (this.visible) {
        this.getMessageList();
      }
    },
  },
};
</script>
