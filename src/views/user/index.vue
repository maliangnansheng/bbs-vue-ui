<template>
  <a-row type="flex" justify="center">
    <a-col :span="$store.state.collapsed ? 24 : 18" :style="$store.state.collapsed ? '' : 'border-right: 20px solid #f0f2f5'">
      <personal-info-display :data="data" @refresh="getAuthorBlockList" style="background: #fff" />
      <a-row>
        <a-col :span="24" style="height: 10px" />
      </a-row>
      <user-tabs :user-id="userId" style="background: #fff" />
    </a-col>
    <a-col v-if="!$store.state.collapsed" :span="6">
      <!-- 作者板块 -->
      <personal-achievement :data="data" style="background: #fff" />
      <a-row>
        <a-col :span="24" style="height: 10px" />
      </a-row>
      <follow-count :user-id="userId" style="background: #fff" />
      <a-row>
        <a-col :span="24" style="height: 10px" />
      </a-row>
      <!-- 友情捐赠 -->
      <friend-donate style="background: #fff" />
      <a-row>
        <a-col :span="24" style="height: 10px" />
      </a-row>
      <!-- 备案信息 -->
      <filing-info />
    </a-col>
  </a-row>
</template>

<script>
import FilingInfo from '@/components/right/FilingInfo';
import PersonalAchievement from '@/components/right/PersonalAchievement';
import FollowCount from '@/components/right/FollowCount';
import FriendDonate from '@/components/right/FriendDonate';

import PersonalInfoDisplay from './components/PersonalInfoDisplay';
import UserTabs from './components/UserTabs';

import userService from '@/service/userService';

export default {
  name: '',
  components: { PersonalAchievement, FilingInfo, FollowCount, PersonalInfoDisplay, UserTabs, FriendDonate },

  data() {
    return {
      userId: Number(this.$route.params.id),
      // 用户信息
      data: {},
    };
  },

  methods: {
    // 获取用户信息
    getAuthorBlockList() {
      userService
        .getUserInfo({ userId: this.userId })
        .then(res => {
          this.data = res.data;
        })
        .catch(err => {
          this.$message.error(err.desc);
        });
    },
  },

  mounted() {
    this.getAuthorBlockList();
  },
};
</script>
