<template lang="html">
  <div id='articleCategory'>
    <div class="category-container">
       <div class="category-nav">
         <i class='el-icon-menu'>分类</i>
       </div>
        <!-- <ul v-for='(tagArr,key) in articletags' :key="key" class="tags-ul">
          <li v-for="(tag,tagkey) in tagArr.tags" :key="tagkey" class="tags-li">{{tag}}</li>
        </ul> -->
        <li v-for="(category,key) in articlecategory" :key="key">{{category.category}}</li>
     </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        articlecategory:''
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
           }
         })
         .catch( err => {
          console.log('get err',err)
        }
      )
      }
    }
}
</script>

<style lang="less">
body,html{
  margin:0;
  padding:0;
  border:0;
}


</style>
