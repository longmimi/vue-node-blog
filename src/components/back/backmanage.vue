<template>
  <div id="backmanage" class="backmanage">
    <el-row>
      <div class="mange-left">
        <el-col :span="4">
          <el-menu
            default-active="1-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            mode='vertical'>

            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>文章管理  &nbsp;&nbsp;{{articleTotal}}篇</span>
              </template>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                 <i class="el-icon-menu"></i>
                <span>用户管理  &nbsp;&nbsp;{{userTotal}}人</span>
              </template>
            </el-submenu>

             <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>评论管理   &nbsp;&nbsp;{{commentTotal}}条</span>
              </template>
            </el-submenu>

             <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>数据中心</span>
              </template>
            </el-submenu>

          </el-menu>
        </el-col>
      </div>

      <div class="manage-right">
        <el-col :span="20" >
        <!-- 文章管理部分 -->
        <el-table  v-show="itemshow1"
            :data="tableDataArticle"
            style="width: 100%"
            max-height="570">
            <el-table-column
              fixed
              prop="title"
              label="标题"
              width="220">
            </el-table-column>

            <el-table-column
              prop="author"
              label="作者"
              width="100">
            </el-table-column>

            <el-table-column
              prop="time"
              label="发布日期"
              width="230">
            </el-table-column>

             <el-table-column
              prop="lasttime"
              label="最后发布日期"
              width="230">
            </el-table-column>

            <el-table-column
              prop="category"
              label="所属分类"
              width="120">
            </el-table-column>

             <el-table-column
              prop="tag"
              label="所含标签"
              width="220">
            </el-table-column>

            <el-table-column
              prop="visit"
              label="浏览量"
              width="80">
            </el-table-column>   

            <el-table-column
              fixed="right"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="watchDetail(scope.$index, tableDataArticle)"
                  type="text"
                  size="small">
                  查看详情
                </el-button>
                <el-button 
                  @click.native.prevent="deleteArticle(scope.$index, tableDataArticle)"
                  type="text" size="small">删除
                </el-button>
              </template>
            </el-table-column>
           </el-table>
          <!-- 文章管理部分 end-->


          <!-- 提示框 -->
          <el-dialog
              title="警告"
              :visible.sync="dialogVisible"
              width="30%">
              <span>删除无法恢复！请谨慎处理</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">我不删了</el-button>
                <el-button type="primary" @click="deleteArticleInDB(_index,_rows)">狠心删除</el-button>
              </span>
          </el-dialog>


          <!-- 用户管理部分 -->
          <el-table v-show="itemshow2"
            :data="tableDataUser"
            style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="用户名">
                    <span>{{ props.row.username }}</span>
                  </el-form-item>
                  <el-form-item label="注册时间">
                    <span>{{ props.row.registertime }}</span>
                  </el-form-item>
                  <el-form-item label="用户 ID">
                    <span>{{ props.row.userid }}</span>
                  </el-form-item>
                  <el-form-item label="最后登录时间">
                    <span>{{ props.row.lastlogintime }}</span>
                  </el-form-item>          
                  <el-form-item label="发表文章数">
                    <span>{{ props.row.articlecount }}</span>
                  </el-form-item>   
                             
                </el-form>
              </template>
            </el-table-column>

            <el-table-column
              label="用户 ID"
              prop="userid">
            </el-table-column>
            <el-table-column
              label="用户名"
              prop="username">
            </el-table-column>
            <el-table-column
              label="发表文章数"
              prop="articlecount">
            </el-table-column>
          </el-table>
          <!-- 用户管理部分  end-->
          
          <!-- 评论管理部分 -->
            <el-table  v-show="itemshow3"
            :data="tableDataComment"
            style="width: 100%"
            max-height="570">
            <el-table-column
              fixed
              prop="comment"
              label="评论内容"
              width="500">
            </el-table-column>

            <!-- <el-table-column
              prop="commenttitle"
              label="评论文章名"
              width="230">
            </el-table-column> -->

            <el-table-column
              prop="date"
              label="评论日期"
              width="300">
            </el-table-column>

            

            <el-table-column
              prop="whoSubmit"
              label="评论人"
              width="120">
            </el-table-column>

           

            

            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scopeComment">
                <el-button 
                  @click.native.prevent="deleteComment(scopeComment.$index, tableDataComment)"
                  type="text" size="middle">删除
                </el-button>
              </template>
            </el-table-column>
           </el-table>

          <!-- 评论管理部分 end-->


          </el-col>
      </div>
      </el-row>
  </div>
</template>

