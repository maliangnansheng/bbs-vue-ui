import axios from "axios";

export default {
  // 获取资源导航
  getResourceList(params) {
    return new Promise((resolve, reject) => {
      axios.get("/api/bbs/resource/getList", {params})
          .then((res) => resolve(res))
          .catch((err) => reject(err));
    });
  },
  // 获取资源导航
  getCategorys(params) {
    return new Promise((resolve, reject) => {
      axios.get("/api/bbs/resource/getCategorys", {params})
          .then((res) => resolve(res))
          .catch((err) => reject(err));
    });
  },
  // 上传资源导航logo
  uploadResourceLogo(data) {
    return new Promise((resolve, reject) => {
      axios.post("/api/bbs/resource/uploadResourceLogo", data)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
    });
  },
  // 新增资源导航
  resourceCreate(data) {
    return new Promise((resolve, reject) => {
      axios.post("/api/bbs/resource/create", data)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
    });
  },
  // 更新资源导航
  resourceUpdate(data) {
    return new Promise((resolve, reject) => {
      axios.post("/api/bbs/resource/update", data)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
    });
  },
  // 删除资源导航
  resourceDelete(data) {
    return new Promise((resolve, reject) => {
      axios.post("/api/bbs/resource/delete/" + data)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
    });
  },

};
