<template>
  <a-layout>
    <a-layout id="article-detail-index">
      <IndexHeader class="header"/>
      <a-layout-content>
        <main class="content">
          <a-col :span="$store.state.collapsed ? 24 : 18"
                 :style="$store.state.collapsed ? '' : 'border-right: 20px solid #f0f2f5'">
            <PersonalInfoDisplay
                :data="data"
                @refresh="getAuthorBlockList"
                style="background: #fff;"/>
            <a-row>
              <a-col :span="24" style="height: 10px;"/>
            </a-row>
            <UserTabs
                :userId="userId"
                style="background: #fff;"/>
          </a-col>
          <a-col v-if="!$store.state.collapsed" :span="6">
            <!-- 作者板块 -->
            <PersonalAchievement
                :data="data"
                style="background: #fff;"/>
            <a-row>
              <a-col :span="24" style="height: 10px;"/>
            </a-row>
            <FollowCount
                :userId="userId"
                style="background: #fff;"/>
            <a-row>
              <a-col :span="24" style="height: 10px;"/>
            </a-row>
            <!-- 友情捐赠 -->
            <FriendDonate style="background: #fff;"/>
            <a-row>
              <a-col :span="24" style="height: 10px;"/>
            </a-row>
            <!-- 备案信息 -->
            <FilingInfo/>
          </a-col>
        </main>
      </a-layout-content>
      <FooterButtons v-if="!$store.state.collapsed"/>
    </a-layout>
  </a-layout>
</template>

<script>
import IndexHeader from "@/components/index/head/IndexHeader";
import FilingInfo from "@/components/right/FilingInfo";
import PersonalAchievement from "@/components/right/PersonalAchievement";
import FollowCount from "@/components/right/FollowCount";
import FriendDonate from "@/components/right/FriendDonate";
import PersonalInfoDisplay from "@/components/user/PersonalInfoDisplay";
import UserTabs from "@/components/user/UserTabs";
import FooterButtons from "@/components/utils/FooterButtons";
import userService from "@/service/userService";

export default {
  name: "",
  components: {IndexHeader, PersonalAchievement, FilingInfo, FollowCount, PersonalInfoDisplay, UserTabs, FooterButtons, FriendDonate},

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
      userService.getUserInfo({userId: this.userId})
          .then(res => {
            this.data = res.data;
          })
          .catch(err => {
            // 没有找到用户
            if (err.code === 4) {
              this.$router.push({
                name: '404',
                // 保留当前路径并删除第一个字符，以避免目标 URL 以 `//` 开头。
                params: { pathMatch: this.$route.path.substring(1).split('/') },
              })
            } else {
              this.$message.error(err.desc);
            }
          });
    },
  },

  mounted() {
    this.getAuthorBlockList();
  },

};
</script>


<style>
#article-detail-index .header {
  position: fixed;
  width: 100%;
  z-index: 999;
  background: #fff;
  border-bottom: 1px solid #00000021;
}

#article-detail-index .content {
  margin-top: 64px;
  width: 100%;
  max-width: 1100px;
}

@media screen and (max-width: 576px) {
  #article-detail-index .content {
    margin-top: 64px;
    width: 100%;
  }
}

#article-detail-index .ant-layout-header {
  display: flex;
  align-items: center;
  justify-content: center;
}

#article-detail-index .ant-layout-content {
  display: flex;
  justify-content: center;
}

#article-detail-index .ant-layout-header {
  background: #fff;
  height: auto;
  line-height: 2.3;
}

.index-drawer-wrap .ant-drawer-content-wrapper {
  width: 250px !important;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0;
}
</style>