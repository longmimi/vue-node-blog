<template>
   <div id="articlehome" class="content homepage">

    <div class="artilce-item">
      <div class="article-left">
        <div class="content-area container">
          <!-- 文章列表 -->
          <div class="site-content">
              <article
                class="post-item"
                v-for="(article, key) in articleObj"
                :key="key"
              >  
                  <div class="post-image" :style="{ backgroundImage: `url(${ article.picUrl })`, backgroundSize:'cover', backgroundPosition: 'center' ,backgroundRepeat: 'no-repeat'}">
                    <div class="info-mask">
                      <div class="mask-wrapper">
                        <!-- <h3 class="post-title">{{ article.title }}</h3> -->
                        <p class="post-title">
                          <img src="../../assets/user.png" alt="" class="post-icon">
                          {{ article.author }}
                          <img src="../../assets/tag.png" alt="" class="post-icon">
                          {{ article.tags | TagsFilter}}
                          <img src="../../assets/category.png" alt="" class="post-icon">
                          {{ article.category }}
                        </p>
                        <div class="post-info">
                          <span class="post-time">{{new Date(article.creatTime).toLocaleString()}}
                            <span :title="`浏览量为 ${article.visit}`">
                              <img src="../../assets/visit.png" alt="" class="post-icon-visit" >
                              {{ article.visit }}
                            </span>
                            <span :title="`评论数为 ${article.comments.length}`">
                              <img src="../../assets/comment.png" alt="" class="post-icon-visit" >
                              {{ article.comments | commentFilter}}
                            </span>
                           

                          </span>
                        </div>
                      </div>
                      <router-link :to="{name:'articledetail',params: {id: article._id},query:{articleId: article._id}}">
                        <div class="post-btn">阅读全文<i class="el-icon-d-arrow-right post-btn-word"></i></div>
                      </router-link>
                    </div>
                  </div>
                  <div class="post-bottom-info">
                    <p class="post-info-title">{{ article.title }}</p>
                    <p class="post-info-content" v-html="checkContent(article.articleContent)"></p>
                  </div>           
              </article>
          </div>
        </div>
        <!-- 分页 -->
        <el-pagination
          class="mypagination"
          background
          layout="prev, pager, next"
          :total="totalItem"
          :page-size='5'
          @current-change="handleCurrentChange">
        </el-pagination>
        <!-- 分页 -->
      </div>

      <div :class="{articleright:isFlow,articlerightfixed:isFixed}" ref="tagCate">
         <Larticletags class="Larticletags"></Larticletags>
         <Larticlecateory class="Larticlecategory"></Larticlecateory>
      </div>  
    </div>

    <Ldrawer
      v-show="isdrawershow"
      circle
      theme="light"
      switchPosi="bl"
      :drawerWidth="280"
      @open-drawer="handleOpen"
      @close-drawer="handleClose">
      
       <Larticletags class="Larticletags"></Larticletags>
       <Larticlecateory class="Larticlecategory"></Larticlecateory>
    </Ldrawer>

    <!-- <div :class="{footer:isFooterShow}">
      <p>designed by longtean</p>
    </div> -->


  </div>
</template>

