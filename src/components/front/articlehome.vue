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
                <router-link :to="{name:'articledetail',params: {id: article._id},query:{articleId: article._id}}">
                  <div class="post-image" :style="{ backgroundImage: `url(${ article.picUrl })`,  backgroundSize: 'cover', backgroundPosition: '50%' }">
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
                          <span class="post-time">{{new Date(article.creatTime).toUTCString()}}
                          </span>
                        </div>
                      </div>
                      <div class="post-btn">阅读全文<i class="el-icon-d-arrow-right post-btn-word"></i></div>
                    </div>
                  </div>
                  <div class="post-bottom-info">
                    <h3 class="post-info-title">{{ article.title }}</h3>
                    <p class="post-info-content">{{ article.articleContent }}</p>
                  </div>
                </router-link>
              </article>
          </div>
        </div>
      </div>

      <div class="article-right">
         <Larticletags></Larticletags>
         <Larticlecateory></Larticlecateory>
      </div>  
    </div>


  </div>
</template>

<script>
import Larticletags from './components/tags'
import Larticlecateory from './components/category'
export default {
name: 'articlehome',
data () {
  return {
      scrollListen: false,
      articleObj: [],    //文章内容
      totalPages: "", // 总页数
      currentPage: 1  // 记录当前点击页码
  }
},
components:{
  Larticletags,
  Larticlecateory
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
        }
      })
      .catch( err => {
          console.log('get err',err)
        }
      )
   }
},
mounted(){
   this.getArticleList();   //获取文章列表
},
filters:{
  TagsFilter(value){
    return value.join(',')
  }
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
  display: flex;
  /* align-items: flex-start; */
  justify-content: space-around;
  flex-wrap: wrap;
}
.article-left{
  width:60%;
}
.article-right{
  width:30%;
}

@media (max-width: 600px) {
  .artilce-item{
    padding:30px 50px 50px 50px;
    display: flex;
    /* align-items: flex-start; */
    /* justify-content: space-around; */
    flex-direction: row-reverse;
}
  .article-left{
  width:100%;
}
.article-right{
  width:90%;
  border:2px solid black;
}
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
    box-shadow: 6px 6px 14px #888888;
  }

  .post-image {
    display: block;
    height: 340px;
    position: relative;
    border-radius: 5px;
  }
  .post-bottom-info{
    display: block;
    background:#fff;
  }
  .post-info-title,.post-info-content{
    padding:5px 20px 5px 15px;
    text-decoration: none;
  }
 
  .post-icon{
    width:25px;
    height:25px;
    margin-bottom:-5px;
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
    right:10%;
    color:#fff;
    width:110px;
    height:30px;
    background: rgba(0,0,0,0.5);
    font-size: 20px;
    padding:10px 5px 10px 10px;
    border-radius: 10px;
  }

  .post-btn-word{
    padding-left:5px;
  }

  .post-btn:hover{
    color:#fff;
    background: rgba(0,0,0,1);
    font-size: 20px;
  }

  .mask-wrapper {
    position: absolute;
    bottom: 10px;
    color: #fff;
    left: 20px;
    right: 20px;
  }

  .mask-wrapper .post-title {
    font-size: 20px;
    /* font-weight: 200!important; */
    line-height: 1;
    color: #fff;
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



</style>
