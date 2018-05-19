<template>
<div id="tagArticleList">
   <div class="list-container">
      <div class="item-up">
          <el-collapse v-model="activeNames" @change="handlecollapse">
            <el-collapse-item title="点击查看分类" name="1">
             <Lcategory class="categoryview"></Lcategory>
            </el-collapse-item>
            <el-collapse-item title="点击查看标签" name="2">
              <Ltags></Ltags>
            </el-collapse-item>
          </el-collapse>
      </div>
      <div class="item-down">
        <p>正在浏览&nbsp;&nbsp;&nbsp;<span style="color:#aaa;font-size:20px;">{{titleTagOrCate}}</span>&nbsp;&nbsp;&nbsp;
        为&nbsp;&nbsp;&nbsp;
        <span style="color:#aaa;font-size:20px;">{{titleTagOrCateValue}}</span>&nbsp;&nbsp;&nbsp;
        的文章</p>
      <div class="article-list"> 
        <li v-for="(articleitem,index) in showText" :key="index" class="articledesc">  
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="fontSize:22px"> {{articleitem.title}}</span>
                <router-link :to="{name:'articledetail',params: {id: articleitem._id},query:{articleId: articleitem._id}}">
                  <el-button style="float: right; padding: 3px 0" type="text" >查看全文</el-button>
                </router-link>
              </div>
              <div class="text item">
                <span style="fontSize:15px">{{articleitem.author}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {{articleitem.creatTime | timeToLocalStringFilter}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  访问量：{{articleitem.visit}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  评论：0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              </div>
            </el-card>
        </li>
      </div>      
    </div>
 
   </div>



</div>  
</template>
<script>
import Ltags from './components/tags'
import Lcategory from './components/category'
export default{
  data(){
    return {
      tagArticleId:this.$route.query.tagArticleId,
      tagName:this.$route.query.tagName,
      cateArticleId:this.$route.query.cateArticleId,
      cateName:this.$route.query.cateName,
      showText:'',
      activeNames: ['1'],
      titleTagOrCate:'',
      titleTagOrCateValue:''

    }
  },
  components:{
    Ltags,
    Lcategory
  },
  watch:{
    $route(){
        this.tagName = this.$route.query.tagName;
        this.cateName = this.$route.query.cateName;
        this.handleInitArticleList();
    }
  },
  mounted(){
    //初始化
    this.handleInitArticleList();
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
    },
    handlecollapse(val){
      console.log(val,'val')
    },
    //页面刚进入  或者监听路由变化 执行的方法
    handleInitArticleList(){
       //拿到 文章 对应的标签  ,开始请求相关文章
        let _arr = [];
        for(let key in this.$route.query){
          _arr.push(key)
        }
        if(_arr[0] == 'tagArticleId' || _arr[0] == 'tagName'){
          this.getTagArtcileList(this.tagName);
          this.activeNames.splice(0,1);
          this.activeNames.push('2');
          this.titleTagOrCate = '标签';
          this.titleTagOrCateValue = this.tagName
        }else{
          this.getCateArtcileList(this.cateName);
          this.titleTagOrCate = '分类';
          this.titleTagOrCateValue = this.cateName
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
#articleTags /deep/ .tags-nav{
  display: none;
}
#articleCategory /deep/ .category-nav{
  display: none;
}
#articleTags /deep/ .tag-li{
  padding:10px;
  box-shadow: 0 0 0 #fff;
  margin-bottom:-10px;
}
#articleTags /deep/ .tags-container{
    margin-bottom:0px;
    background: #fff;
    box-shadow: 0px 0px 0px transparent;
    padding:0px;
    margin-bottom:0px;
    border-radius: 0px;
}
#articleCategory /deep/ .category-container{
    margin-bottom:0px;
    background: #fff;
    box-shadow: 0px 0px 0px transparent;
    padding:0px;
    margin-bottom:20px;
    border-radius: 0px;
}
#articleCategory /deep/ .category-li{
  padding:10px;
  box-shadow: 0 0 0 #fff;
  margin-bottom:-40px;
}

#tagArticleList{
  padding-top:120px;
  .list-container{
    width:80%;
    margin:0 auto;
    background: transparent;
    padding-bottom:20px;
    .item-up{
      .categoryview{
         margin:0;
         padding:0;
      }
      
    }
    .item-down{
      margin-top:50px;
      // border:1px solid black;
      .articledesc{
        display: block;
      }
    }
    
  }
}

</style>
