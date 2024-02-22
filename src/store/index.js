
import { createStore } from 'vuex'
import mutations from './mutations';

const store = createStore({
    state () {
      return {
        isDatabaseInitialized:true,
        DatabaseName:'',
        cpuxdata:[],
        cpuydata:[],
      }
    },
    mutations,
  })

export default store
