<template>
  <div class="home">
    <LnewPaper></LnewPaper>
  </div>
</template>

<script>
import LnewPaper from './newPaper.vue'
export default {
  name: 'home',
  data () {
    return {

    }
  },
  comments:{
    LnewPaper
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  padding-top: 90px;
}
</style>
