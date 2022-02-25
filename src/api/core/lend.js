import request from "@/utils/request";

export default {
  show(id) {
    return request({
      url: `/admin/core/lend/show/${id}`,
      method: "get",
    });
  },
  
  getList() {
    return request({
      url: `/admin/core/lend/list`,
      method: "get",
    });
  },
};
