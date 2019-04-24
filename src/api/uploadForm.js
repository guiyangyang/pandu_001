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
        url:'/uploadForm',
        method:'post',
        data:datas
    })
}