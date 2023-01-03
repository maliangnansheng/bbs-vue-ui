<template>
  <div id="label-content" :style="$store.state.collapsed ? 'margin: 0 10px;' : ''">
    <!-- 搜索框 -->
    <div class="label-search">
      <a-space direction="vertical">
        <a-input-search
            v-model="searchContentTemp"
            :placeholder="$t('common.searchLabel')"
            style="min-width: 100px; width: 100%"
            @search="onLabelSearch"
        />
      </a-space>
      <a-popover v-model="labelAddVisible" :title="$t('common.labelAdd')" trigger="click" placement="bottomRight">
        <div slot="content" style="width: 500px;">
          <LabelCreate
              @hideLabelVisibleFn="hideLabelVisibleFn"
              @refresh="refresh"/>
        </div>
      </a-popover>
      <a-button class="add-item" type="primary" style="height: 30px;" v-text="$t('common.add')"
                @click="labelAddCheck" v-if="$store.state.isManage"></a-button>
    </div>
    <a-empty v-if="data.length === 0"/>
    <div>
      <div class="tag">
        <a-badge class="info-box"
                 :style="$store.state.collapsed ? 'width:100%;' : 'width:20%;border-right: 20px solid #f0f2f5;'"
                 v-for="item of data" :key="item.id">
          <div>
            <a-avatar class="avatar" :size="60" :src="item.logo" @click="routerLabelToArticle(item.id)"/>
          </div>
          <div class="title" @click="routerLabelToArticle(item.id)">{{ item.labelName }}</div>
          <div class="meta-article">{{ item.articleUseCount + ' ' + $t('common.article') }}</div>
          <a-popover v-model="labelEditVisible[item.id]" :title="$t('common.labelEdit')" trigger="click"
                     placement="bottom">
            <div slot="content" style="width: 500px;">
              <LabelCreate
                  @hideLabelVisibleFn="hideLabelVisibleFn"
                  :labelLogoInit="item.logo"
                  :labelId="item.id"
                  :labelName="item.labelName"
                  @refresh="refresh"/>
            </div>
          </a-popover>
          <!-- 管理员操作 -->
          <a-dropdown :trigger="['click']">
            <a-menu slot="overlay">
              <a-menu-item key="labelEdit" @click="labelUpdateCheck(item.id)">
                {{ ' ' + $t("common.edit") }}
              </a-menu-item>
              <a-menu-item key="labelDel" @click="labelDelete(item.id)">
                <span style="color: red">{{ ' ' + $t("common.delete") }}</span>
              </a-menu-item>
            </a-menu>
            <div class="options">
              <a-icon slot="count" type="ellipsis" style="cursor: pointer; color: #909090"
                      v-if="$store.state.isManage"/>
            </div>
          </a-dropdown>
        </a-badge>
      </div>
    </div>
  </div>
</template>

<script>
import LabelCreate from "@/components/label/LabelCreate";
import labelService from "@/service/labelService";

export default {
  name: "LabelContent",

  components: {LabelCreate},

  props: {
    data: {type: Array, default: []},
    searchContent: {type: String, default: ''},
  },

  data() {
    return {
      searchContentTemp: this.searchContent,
      labelAddVisible: false,
      labelEditVisible: {},
    }
  },

  methods: {
    // 搜索
    onLabelSearch(value) {
      this.$emit("refresh", value)
    },

    // 新增标签验证
    labelAddCheck() {
      if (this.isLoginFn()) {
        this.labelAddVisible = true;
      }
    },

    // 更新标签验证
    labelUpdateCheck(labelId) {
      if (this.isLoginFn()) {
        this.labelEditVisible[labelId] = true;
      }
    },

    // 关闭气泡框
    hideLabelVisibleFn(labelId) {
      this.labelAddVisible = false;
      this.$set(this.labelEditVisible, labelId, false)
    },

    // 删除标签
    labelDelete(labelId) {
      if (this.isLoginFn()) {
        this.$confirm({
          centered: true,
          title: this.$t("common.deleteLabelTitle"),
          content: this.$t("common.deletePrompt"),
          onOk: () => {
            labelService.labelDelete(labelId)
                .then(res => {
                  this.refresh();
                })
                .catch(err => {
                  this.$message.error(err.desc);
                });
          },
        });
      }
    },

    refresh() {
      this.$emit("refresh");
    },

    isLoginFn() {
      if (this.$store.state.isLogin) {
        return true;
      } else {
        this.$store.state.loginVisible = true;
      }
    },

    // 路由到标签文章页面
    routerLabelToArticle(labelId) {
      let routeData = this.$router.resolve("/label/" + labelId);
      window.open(routeData.href, '_blank');
    },

    updateLabelEditVisible() {
      const labelEditVisibleNew = {};
      this.data.forEach(value => {
        labelEditVisibleNew[value.id] = false
      });

      this.labelEditVisible = labelEditVisibleNew;
    },
  },

  mounted() {
    this.updateLabelEditVisible();
  },

  watch: {
    // data值改变时触发
    data: {
      handler(newVal, oldVal) {
        this.updateLabelEditVisible();
      }
    },
    // searchContent值改变时触发
    searchContent: {
      handler(newVal, oldVal) {
        this.searchContentTemp = newVal;
      }
    }
  }
}
</script>

<style lang="less" scoped>
#label-content .label-search {
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
}

#label-content .tag {
  display: flex;
  flex-wrap: wrap;
}

#label-content .info-box {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: #fff;
  border-bottom: 20px solid #f0f2f5;

  .title, .avatar {
    cursor: pointer;
    border-radius: 0;
  }

  .title {
    padding-top: 5px;
    font-size: 20px;
    line-height: 40px;
    color: #333;
  }

  .edit {
    margin-top: 5px;
  }

  .meta-article {
    font-size: 16px;
    color: #909090;
  }
}
</style>