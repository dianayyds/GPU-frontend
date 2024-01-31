
import { createStore } from 'vuex'

const store = createStore({
    state () {
      return {
        isDatabaseInitialized:true,
        DatabaseName:''
      }
    }
  })

export default store
