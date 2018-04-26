<template>
    <div id="newPaper" class="newPaper">
      <div class="newPaperTop">
        <P class="newPaper-p">请在左边写，右边即刻预览</P>
        <el-button type="primary" size="mini" @click="pushArticle" class="pushArticle-btn">发表</el-button>
      </div>
      <div class="write-top">  
            <el-input v-model="inputCategory" placeholder="请输入文章分类(只属于一类)"></el-input>
            <el-input v-model="inputTags" placeholder="请输入文章标签并用 / 分隔"></el-input>
      </div>
      
      <div class="write-part">
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
      <div id="value" v-html='htmlValue'></div>
     
    </div>
</template>

<script>
import Lmarkdown from "./components/markdown.vue";
export default {
  data() {
    return {
      msg: "## 在这里开始写博客吧",
      inputCategory: "",
      inputTags: "",
      htmlValue: ""
    };
  },
  components: {
    Lmarkdown
  },
  methods: {
    childEventHandler(res) {
      this.msg = res;
    },
    pushArticle() {
      console.log(this.msg);
      if (this.msg.htmlValue === undefined) {
        this.$message("写点东西撒");
      } else {
        let formData = {
          titie: "我是标题",
          author: this.$store.state.userName,
          category: this.inputCategory,
          tags: this.inputTags.split("/"),
          contentHtml: this.msg.htmlValue,
          comtentMd: this.msg.mdValue,
          creatTime: new Date()
        };
        this.$http.post("api/addArticle", formData).then(res => {
          console.log("res.data", res.data);
          this.$message(res.data.msg);
          this.htmlValue = res.data.htmlValue;
          //  this.$router.push('/');
        });
      }
    }
  },
  mounted() {
    if (this.$store.state.hasLogin === false) {
      this.$message("登录之后才可以写博客哦");
      this.$router.push("/");
    } else {
    }
  }
};
</script>

<style lang="less" scoped>
#newPaper {
  padding: 100px 100px 0 100px;
  .newPaperTop {
    display: flex;
    justify-content: space-between;
    height: 60px;
    line-height: 60px;
    align-items: center;
  }
  .write-part {
    height: 600px;
    display: flex;
    justify-content: center;
  }
  .write-top {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .pushArticle-btn {
    // margin-right: 30px;
    height: 30px;
  }
}
a {
  text-decoration: none;
  color: #fff;
}
.router-link-active {
  text-decoration: none;
}
</style>
