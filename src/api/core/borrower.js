import request from "@/utils/request";

export default {
  approval(borrowerApproval) {
    return request({
      url: "/admin/core/borrower/approval",
      method: "post",
      data: borrowerApproval,
    });
  },

  show(id) {
    return request({
      url: `/admin/core/borrower/show/${id}`,
      method: "get",
    });
  },

  getPageList(page, limit, keyword) {
    return request({
      url: `/admin/core/borrower/list/${page}/${limit}`,
      method: "get",
      params: { keyword },
    });
  },
};
