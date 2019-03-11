<template>
  <div class="back-to-top" v-show="showReturnToTop" @click="backToTop">
    <span class="iconfont">&#xe61f;</span>
  </div>
</template>

<script>
import {scrollIt} from "../../assets/js/scrollIt"
export default {
  name: 'backToTop',
  data () {
    return {
      showReturnToTop: false
    }
  },
  props: {
    transitionName: {
      type: String,
      default: 'easeOutQuad'
    }
  },
  methods: {
    currentPageYOffset () {
      let browserHeight = window.outerHeight
      window.pageYOffset > browserHeight ? this.showReturnToTop = true : this.showReturnToTop = false
    },
    backToTop () {
      scrollIt(0, 600, this.transitionName, this.currentPageYOffset);
    }
  },
  created () {
    window.addEventListener('scroll', this.currentPageYOffset)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.currentPageYOffset)
  }
}
</script>

<style lang="stylus" scoped>
.back-to-top
  position fixed
  z-index 100
  right .3rem
  bottom 1rem
  .iconfont
    opacity .5
    font-size .7rem
</style>