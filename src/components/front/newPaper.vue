<template>
    <div id="newPaper" class="newPaper" style="height:600px">
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
          msg: '## 在这里开始写博客吧'
     }
   },
   components:{
     Lmarkdown
   },
   methods:{
     childEventHandler:function(res){
        this.msg=res;
    }
  },
  mounted () {
      if(this.$store.state.hasLogin === false){
            this.$message('登录之后才可以写博客哦');
          this.$router.push('/');
      }else{

      }
  }
}
</script>

<style lang="less" scoped>
#newPaper{
  padding-top: 60px;
}
a {
    text-decoration: none;
    color:#fff;
}
.router-link-active {
    text-decoration: none;
}
</style>
