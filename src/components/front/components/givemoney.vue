<template lang="html">
  <div id='givemoney'>
    <div class="dsbtn"  :class="{dsbtn:givemoneyimg,btnmove:isbtnmove}">
       <img src="../../../assets/givemoney.png" @click='btnclick' :class="{imgsize:issize,imgsize2:isimgsize2}"/>
       <p class="dsp"  @click='btnclick'>打赏</p>
       <img src='../../../assets/pay.jpg' :class="{codesize:iscodeshow}"/>
    </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
       givemoneyimg:true,
       isbtnmove:false,
       issize:true,
       iscode:false,
       isimgsize2:false,
       iscodeshow:true
      }
    },
    mounted:function(){
      
    },
    computed: {
      
    },
    methods: {
     btnclick(){
       this.isbtnmove = true;
       setTimeout(() => {
         this.isimgsize2 = true;
         setTimeout(() => {
           this.iscodeshow = false;
           this.isimgsize2 = true;
         }, 0);
       }, 1000);
     }
    }
}
</script>

<style lang="less" scoped>
#givemoney{
  .dsbtn{
    background: transparent;
    width:80px;
    height:80px;
    border-radius: 50%;
    margin:0 auto 150px;
    .imgsize{
      width:60px;
      height:60px;
      margin-left:10px;
    }
    .imgsize:hover{
      transform: scale(1.2);
     
    }
    .imgsize2{
      width:0;
      height:0;
    }
    .codesize{
      width:100px;
      height:100px;
      display: none;
    }
    .dsp{
      display: none;
      width:50px;
      height:20px;
      margin:0 auto;
      background: rgba(0,0,0,0.1);
      text-align: center;
      line-height:20px;
      padding:5px;
    }
  }
  .dsbtn:hover{
  .dsp{
        display: block;
        width:50px;
        height:20px;
        margin:0 auto;
      }
   
  }
  .btnmove{
    animation: givemoney 1s;
  }
  @keyframes givemoney {
    from {
        transform: scale(1.2);
    }
    to {
        transform: scale(0);
        animation: mycode 2s;
    }
  }
  // @keyframes mycode {
  //   from{
  //     transform: scale(0);
  //   }
  //   to{
  //      transform: scale(1);
  //   }
  // }
  
}
</style>
