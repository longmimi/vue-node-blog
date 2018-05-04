<template>
  <div class="container edit-essay" id="newPaper">
    <section class="article-top">
          <h2 class="subtitle">
            在这里开始你的创作吧
          </h2>
    </section>
    <br>
    <div class="field">
      <label class="essay-title-tip label">文章标题</label>
      <div class="control">
        <input type="text" class="essay-title input" placeholder="请输入文章标题" v-model="articleTitle" />
      </div>
      <label class="essay-title-tip label">文章分类</label>
      <div class="control">
        <input type="text" class="essay-title input" placeholder="请输入文章分类(只能属于一种分类)" v-model="inputCategory" />
      </div>
      <label class="essay-title-tip label">文章标签</label>
      <div class="control">
        <input type="text" class="essay-title input" placeholder="请输入文章标签(多个标签用/分开)" v-model="inputTags" />
      </div>
    </div>
    <br>
    <div class="field">
      <label class="essay-content-tip label">内容区域</label>
      <div class="control">
        <!-- 即时显示 -->
        <div class="editor-text-display" v-html="displayText"></div>
        <textarea type="text" class="essay-content textarea textarea-custom" placeholder="请输入文章内容" v-model="articleContent" 
          rows='10' cols='30'
        />
      </div>
    </div>
    <br>
    <div class="field">
      <label class="upload-img label">文章图片</label>
      <div class="control">
        <input type="text" class="input" placeholder="请输入图片位于图床的URL" v-model="picUrl" />
      </div>
    </div>
    <br>
    <div class="field">
      <button class="articleBtn" @click="pushArticle()">发布文章</button>
      <button class="articleBtn" @click="saveArticle()">存为草稿</button>
    </div>
  </div>
</template>

<script>
// import Lmarkdown from "./components/markdown.vue";
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();
export default {
  data() {
    return {
      displayText: '<h1>编辑内容显示在此处</h1>',
      articleTitle:'',
      inputCategory: "",
      inputTags: "",
      articleContent: "",
      picUrl:''
    };
  },
  components: {
    
  },
  methods: {
     pushArticle: function () {
        const _self = this;
        if (!_self.articleTitle.length || !_self.articleContent.length || !_self.picUrl.length ) {
          alert('请输入完整的标题、内容以及图片链接!');
        } else if (_self.articleTitle.length > 0) {
            let formData = {
              title: _self.articleTitle,
              author: this.$store.state.userName,
              category: _self.inputCategory,
              tags: _self.inputTags.split("/"),
              articleContent: _self.articleContent,
              picUrl:_self.picUrl,
              creatTime: new Date()
          }
           this.$http.post("api/addArticle", formData).then(res => {
            console.log("res.data", res.data);
            // this.$message(res.data.msg);
            this.$notify({
              title: '添加成功',
              message: `${res.data.msg}`,
              type: 'success',
              offset:100
            });
            
            this.$router.push('/');
          });
        }
     },
     saveArticle(){
        // this.$message.success('草稿保存成功！');
        this.$notify({
              title: '草稿保存成功！',
              message:'草稿保存成功！',
              type: 'success',
              offset:100
        });
        sessionStorage.setItem('article_content',this.articleContent)
        sessionStorage.setItem('article_title',this.title)
        sessionStorage.setItem('article_category',this.category)
        sessionStorage.setItem('article_tags',this.tags)
        sessionStorage.setItem('article_picUrl',this.picUrl)
     }
  },
    beforeUpdate: function () {
      const _self = this;
      _self.displayText = md.render(_self.articleContent);
    },
    mounted() {
      if (this.$store.state.hasLogin === false) {
        this.$message("登录之后才可以写博客哦");
         this.$notify({
              title: '登录之后才可以写博客哦',
              message:'登录之后才可以写博客哦',
              type: 'warning',
              offset:100
        });
        this.$router.push("/");
      } else {
        if(sessionStorage.getItem('articleCache')){
          this.articleContent = sessionStorage.getItem('article_content')
          this.title = sessionStorage.getItem('article_title')
          this.category = sessionStorage.getItem('article_category')
          this.tags = sessionStorage.getItem('article_tags')
          this.picUrl = sessionStorage.getItem('article_picUrl')
        }
      }
    }
  };
</script>

