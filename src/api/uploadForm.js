import request from "@/utils/request"

export function uploadForm(datas){// 上传 网盘资源
    return request({
        url:'/apis/uploadForm',
        method:'post',
        data:datas
    })
}

export function uploadEpub(datas){// 上传 epub书籍
    return request({
        url:'/apis/uploadForm/epub',
        method:'post',
        // contentType:'application/x-www-form-urlencoded',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        },
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