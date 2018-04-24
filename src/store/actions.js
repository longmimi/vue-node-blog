import Vue from 'vue'
import router from '../router/index'

export default {
    showUserName({commit},userObj){
        commit('showUserName',userObj)
    },
    loginOut({commit},loginOutObj){
        commit('loginOut', loginOutObj)
    }
}