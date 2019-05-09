import { login, register, logout, getInfo} from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录 手机号
    Login({ commit }, userInfo) {
      const userphone = userInfo.userphone.trim()
      return new Promise((resolve, reject) => {
        login(userphone, userInfo.password).then(response => {
          // console.log('response')
          // console.log(response)
          // const data = response.data
          // console.log('response.data')
          // console.log(response.data)
          setToken(response.result.token)
          commit('SET_TOKEN', response.result.token)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    Register({ commit }, userInfo) {
      const userphone = userInfo.userphone.trim()
      return new Promise((resolve, reject) => {
        register(userphone, userInfo.password).then(response => {
          // const data = response.data.result
          // console.log('response.data.result.token')
          // console.log(response.data.result.token)
          setToken(response.result.token)
          commit('SET_TOKEN', response.result.token)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    CeShi({commit,state}){
      return new Promise((resolve,reject) => {
        ceShi().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        console.log('logout 001')
        console.log(state.token)
        logout(state.token).then(() => {
          console.log('logout 002')
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          console.log('logout 003')
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