<script>
import Larticletags from './components/tags'
import Larticlecateory from './components/category'
import Ldrawer from './components/drawer'
const hljs = require('highlight.js');
import 'highlight.js/styles/googlecode.css' //样式文件
const md = require('markdown-it')({
    html:         true,
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
export default {
name: 'articlehome',
data () {
  return {
      scrollListen: false,
      articleObj: [],    //文章内容
      totalPages: "", // 总页数
      currentPage: 1, // 记录当前点击页码
      isFixed: false,
      isFlow:true,
      totalItem: 0, //总博客个数
      isdrawershow: true
  }
},
components:{
  Larticletags,
  Larticlecateory,
  Ldrawer
},
beforeCreate(){
  
},
methods: {
   getArticleList(){
     let _self = this;
      this.$http.get('/api/getarticlehome')
      .then( res => {
        console.log(res.data)
        if(res.data.status == 0){
          console.log('res',res.data.articlehome);
          this.articleObj = res.data.articlehome;
          this.totalItem = res.data.totalNumber;
        }
      })
      .catch( err => {
          console.log('get err',err)
        }
      )
   },
   handleScroll(){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let offsetTop = this.$refs.tagCate.offsetTop 
        if (scrollTop + 80 > offsetTop) {
          this.isFixed = true
          // this.isFlow = false
            if(scrollTop < 360){
            this.isFixed = false
          }
        }
         else {
          this.isFixed = false
          // this.isFlow = true 
        }
   },
  //  handleScroll2(){
  //     let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  //     let offsetHeight = document.body.clientHeight   
  //      console.log(scrollTop,'划过的距离')
  //      console.log(offsetHeight,'页面整体的的距离')
  //  },
   checkContent(value){
     let _articleContent = md.render(value)
     return _articleContent.length > 100 ? _articleContent.substr(0,80) + '......' : _articleContent;
   },
   handleCurrentChange(val){
      console.log(val);
      this.$http.get('api/getpagination',{
        params:{
          pageNumber:val
        }
      })
      .then( res => {
        console.log(res.data.status,'res.data.status')
        console.log(res.data.pagination,'res.data.pagination')
        this.articleObj = res.data.pagination;
        this.scrollToTop(2000)
      })

   },
   scrollToTop(scrollDuration){
     const scrollHeight = window.scrollY,
              scrollStep = Math.PI / ( scrollDuration / 15 ),
              cosParameter = scrollHeight / 2;
        let scrollCount = 0,
            scrollMargin,
            scrollInterval = setInterval(function () {
              if ( window.scrollY != 0 ) {
                scrollCount = scrollCount + 1;  
                scrollMargin = cosParameter - cosParameter * Math.cos( scrollCount * scrollStep );
                window.scrollTo( 0, ( scrollHeight - scrollMargin ) );
              } else {
                clearInterval(scrollInterval); 
              }
            }, 1);
   },
   handleOpen(){
     console.log('打开抽屉')
   },
   handleClose(){
      console.log('关闭抽屉')
   }
   
},
computed: {
   commentFilter(value){
     return value.length
  }
  //   articleContentFilter(value){
  //     console.log(value,'aaaaaaaaaaaaaaaaaaaaaaaaaa')
  //   //  let articleValue = md.render(value)
  //    if(articleValue.length > 100){
  //      articleValue = articleValue.substr(0,100)
  //      console.log(articleValue)
  //    }
  //    return articleValue;
  //  }
},
mounted(){
  let that = this;
   this.getArticleList();   //获取文章列表
   window.addEventListener('scroll', this.handleScroll)
  //  window.addEventListener('scroll', this.handleScroll2)
  if( navigator.userAgent.match(/Android/i)  
                || navigator.userAgent.match(/webOS/i)  
                || navigator.userAgent.match(/iPhone/i)  
                || navigator.userAgent.match(/iPad/i)  
                || navigator.userAgent.match(/iPod/i)  
                || navigator.userAgent.match(/BlackBerry/i)  
                || navigator.userAgent.match(/Windows Phone/i)  
                ){  
                   that.isdrawershow = true
                  
                  //  console.log(this.isdrawershow,'判断if')
                }  
                else {  
               
                    that.isdrawershow = false
                    // console.log(this.isdrawershow,'判断else')
                }  
   window.onresize = function(){
       //chrome resize事件会触发两次
       var res;
        if (res){clearTimeout(res)}
        res = setTimeout(function(){
          if( navigator.userAgent.match(/Android/i)  
                || navigator.userAgent.match(/webOS/i)  
                || navigator.userAgent.match(/iPhone/i)  
                || navigator.userAgent.match(/iPad/i)  
                || navigator.userAgent.match(/iPod/i)  
                || navigator.userAgent.match(/BlackBerry/i)  
                || navigator.userAgent.match(/Windows Phone/i)  
                ){  
                   that.isdrawershow = true
                }  
                else {  
                   that.isdrawershow = false
                }  
        },20);
        
     
   }
},
filters:{
  TagsFilter(value){
    return value.join(',')
  },
   commentFilter(value){
     return value.length
   }
},
watch:{
  isdrawershow:function(v){
    console.log(v,'vvvvvvvvvv')
   }
},
destroyed () {
  window.removeEventListener('scroll', this.handleScroll)
}
}
</script>

<style scoped>
.router-link-active {
    text-decoration: none;
}
a{
  text-decoration: none;
}
.artilce-item{
  padding:30px 50px 50px 50px;
  /* display: flex;
  justify-content: space-around;
  flex-wrap: wrap; */
}
.article-left{
  position: absolute;
  top:70%;
  left:8%;
  width:55%;
}
.articleright{
  position:absolute;
  top:70%;
  right:8%;
  width:25%;
}
.articlerightfixed{
  position:fixed;
  top:81px;
  right:8%;
  width:25%;
}

.mypagination{
  display: block;
  width:34%;
  margin:50px auto 50px;
}


  /* 列表动画 */
  @keyframes comeIn {
    from {
      /* margin-left: 10%; */
      opacity: 0.4;
      /* filter: blur(20px); */
      transform: translate3d(100px, 0, 0);
    }
    to {
      /* margin-left: 0%; */
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  .scrollAnimate {
    animation: comeIn .3s ease-out;
  }

  .container {
    /* max-width: 666px!important; */
    /* margin-right: auto!important; */
    /* margin-left: 4%!important; */
    /* width: 90%!important; */
  }

  .post-item {
    position: relative;
    margin-bottom: 30px;
    background-color: #fff;
    box-shadow: 0px 0px 20px #888888;
    border-radius: 10px;
  }

  .post-image {
    display: block;
    height: 340px;
    position: relative;
    border-radius: 10px 10px 0 0;
  }
  .post-bottom-info{
    display: block;
    background:#fff;
    border-radius: 0 0 10px 10px;
  }
  .post-info-title{
    padding:5px 20px 5px 15px;
    text-decoration: none;
    margin:2px;
    font-size: 20px;
    font-weight: 200;
  }

  .post-info-content{
    font-size: 15px;
    margin-top:-20px;
    padding:5px 20px 5px 15px;
  }
 
  .post-icon{
    width:25px;
    height:25px;
    margin-bottom:-5px;
  }
  .post-icon-visit{
    width:15px;
    height:15px;
    margin-left:10px;
    margin-bottom:-2px;

  }

  .post-item .info-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: transparent -webkit-linear-gradient(top,transparent,rgba(0,0,0,.4)) repeat scroll 0 0;
    background: transparent linear-gradient(180deg,transparent 0,rgba(0,0,0,.4)) repeat scroll 0 0;
  }


  .info-mask {
    display: block;
    padding: 30px;
  }
  
  .post-item:hover .info-mask {
    background: transparent -webkit-linear-gradient(top,transparent,rgba(0,0,0,.8)) repeat scroll 0 0;
    background: transparent linear-gradient(180deg,transparent 0,rgba(0,0,0,.8)) repeat scroll 0 0;
  }

  .post-btn{
    position:absolute;
    bottom:10%;
    right:8%;
    color:#fff;
    width:110px;
    height:30px;
    background: rgba(0,0,0,0.5);
    font-size: 20px;
    padding:5px 5px 5px 10px;
    border-radius: 10px;
    line-height: 30px;
    text-align: center;
  }

  .post-btn-word{
    padding-left:5px;
  }

  .post-btn:hover{
    color:#fff;
    background: rgba(0,0,0,1);
    font-size: 18px;
  }

  .mask-wrapper {
    position: absolute;
    bottom: 10px;
    color: #fff;
    left: 20px;
    right: 20px;
  }

  .mask-wrapper .post-title {
    font-size: 18px;
    font-weight: 100!important;
    line-height: 1;
    color: #fff;
    text-overflow: ellipsis;
  }

  .post-item:hover .info-mask .mask-wrapper .post-title {
    color: lightskyblue;
  }

  .mask-wrapper .post-title {
    color: inherit;
  }

  .mask-wrapper .post-info {
    font-size: 14px;
    font-family: exoregular;
  }
  

  .pagination-list li {
    list-style: none;
  }



  /* .footer{
    position:fixed;
    bottom:0;
    right:0;
    left:0;
    width:100%;
    background: #000;
    height:50px;
    line-height: 100px;
  }

  .footer p{
    text-align: center;
    color:#fff;
    font-size: 15px;
  } */
@media (max-width: 500px) {
  .artilce-item{
    padding:30px 50px 50px 50px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap; 
    margin-top:-50px;
   }
  .article-left{
    position: absolute;
    top:52%;
    left:8%;
    width:85%;
  }
  .articleright{
    display: none;
  }
  .articlerightfixed{
    display: none;
  } 
  .mypagination{
    display: block;
    width:57%;
    margin:50px auto 50px;
  }
  .post-icon{
    width:20px;
    height:20px;
    margin-bottom:-5px;
  }
  .mask-wrapper .post-title {
    font-size: 13px;
    font-weight: 100!important;
    line-height: 1;
    color: #fff;
    text-overflow: ellipsis;
  }
  .mask-wrapper .post-info {
    font-size: 12px;
    font-family: exoregular;
  }
  .post-btn{
    position:absolute;
    bottom:8%;
    right:3%;
    color:#fff;
    width:80px;
    height:25px;
    background: rgba(0,0,0,0.2);
    font-size: 15px;
    padding:5px 5px 5px 10px;
    border-radius: 8px;
    line-height: 25px;
    text-align: center;
  }

  .post-btn-word{
    padding-left:5px;
  }

  .post-btn:hover{
    color:#fff;
    background: rgba(0,0,0,1);
    font-size: 18px;
  }
}

</style>
