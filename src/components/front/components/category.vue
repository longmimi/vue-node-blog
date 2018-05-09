<template lang="html">
  <div id='articleCategory'>
    <div class="category-container">
       <div class="category-nav">
         <i class='el-icon-menu'><span>文章分类</span></i>
       </div>
        <!-- <ul v-for='(tagArr,key) in articletags' :key="key" class="tags-ul">
          <li v-for="(tag,tagkey) in tagArr.tags" :key="tagkey" class="tags-li">{{tag}}</li>
        </ul> -->
        <li v-for="(category,key) in newCategoryArr" 
            :key="key" class="tags-li"
            @click="getArticleCategoryList(category.category)">
            {{category.category}}({{category.categoryCount}})
        </li>
     </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        articlecategory:'',
        newCategoryArr:[]

      }
    },
    mounted:function(){
       this.getArticleCategory();
    },
    computed: {
       
    },
    methods: {
       getArticleCategory(){
         let _self = this;
         this.$http.get('api/getarticlecategory')
         .then( res => {
           console.log('getarticlecategory',res);
           if(res.data.status == 0){
              console.log('res',res.data.articlecategory);
              this.articlecategory = res.data.articlecategory;
              this.newCategoryArr = this.uniqeByKeys(this.categoryAddCount(this.articlecategory),['category']) 
           }
         })
         .catch( err => {
          console.log('get err',err)
        }
      )
      },
      //点击分类获取该分类对应的文章
      getArticleCategoryList(category){
        let _self = this;
        this.$http.get('api/getarticlecategorylist',{params:{key:category}})
        .then(res => {
          if(res.data.status == 0){
             console.log('getarticlecategorylist',res.data.articlecategorylist[0].category)
             this.$router.push({ name:'tagarticlelist',
                              query:{
                                 cateArticleId:res.data.articlecategorylist[0]._id,
                                 cateName:res.data.articlecategorylist[0].category
                            }})
          }else{
            this.$notify({
                    title: '失败',
                    message: '请重试',
                    type: 'error',
                    offset:110
                  });
          }
          
        })
      },
      //处理拿到的数组，添加重复个数
      categoryAddCount(arr){
         let newArticleArr =[],
             dealedArr = [];
         for(let i=0;i<arr.length;i++){
          // var categoryCount=0;
          let itemObj= {};
          itemObj.categoryCount = 0;
          for(let j=i;j<arr.length;j++){
            if(arr[i].category === arr[j].category){        
              itemObj.category = arr[i].category;
              itemObj.categoryCount++;
            }
          }
          newArticleArr.push(itemObj)
        }
        return newArticleArr;
      },
      //将对象元素转换成字符串以作比较  
      obj2key(obj, keys){  
          var n = keys.length,  
              key = [];  
          while(n--){  
              key.push(obj[keys[n]]);  
          }  
          return key.join('|');  
      },
      //去重操作  
      uniqeByKeys(array,keys){  
          var arr = [];  
          var hash = {};  
          for (var i = 0, j = array.length; i < j; i++) {  
              var k = this.obj2key(array[i], keys);  
              if (!(k in hash)) {  
                  hash[k] = true;  
                  arr.push(array[i]);  
              }  
          }  
          return arr ;  
      } 
    }
}
</script>

<style lang="less" >
body,html{
  margin:0;
  padding:0;
  border:0;
}
li{
  list-style: none;
  display: inline-block;
  padding:3px;
  margin:0;
}
li::after{
  content: '、';
}
#articleCategory{
  background: #fff;
  box-shadow: 0px 0px 10px #888888;
  padding:5px 10px;
  .category-container{
    // min-width:300px;
  }
  .tags-li{
      cursor: pointer;
      padding-top:10px;
    }
  .tags-li:hover{
    text-decoration: underline;
  }
  .category-nav{
      border-bottom:1px solid #ccc;
      padding-bottom:10px;
      span{
        font-size: 20px;
        font-style: italic;
        display: inline-block;
        margin-left:10px;
      }
  }
}



</style>
