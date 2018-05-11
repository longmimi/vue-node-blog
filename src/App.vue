<template>
  <div id="app">
      <Lheader class=""></Lheader>
      <router-view>
        <Lhome></Lhome>
      </router-view>
  </div>
</template>

<script>
import Lheader from './components/front/components/header';
import Lhome from './components/front/home';
export default {
  name: 'App',
  data(){
      return {

      }
  },
  components:{
      Lheader,
      Lhome
  }
}
</script>

<style>

body{
  background:url(./assets/LbackgroundImage.png)
}
img{
  width:100%;
}
.el-badge__content{
      background-color: rgb(93, 105, 106);
}
</style>
