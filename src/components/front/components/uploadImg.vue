<template>
  <div id="v-upload-img">
    <div 
      :class="uploadStyle" 
      :style="{width: boxWidth + 'px', height: boxWidth + 'px'}">
      <div class="icon-add" v-if="haveIcon"></div>
      <input 
        type="file" 
        ref="photoFile" 
        @change="getPhotoFile" 
        :disabled="!canUpload"
        :class="uploadInputStyle" 
        :style="{width: boxWidth + 'px', height: boxWidth + 'px'}"/>
    </div>
    <div v-for="(itemUrl, index) in imageListUrl" class="v-upload-pre-group" v-if="havePre" :key="index">
      <div class="icon-close" @click="closePreItem(index)"></div>
      <img 
        :src="itemUrl" 
        class="v-upload-pre-item" 
        :style="{width: boxWidth + 'px', height: boxWidth + 'px'}">
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-upload-img',
  data () {
    return {
      imageListUrl: []
    }
  },
  computed: {
    canUpload: function(){
      if(this.imageListUrl.length>=this.maxNum){
        return false;
      }else{
        return true;
      }
    },
    uploadStyle: function(){
      if(this.canUpload){
        return 'v-upload-photo';
      }else{
        return 'v-upload-photo-dis';
      }
    },
    uploadInputStyle: function(){
      if(this.canUpload){
        return {
          'v-upload-input': true,
          'v-dis': false
        };
      }else{
        return {
          'v-upload-input': true,
          'v-dis': true
        };
      }
    }
  },
  props: {
    maxNum: {
      type: Number,
      default: 3
    },
    boxWidth: {
      type: Number,
      default: 100
    },
    haveIcon: {
      type: Boolean,
      default: true
    },
    havePre: {
      type: Boolean,
      default: true
    },
    zipFactor: {
      type: Number,
      default: 0.9
    },
    photoSize: {
      type: Number,
      default: 720
    },
    isImageClear:{
      type:Boolean,
      default:false
    }
  },
  watch:{
    imageListUrl: function(val){
      this.$emit('upload-change', val);
      if(val.length>=this.maxNum){
        this.$emit('upload-full',val);
      }
    },
    isImageClear(val){
      if(val === true){
        this.imageListUrl = []
      }
    }
  },
  methods:{
    getPhotoFile(){
      if(this.canUpload){
        var file = this.$refs.photoFile.files[0];
        var that = this;
        this.ImgToBase64(file, this.photoSize, function (base64) {
          that.imageListUrl.push(base64);
        });
      }
    },
    closePreItem(index){
      this.imageListUrl.splice(index,1)
    },
    ImgToBase64(file, maxLen, callBack) {
      var img = new Image();
      var reader = new FileReader();//读取客户端上的文件
      reader.onload = function () {
        var url = reader.result;//读取到的文件内容.这个属性只在读取操作完成之后才有效,并且数据的格式取决于读取操作是由哪个方法发起的.所以必须使用reader.onload，
        img.src = url;//reader读取的文件内容是base64,利用这个url就能实现上传前预览图片
      };
      img.onload = function () {
        //生成比例
        var width = img.width, height = img.height;
        //计算缩放比例
        var rate = 1;
        if (width >= height) {
            if (width > maxLen) {
                rate = maxLen / width;
            }
        } else {
            if (height > maxLen) {
                rate = maxLen / height;
            }
        };
        img.width = width * rate;
        img.height = height * rate;
        //生成canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var base64 = canvas.toDataURL('image/jpeg', this.zipFactor);
        callBack(base64);
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style scoped>
.v-dis{
  cursor: not-allowed; 
}
.v-upload-photo {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  outline:none;
  display: inline-block;
}
.v-upload-photo:hover {
  border-color: #aaa;
}
.v-upload-photo-dis{
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  outline:none;
  display: inline-block;
  cursor: not-allowed; 
}
.v-upload-input{
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
}
.v-upload-pre-group{
  display: inline-block;
  position: relative;
}
.v-upload-pre-item{
  display: inline-block;
  margin: 0 6px;
  border-radius: 6px;
}
.icon-add{
  position: relative;
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  -webkit-transform: translate(-50%,-50%);
}
.icon-add:before{
  content: '';
  position: absolute;
  width: 30px;
  height: 2px;
  left: 50%;
  top: 50%;
  margin-left: -15px;
  margin-top: -1px;
  background-color: #aaa;
}
.icon-add:after{
  content: '';
  position: absolute;
  width: 2px;
  height: 30px;
  left: 50%;
  top: 50%;
  margin-left: -1px;
  margin-top: -15px;
  background-color: #aaa;
}
.icon-close {  
  width: 12px;  
  height: 12px;  
  position: absolute;
  top: -8px;
  right: -2px;
  background-color: #fff;
  border-radius: 50%;
  border: 6px solid #fff;
  box-shadow: 0 0 6px #999;
  cursor: pointer;
}  
.icon-close:before, .icon-close:after {  
  content: '';  
  position: absolute;  
  top: 50%;  
  width: 12px;  
  height: 1px;  
  background-color: #888;  
  -webkit-transform: rotate(45deg);  
  transform: rotate(45deg);  
}  
.icon-close:after {  
  -webkit-transform: rotate(-45deg);  
  transform: rotate(-45deg);  
}  
</style>