<template>
    <div class="newPaper">
      <Lmarkdown 
        :mdValuesP="msg" 
        :fullPageStatusP="false" 
        :editStatusP="false" 
        :previewStatusP="false"
        :navStatusP="false"  
        :icoStatusP="true"  
        @childevent="childEventHandler">
      </Lmarkdown>
    </div>
</template>

<script>
import Lmarkdown from './components/markdown.vue'
export default {
   data(){
     return{
          msg: {
             mdValue:'## Vue-markdownEditor'
        }
     }
   },
   comments:{
     Lmarkdown
   },
   methods:{
     childEventHandler:function(res){
        this.msg=res;
    }
  }
}
</script>

<style lang="less" scoped>
.newPaper{
  padding-top: 120px;
}
a {
    text-decoration: none;
    color:#fff;
}
.router-link-active {
    text-decoration: none;
}
</style>
