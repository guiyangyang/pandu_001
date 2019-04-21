import request from '@/utils/request'

export function login(userphone, password) {
  return request({
    url: '/users/login',
    method: 'post',
    data: {
      userphone,
      password
    }
  })
}
export function register(userphone, password) {
  return request({
    url: '/users/register',
    method: 'post',
    data: {
      userphone,
      password
    }
  })
}

export function ceShi(){
  // return request({
  //   url:'/goods',
  //   method:'get'
  // })
  // var params ={
  //   userphone:'xiaoyang',
  //   password:'1234'
  // }
  return request({
    url:'/apis/users/login',
    method:'post',
    data:{
      userphone:'xiaoyang',
      password:'1234'
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/users/logout',
    method: 'post',
    data:{
      token:token
    }
  })
}
