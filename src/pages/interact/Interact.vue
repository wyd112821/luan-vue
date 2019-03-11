<template>
  <div>
    <common-header></common-header>
    <scroll-nav></scroll-nav>
    <div class="location">
      <span class="iconfont">&#xe60e;</span>
      <router-link to="/">首页</router-link> > <router-link to="/interact">互动回应</router-link>
    </div>
    <div class="loading-container" v-show="!bxcy.list">
      <loading></loading>
    </div>
    <div class="container-wrapper">
      <div class="panel-wrapper" v-if="bxcy.list">
        <div class="title">
          <router-link tag="h2" to="">{{bxcy.title}}</router-link>
        </div>
        <div class="tab-content">
          <ul>
            <router-link
                    tag="li"
                    v-for="list of bxcy.list"
                    :key="list.id"
                    :to="'/interactDetail/' + list.columnId + '/' + list.id"
            >
              <i class="dot"></i>{{list.title}}
            </router-link>
          </ul>
          <router-link tag="div" class="more" :to="'/interactList/' + bxcy.id">
            <div class="inner">查看更多</div>
          </router-link>
        </div>
      </div>
      <div class="panel-wrapper" v-if="bmxx.list">
        <div class="title">
          <router-link tag="h2" to="">{{bmxx.title}}</router-link>
        </div>
        <div class="tab-content">
          <ul>
            <router-link
                    tag="li"
                    v-for="list of bmxx.list"
                    :key="list.id"
                    :to="'/interactDetail/' + list.columnId + '/' + list.id"
            >
              <i class="dot"></i>{{list.title}}
            </router-link>
          </ul>
          <router-link tag="div" class="more" :to="'/interactList/' + bmxx.id">
            <div class="inner">查看更多</div>
          </router-link>
        </div>
      </div>
      <div class="panel-wrapper" v-if="hygq.list">
        <div class="title">
          <router-link tag="h2" to="">{{hygq.title}}</router-link>
        </div>
        <div class="tab-content">
          <ul>
            <router-link
                    tag="li"
                    v-for="list of hygq.list"
                    :key="list.id"
                    :to="'/interactDetail/' + list.columnId + '/' + list.id"
            >
              <i class="dot"></i>{{list.title}}
            </router-link>
          </ul>
          <router-link tag="div" class="more" :to="'/interactList/' + hygq.id">
            <div class="inner">查看更多</div>
          </router-link>
        </div>
      </div>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonHeader from '../common/Header'
import CommonFooter from '../common/Footer'
import ScrollNav from '../common/ScrollNav'
import Loading from '../common/loading'
import axios from 'axios'
export default {
  name: 'Interact',
  components: {
    CommonHeader,
    CommonFooter,
    ScrollNav,
    Loading
  },
  data () {
    return {
      bxcy: {},
      bmxx: {},
      hygq: {}
    }
  },
  methods: {
    getHomeInfo () {
      axios.get('http://mtest.luan.gov.cn/index.php?c=HomeJson').then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.bxcy = data.bxcy
        this.bmxx = data.bmxx
        this.hygq = data.hygq
      }
    }
  },
  mounted () {
    this.getHomeInfo()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'
.location
  height .8rem
  line-height .8rem
  padding 0 .2rem
  color #999
  font-size .22rem
  .iconfont
    font-size .28rem
    color #c0c0c0
  a
    color #999
.loading-container
  position: absolute
  width: 100%
  top: 50%
  transform: translateY(-50%)
.container-wrapper
  min-height 10.3rem
  .panel-wrapper
    margin 1px 0 .46rem
    height 0
    padding-bottom 6rem
    .title
      height .8rem
      background #f5f5f5
      h2
        float left
        height .8rem
        line-height .8rem
        padding 0 .3rem
        background #cc0c0d
        color #fff
        font-size .34rem
        font-weight normal
    .tab-content
      ul
        padding-bottom .3rem
        li
          position relative
          height .8rem
          line-height .8rem
          padding 0 .22rem 0 .4rem
          font-size .28rem
          border-bottom 1px dashed #ddd
          ellipsis()
          .dot
            position absolute
            left .18rem
            top 50%
            margin-top -0.04rem
            display block
            width .08rem
            height .08rem
            background #ccc
            border-radius 50%
      .more
        position relative
        width 80%
        height .8rem;
        margin 0 auto
        border 1px solid #ddd
        border-radius 50px
        .inner
          box-sizing border-box
          position absolute
          left 0
          top 0
          width 100%
          height .8rem;
          line-height .8rem
          border 2px solid #fff;
          border-radius 50px
          background #f5f5f5
          font-size .28rem
          text-align center
          color #666
</style>