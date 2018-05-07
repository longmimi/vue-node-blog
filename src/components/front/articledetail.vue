<template>
<div id="articleDetailPage">
   <div class="article-image" :style="{ backgroundImage: `url(${ articleItem.picUrl })`,  backgroundSize: 'cover', backgroundPosition: '50%' }">
      <p class="article-title">{{articleItem.title}}</p>
   </div>
   <p v-html="displayArticleText"></p>
</div>  
</template>
<script>
const hljs = require('highlight.js');
const md = require('markdown-it')({
    html:         true,
    highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});
export default{
  data(){
    return {
      articleId:this.$route.query.articleId,
      articleItem:'',
      displayArticleText:''
    }
  },
  mounted(){
    //调用访问加一接口
    this.addVisit(this.articleId);
  },
  methods: {
    getArticleDetail(id){
      let _self = this;
      this.$http.get('api/getArticleDetail',{
        params:{
          articleId:id
        }
      })
      .then( res => {
        console.log('获取文章详情的res',res.data)
        _self.articleItem = res.data.articledetail;
        _self.displayArticleText = md.render(_self.articleItem.articleContent);
      })
    },
    addVisit(id){
      let that = this;
      this.$http.get('/api/addvisit',{
        params:{
          articleId:id
        }
      })
      .then( res => {
        if(res.data.status == 0){
          console.log('访问量+1',res.data)
          //获取文章详情
          this.getArticleDetail(this.articleId);     
        }
        else{
          console.log('访问量 +1 失败')
        }
      })
    }
  }
}
  
</script>
<style lang='less' scoped>
@font-face {
  font-family: "longtean";
  src: url-loader('../../assets/Third Rail.ttf') format('truetype');
}
#articleDetailPage{
  padding-top:60px;
  .article-image{
    width:100%;
    height:300px;
    .article-title{
      text-align: center;
      font-size: 40px;
      margin:0;
      line-height: 300px;
      font-style: longtean;
      color:#000;
    }
    .article-title:hover{
      transform: scale(1.2);
      cursor: pointer;
    }
  }
}

</style>
