<template>
  <div id="home" class="home">
    <Lbigimage></Lbigimage>
    <Larticlehome></Larticlehome>
  </div>
</template>

<script>
import Lbigimage from './components/bigImage'
import Larticlehome from './articlehome'
import Lfooter from './components/footer';
export default {
  name: 'home',
  data () {
    return {

    }
  },
  components:{
    Lbigimage,
    Larticlehome,
    Lfooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.home{
  padding-top: 90px;
  .home-line{
    width:100%;
    height:1px;
    background-color:#000;
  }
}
</style>
