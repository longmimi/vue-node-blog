<template>
  <div id="app">
      <Lheader class="myheader"></Lheader>
      <router-view>
        <Lhome class="mybody"></Lhome>
      </router-view>
      <!-- <Lfooter class="myfooter"></Lfooter> -->
  </div>
</template>

<script>
import Lheader from './components/front/components/header';
import Lhome from './components/front/home';
import Lfooter from './components/front/components/footer';
export default {
  name: 'App',
  data(){
      return {

      }
  },
  components:{
      Lheader,
      Lhome
      // Lfooter
  }
}
</script>

<style>

body{
  /* background:url(./assets/LbackgroundImage.png); */
  background:#f1f3f4;
}
img{
  width:100%;
}
.el-badge__content{
      background-color: rgb(93, 105, 106);
}
.el-collapse-item__header{
        padding-left:10px;
}
.el-message-box__message{
    max-height: 380px;
    overflow: scroll;
}
</style>
