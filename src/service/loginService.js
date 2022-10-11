import axios from 'axios';

export default {
  // 注册
  register(data) {
    return axios.post('/api/bbs/sso/register', data);
  },
  // 登录
  login(data) {
    return axios.post('/api/bbs/sso/login', data);
  },
  // 退出登录
  logout(data) {
    return axios.get('/api/bbs/sso/logout', data);
  },
};
