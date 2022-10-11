import axios from 'axios';

export default {
  // 获取文章的评论信息
  getCommentByArticleId(params) {
    return axios.get('/api/bbs/comment/getCommentByArticleId', { params });
  },
  // 获取最新评论信息
  getLatestComment(params) {
    return axios.get('/api/bbs/comment/getLatestComment', { params });
  },
  // 创建评论
  createComment(data) {
    return axios.post('/api/bbs/comment/create', data);
  },
  // 删除评论
  deleteComment(data) {
    return axios.post('/api/bbs/comment/delete/' + data);
  },
};
