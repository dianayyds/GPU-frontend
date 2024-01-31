
import { createStore } from 'vuex'

const store = createStore({
    state () {
      return {
        isDatabaseInitialized:true,
        DatabaseName:'',
        cpuxdata:[],
        cpuydata:[],
      }
    },
    mutations:{
      Pushcpuinfo(state,payload){
        state.cpuydata.push(payload.usage);
        state.cpuxdata.push(payload.timestamp);
      }
    }
  })

export default store
