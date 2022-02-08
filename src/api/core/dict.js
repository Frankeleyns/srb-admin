import request from "@/utils/request";

export default{
    listByParentId(id) {
        return request({
            url: `/admin/core/dict/listByParentId/${id}`,
            method : "get"
        })
    }
}