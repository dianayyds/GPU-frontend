
import { createStore } from 'vuex'
import mutations from './mutations';

const store = createStore({
    state () {
      return {
        ismonitoring:false,
        sshInitialized:false,
        cpuxdata:[],
        gpuxdata:[],

        cpuusage:{
          userUsage:[],
          systemUsage:[],
          idleUsage:[],
        },

        isAdmin:false,
        powerDraws:{},
        utilizations:{},
        temperatures:{},
        memoryUsages:[],
      }
    },
    mutations,
  })

export default store
