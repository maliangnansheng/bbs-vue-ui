import { getConfig } from '@/service/common';

const configStore = {
  namespaced: true,
  state: {
    config: {
      hideHeaderWhenScroll: false,
    },
  },
  mutations: {
    setConfig(state, config) {
      state.config = config;
    },
  },
  actions: {
    async getConfig({ commit }) {
      const res = await getConfig();
      commit('setConfig', res.data);
    },
  },
};

export default configStore;
