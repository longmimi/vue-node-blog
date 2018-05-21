
<template>
  <div id="v-drawer">
    <div :class="theme">
      <div
        class="drawer-content"
        :style="contentposi">
        <slot></slot>
        <div
          class="icon-close"
          @click="closeDrawer">
        </div>
      </div>
      <div :class="isCircle">
        <div
          class="drawer-switch"
          :class="switchPosi"
          @click="openDrawer">
          <div class="icon-menu"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-drawer',
  data () {
    return {
      posiXVal: -this.drawerWidth-44
    }
  },
  computed: {
    contentposi: function(){
      if(this.switchPosi==='tl' || this.switchPosi==='bl'){
        return {
          left: this.posiXVal + 'px',
          width: this.drawerWidth + 'px'
        }
      }else if(this.switchPosi==='tr' || this.switchPosi==='br'){
        return {
          right: this.posiXVal + 'px',
          width: this.drawerWidth + 'px'
        }
      }
    },
    isCircle: function(){
      if(this.circle){
        return 'circle'
      }
    }
  },
  props: {
    drawerWidth: {
      type: Number,
      default: 280
    },
    theme: {
      type: String,
      default: 'light'
    },
    switchPosi: {
      type: String,
      default: 'tl'
    },
    circle: {
      type: Boolean,
      default: false
    }
  },
  watch:{
    
  },
  methods:{
    openDrawer(){
      this.posiXVal = 0;
      this.$emit('open-drawer');
    },
    closeDrawer(){
      this.posiXVal = -this.drawerWidth-44;
      this.$emit('close-drawer');
    }
  }
};
</script>

<style scoped>
.dark .drawer-content{
  background-color: #222;
}
.dark .drawer-content::-webkit-scrollbar-thumb{
  -webkit-box-shadow: inset 0 0 5px rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.2);
}
.dark .drawer-content::-webkit-scrollbar-track{
  -webkit-box-shadow: inset 0 0 5px rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.1);
}
.dark .drawer-switch{
  background-color: #222;
}
.dark .drawer-switch:hover{
  background-color: #666;
}
.light .drawer-content{
  background-color: #fff;
}
.light .drawer-content::-webkit-scrollbar-thumb{
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.2);
}
.light .drawer-content::-webkit-scrollbar-track{
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.1);
}
.light .drawer-switch{
  background-color: #fff;
}
.light .drawer-switch:hover{
  background-color: #e5e5e5;
}
#v-drawer .drawer-content{
  height: 100%;
  position: fixed;
  top: 72px;
  z-index: 1001;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  box-shadow: 0 0 24px #999;
  padding: 12px;
  word-wrap: break-word;
  word-break: normal;
  overflow-x: hidden;
  overflow-y: scroll;
}
/*滚动条样式*/
#v-drawer .drawer-content::-webkit-scrollbar {/*滚动条整体样式*/
  width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
#v-drawer .drawer-content::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 5px;
}
#v-drawer .drawer-content::-webkit-scrollbar-track {/*滚动条里面轨道*/
  border-radius: 0;
}
#v-drawer .drawer-switch{
  padding: 12px;
  position: fixed;
  z-index: 1000;
  box-shadow: 2px 2px 8px #aaa;
  cursor: pointer;
  transition: all 0.4s;
  -webkit-transition: all 0.4s;
}
#v-drawer .circle .drawer-switch{
  border-radius: 50%;
}
#v-drawer .drawer-switch:hover{
  box-shadow: 2px 2px 14px #aaa;
}
#v-drawer .icon-close {  
  width: 20px;  
  height: 20px;  
  position: absolute;
  top: 8px;
  right: 14px;
  cursor: pointer;
}  
#v-drawer .icon-close:before, #v-drawer .icon-close:after {  
  content: '';  
  position: absolute;  
  top: 50%;  
  width: 20px;  
  height: 1px;  
  background-color: #f75357;  
  -webkit-transform: rotate(45deg);  
  transform: rotate(45deg);  
}  
#v-drawer .icon-close:after {  
  -webkit-transform: rotate(-45deg);  
  transform: rotate(-45deg);  
}
#v-drawer .icon-menu{
  width:20px; 
  height:20px;
  position: relative;
}
#v-drawer .icon-menu:before{
  content:''; 
  height:3px; 
  width:20px; 
  background:#000; 
  border-radius:2px;
  -webkit-border-radius:2px;
  display:block; 
  position:absolute;
  top:2.5px; 
  left:0; 
  box-shadow:0 6px #000, 0 12px #000;
  -webkit-box-shadow:0 6px #000, 0 12px #000;
}
.tl{
  top: 32px;
  left: 32px;
}
.tr{
  top: 32px;
  right: 32px;
}
.bl{
  bottom: 32px;
  left: 32px;
}
.br{
  bottom: 32px;
  right: 32px;
}
</style>