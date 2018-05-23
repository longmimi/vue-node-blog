<template lang="html">
  <div id='comment'>
     <div class="comment-container">
        <nav class="comment-nav">评论</nav>
        <div class="comment-none" v-if="commentArrList.length == 0">
          <p>沙发留给你~赶快来评论吧</p>
        </div>
        <div class="comment-content" v-for="(commentItem,index) in commentArrList" :key="index">
          <p class="comment-floor">
            {{index+1}}楼 :  {{commentItem.whoSubmit}}
          </p>
          <div class="comment-word">
              <p>{{commentItem.comment}}</p>
              <span> {{commentItem.date | timeToLocalStringFilter}}</span>
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
    props:['commentArrList'],
    data() {
      return {
         articleId:this.$route.query.articleId,
         commentinput:'',
         newArr:this.commentArrList
      }
    },
    mounted(){
      // console.log('父组件来的',this.commentArrList)
    },
    computed: {
      //  newArr(){
      //    return this.commentArrList
      //  }
    },
    methods: {
        submitComment(id){
          let _self = this;
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
              commentObj.articleId = id

              // console.log(commentObj)
              this.$http.post('api/submitcomment',commentObj)
              .then( res => {
                if(res.data.status == 0){
                  // console.log('评论的res的数组',res.data.commentInfo.comments);
                  _self.newArr = res.data.commentInfo.comments;
                  _self.$emit('commented',_self.newArr)
                }else{
                  alert('评论失败,请重试')
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
          this.commentinput = ''
        }
    },
    filters:{
      timeToLocalStringFilter(time){
        return new Date(time).toLocaleString()
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
       margin-bottom:5px;
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
