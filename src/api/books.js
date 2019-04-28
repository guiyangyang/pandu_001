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
//最新分享
export function getLatestShare(size) {
    return request({
        url:'/apis/books/getLatestShare',
        method:'post',
        data:size
    })
}
//分享 次数
export function addShareNum(param) {
    return request({
        url:'/apis/books/addShareNum',
        method:'post',
        data:param
    })
}
//分享排行 Share rank
export function shareRank(size) {
    return request({
        url:'/apis/books/shareRank',
        method:'post',
        data:size
    })
}