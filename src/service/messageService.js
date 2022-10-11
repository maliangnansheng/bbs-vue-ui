import axios from 'axios';

export default {
  // 分页获取通知信息
  getMessageList(params) {
    return axios.get('/api/bbs/notify/getList', { params });
  },
  // 全部已读
  makeAllRead(params) {
    return axios.post('/api/bbs/notify/haveRead', null, { params });
  },
  // 标记已读
  markRead(data) {
    return axios.post('/api/bbs/notify/markRead', data);
  },
};
