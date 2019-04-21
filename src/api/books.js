import request from "@/utils/request"

export function bkLiteratures(token) {
    return request({
        url:'/apis/books/literature',
        method:'get',
        params:{token}
    })
}