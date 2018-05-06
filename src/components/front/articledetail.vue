<template>
<div id="articleDetailPage">
   <div class="article-image">
      <p class="article-title"></p>
   </div>
</div>  
</template>
<script>
export default{
  data(){
    return {
      articleId:this.$route.query.articleId
    }
  },
  mounted(){
    //获取文章详情
    this.getArticleDetail(this.articleId);
  },
  methods: {
    getArticleDetail(id){
      this.$http.get('api/getArticleDetail',{
        params:{
          articleId:id
        }
      })
      .then( res => {
        console.log('获取文章详情的res',res)
      })
    }
  }
}
  
</script>
<style lang='less' scoped>
#articleDetailPage{
  padding-top:120px;
  .article-image{
    width:100%;
  }
}

</style>
