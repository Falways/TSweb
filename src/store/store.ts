import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

interface userInterFace {
  userName:string,
  token:string
}
export default new Vuex.Store({
  state: {
    userName:'',
    token:''
  },
  mutations: {
    setUserInfo(state,obj:userInterFace){
      state.userName = obj.userName;
      state.token = obj.token;
    }
  },
  actions: {

  },
  plugins: [createPersistedState()]
})
