<template lang="html">
  <div id='nav'>
      <nav class="my-nav">
        <ul>
          <li class="my-nav-head"><router-link :to="{ name: 'home'}">首页</router-link></li>
          <li class="my-nav-head"><router-link :to="{ name: 'login'}">登录</router-link></li>
        </ul>
      </nav>
  </div>
</template>

<script>
export default {
    data() {
      return {

      }
    }
}
</script>

<style lang="less">
body,html{
  margin:0;
  padding:0;
  border:0;
}
#nav{
  position: fixed;
  width:100%;
  height:80px;
  box-shadow: 0 1px rgba(0,0,0,0.1);
  .my-nav{
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
    .my-nav-head {
      list-style: none;
      display: inline-block;
      a {
        font-size: 20px;
        text-decoration: none;
        list-style: none;
        color:black;
        padding-right: 10px;
        writing-mode:vertical-lr;
      }
    }
  }
}
</style>
