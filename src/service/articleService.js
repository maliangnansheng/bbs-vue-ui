import axios from "axios";

export default {
    // 获取文章
    getArticleList(params) {
        return new Promise((resolve, reject) => {
            axios.get("/api/bbs/article/getList", {params})
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    },
    // 获取点赞过的文章
    getLikesArticle(params) {
        return new Promise((resolve, reject) => {
            axios.get("/api/bbs/article/getLikesArticle", {params})
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    },
    // 获取文章评论访问总数
    getArticleCommentVisitTotal(params) {
        return new Promise((resolve, reject) => {
            axios.get("/api/bbs/article/getArticleCommentVisitTotal", {params})
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    },
    // 上传图片（一张）
    uploadPicture(data) {
        return new Promise((resolve, reject) => {
            axios.post("/api/bbs/article/uploadPicture", data)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    },
    // 写文章
    articleCreate(data) {
        return new Promise((resolve, reject) => {
            axios.post("/api/bbs/article/create", data)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    },
    // 更新文章
    articleUpdate(data) {
        return new Promise((resolve, reject) => {
            axios.post("/api/bbs/article/update", data)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    },
    // 获取文章详情
    getArticleById(params) {
        return new Promise((resolve, reject) => {
            axios.get("/api/bbs/article/getById", {params})
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    },
    // 获取文章一些统计数据
    getArticleCountById(params) {
        return new Promise((resolve, reject) => {
            axios.get("/api/bbs/article/getCountById", {params})
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    },

};
