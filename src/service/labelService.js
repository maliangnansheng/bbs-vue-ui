import axios from 'axios';

export default {
  // 获取标签
  getLabelList(params) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/bbs/label/getList', { params })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // 上传标签logo
  uploadLabelLogo(data) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/bbs/label/uploadLabelLogo', data)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // 新增标签
  labelCreate(data) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/bbs/label/create', data)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // 更新标签
  labelUpdate(data) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/bbs/label/update', data)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // 删除标签
  labelDelete(data) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/bbs/label/delete/' + data)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
};
