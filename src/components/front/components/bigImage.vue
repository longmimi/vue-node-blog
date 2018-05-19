<template>
   <div id="bigImage">
          <!-- swiper -->
      
          <swiper :options="swiperOption" >
              <div class="parallax-bg" slot="parallax-bg" data-swiper-parallax="-23%"></div>
              <swiper-slide class="bannerImage" v-for='(item,index) in imgListArr' :key="index" :style="{background:`url(${item.src})`,backgroundSize:'cover',backgroundPosition: 'center' ,backgroundRepeat: 'no-repeat'}">
         
                <router-link :to="{name:'articledetail',params: {id: item._id},query:{articleId: item._id}}">    
                  

                  
                  <div class="title">
                    <div class="articletitle">{{item.title}}</div>
                    <div class="subtitle">{{item.author}}</div>
                  </div>
                
                </router-link>
             
              
                <!-- <div class="text" data-swiper-parallax="-300">
                  
                </div> -->
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
        imgListArr:[]
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
          console.log(res.data.pusharticle,'推荐文章');
          let pusharticleArr = res.data.pusharticle;
          pusharticleArr.forEach( (item,index) => {
              let pusharticleObj = {};
              pusharticleObj.title = item.title;
              pusharticleObj.author = item.author;
              pusharticleObj.src = item.picUrl;
              pusharticleObj.visit = item.visit;
              pusharticleObj._id = item._id;
              this.imgListArr.push(pusharticleObj);
          })
         
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
@img-positon-left: 50%;
@img-positon-top: 50%;
.router-link-active {
    text-decoration: none;
}
a{
  text-decoration: none;
  color:#fff;
}

#bigImage{
  text-align: center;
  margin:-20px 40px 0 40px;
  .bannerImage{
    width:100%;
    height:330px;
    color:#fff;
    .title{
      font-size: 20px;
      width:100%;
      height:300px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
       .subtitle{
         margin-top:5px;
          font-size:15px; 
        }
    }
  }
  .swiperOption{
    box-shadow: 5px 5px 5px #888888;
  }
}
@media (max-width: 600px) {
  #bigImage{
  text-align: center;
  margin:-20px 40px 0 40px;
  .bannerImage{
    width:100%;
    height:260px;
    color:#fff;
    .title{
      font-size:20px;
      width:100%;
      // height:300px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
       .subtitle{
         margin-top:5px;
          font-size:15px; 
        }
    }
    }
    .swiperOption{
      box-shadow: 5px 5px 5px #888888;
    }
  } 
}
</style>
