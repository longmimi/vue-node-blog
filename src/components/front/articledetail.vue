<template>
<div id="articleDetailPage">
   <h1>我是文章详情页</h1>
   {{$route.query}}



</div>  
</template>
<script>
export default{
  data(){
    return {
      articleId:''
    }
  },
  mounted(){
    
  }
}
  
</script>
<style lang='less' scoped>
#articleDetailPage{
  padding-top:120px;
}

</style>
