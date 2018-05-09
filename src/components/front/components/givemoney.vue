<template lang="html">
  <div id='givemoney'>
    <div class="dsbtn"  :class="{dsbtn:givemoneyimg,btnmove:isbtnmove}">
       <img src="../../../assets/givemoney.png" @click='btnclick' :class="{imgsize:issize,imgsize2:isimgsize2}"/>
       <img src='../../../assets/2code.png' :class="{codesize:iscodeshow}" />
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
       }, 2000);
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
    }
    .imgsize2{
      width:0;
      height:0;
    }
    .codesize{
      width:60px;
      height:60px;
      display: none;
    }
  }
  .dsbtn:hover{
    transform: scale(1.2);
  }
  .btnmove{
    animation: givemoney 2s;
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
