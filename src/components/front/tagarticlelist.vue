<template>
<div id="tagArticleList">
   {{showText}}



</div>  
</template>
<script>
export default{
  data(){
    return {
      tagArticleId:this.$route.query.tagArticleId,
      tagName:this.$route.query.tagName,
      cateArticleId:this.$route.query.cateArticleId,
      cateName:this.$route.query.cateName,
      showText:''
    }
  },
  mounted(){
    //拿到 文章 对应的标签  ,开始请求相关文章
    let _arr = [];
    for(let key in this.$route.query){
      _arr.push(key)
    }
    if(_arr[0] == 'tagArticleId' || _arr[0] == 'tagName'){
      this.getTagArtcileList(this.tagName);
    }else{
      this.getCateArtcileList(this.cateName);
    }
    
  },
  methods:{
    getTagArtcileList(tagname){
      let _self = this;
      console.log('tagname',tagname)
      this.$http.get('api/getarticlelistbytagname',{
        params:{
          tagName:tagname
        }
      })
      .then( res => {
        if(res.data.status  == 0){
          console.log('getarticlelistbytagname的返回数据',res.data.articletagslistbytagname)
          _self.showText = res.data.articletagslistbytagname
        }
      })
    },
    getCateArtcileList(catename){
      let _self = this;
      console.log('catename',catename)
      this.$http.get('api/getarticlelistbycategoryname',{
        params:{
          cateName:catename
        }
      })
      .then( res => {
        if(res.data.status  == 0){
          console.log('getarticlelistbytagname的返回数据',res.data.articletagslistbycatename)
          _self.showText = res.data.articletagslistbycatename
        }else{
          console.log('出错了')
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
