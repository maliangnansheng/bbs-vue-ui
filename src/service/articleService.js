import axios from 'axios';

export default {
  // 获取文章
  getArticleList(params) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/bbs/article/getList', { params })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // 获取个人发布的文章（所有）
  getPersonalArticles(params) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/bbs/article/getPersonalArticles', { params })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // 获取待审核的文章
  getPendingReviewArticles(params) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/bbs/article/getPendingReviewArticles', { params })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // 获取禁用的文章
  getDisabledArticles(params) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/bbs/article/getDisabledArticles', { params })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // 修改文章审批状态
  updateState(data) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/bbs/article/updateState', data)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // 获取点赞过的文章
  getLikesArticle(params) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/bbs/article/getLikesArticle', { params })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // 获取文章评论访问总数
  getArticleCommentVisitTotal(params) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/bbs/article/getArticleCommentVisitTotal', { params })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // 上传图片（一张）
  uploadPicture(data) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/bbs/article/uploadPicture', data)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // 写文章
  articleCreate(data) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/bbs/article/create', data)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // 更新文章
  articleUpdate(data) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/bbs/article/update', data)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // 获取文章详情
  getArticleById(params) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/bbs/article/getById', { params })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // 获取文章一些统计数据
  getArticleCountById(params) {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/bbs/article/getCountById', { params })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
};
