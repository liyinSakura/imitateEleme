<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64" alt="">
      </div>
      <div class="content">
        <div class="title"><span class="brand"></span><span class="name">{{seller.name}}</span></div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
            <span class="icon" :class="classMap[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper"  @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="">
    </div>
    <transition
    name="fade"
    enter-class="fade-in-enter"
    enter-active-class="fade-in-active"
    leave-class="fade-out-enter"
    leave-active-class="fade-out-active"
  >
    <div v-show="detailShow" class="detail" transition="fade">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="item in seller.supports">
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from '../star/star';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      star
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

    .header
       background: rgba(7,17,27,.5)
       overflow:hidden
       position: relative
       color: #fff
       .content-wrapper
         position: relative
         padding:24px 12px 18px 24px
         font-size:0
         .avatar
           display: inline-block
           vertical-align: top
           img
             border-radius: 2px
         .content
           display: inline-block
           margin-left: 16px;
           .title
             margin: 2px 0 8px 0
             .brand
               width: 30px
               height: 18px
               display: inline-block
               bg-image('brand')
               background-size: 30px 18px
               background-repeat: no-repeat
               vertical-align: top
             .name
               font-size: 16px
               font-weight: bold
               line-height: 18px
               margin-left: 6px
           .description
             margin: 8px 0 10px 0
             font-size: 12px
             line-height: 12px
           .support
             .icon
               display:inline-block
               width: 12px
               height: 12px
               margin-right:5px
               vertical-align: top
               background-size: 12px
               background-repeat:no-repeat
               &.decrease
                 bg-image('decrease_1')
               &.discount
                 bg-image('discount_1')
               &.guarantee
                 bg-image('guarantee_1')
               &.invoice
                 bg-image('invoice_1')
               &.special
                 bg-image('special_1')
             .text
               line-height: 12px
               font-size: 10px
         .support-count
           position: absolute
           right: 12px
           bottom: 14px
           padding: 0 8px
           height: 24px
           line-height:24px
           border-radius: 12px
           background: rgba(0, 0, 0, .2)
           text-alig: center
           font-size: 10px
           .count
               vertical-align: top
           .icon-keyboard_arrow_right
               line-height:24px
               margin-left: 2px
       .bulletin-wrapper
          position:relative
          height: 28px
          line-height:28px
          padding:0 22px 0 12px
          white-space:nowrap
          overflow:hidden
          text-overflow: ellipsis
          .bulletin-title
              display: inline-block
              vertical-align: top
              width: 22px
              height:12px
              bg-image('bulletin')
              background-size: 22px 12px
              background-repeat: no-repeat
              margin-top: 8px
          .bulletin-text
              vertical-align: top
              margin: 0 4px
              font-size:10px
          .icon-keyboard_arrow_right
            position:absolute
            font-size:10px
            top:8px
            right:12px
            font-size:10px;
       .background
           position: absolute
           top:0
           left:0
           width:100%
           height:100%
           z-index:-1
           filter:blur(10px)
           img
            width:100%
            height:100%
       .detail
         position:fixed
         left:0
         top:0
         z-index:100
         width: 100%
         height:100%
         overflow:auto
         transition: all 0.5s
         background:rgba(7,17,27,.8)
         backdrop-filrter:blur(10px)
         &.fade-in-active, &.fade-out-active
            transition: all 0.5s ease
         &.fade-in-enter, &.fade-out-active
            opacity: 0
         .detail-wrapper
           min-height: 100%
           width:100%
           .detail-main
             padding-top: 64px
             padding-bottom: 64px
             .name
               line-height:16px
               text-align: center
               font-size:16px
               font-weight:700
             .star-wrapper
               margin-top: 18px
               padding: 2px 0
               text-align: center
             .title
               display: flex
               width: 80%
               margin:28px auto 24px auto
               .line
                 flex: 1
                 position:relative
                 top:-6px
                 border-bottom:rgba(255,255,255,.2) 1px solid
               .text
                 padding 0 12px
                 font-size:14px
                 font-weight: 700
             .supports
               width: 80%
               margin: 0 auto
               .support-item
                 padding: 0 12px
                 margin-bottom: 12px
                 font-size:0
                 &:last-child
                   margin-bottom: 0
                 .icon
                   display:inline-block
                   width:16px
                   height: 16px
                   background-size:16px
                   vertical-align: top
                   margin-right: 6px
                   background-repeat:no-repeat
                   &.decrease
                     bg-image('decrease_2')
                   &.discount
                     bg-image('discount_2')
                   &.guarantee
                     bg-image('guarantee_2')
                   &.invoice
                     bg-image('invoice_2')
                   &.special
                     bg-image('special_2')
                 .text
                   line-height:16px
                   font-size:12px
             .bulletin
               width: 80%
               margin:0 auto
               .content
                 padding: 0 12px
                 font-size:12px
                 line-height:2

         .detail-close
           position:relative
           width: 32px
           height: 32px
           margin: -64px auto 0 auto
           clear: both
           font-size:32px
</style>
