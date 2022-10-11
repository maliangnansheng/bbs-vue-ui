import axios from 'axios';

export default {
  // 获取资源导航
  getResourceList(params) {
    return axios.get('/api/bbs/resource/getList', { params });
  },
  // 获取资源导航
  getCategorys(params) {
    return axios.get('/api/bbs/resource/getCategorys', { params });
  },
  // 上传资源导航logo
  uploadResourceLogo(data) {
    return axios.post('/api/bbs/resource/uploadResourceLogo', data);
  },
  // 新增资源导航
  resourceCreate(data) {
    return axios.post('/api/bbs/resource/create', data);
  },
  // 更新资源导航
  resourceUpdate(data) {
    return axios.post('/api/bbs/resource/update', data);
  },
  // 删除资源导航
  resourceDelete(data) {
    return axios.post('/api/bbs/resource/delete/' + data);
  },
};
