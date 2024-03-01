
import { createStore } from 'vuex'
import mutations from './mutations';

const store = createStore({
    state () {
      return {
        isDatabaseInitialized:true,
        DatabaseName:'',
        cpuxdata:[],
        userUsages:[],
        systemUsages:[],
        idleUsages:[],
        isAdmin:false,
        gpuxdata:[],
        powerDraws:{},
        utilizations:{},
        temperatures:{},
      }
    },
    mutations,
  })

export default store
