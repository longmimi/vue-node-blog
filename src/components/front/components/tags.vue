<template lang="html">
  <div id='articleTags'>
     <div class="tags-container">
       <div class="tags-nav">
         <i class='el-icon-star-off'>标签</i>
       </div>
        <ul v-for='(tagArr,key) in articletags' :key="key" class="tags-ul">
          <li v-for="(tag,tagkey) in tagArr.tags" :key="tagkey" class="tags-li">{{tag}}</li>
        </ul>
     </div>
    
  </div>
</template>

<script>
export default {
    data() {
      return {
        articletags:''
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
              this.articletags = res.data.articletags;
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

li,ul{
  list-style: none;
  display: inline-block;
  padding:3px;
  margin:0;
}
li::after{
  content: '、';
}
#articleTags{
  .tags-container{
    min-width:300px;
    .tags-ul,.tags-li{
      cursor: pointer;
    }
    .tags-li:hover{
      text-decoration: underline;
    }
  }
}

</style>
