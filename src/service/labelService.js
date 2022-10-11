import axios from 'axios';

export default {
  // 获取标签
  getLabelList(params) {
    return axios.get('/api/bbs/label/getList', { params });
  },
  // 上传标签logo
  uploadLabelLogo(data) {
    return axios.post('/api/bbs/label/uploadLabelLogo', data);
  },
  // 新增标签
  labelCreate(data) {
    return axios.post('/api/bbs/label/create', data);
  },
  // 更新标签
  labelUpdate(data) {
    return axios.post('/api/bbs/label/update', data);
  },
  // 删除标签
  labelDelete(data) {
    return axios.post('/api/bbs/label/delete/' + data);
  },
};
