import request from "@/utils/request"

export function uploadForm(datas){
    return request({
        url:'/apis/uploadForm',
        method:'post',
        data:datas
    })
}
export function upImg(datas){  //单独 上传图片
    return request({
        url:'/apis/uploadForm/upImg',
        method:'post',
        data:datas
    })
}