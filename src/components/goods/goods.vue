<template>
  <div class="goods">
    <div class="meun-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="item in goods" class="meun-item ">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li class="food-list food-list-hook" v-for="item in goods">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="food-item border-1px" v-for="food in item.foods">
              <div class="icon"><img :src="food.icon" alt="" width="57" height="57"></div>
              <div class="content">
                <div class="name">{{food.name}}</div>
                <div class="desc">{{food.description}}</div>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScorll from 'better-scroll';
  const ERR_OK = 200;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY > height1 && this.scrollY < height2)) {
            return i;
          };
        };
        return 0;
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then(response => {
          if (response.status === ERR_OK) {
            this.goods = response.data.data;
            this.$nextTick(() => {
              this._initScroll();
              this.calculateHeight();
            });
          }
      }, response => {
          // error callback
      });
    },
    methods: {
      _initScroll() {
        this.menuScoll = new BScorll(this.$refs.menuWrapper, {});
        this.foodsScoll = new BScorll(this.$refs.foodsWrapper, {
          probeType: 3
        });
        this.foodsScoll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        };
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl";
  .goods
    display:flex
    overflow:hidden
    position:absolute
    top:174px
    width:100%
    bottom:46px
    .meun-wrapper
      flex: 0 0 80px
      width: 80px
      background:#f3f5f7
      .meun-item
        display:table
        height: 54px
        width:56px
        line-heigth:14px
        padding: 0 12px
        .icon
          display:inline-block
          width: 12px
          height: 12px
          margin-right:2px
          vertical-align: top
          background-size: 12px
          background-repeat:no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display:table-cell
          width:56px;
          border-1px(rgba(7,17,27,.1))
          vertical-align:middle
          font-size:12px
    .foods-wrapper
      flex:1
      .title
        padding-left:14px
        height:26px;
        line-height:26px
        border-left:2px solid #d9dde1
        font-size:12px
        color:rgb(147,153,159)
        background:#f3f5f7
      .food-item
        display: flex
        margin:18px
        padding-bottom:18px
        border-1px(rgba(7,17,27,.1))
        &:last-child
          border-none()
          margin-bottom:0
        .icon
          flex:0 0 57px
          margin-right:10px
        .content
          flex:1
          .name
            color:rgb(7,17,27)
            font-size:14px
            line-height:14px
            height:14px
            margin:2px 0 8px 0
          .desc,.extra
            line-height:10px
            font-size:10px
            color:rgb(147,153,159)
          .desc
            margin-bottom: 8px
            line-height:12px
          .extra
            .count
              margin-right:12px
          .price
            font-weight: 700
            font-size: 24px
            .now
              margin-right:8px
              font-size:14px
              color:rgb(240,20,20)
            .old
              text-decoration: line-through
              font-size:10px
              color:rgb(147,153,159)

</style>
