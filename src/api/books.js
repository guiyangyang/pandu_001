import request from "@/utils/request"

export function bkLiteratures(token) {
    return request({
        url:'/apis/books/literature',
        method:'get',
        params:{token}
    })
}

export function uploadForm(datas){
    return request({
        url:'/aips/uploadForm',
        method:'post',
        data:datas
    })
}
//获取  文学历史  列表
export function getLiterature(param) {
    return request({
        url:'/apis/books/getLiterature',
        method:'post',
        data:param
    })
}
