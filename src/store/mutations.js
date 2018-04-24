export default {
    showUserName(state,userObj){
        state.userName = userObj.userName;
        state.hasLogin = userObj.hasLogin;
    },
    loginOut(state, loginOutObj){
        state.userName = loginOutObj.userName;
        state.hasLogin = loginOutObj.hasLogin;
    }
}