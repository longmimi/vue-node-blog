<template lang="html">
  <div id='nav'>
      <nav class="my-nav">
          <router-link :to="{name:'home'}"><img class="logoImg" src='../../../assets/longLogo.png'></router-link>
          <ul>
            <li class="my-nav-head" style="color:#f5f5f5;font-size:14px;"><router-link :to="{ name: 'newPaper'}">新建</router-link></li>
            <li class="my-nav-head" style="color:#f5f5f5;font-size:14px;" v-if="this.$store.state.hasLogin === false"><router-link :to="{ name: 'login'}">登录</router-link></li>
            <li class="my-nav-head" v-else>
            <el-button v-popover:popover5 type="text" style="color:#f5f5f5;font-size:14px;">{{userName}}</el-button>
              <el-popover
                ref="popover5"
                placement="top"
                width="160"
                v-model="visible2">
                <p>您确定要退出吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="loginOut">确定</el-button>
                  <el-button type="primary" size="mini" @click="goUserCenter">个人中心</el-button>
                </div>
              </el-popover>
            </router-link></li>
          </ul>
      </nav>
  </div>
</template>

<script>
export default {
    data() {
      return {
         visible2: false,
         userName_session:sessionStorage.getItem('userName_session')
      }
    },
    mounted:function(){
      console.log(this.$store.state.hasLogin)
    },
    computed: {
       userName:function(){
         return this.$store.state.userName
        //       console.log(sessionStorage.getItem('userName_session'))
        //  return sessionStorage.getItem('userName_session');
      }    
    },
    methods: {
      loginOut(){
        sessionStorage.removeItem('userName_session');
         this.$store.dispatch('loginOut',{
            userName:'',
            hasLogin:false
        })  
        this.visible2 = false;
         this.$router.push('/')
      },
      goUserCenter(){
        this.$router.push('/userCenter')
        this.visible2 = false;
      }
    }
}
</script>

<style lang="less" >
body,html{
  margin:0;
  padding:0;
  border:0;
}
#nav{
  position: fixed;
  width:100%;
  height:70px;
  box-shadow: 0 1px rgba(0,0,0,0.1);
  background:#24262a;
  .my-nav{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 10px;
    // line-height: 70px;
    .my-nav-head {
      list-style: none;
      display: inline-block;
      a {
        font-size: 20px;
        text-decoration: none;
        list-style: none;
        color:#f5f5f5;
        padding-right: 10px;
        // writing-mode:vertical-lr;
      }
    }
    .logoImg{
      width:160px;
      height:60px;
      position:absolute;
      top:50%;
      left:5%;
      transform: translate(-30px,-30px);
      
    }
  }
}
</style>