<script>
const hljs = require('highlight.js');
import 'highlight.js/styles/googlecode.css' //样式文件
const md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});
export default {
  name: 'backmanage',
  data () {
    return {
       itemshow1:true,
       itemshow2:false,
       itemshow3:false,
       itemshow4:false,
       tableDataArticle: [],
       tableDataUser: [],
       tableDataComment:[],
       dialogVisible: false,  
       _index:0,
       _rows:[],  
       articleTotal:0,  //文章总数
       userTotal:0,  //用户总数
       commentTotal:0  //评论总数
    }
  },
  components:{
  
  },
  created(){
    if(!this.$store.state.hasLogin || this.$store.state.userName != 'admin'){
      alert('请您使用管理员账号登录！')
      this.$router.push('/');
    }else{
       this.getArticleInfo();
       this.getUserInfo();
       this.getCommentInfo();
    }
  },
  mounted(){
    console.log('tableDataArticle',this.tableDataArticle)
  },
   methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
        if(key == 1){
          // this.getArticleInfo();
          this.itemshow1 = true;
          this.itemshow2 = false;
          this.itemshow3 = false;
          this.itemshow4 = false;
        }else if(key == 2){
          this.itemshow1 = false;
          this.itemshow2 = true;
          this.itemshow3 = false;
          this.itemshow4 = false;
        }else if(key == 3){
          this.itemshow1 = false;
          this.itemshow2 = false;
          this.itemshow3 = true;
          this.itemshow4 = false;
        }else{
          this.itemshow1 = false;
          this.itemshow2 = false;
          this.itemshow3 = false;
          this.itemshow4 = true;
        }
      },
      //查看文章内容
      watchDetail(index, rows) {   
        console.log(index,'index');
        console.log(rows,'rows');
        let rowContent = rows[index].articlecontent;
        
        let showText = md.render(rowContent);
        this.$alert(showText, '文章内容', {
          dangerouslyUseHTMLString: true,
          closeOnClickModal: true,
          lockScroll:false
        });
      },
      deleteArticle(index,rows){
        this.dialogVisible = true;
        this._index = index;
        this._rows = rows;      
      },
      deleteArticleInDB(index,rows){
        let ArticleId = rows[index].articleId;
        // 表格中删除
        rows.splice(index, 1);

        this.$http.get('api/deleteArticle',{
            params:{
              articleId:ArticleId
            }
          })
          .then( res => {
            if(res.data.status == 0){
              console.log('删除返回的数据',res)
              this.$notify({
                  title: '删除成功',
                  message: `${res.data.msg}`,
                  type: 'success',
                  offset:100
                });         
            }else{
              this.$notify({
                  title: '删除失败',
                  message: `${res.data.msg}`,
                  type: 'success',
                  offset:100
              });
            }
          }) 
          this.dialogVisible = false;
      },
      getArticleInfo(){
        let _self = this;
        this.$http.get('api/getarticlehomeall')
        .then( res => {
          if(res.data.status == 0){
            // console.log('res',res.data.articlehomeall);
            let tableDataArticleArr = res.data.articlehomeall;
            this.articleTotal = tableDataArticleArr.length;//文章总数
            tableDataArticleArr.forEach( (item,index) => {
                let tableDataArticleObj = {};
                tableDataArticleObj.title = item.title;
                tableDataArticleObj.author = item.author;
                tableDataArticleObj.lasttime = new Date(item.lastEditTime).toLocaleString();
                tableDataArticleObj.time = new Date(item.creatTime).toLocaleString();
                tableDataArticleObj.category = item.category;
                tableDataArticleObj.tag = item.tags.join(',');
                tableDataArticleObj.visit = item.visit;
                tableDataArticleObj.articlecontent = item.articleContent;
                tableDataArticleObj.articleId = item._id;
                this.tableDataArticle.push(tableDataArticleObj)
            })   
          }
        })
        .catch( err => {
            console.log('get err',err)
          }
        )
      },
      getUserInfo(){
        this.$http.get('/api/getuserall')
        .then( res => {
          if( res.data.status == 0){
            console.log(res.data.userinfoall,'res.data.userinfoall')
            // this.tableDataArticle
            let _userInfoAll = res.data.userinfoall;
            this.userTotal = _userInfoAll.length;
            _userInfoAll.forEach( (item,index) => {
              let userInfoAllObj = {};
              userInfoAllObj.userid = item._id;
              userInfoAllObj.username = item.name;
              userInfoAllObj.articlecount = item.pushCount;
              userInfoAllObj.lastlogintime = new Date(item.lastlogintime).toLocaleString();

              if(item.registertime){
                 userInfoAllObj.registertime =  new Date(item.registertime).toLocaleString();
              }else{
                userInfoAllObj.registertime = '暂无注册时间';
              }
              this.tableDataUser.push(userInfoAllObj)
            })
          }else{

          }
        })
        .catch( err => {
          console.log(err,'err=====> getuserinfoall')
        })
      },
      getCommentInfo(){
        // let myCommets = [];
        this.$http.get('/api/getcomment')
        .then( res => {
          if(res.data.status == 0){
            // console.log(res.data.commentinfo,'res.data.commentinfo');
            let _tempArr = res.data.commentinfo;
            let _commentcount = 0;
            _tempArr.forEach((item1,index) => {
              item1.comments.forEach((item2,index) => {
                _commentcount++;
                item2._idComment = item1._id;
                item2.date = new Date(item2.date).toLocaleString();
                this.tableDataComment.push(item2);            
              })
            })
            this.commentTotal = _commentcount;
            // console.log(this.tableDataComment,'tableDataComment')
          }else{
            console.log('errr=================')
          }
        })
      },
      deleteComment(index,rows){
        // console.log(rows[index]._id);
        let commentId = rows[index]._id;
        let commentIdOut = rows[index]._idComment;
        console.log(commentId,'commentId')
        rows.splice(index, 1);

        this.$http.get('api/deleteComment',{
            params:{
              commentId:commentId,
              commentIdOut:commentIdOut
            }
          })
          .then( res => {
            if(res.data.status == 0){
              console.log('删除返回的数据',res)
              this.$notify({
                  title: '删除成功',
                  message: `${res.data.msg}`,
                  type: 'success',
                  offset:100
                });         
            }else{
              this.$notify({
                  title: '删除失败',
                  message: `${res.data.msg}`,
                  type: 'success',
                  offset:100
              });
            }
          }) 

      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
#backmanage{
  padding-top:60px;
  .mange-left{
    
  }
}
</style>
