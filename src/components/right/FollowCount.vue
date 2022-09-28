<template>
  <div id="follow-count">
    <div class="follow">
      <span>{{ $t('common.follow') }}</span>
      <b>{{ data.followCount }}</b>
    </div>
    <a-divider type="vertical" />
    <div class="fan">
      <span>{{ $t('common.fan') }}</span>
      <b>{{ data.fanCount }}</b>
    </div>
  </div>
</template>

<script>
import userService from '@/service/userService';

export default {
  name: '',

  props: {
    userId: { type: Number, default: 0 },
  },

  data() {
    return {
      data: [],
    };
  },

  methods: {
    // 获取关注/粉丝数量
    getFollowCount() {
      userService
        .getFollowCount({ userId: this.userId })
        .then(res => {
          this.data = res.data;
        })
        .catch(err => {
          this.$message.error(err.desc);
        });
    },
  },

  mounted() {
    this.getFollowCount();
  },
};
</script>

<style scoped>
#follow-count {
  padding: 15px 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

#follow-count .follow,
.fan {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  line-height: 25px;
}
</style>
