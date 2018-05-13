<template>
<div id="articleDetailPage">
   <div class="article-image" :style="{ backgroundImage: `url(${ articleItem.picUrl })`,backgroundSize:'cover', backgroundPosition: 'center' ,backgroundRepeat: 'no-repeat' }">
      <p class="article-title">{{articleItem.title}}</p>
      <p class="article-time">{{articleItem.author}} · 最后发布于 · {{articleItem.lastEditTime | timeToLocalStringFilter}} · 已被浏览 {{articleItem.visit}} 次</p>
      <!-- <p class="article-time" v-if="">最后修改于 · {{articleItem.lastEditTime | timeToLocalStringFilter}}</p> -->
   </div>
   <div class="manageArticle" v-if="isSelf">
     <div @click="editarticle()" class="manageBtn">编辑文章</div>
     <div @click="deletearticle()" class="manageBtn">删除文章</div>
   </div>
   <div class="article-wrap">
      <div class="article-container">
          <p v-html="displayArticleText" class="displayArticleText"></p>
          <div class="displayArticleText-word"><p>我是有底线的</p></div>
          <Lgivemoney class="givemoney"></Lgivemoney>
          <Lcomment></Lcomment>
      </div>
      <div class="article-comment">
        
      </div>
   </div>
  
   
   
</div>  
</template>
<script>
import Lgivemoney from './components/givemoney'
import Lcomment from './components/comment'
const hljs = require('highlight.js');
import 'highlight.js/styles/googlecode.css' //样式文件
const md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true,
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
      displayArticleText:'',
      isSelf: false,
      _articleId:'',
      articleCache:''
    }
  },
  mounted(){
    //调用访问加一接口
    this.addVisit(this.articleId);
  },
  components:{
    Lgivemoney,
    Lcomment
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
        // console.log('获取文章详情的res',res.data)
        _self.articleItem = res.data.articledetail;
        //缓存对象，为了编辑文章功能
        _self.articleCache = res.data.articledetail;
        _self.displayArticleText = md.render(_self.articleItem.articleContent);
          // console.log('displayArticleText',this.displayArticleText)
        if(this.$store.state.hasLogin == true && this.$store.state.userName !== '' && this.articleItem.author == this.$store.state.userName){
            _self.isSelf = true;
        }
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
          //获取文章详情
          this.getArticleDetail(this.articleId);     
        }
        else{
          console.log('访问量 +1 失败')
        }
      })
    },
    //编辑文章
    editarticle(){
      if(confirm('您确认要编辑文章吗？')){
        //设置缓存
        sessionStorage.setItem('article_content_edit',this.articleCache.articleContent)
        sessionStorage.setItem('article_title_edit',this.articleCache.title)
        sessionStorage.setItem('article_category_edit',this.articleCache.category)
        sessionStorage.setItem('article_tags_edit',this.articleCache.tags)
        sessionStorage.setItem('article_picUrl_edit',this.articleCache.picUrl)
        //删除之前保存的草稿
        sessionStorage.removeItem('article_content')
        sessionStorage.removeItem('article_title')
        sessionStorage.removeItem('article_category')
        sessionStorage.removeItem('article_tags')
        sessionStorage.removeItem('article_picUrl')

        this.$router.push({name:'newPaper',
                           query:{
                             isEditArticle:'yes',
                             articleId:this.articleId
                           }   
                          });
      }else{
        
      }
      
    },
    deletearticle(){
      if(confirm('您确认要删除文章吗？')){
          console.log('删除文章');
          this.$http.get('/api/deleteArticle',{
            params:{
              articleId:this.articleId
            }
          })
          .then( res => {
            if(res.data.status == 0){
              console.log('删除返回的数据',res)
              this.$notify({
                  title: '删除成功',
                  message: `${res.data.msg}`,
                  type: 'success',
                  offset:100
                });
              this.$router.push('/');
            }else{
              this.$notify({
                  title: '删除失败',
                  message: `${res.data.msg}`,
                  type: 'success',
                  offset:100
              });
            }
          }) 
      }
    }
  },
  filters:{
    timeToLocalStringFilter(time){
      return new Date(time).toLocaleString()
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
      width:100%;
      text-align: center;
      z-index:30;
      left:50%;
      transform: translateX(-50%);
      font-size: 50px;
      margin:0;
      line-height: 300px;
      font-style: longtean;
      color:#fff;
    }
    .article-time{
      position: absolute;
      width:100%;
      text-align: center;
      z-index:30;
      left:50%;
      top:17%;
      transform: translateX(-50%);
      font-size: 15px;
      margin:0;
      line-height: 300px;
      font-style: longtean;
      color:#fff;
      white-space:normal;
      word-break:break-all;
      word-wrap:break-word;
    }
    .article-title:hover{
      cursor: pointer;
    } 
  }
  .manageArticle{
    .manageBtn{
      color:rgba(0,0,0,0.3);
      cursor:pointer;
      margin:5px;
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
  .article-wrap{
   
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
  .article-comment{
      
    }
  .givemoney{
    margin:20px 0;
    cursor: pointer;
  }
  }

}
@media (max-width:600px){
  #articleDetailPage{
  padding-top:60px;
  .article-image{
    width:100%;
    height:350px;
    .article-title{
      position: absolute;
      width:100%;
      text-align: center;
      z-index:30;
      left:50%;
      transform: translateX(-50%);
      font-size: 29px;
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
    left:50%;
    z-index:20;
    width:91%;
    // left:50%;
    // top:52%;
    // transform: translateX(-50%);
    padding:10px 20px 10px 20px;
    background: #fff;
    border-radius: 15px;
    // box-shadow: 0px 0px 10px #888888;
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
      //  p{
      //    position: absolute;
      //    top:-28px;
      //    left:50%;
      //    transform: translateX(-50%);
      //    background: #fff;
      //    padding:0 7px;
      //  }
      }
  }
  .givemoney{
    margin:20px 0;
    cursor: pointer;
  }
}
}

</style>
