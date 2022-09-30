import axios from 'axios';

export default {
  // 获取文章的评论信息
  getCommentByArticleId(params) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/bbs/comment/getCommentByArticleId', { params })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // 获取最新评论信息
  getLatestComment(params) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/bbs/comment/getLatestComment', { params })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // 创建评论
  createComment(data) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/bbs/comment/create', data)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // 删除评论
  deleteComment(data) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/bbs/comment/delete/' + data)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
};
