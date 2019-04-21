//数据结构   设计

let books = [
    {
        id:'books_literature_15555507291234',//分类_列表类_时间戳+4位随机数
        title:'人生海海',//标题
        img:'15555507291234_rshhh.png',//时间戳+4位随机数_rshhh.png
        introduce:'简介',//简介
        link:'http://www.wangpan.com',//链接地址
        password:'123456',//密码
        linktype:'biadu',//网盘类型
        effecttime:'7day',//有效时间
        sharenum:'20',//分享次数
        username:'xiaoyang',//上传用户名
        userphone:'15510370703',//用户手机号
        uploadtime:'2019-04-18 12:12:12',//上传时间
        updatetime:'2019-04-20 08:08:08',//更新时间
        deletetime:'2019-05-20 11:11:11',//删除时间

    }
]

let videos = [
    {
        id:'videos_movies_15555507291234',title:'人生海海',img:'15555507291234_rshhh.png',introduce:'简介',link:'http://www.wangpan.com',password:'123456',linktype:'baidu',effecttime:'7day',sharenum:'20',username:'xiaoyang',userphone:'15510370703',uploadtime:'2019-04-18 12:12:12',updatetime:'2019-04-20 08:08:08',deletetime:'2019-05-20 11:11:11',

    }
]

let users = [
    {   userid:'',
        username:'xiaoyang',//用户名
        userphone:'15510370703',//手机号
        password:'123456',//密码
        email:'1234@qq.com',//邮箱
        regtime:'2019-04-15 13:13:13',//注册时间
        logintime:'2019-04-15 14:14:14',//最近登录时间
        collections:[{}],//我的收藏
    }
]

module.exports =  {
   users:users,
   books:books,
   videos:videos
}

// 生成id
function GenNonDuplicateID(randomLength){
    return Number(Math.random().toString().substr(3,randomLength) + Date.now()).toString(36)
  }