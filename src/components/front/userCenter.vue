<template>
  <div id="userCenter" class="userCenter">
      <div class="image-container">
        <div class="image-block" 
         v-for="(item,index) in imageShowArr" :key="index"
        :style="{ backgroundImage: `url(${ item.imageUrl })`,backgroundSize:'cover', backgroundPosition: 'center' ,backgroundRepeat: 'no-repeat' }">        
        <p class="imageTime">{{item.uploadTime | timeFilter}}</p>
        </div>
        <p v-show='imageShowArr.length==0' class="noneImage">暂无相册</p>
      </div>
      <div class="addImage">
        <!-- <img src="../../assets/addImage.png" alt="" class="addImageBtn"> -->
         <up-load-img
          :havePre="true" 
          :haveIcon="true" 
          :boxWidth="100" 
          :maxNum="3"
          :zipFactor="0.7"
          :photoSize="720"
          :isImageClear="isImageClear"
          @upload-change="handleChange">
        </up-load-img>
        <button v-show="isBtnShow" @click="uploadImage">上传</button>
      </div>
  </div>
</template>
<script>
import upLoadImg from './components/uploadImg'
export default {
    name:'usercenter',
    data(){
      return {
        myImageArr:[],
        imageShowArr:[],
        isBtnShow:false,
        isImageClear:false
      }
    },
    created(){
      if(!this.$store.state.hasLogin){
        this.$touter.push('/');
      }
    },
    mounted(){
       this.getImageArr();
    },
    methods:{
      handleChange(valArr){
        let that = this;
        if(valArr.length > 0){
          that.isBtnShow = true  
        }
        that.myImageArr = valArr
     },
     uploadImage(){  
       let that = this;
       let formData = {
         imgListArr: this.myImageArr,
         username:this.$store.state.userName
       }
       this.$http.post('api/uploadimage',formData)
       .then(res => {
         if(res.data.status == 0){
           that.isBtnShow = false  
           this.getImageArr();
         }else{
           alert('失败')
         }
       })
       this.isImageClear = true;

       setTimeout(() => {
         this.isImageClear = false
       }, 1000);
     },
     getImageArr(){
       let that = this;
       this.$http.get('api/getimageArr',{
         params:{
           username:this.$store.state.userName
         }
       })
       .then(res => {
         that.imageShowArr = res.data.imageArr[0].userImageList
       })
     }
    },
    components:{
      upLoadImg
    },
    filters:{
      timeFilter(v){
        return new Date(v).toLocaleDateString();
      }
    }
}
</script>
<style lang="less" scoped>
#userCenter{
  padding-top:70px;
  .image-container{
    .image-block{
      width:33.33333%;
      min-height:300px;
      display: inline-block;
      margin-bottom:-4px;
      padding:0;
      position: relative;
      .imageTime{
        display: block;
        font-size: 12px;
        color:#fff;
        position:absolute;
        left:10px;
        bottom:0px;
      }
    }
    .noneImage{
       font-size: 30px;
       color:#ccc;
       text-align: center;
    }
  }
  .addImage{
    background: transparent;
    position:fixed;
    bottom:50px;
    right:50px;
  }
}
@media (max-width:500px){
  #userCenter{
  padding-top:70px;
  .image-container{
    .image-block{
      width:100%;
      min-height:300px;
      display: inline-block;
      margin-bottom:-4px;
      padding:0;
      border:0px;
    }
  }
  .addImage{
    background: transparent;
    position:fixed;
    bottom:50px;
    right:50px;
  }
}
}
</style>
