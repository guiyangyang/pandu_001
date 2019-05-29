import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/users/login',
    method: 'post',
    data: params
  })
}
export function register(params) {
  return request({
    url: '/users/register',
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
    url: '/users/logout',
    method: 'post',
    data:{
      token:token
    }
  })
}
export function modify(params) {
  return request({
    url: '/users/modify',
    method: 'post',
    data:params
  })
}
