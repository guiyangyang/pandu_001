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
        url:'/apis/uploadForm',
        method:'post',
        data:datas
    })
}
export function upImg(datas){
    return request({
        url:'/apis/uploadForm/upImg',
        method:'post',
        data:datas
    })
}