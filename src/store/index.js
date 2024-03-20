
import { createStore } from 'vuex'
import mutations from './mutations';

const store = createStore({
    state () {
      return {
        ismonitoring:false,
        sshInitialized:false,
        cpuxdata:[],

        cpuusage:{
          userUsage:[],
          systemUsage:[],
          idleUsage:[],
        },

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
