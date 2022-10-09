import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import Wrap from './components/Wrap.vue';

/**
 *
 * @param {Object: { type: 'Login' | 'Register' | 'ResetPwdByPhone' | 'ResetPwdByMail' }} options
 */
export function useLogin(options = {}) {
  const {
    type = 'Login',
    successCB = () => {
      router.go(0);
    },
    failCB,
    scheduler,
  } = options;

  if (store.state.isLogin) {
    successCB && typeof successCB === 'function' && successCB();
    return;
  }
  const LoginComp = Vue.extend({
    store,
    components: {
      Wrap,
    },
    data() {
      return {
        type,
      };
    },
    render(h) {
      return h('Wrap', {
        props: {
          type: this.type,
        },
        on: {
          close: () => {
            console.log('destroy Login');
            this.$destroy();
            this.$el.remove();
            failCB && typeof failCB === 'function' && failCB();
          },
          success: () => {
            this.$destroy();
            this.$el.remove();
            successCB && typeof successCB === 'function' && successCB();
          },
        },
      });
    },
  });

  const instantiation = (type = 'Login') => {
    const loginInstance = new LoginComp({
      data: { type },
    });
    loginInstance.$mount();

    document.body.appendChild(loginInstance.$el);
  };

  if (scheduler && typeof scheduler === 'function') {
    scheduler(instantiation);
    return;
  }
  instantiation();
}
