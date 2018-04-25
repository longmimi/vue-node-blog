<template>
  <div id="home" class="home">
    <Lbigimage></Lbigimage>
  </div>
</template>

<script>
import Lbigimage from './components/bigImage'
export default {
  name: 'home',
  data () {
    return {

    }
  },
  components:{
    Lbigimage
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  padding-top: 90px;
}
</style>
