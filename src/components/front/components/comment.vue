<template lang="html">
  <div id='comment'>
     <div class="comment-container">
        <nav class="comment-nav">评论</nav>
        <div class="comment-content">
          <p class="comment-floor">
            1楼 :  李龙廷
          </p>
          <div class="comment-word">
              <p>这篇文章写得真好</p>
              <span>  2018-01-01 21:21:21</span>
          </div>
        </div>
        <div class="comment-fa">
          <p>发表我的评论：</p>
          <textarea autofocus="autofocus" class="comment-input" v-model="commentinput" placeholder="留下你要对作者说的话吧。"></textarea>
          <div class="comment-btn" @click='submitComment(articleId)'>提交</div>
        </div>
     </div>
    
  </div>
</template>

<script>
export default {
    data() {
      return {
         articleId:this.$route.query.articleId,
         commentinput:''
      }
    },
    mounted(){
       
    },
    computed: {
       
    },
    methods: {
        submitComment(id){
          if(this.$store.state.hasLogin){
            if(this.commentinput.length > 0  && this.commentinput.trim() != ''){
              // 评语对象
              // {
              //   whoSubmit:'李龙廷'
              //   commentContent:'写得真棒'
              // }
              let commentObj = {};
              commentObj.whoSubmit = this.$store.state.userName;
              commentObj.commentContent = this.commentinput;
              commentObj.commentTime = new Date();
              // console.log(commentObj)
              this.$http.post('api/submitcomment',commentObj)
              .then( res => {
                if(res.data.status){
                  console.log('评论的res',res);
                }else{
                  alert('shibai')
                }
                
              })
            }else{
              this.$notify({
                title: '失败',
                message: '请输入你要对作者说的话~',
                type: 'error',
                offset:100
              });
            }
          }else{
              this.$notify({
                title: '失败',
                message: '登录之后才能发表评论哦~',
                type: 'error',
                offset:100
              });
          }
          
        }
    }
   
}
</script>

<style lang="less" scoped>
#comment{
  .comment-container{
    width:100%;
    background: #fff;
    .comment-nav{
      display: block;
      width:50px;
      font-size: 25px;
      border-bottom:2px red solid;
      margin-bottom:20px;
    }
    .comment-content{
       border:1px solid #ccc; 
       border-bottom:1px solid #ccc;
       border-radius: 8px;
      .comment-floor{
        display:block;
        overflow: hidden;
        margin:0;
        padding:2px 10px;
      }
      .comment-word{
        display: block;
        border-top:1px solid #ccc;
        padding:5px 10px;

      }
    }
     .comment-fa{
        display: block;
        margin:30px 0 50px 0;
        width:100%;
        padding:0px 5px 5px 0px;
       
        .comment-input{
          border:1px solid #000;
          display: block;
          width:100%;
          min-height:30px;
          line-height: 30px;
        }
        .comment-btn{
          display: block;
          width:60px;
          height:30px;
          background: #000;
          color:#fff;
          font-size: 15px;
          text-align: center;
          line-height:30px;
          position: absolute;
          bottom:24px;
          right:15px;
          cursor: pointer;
          border-radius: 5px;
        }
        .comment-btn:hover{
          color:#ccc;   
         
        }
      }
  }
}
</style>
