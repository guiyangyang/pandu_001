// import { bkLiterature } from '@/api/books'
import { getToken, setToken, removeToken } from '@/utils/auth'


const book = {
  state:{},
  mutations:{},
  actions:{
      getLiterature({ commit }) {
          return new Promise((resolve, reject) =>{
            bkLiterature().then((res) => {
                console.log('bkLiterature success')
            }).catch((err) => {
              console.log('bkLiterature err')
            })
          }) 
        
      }
  }
}

export default book