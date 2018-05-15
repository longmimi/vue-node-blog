<template>
<div>
    <div :class="{backtop:true,backTopMove:ismove}" v-show="show" @click="_click" >
         <el-tooltip class="item" effect="dark" content="返回顶部" placement="left">
            <!-- <el-button>左边</el-button> -->
            <img src="../../../assets/rocket.png" alt="" class="backTopImage">
          </el-tooltip>
          <!-- <img src="../../../assets/rocket.png" alt="" class="backTopImage"> -->
    </div>
</div>
   
</template>
<script>
    export default {
        name: 'backTop',
        data () {
            return {
                show: false,
                ismove:false
            }
        },
        props: {
            mytext: {
                type: String,
                default: ''
            },
            height: {
                type: Number,
                default: 600
            },
            bottom: {
                type: Number,
                default: 30
            },
            right: {
                type: Number,
                default: 30
            },
            duration: {
                type: Number,
                default: 1000
            }
        },
        components: {},
        methods: {
            _windowScroll(){
                if (this.getScrollTop() > this.height) {
                    this.show = true
                } else {
                    this.show = false
                }
            },
            _click(){
                // let top = this.getScrollTop();
                // let th = this;
                // let v = top / this.duration;
                // let timer = setInterval(function () {
                //     //30ms的距离
                //     top -= Math.abs(v * 30);
                //     if (top <= 1) {
                //         top = 0;
                //         clearInterval(timer);
                //     }
                //     document.body.scrollTop = top;
                // }, 30);
                this.ismove = true;
                this.$emit('myclick');
                setTimeout(() => {
                  this.ismove = false;
                }, 3000);
            },
            getScrollTop(){
              return  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            }
        },
        computed: {},
        mounted(){
            window.addEventListener('scroll', this._windowScroll)
        },
        filters: {}
    }
</script>
<style lang="less">
.backtop{
  // width:60px;
  // height:60px;
  border-radius: 30px;
  margin-bottom: 0px;
  transition: margin-bottom 1s;
  cursor: pointer;
  line-height: 30px;
  text-align: center;
  .backTopImage{
     width:50px;
     height:50px;
  }
}
.backTopMove{
  margin-bottom:100px;
}
// .back-top:hover{
//   background: rgba(0,0,0,0.2);
// }
</style>
