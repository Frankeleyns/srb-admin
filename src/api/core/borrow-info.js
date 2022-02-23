import request from "@/utils/request";

export default {
  approval(borrowInfoApproval) {
    return request({
        url: '/admin/core/borrowInfo/approval',
        method: 'post',
        data: borrowInfoApproval
    })
  },

  show(id) {
    return request({
      url: `/admin/core/borrowInfo/show/${id}`,
      method: "get",
    });
  },

  getList() {
    return request({
      url: `/admin/core/borrowInfo/list`,
      method: "get",
    });
  },
};
