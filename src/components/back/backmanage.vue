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
                <span>文章管理</span>
              </template>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                 <i class="el-icon-menu"></i>
                <span>用户管理</span>
              </template>
            </el-submenu>

             <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>评论管理</span>
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

        <el-table  v-if="itemshow1"
            :data="tableDataArticle"
            style="width: 100%"
            max-height="500">
            <el-table-column
              fixed
              prop="title"
              label="标题"
              width="150">
            </el-table-column>

            <el-table-column
              prop="author"
              label="作者"
              width="80">
            </el-table-column>

            <el-table-column
              prop="time"
              label="日期"
              width="200">
            </el-table-column>

            <el-table-column
              prop="category"
              label="所属分类"
              width="100">
            </el-table-column>

             <el-table-column
              prop="tag"
              label="所含标签"
              width="300">
            </el-table-column>

            <el-table-column
              prop="visit"
              label="浏览量"
              width="70">
            </el-table-column>   

            <el-table-column
              fixed="right"
              label="操作"
              width="120">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="watchDetail(scope.$index, tableData4)"
                  type="text"
                  size="small">
                  查看详情
                </el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
           </el-table>

           <el-table   v-if="itemshow2"
              :data="tableData"
              style="width: 100%"
              :default-sort = "{prop: 'date', order: 'descending'}"
              >
              <el-table-column
                prop="date"
                label="日期"
                sortable
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                sortable
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                :formatter="formatter">
              </el-table-column>
           </el-table>





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
       tableDataArticle: []
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
    }
  },
  mounted(){
    console.log('tableDataArticle',this.tableDataArticle)
  },
   methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
        if(key == 1){
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
          this.itemshow1 = true;
          this.itemshow2 = false;
          this.itemshow3 = false;
          this.itemshow4 = false;
        }else{
          this.itemshow1 = true;
          this.itemshow2 = false;
          this.itemshow3 = false;
          this.itemshow4 = false;
        }
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath,'close');
      },
      watchDetail(index, rows) {
      // rows.splice(index, 1);
        console.log(index,'index');
        console.log(rows,'rows');
        // let showText = rows[index].address;
        let rowContent = '\n## intro\n\n本身打算一口气把vue基础的总结完的···又是被一些事打乱（就是拖延症），这段时间很多事我想后面也许可以在博客里记录一下。今天感觉工作被迫中断了，碰壁···挤出点时间把vue基础整理完吧，关键自己的毛病，啥事越往后拖越不想弄了 :-(\n本身组件在官方文档里也是在基础部分的，也因上面的原因，加上我感觉上一篇篇幅已经有点长了，组件内容也不少，所以单独整理组件篇。\n\n>组件我理解为vue提供的一种自定义可扩展的html元素\n\n## 注册\n\n### 全局\n\n可以直接通过`Vue.component(tagName,option)`注册全局组件。直接在模板里通过标签的方式使用。`<my-component></my-component>`\n\n### 局部\n\n还有局部注册就是在vue实例中注册\n\n```javascript\nvar Child = {\n  templat';
        let showText = md.render(rowContent)
         this.$alert(showText, '文章内容', {
          dangerouslyUseHTMLString: true,
          closeOnClickModal: true,
          lockScroll:false
        });

      },
      handleLeftItem(){
        alert(this.index)
      },
      getArticleInfo(){
        let _self = this;
        this.$http.get('/api/getarticlehomeall')
        .then( res => {
          console.log(res.data)
          if(res.data.status == 0){
            // console.log('res',res.data.articlehomeall);
            let tableDataArticleArr = res.data.articlehomeall;
            tableDataArticleArr.forEach( (item,index) => {
              let tableDataArticleObj = {};
              tableDataArticleObj.title = item.title;
              tableDataArticleObj.author = item.author;
              tableDataArticleObj.time = item.creatTime;
              tableDataArticleObj.category = item.category;
              tableDataArticleObj.tag = item.tags.join(',');
              tableDataArticleObj.visit = item.visit;
              tableDataArticleObj.articlecontent = item.articleContent;
              this.tableDataArticle.push(tableDataArticleObj)
            })   
            // this.articleObj = res.data.articlehome;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
#backmanage{
  padding-top:60px;
  .mange-left{
    // width:100%;
  }
}
</style>
