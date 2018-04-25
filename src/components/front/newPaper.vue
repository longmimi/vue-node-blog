<template>
    <div id="newPaper" class="newPaper">
      <P>请在左边写，右边即刻预览</P>
      <div class="write-part">
            <el-button type="primary" size="mini" @click="pushArticle" class="pushArticle-btn">发表</el-button>
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
     childEventHandler(res){
        this.msg=res;
    },
    pushArticle(){
        console.log(this.msg.htmlValue)
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
  padding: 100px 100px 0 100px;
  .write-part{
      height:600px;
        display: flex;
        justify-content:center;
  }
 .pushArticle-btn{
     margin-right: 30px;
     height:30px;
 }
}
a {
    text-decoration: none;
    color:#fff;
}
.router-link-active {
    text-decoration: none;
}
</style>
