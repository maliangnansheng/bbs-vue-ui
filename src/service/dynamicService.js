import axios from "axios";

export default {
  // 获取动态
  getDynamicList(params) {
    return new Promise((resolve, reject) => {
      axios.get("/api/bbs/dynamic/getList", {params})
          .then((res) => resolve(res))
          .catch((err) => reject(err));
    });
  },

};
