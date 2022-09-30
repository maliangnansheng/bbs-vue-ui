<template>
  <div id="personal-info-display" :style="$store.state.collapsed ? 'padding: 10px' : 'padding: 20px;'">
    <div class="top">
      <div class="left">
        <div class="avatar">
          <a-avatar :size="88" class="avatar" :src="data.picture ? data.picture : require('@/assets/img/default_avatar.png')" />
        </div>
        <div class="info" v-if="data.level !== undefined">
          <div class="username">
            <span>{{ data.name }} </span>
            <img :src="require('@/assets/img/level/' + data.level + '.svg')" alt="" />
          </div>
          <div class="office">
            <span v-if="data.position">
              <i class="iconfont icon-office"></i>
              <span>{{ data.position }}</span>
            </span>
            <span v-else-if="$store.state.userId === data.id" @click="routerSetUp">
              <a><a-icon type="plus" />{{ $t('common.notJob') }}</a>
            </span>
          </div>
          <div class="intro">
            <span v-if="data.intro">
              <i class="iconfont icon-intro"></i>
              <span>{{ data.intro }}</span>
            </span>
            <span v-else-if="$store.state.userId === data.id" @click="routerSetUp">
              <a><a-icon type="plus" />{{ $t('common.notHobbies') }}</a>
            </span>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="link">
          <a-tooltip placement="left">
            <template slot="title">
              GitHub（开发中...）
            </template>
            <i class="iconfont icon-GitHub" style="color: #00000038;"></i>
          </a-tooltip>
          <a-tooltip placement="right">
            <template slot="title">
              个人主页
            </template>
            <i class="iconfont icon-personal-center" :style="data.homePage ? '' : 'color: #00000038'" @click="hrefFn(data.homePage)"></i>
          </a-tooltip>
        </div>
        <div class="follow-box">
          <div class="personalEdit" v-if="$store.state.userId === data.id">
            <a-button class="follow-btn" v-if="!data.isFollow" @click="routerSetUp" :style="{ color: $store.state.themeColor, border: '1px solid' + $store.state.themeColor }">
              {{ $t('common.personalEdit') }}
            </a-button>
          </div>
          <div class="follow" v-else>
            <a-button
              class="follow-btn"
              v-if="!data.isFollow"
              @click="updateFollowState(data.id)"
              :style="{ color: $store.state.themeColor, border: '1px solid' + $store.state.themeColor }"
            >
              {{ $t('common.follow') }}
            </a-button>
            <a-button class="follow-btn-close" v-if="data.isFollow" @click="updateFollowState(data.id)">
              {{ $t('common.haveFollowed') }}
            </a-button>
          </div>
        </div>
      </div>
    </div>
    <a-divider style="margin: 30px 0 20px 0" />
    <div class="bottom">
      <div>
        <img src="@/assets/img/badge.svg" alt="" />
        <span>{{ $t('common.getBadge') + ' ' + (getBadgeCount(data.points) === undefined ? '' : getBadgeCount(data.points)) }}</span>
      </div>
      <div>
        <a-tooltip placement="top" v-if="data.points >= 0">
          <template slot="title">
            新手
          </template>
          <img src="@/assets/img/level/badge-Lv1.svg" alt="" style="margin-left: 8px;cursor: pointer" @click="routerBook" />
        </a-tooltip>
        <a-tooltip placement="top" v-if="data.points >= 100">
          <template slot="title">
            麒麟儿
          </template>
          <img src="@/assets/img/level/badge-Lv2.svg" alt="" style="margin-left: 8px;cursor: pointer" @click="routerBook" />
        </a-tooltip>
        <a-tooltip placement="top" v-if="data.points >= 300">
          <template slot="title">
            三好学生
          </template>
          <img src="@/assets/img/level/badge-Lv3.svg" alt="" style="margin-left: 8px;cursor: pointer" @click="routerBook" />
        </a-tooltip>
        <a-tooltip placement="top" v-if="data.points >= 600">
          <template slot="title">
            技术贡献者
          </template>
          <img src="@/assets/img/level/badge-Lv4.svg" alt="" style="margin-left: 8px;cursor: pointer" @click="routerBook" />
        </a-tooltip>
        <a-tooltip placement="top" v-if="data.points >= 1000">
          <template slot="title">
            优秀作者
          </template>
          <img src="@/assets/img/level/badge-Lv5.svg" alt="" style="margin-left: 8px;cursor: pointer" @click="routerBook" />
        </a-tooltip>
        <a-tooltip placement="top" v-if="data.points >= 1500">
          <template slot="title">
            共建者
          </template>
          <img src="@/assets/img/level/badge-Lv6.svg" alt="" style="margin-left: 8px;cursor: pointer" @click="routerBook" />
        </a-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import userService from '@/service/userService';

export default {
  name: '',

  props: {
    data: { type: Object, default: () => {} },
  },

  methods: {
    // 更新关注状态
    updateFollowState(toUser) {
      userService
        .updateFollowState({ toUser: toUser })
        .then(() => {
          this.$emit('refresh');
        })
        .catch(err => {
          this.$message.error(err.desc);
        });
    },

    hrefFn(url) {
      if (url) {
        window.open(url, '_blank');
      } else {
        this.routerSetUp();
      }
    },

    getBadgeCount(points) {
      if (points >= 0 && points < 100) {
        return 1;
      }
      if (points >= 100 && points < 300) {
        return 2;
      }
      if (points >= 300 && points < 600) {
        return 3;
      }
      if (points >= 600 && points < 1000) {
        return 4;
      }
      if (points >= 1000 && points < 1500) {
        return 5;
      }
      if (points >= 150) {
        return 6;
      }
    },

    // 路由到设置页面
    routerSetUp() {
      this.$router.push('/settings/profile');
    },

    // 路由到Book说明页面
    routerBook() {
      const routeData = this.$router.resolve('/book');
      window.open(routeData.href, '_blank');
    },
  },
};
</script>

<style lang="less" scoped>
#personal-info-display .top {
  display: flex;
  justify-content: space-between;

  .info {
    padding-left: 20px;

    .username {
      padding-bottom: 5px;

      span {
        font-size: 26px;
        font-weight: 700;
        color: #000;
      }

      img {
        position: relative;
        top: -10px;
      }
    }

    .office,
    .intro {
      display: flex;
      align-items: baseline;
      line-height: 28px;

      span {
        padding-left: 5px;
      }
    }
  }

  .left {
    display: flex;
  }

  .right {
    padding-left: 20px;

    .link {
      i {
        cursor: pointer;
        margin-left: 10px;
        font-size: 20px;
      }
    }

    .follow,
    .personalEdit {
      padding-top: 30px;
    }

    .follow {
      /* 关注按钮--start */

      .follow-btn {
        width: 77px;
        height: 27px;
        border-radius: 2px;
      }

      .follow-btn:hover {
        background: #37c701;
        border: 1px solid rgba(55, 199, 1, 0.6) !important;
        color: #fff !important;
      }

      .follow-btn-close {
        background: #37c701;
        border: 1px solid rgba(55, 199, 1, 0.6) !important;
        color: #fff !important;
        /*width: 77px;*/
        height: 27px;
        border-radius: 2px;
      }

      .follow-btn-close:hover {
        background: #3ee002;
        border: 1px solid rgba(55, 199, 1, 0.7) !important;
      }

      /* 关注按钮--end */
    }
  }
}

#personal-info-display .bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 26px;
  }

  span {
    padding-left: 5px;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
