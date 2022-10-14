import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { getDefaultLang } from './utils';

import en_US from './en';
import zh_CN from './zh';

Vue.use(VueI18n);

const locale = getDefaultLang(); // default locale

export default new VueI18n({
  locale,
  messages: {
    en_US,
    zh_CN,
  },
});
