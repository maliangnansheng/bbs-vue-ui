import axios from 'axios';

export default {
  // 获取文章
  getArticleList(params) {
    return axios.get('/api/bbs/article/getList', { params });
  },
  // 获取个人发布的文章（所有）
  getPersonalArticles(params) {
    return axios.get('/api/bbs/article/getPersonalArticles', { params });
  },
  // 获取待审核的文章
  getPendingReviewArticles(params) {
    return axios.get('/api/bbs/article/getPendingReviewArticles', { params });
  },
  // 获取禁用的文章
  getDisabledArticles(params) {
    return axios.get('/api/bbs/article/getDisabledArticles', { params });
  },
  // 修改文章审批状态
  updateState(data) {
    return axios.post('/api/bbs/article/updateState', data);
  },
  // 获取点赞过的文章
  getLikesArticle(params) {
    return axios.get('/api/bbs/article/getLikesArticle', { params });
  },
  // 获取文章评论访问总数
  getArticleCommentVisitTotal(params) {
    return axios.get('/api/bbs/article/getArticleCommentVisitTotal', { params });
  },
  // 上传图片（一张）
  uploadPicture(data) {
    return axios.post('/api/bbs/article/uploadPicture', data);
  },
  // 写文章
  articleCreate(data) {
    return axios.post('/api/bbs/article/create', data);
  },
  // 更新文章
  articleUpdate(data) {
    return axios.post('/api/bbs/article/update', data);
  },
  // 获取文章详情
  getArticleById(params) {
    return axios.get('/api/bbs/article/getById', { params });
  },
  // 获取文章一些统计数据
  getArticleCountById(params) {
    return axios.get('/api/bbs/article/getCountById', { params });
  },
};