<style  scoped>
#newPaper{
  width:70%;
  margin:0 auto;
  padding-bottom:50px;
}
.essay-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.article-top{
  color:#000;
  font-size: 20px;
}
.edit-essay {
  padding-top: 5%!important;
}
.field .essay-title-tip{
  font-size: 20px;
  font-weight: normal;
}
.field .essay-title-tip,.essay-content-tip{
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
.filed .articleBtn{
  background: #000;
  color:lavender;
  font-size: 14px;
}
.filed .articleBtn:hover{
  background:#fff;
  color:black;
}
.control .essay-title,input{
  width:100%;
  height:30px;
  padding:5px;
  margin-bottom: 15px;
  box-shadow: 0px 0px 15px #888888;
  border-radius: 4px;
}
.essay-content,.textarea-custom,textarea{
  background-color:transparent;
  color: #666464;
  height: auto;
  font-size: 22px;
  width:100%;
}

.editor-text-display {
  margin-top: 5%;
  margin-bottom: 5%;
  padding: 20px;
  /* box-shadow: 10px 10px 5px #888888; */
  text-indent: 22px;
  /* border-radius: 15px; */
}


.editor-text-display {
  margin-top: 5%;
  margin-bottom: 5%;
  padding: 20px;
  box-shadow: 0px 0px 15px #888888;
  border-radius: 4px;
}

.editor-text-display h1 {
  color: #666464;
  font-size: 28px;
}

.editor-text-display h2 {
  border-bottom: 1px solid #CCCCCC;
  margin-bottom: 4px;
  color: #666464;
  font-size: 24px;
}

.editor-text-display h3 {
  border-bottom: 1px solid #CCCCCC;
  color: #666464;
  font-size: 18px;
}

.editor-text-display h4 {
  color: #666464;
  font-size: 16px;
}

.editor-text-display h5 {
  color: #666464;
  font-size: 14px;
}

.editor-text-display h6 {
  color: #666464;
  background-color: inherit;
  font-size: 14px;
}

.editor-text-display hr {
  border: 0;
  color: #CCCCCC;
  background-color: #CCCCCC;
}

.editor-text-display ul {
  list-style-type: disc!important;
}

.editor-text-display p, .editor-text-display blockquote, .editor-text-display ul, .editor-text-display ol, .editor-text-display dl, .editor-text-display li, .editor-text-display table, .editor-text-display pre {
  margin: 15px 0;
}

.editor-text-display p{
  margin: 1em 0;
}

.editor-text-display pre { 
  background-color: #F8F8F8;
  border: 1px solid #CCCCCC;
  border-radius: 3px;
  overflow: auto;
  padding: 5px;
}

.editor-text-display pre code {
  background-color: #F8F8F8;
  border: none;
  padding: 0;
}

.editor-text-display code {
  font-family: Consolas, Monaco, Andale Mono, monospace;
  background-color:#F8F8F8;
  border: 1px solid #CCCCCC;
  border-radius: 3px;
  padding: 0 0.2em;
  line-height: 1;
}

.editor-text-display pre > code {
  border: 0;
  margin: 0;
  padding: 0;
}


.editor-text-display a{ color: #0645ad; text-decoration:none;}
.editor-text-display a:visited{ color: #0b0080; }
.editor-text-display a:hover{ color: #06e; }
.editor-text-display a:active{ color:#faa700; }
.editor-text-display a:focus{ outline: thin dotted; }
.editor-text-display a:hover, a:active{ outline: 0; }

::-moz-selection{background:rgba(255,255,0,0.3);color:#000}
::selection{background:rgba(255,255,0,0.3);color:#000}

.editor-text-display a::-moz-selection{background:rgba(255,255,0,0.3);color:#0645ad}
.editor-text-display a::selection{background:rgba(255,255,0,0.3);color:#0645ad}

.editor-text-display blockquote {
  color:#666666;
  margin:0;
  /* padding-left: 1em; */
  border-left: 0.5em #EEE solid;
}

.editor-text-display ul, .editor-text-display ol { margin: 1em 0; padding: 0 0 0 2em; }
.editor-text-display li p:last-child { margin:0 }
.editor-text-display dd { margin: 0 0 0 2em; }

.editor-text-display img { border: 0; -ms-interpolation-mode: bicubic; vertical-align: middle; max-width:100%;}

.editor-text-display table { border-collapse: collapse; border-spacing: 0; }
.editor-text-display td { vertical-align: top; }

@media only screen and (min-width: 480px) {
    body{font-size:14px;}
}

@media only screen and (min-width: 768px) {
    body{font-size:16px;}
} 
</style>
