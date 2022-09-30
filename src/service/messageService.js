import axios from "axios";

export default {
    // 分页获取通知信息
    getMessageList(params) {
        return new Promise((resolve, reject) => {
            axios.get("/api/bbs/notify/getList", {params})
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    },
    // 全部已读
    makeAllRead(params) {
        return new Promise((resolve, reject) => {
            axios.post("/api/bbs/notify/haveRead", null, {params})
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    },
    // 标记已读
    markRead(data) {
        return new Promise((resolve, reject) => {
            axios.post("/api/bbs/notify/markRead", data)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }
};
