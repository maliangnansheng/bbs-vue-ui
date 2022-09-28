import axios from 'axios';

export default {
  // 注册
  register(data) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/bbs/sso/register', data)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // 登录
  login(data) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/bbs/sso/login', data)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // 退出登录
  logout(data) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/bbs/sso/logout', data)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
};
