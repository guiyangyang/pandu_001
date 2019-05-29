import request from "@/utils/request"


//获取  文学历史  列表
// export function getLiterature(param) {
//     return request({
//         url:'/videos/getLiterature',
//         method:'post',
//         data:param
//     })
// }

// 获取 各类书籍 列表
export function getVideos(param) {
    return request({
        url:'/videos/getVideos',
        method:'post',
        data:param
    })
  }
//最新分享
export function getLatestShare(size) {
    return request({
        url:'/videos/getLatestShare',
        method:'post',
        data:size
    })
}
//分享 次数
export function addShareNum(param) {
    return request({
        url:'/videos/addShareNum',
        method:'post',
        data:param
    })
}
//分享排行 Share rank
export function shareRank(size) {
    return request({
        url:'/videos/shareRank',
        method:'post',
        data:size
    })
}