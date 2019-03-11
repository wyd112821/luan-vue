<template>
  <div class="wrapper" v-if="tpxw.list">
    <van-swipe class="home-swipe" :autoplay="5000">
      <van-swipe-item v-for="item in tpxw.list" :key="item.id">
        <router-link :to="'/detail/' + item.columnId + '/' + item.id">
          <img :src="item.thumb">
          <div class="mask"><p>{{item.title}}</p></div>
        </router-link>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'
export default {
  name: 'Swiper',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  props: {
    tpxw: Object
  }

}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'
.wrapper
  overflow hidden
  height 0
  width 100%
  padding-bottom 56%
  background #eee
  .home-swipe
    position relative
    img
      display block
      width 7.5rem
      height 4.2rem
    .mask
      position absolute
      left 0
      bottom 0
      width 100%
      height .8rem
      background rgba(0, 0, 0, .5)
      p
        width 5.4rem
        padding 0 .2rem
        line-height .8rem
        color #fff
        font-size .3rem
        ellipsis()
</style>