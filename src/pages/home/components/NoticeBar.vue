<template>
  <div class="notice-bar" speed="20" v-if="gsgg.list">
    <router-link tag="div" class="notice-title" :to="'/list/' + gsgg.id">
      <span class="iconfont">&#xe620;</span>
      公告
    </router-link>
    <div class="van-notice-bar">
      <div class="van-notice-bar__wrap">
        <div class="van-notice-bar__content" @mousemove="pauseAn" @mouseout="startAn">
          <div class="scroll-item" :style="{marginLeft: '-' + marginLeft + 'px'}">
            <router-link
              class="notice-item"
              v-for="(item,index) in gsgg.list"
              :key="index"
              :to="'/detail/' + item.columnId + '/' + item.id"
            >{{item.title}}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoticeBar',
  props: {
    gsgg: Object
  },
  data() {
    return {
      an: '',
      marginLeft: 0,
      prevLeft: 0,
      time: 30
    }
  },
  methods: {
    startAn() {
      let _this = this
      let width = document.querySelector('.scroll-item').offsetWidth
      this.an = setInterval(function() {
        if (_this.marginLeft > width) {
          _this.marginLeft = 0
        }
        _this.marginLeft += 1
      } , _this.time)
    },
    pauseAn: function(){
      clearInterval(this.an);
    }
  },
  watch: {
    gsgg: function () {
      this.$nextTick(function () {
        this.startAn()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.notice-bar
  position relative
  .notice-title
    position absolute
    left .27rem
    top .24rem
    z-index 1
    width 1.26rem
    height .33rem
    line-height .33rem
    border-right 1px solid #dadada
    color #cc0c0d
    font-size .33rem
    .iconfont
      font-size .33rem;
  .van-notice-bar
    display: flex;
    position: relative;
    color: #333;
    height: .33rem;
    padding: .26rem .26rem .26rem 1.8rem;
    font-size: .28rem;
    line-height: 1.5;
    background-color: #fff;
    border-bottom: 1px solid #f0f0f0;
  .van-notice-bar__wrap
    width: 100%;
    height: .33rem;
    line-height: .33rem;
    overflow: hidden;
    .van-notice-bar__content
      white-space: nowrap;
      .scroll-item
        display inline-block
        .notice-item
          padding 0 .3rem
</style>