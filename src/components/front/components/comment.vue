<template lang="html">
  <div id='comment'>
     <div class="comment-container">
        <nav class="comment-nav">评论</nav>
        <p class="comment-info">
          李龙廷  2018-08-03 21:21:21
        </p>
     </div>
    
  </div>
</template>

<script>
export default {
    data() {
      return {

      }
    },
    mounted(){
       
    },
    computed: {
       
    },
    methods: {

    }
   
}
</script>

<style lang="less" scoped>
#comment{
  .comment-container{
    width:60%;
    background: #fff;
    border-radius: 8px;
    .comment-nav{
      display: block;
      width:50px;
      font-size: 25px;
      border-bottom:2px red solid;
    }
  }
}
</style>
