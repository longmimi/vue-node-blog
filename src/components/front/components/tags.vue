<template lang="html">
  <div id='articleTags'>
     <div class="tags-container">
       <div class="tags-nav">
         <i class='el-icon-star-off'><span>文章标签</span></i>
       </div>
       <div class="tag-li">
          <el-badge v-for="(tagItem,key) in articletags"
                   :value='tagItem.tagCount' :key="key" class="item tags-li">
              <el-button size="small"  @click="getArticleTagsList(tagItem)">{{tagItem.tags}}</el-button>
          </el-badge>
            <!-- <li v-for="(tagItem,key) in articletags" 
                :key="key" 
                class="tags-li"
                @click="getArticleTagsList(tagItem)">
                {{tagItem.tags}}({{tagItem.tagCount}})
            </li> -->
        </div>
     </div>
    
  </div>
</template>

<script>
export default {
    data() {
      return {
        articletags:'',
        articleTagsArr:[],
        queryTagMsg:'',
        tagName:'',
        tagListArr:[]
      }
    },
    mounted:function(){
       this.getArticleTags();
    },
    computed: {
       
    },
    methods: {
       getArticleTags(){
         let _self = this;
         this.$http.get('api/getarticletags')
         .then( res => {
           console.log('getarticletags',res);
           if(res.data.status == 0){
              console.log('res',res.data.articletags);
              this.articleTagsArr = res.data.articletags;                    
              this.articletags = this.uniqeByKeys(this.tagsAddCount(this.arr2To1( this.articleTagsArr)),['tags'])
           }
         })
         .catch( err => {
          console.log('get err',err)
        }
      )
      },
      //点击标签获取该标签的文章
      getArticleTagsList(tagItem){
        let _self = this;
        this.$http.get('api/getarticletaglist',{params:{key:tagItem.tags}})
        .then(res => {
          if(res.data.status == 0){
             console.log('getarticletaglist',res.data.articletagslist)
             _self.tagName = tagItem.tags;
             let tagList = res.data.articletagslist,
                 tagListArrTemp = [];
             tagList.forEach( (item,index) => {
                tagListArrTemp.push(item._id)
             })
            _self.tagListArr = tagListArrTemp;
          }
          this.$router.push({ name:'tagarticlelist',
                              query:{
                                 tagArticleId:this.tagListArr,
                                 tagName:this.tagName
                            }})
        })

      },
      //二维数组变一维
      arr2To1(arr){
        let newArr = [];
        for(let i=0;i<arr.length;i++){
          for(let j=0;j<arr[i].tags.length;j++){
            newArr.push(arr[i].tags[j])
          }
        }  
        return newArr
      },
      //标签的各项去重，并加上每项的个数
      tagsAddCount(arr){
         let newArticleArr =[],
             dealedArr = [];
         for(let i=0;i<arr.length;i++){
          // var tagCount=0;
          let itemObj= {};
          itemObj.tagCount = 0;
          for(let j=i;j<arr.length;j++){
            if(arr[i] === arr[j]){        
              itemObj.tags = arr[i];
              itemObj.tagCount++;
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

<style lang="less" scoped>
li,ul{
  list-style: none;
  display: inline-block;
  padding:3px;
  margin:0;
}
// li::after{
//   content: '、';
// }

#articleTags{
  background: #fff;
  box-shadow: 0px 0px 10px #888888;
  padding:5px 10px;
  margin-bottom:30px;
  .tags-container{
    margin-bottom:20px;
    .tag-li{
      word-break:break-all;
      margin-top:10px;
      
      .tags-li{
        cursor: pointer;
        margin:1px 10px 10px 1px;
      }
      .tags-li:hover{
        text-decoration: underline;
      }
    }
   
    .tags-nav{
      height:22px;
      border-bottom:1px solid #ccc;
      padding-bottom:10px;
      span{
        font-size: 20px;
        font-style: italic;
        display: inline-block;
        margin-left:10px;
        line-height: 20px;
      }
    }
  }
}
</style>
