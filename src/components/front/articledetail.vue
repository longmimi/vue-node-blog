<template>
<div id="articleDetailPage">
   <div class="article-image" :style="{ backgroundImage: `url(${ articleItem.picUrl })`,backgroundSize:'cover', backgroundPosition: 'center' ,backgroundRepeat: 'no-repeat' }">
      <p class="article-title">{{articleItem.title}}</p>
   </div>
   <div class="article-container">
      <p v-html="displayArticleText" class="displayArticleText"></p>
      <div class="displayArticleText-word"><p>我是有底线的~</p></div>
      <Lgivemoney class="givemoney"></Lgivemoney>
   </div>
   
   
</div>  
</template>
<script>
import Lgivemoney from './components/givemoney'
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
  components:{
    Lgivemoney
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
    height:350px;
    .article-title{
      position: absolute;
      z-index:30;
      left:50%;
      transform: translateX(-50%);
      font-size: 50px;
      margin:0;
      line-height: 300px;
      font-style: longtean;
      color:#fff;
    }
    .article-title:hover{
      cursor: pointer;
    }
  }
  .article-image::before{
    position: absolute;
    top:70px;
    left:0;
    width:100%;
    height:340px;
    content:'';
    background: rgba(0,0,0,0.5);
    z-index:1;
  }
  .article-container{
    overflow: hidden;
    position: absolute;
    z-index:20;
    width:60%;
    left:50%;
    top:52%;
    transform: translateX(-50%);
    padding:10px 20px 10px 20px;
    background: #fff;
    border-radius: 15px;
    box-shadow: 0px 0px 10px #888888;
    margin-bottom:100px;
    .displayArticleText{
      margin-bottom:50px;
    }
    .displayArticleText-word{
       width:100%;
       height:1px;
       background: #ccc;
       margin:30px 0px;
       position: relative;
       p{
         position: absolute;
         top:-28px;
         left:50%;
         transform: translateX(-50%);
         background: #fff;
         padding:0 7px;
       }
      }
  }
  .givemoney{
    margin:20px 0;
    cursor: pointer;
  }
}

</style>
