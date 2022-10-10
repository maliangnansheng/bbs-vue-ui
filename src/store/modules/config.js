import { getConfig } from '@/service/common';
import globalConfig from '@/config';

const configStore = {
  namespaced: true,
  state: {
    config: {
      hideHeaderWhenScroll: globalConfig.hideHeaderWhenScroll,
    },
  },
  mutations: {
    setConfig(state, config) {
      state.config = config;
    },
  },
  actions: {
    // TODO: 从后台获取配置(预留功能，未实现)
    async getConfig({ commit }) {
      const res = await getConfig();
      commit('setConfig', res.data);
    },
  },
};

export default configStore;
