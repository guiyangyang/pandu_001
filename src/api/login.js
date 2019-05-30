import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/apis/users/login',
    method: 'post',
    data: params
  })
}
export function register(params) {
  return request({
    url: '/apis/users/register',
    method: 'post',
    data: params
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
    url: '/apis/users/logout',
    method: 'post',
    data:{
      token:token
    }
  })
}
export function modify(params) {
  return request({
    url: '/apis/users/modify',
    method: 'post',
    data:params
  })
}
