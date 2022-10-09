<template>
  <a-modal v-model="visible" :z-index="99999" @cancel="handleClose" :footer="null" :width="'320px'">
    <component :is="currentComponent" @success="$emit('success')" />
  </a-modal>
</template>

<script>
import Login from './Login.vue';
import Register from './Register.vue';
import ResetPwdByPhone from './ResetPwdByPhone.vue';

export default {
  name: 'Wrap',
  components: { Login, Register, ResetPwdByPhone },
  props: {
    type: {
      type: String,
      default: 'Login',
      validator(value) {
        return ['Login', 'Register', 'ResetPwdByPhone', 'ResetPwdByMail'].includes(value);
      },
    },
  },
  provide() {
    return {
      show: this.show,
    };
  },
  data() {
    return {
      visible: true,
      currentComponent: this.type,
    };
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    show(type) {
      this.currentComponent = type;
    },
  },
};
</script>
