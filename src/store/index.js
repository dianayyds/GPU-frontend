
import { createStore } from 'vuex'
import mutations from './mutations';

const store = createStore({
    state () {
      return {
        ismonitoring:false,
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
