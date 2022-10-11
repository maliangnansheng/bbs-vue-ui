import axios from 'axios';

export default {
  // 获取当前用户权限
  getCurrentUserAccess() {
    return axios.get('/api/bbs/user/getCurrentUserRights');
  },
  // 更新点赞状态
  updateLikeCommentState(params) {
    return axios.get('/api/bbs/user/updateLikeCommentState', { params });
  },
  // 更新评论点赞状态
  updateLikeState(params) {
    return axios.get('/api/bbs/user/updateLikeState', { params });
  },
  // 获取热门作者列表
  getHotAuthorsList(params) {
    return axios.get('/api/bbs/user/getHotAuthorsList', { params });
  },
  // 获取关注的用户信息
  getFollowUsers(params) {
    return axios.get('/api/bbs/user/getFollowUsers', { params });
  },
  // 获取作者信息
  getUserInfo(params) {
    return axios.get('/api/bbs/user/getUserInfo', { params });
  },
  // 获取关注/粉丝数量
  getFollowCount(params) {
    return axios.get('/api/bbs/user/getFollowCount', { params });
  },
  // 更新关注状态
  updateFollowState(params) {
    return axios.get('/api/bbs/user/updateFollowState', { params });
  },
  // 上传用户头像（更新）
  uploadUserPicture(data) {
    return axios.post('/api/bbs/user/uploadUserPicture', data);
  },
  // 更新用户基本信息
  updateUserBasicInfo(data) {
    return axios.post('/api/bbs/user/updateUserBasicInfo', data);
  },
  // 发送短信验证码
  sendSmsVerifyCode(params) {
    return axios.get('/api/bbs/user/sendSmsVerifyCode', { params });
  },
  // 发送邮件验证码
  sendEmailVerifyCode(params) {
    return axios.get('/api/bbs/user/sendEmailVerifyCode', { params });
  },
  // 绑定手机
  bindPhone(data) {
    return axios.post('/api/bbs/user/bindPhone', data);
  },
  // 解绑手机
  untiePhone(data) {
    return axios.post('/api/bbs/user/untiePhone', data);
  },
  // 绑定邮箱
  bindEmail(data) {
    return axios.post('/api/bbs/user/bindEmail', data);
  },
  // 解绑邮箱
  untieEmail(data) {
    return axios.post('/api/bbs/user/untieEmail', data);
  },
  // 更新密码
  updatePassword(data) {
    return axios.post('/api/bbs/user/updatePassword', data);
  },
  // 邮箱判重
  isValidEmail(params) {
    return axios.get('/api/bbs/user/isValidEmail', { params });
  },
  // 手机判重
  isValidPhone(params) {
    return axios.get('/api/bbs/user/isValidPhone', { params });
  },
  // 用户判重
  isValidUser(params) {
    return axios.get('/api/bbs/user/isValidUser', { params });
  },
  // 判断手机是否已经绑定
  isPhoneExist(data) {
    return axios.post('/api/bbs/user/isPhoneExist/' + data);
  },
  // 判断email是否已经绑定
  isEmailExist(data) {
    return axios.post('/api/bbs/user/isEmailExist/' + data);
  },
  // 手机重置密码
  phoneResetPassword(data) {
    return axios.post('/api/bbs/user/phoneResetPassword', data);
  },
  // 邮箱重置密码
  emailResetPassword(data) {
    return axios.post('/api/bbs/user/emailResetPassword', data);
  },
};
