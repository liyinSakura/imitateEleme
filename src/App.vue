<template>
  <div id="app">
    <v-header :seller='seller'></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
        <!-- <a>商品</a> -->
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
        <!-- <a>评论</a> -->
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
        <!-- <a>商家</a> -->
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
    import header from './components/header/header.vue';

    const ERR_OK = 200;
    export default {
      data () {
        return {
          seller: {}
        };
      },
      created () {
        this.$http.get('/api/seller').then(response => {
            if (response.status === ERR_OK) {
              this.seller = response.data.data;
            }
        }, response => {
            // error callback
        });
      },
      components: {
        'v-header': header
      }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>
