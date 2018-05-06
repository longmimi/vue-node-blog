<template>
<div id="tagArticleList">
   文章列表view



</div>  
</template>
<script>
export default{
  data(){
    return {
      tagArticleId:this.$route.query.tagArticleId,
      tagName:this.$route.query.tagName
    }
  },
  mounted(){
    //拿到tagArticleId,开始请求相关文章
    this.getTagArtcileList(this.tagName);
  },
  methods:{
    getTagArtcileList(tagname){
      console.log('tagname',tagname)
      this.$http.get('api/getarticlelistbyid',{
        params:{
          tagName:tagname
        }
      })
      .then( res => {
        if(res.data.status  == 0){
          console.log('getarticlelistbyid的返回数据',res.data.articletagslistbyid)
        }
      })
    }
  }
}
  
</script>
<style lang='less' scoped>
#tagArticleList{
  padding-top:120px;
}

</style>
