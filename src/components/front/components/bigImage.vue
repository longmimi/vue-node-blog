<template>
   <div id="bigImage">
          <!-- swiper -->
      <swiper :options="swiperOption">
          <div class="parallax-bg" slot="parallax-bg" data-swiper-parallax="-23%"></div>
          <swiper-slide class="bannerImage" v-for='(item,index) in imgListArr' :key="index" :style="{background:`url(${item.src})`,backgroundSize:'cover'}">
            <div class="title" data-swiper-parallax="-100">{{item.title}}</div>
            <br>
            <div class="subtitle" data-swiper-parallax="-200">{{item.author}}</div>
            <div class="text" data-swiper-parallax="-300">
              <p>{{item.content}}</p>
            </div>
          </swiper-slide>
          <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
          <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
          <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      </swiper>
   </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
   name: 'carrousel',
   data(){
     return {
        swiperOption: {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          autoplay: true,
          notNextTick:true   
        },
        imgListArr:[
          {
            title:'推荐文章1',
            author:'李龙廷',
            content:'你覅无人弄完了那次是Nov改无人女in的接口v次所如何v',
            src:require('../../../assets/banner1.png')
          },
          {
            title:'推荐文章2',
            author:'潘海两',
            content:'你覅无人弄完了那次是Nov改无人女in的接口v次所如何v',
            src:require('../../../assets/banner2.png')
          },
          {
            title:'推荐文章3',
            author:'流程路',
            content:'你覅无人弄完了那次是Nov改无人女in的接口v次所如何v',
            src:require('../../../assets/banner3.png')
          }        
        ]
     }
   },
   components:{
    swiper,
    swiperSlide
   },
   methods:{
     getPushArticle(){
      this.$http.get('api/getpusharticle')
      .then( res => {
        if(res.data.status == 0){
          console.log(res.data.pusharticle,'推荐文章')
        }else{
          
        }
      })
     }
  },
   computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
 },
  mounted() {
    this.getPushArticle();
  }
}
</script>

<style lang="less" scoped>
@media (max-width: 600px) {
  .bannerImage{
    width:100%;
    height:330px;
    color:#fff;
    .title{
      font-size: 35px;
    }
    .subtitle{
      font-size:25px; 
    }
    .text{
      font-size: 20px;
    }
  }
}
#bigImage{
  text-align: center;
  margin:-20px 40px 0 40px;
  .bannerImage{
    width:100%;
    height:330px;
    color:#fff;
    .title{
      font-size: 35px;
    }
    .subtitle{
      font-size:25px; 
    }
    .text{
      font-size: 20px;
    }
  }
  .swiperOption{
    box-shadow: 5px 5px 5px #888888;
  }
}

</style>
