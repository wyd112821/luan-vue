<template>
  <div>
    <common-header></common-header>
    <scroll-nav></scroll-nav>
    <div class="location">
      <span class="iconfont">&#xe60e;</span>
      首页 > 走进六安
    </div>
    <div class="loading-container" v-show="!lasq.list">
      <loading></loading>
    </div>
    <div class="container-wrapper">
      <div class="panel-wrapper" v-if="lasq.list">
        <div class="field-wrapper">
          <div class="field-item" v-for="list of lasq.list" :key="list.id">
            <router-link
                    tag="div"
                    class="btn"
                    :to="'/detail/' + list.columnId + '/' + list.id"
            >
              {{list.title}}
            </router-link>
          </div>
        </div>
      </div>
      <div class="tabs-wrapper" v-if="zsyz.list">
        <van-tabs v-model="active1" :line-width="tabWidth2">
          <van-tab title="招商引资">
            <div class="tab-content">
              <ul>
                <router-link
                        tag="li"
                        v-for="list of zsyz.list"
                        :key="list.id"
                        :to="'/detail/' + list.columnId + '/' + list.id"
                >
                  <i class="dot"></i>{{list.title}}
                </router-link>
              </ul>
              <router-link tag="div" class="more" :to="'/list/' + zsyz.id">
                <div class="inner">查看更多</div>
              </router-link>
            </div>
          </van-tab>
          <van-tab title="旅游六安">
            <div class="tab-content">
              <ul>
                <router-link
                        tag="li"
                        v-for="list of lyla.list"
                        :key="list.id"
                        :to="'/detail/' + list.columnId + '/' + list.id"
                >
                  <i class="dot"></i>{{list.title}}
                </router-link>
              </ul>
              <router-link tag="div" class="more" :to="'/list/' + lyla.id">
                <div class="inner">查看更多</div>
              </router-link>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
import CommonHeader from '../common/Header'
import CommonFooter from '../common/Footer'
import ScrollNav from '../common/ScrollNav'
import Loading from '../common/loading'
import axios from 'axios'
export default {
  name: 'About',
  components: {
    CommonHeader,
    CommonFooter,
    ScrollNav,
    Loading,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data () {
    return {
      active1: 0,
      lasq: {},
      zsyz: {},
      lyla: {}
    }
  },
  methods: {
    getHomeInfo () {
      axios.get('http://mtest.luan.gov.cn/index.php?c=AboutJson').then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.lasq = data.lasq
        this.zsyz = data.zsyz
        this.lyla = data.lyla
      }
    }
  },
  computed: {
    tabWidth2 () {
      const tabW = window.innerWidth / 2
      return tabW
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
.loading-container
  position: absolute
  width: 100%
  top: 50%
  transform: translateY(-50%)
.container-wrapper
  min-height 10.3rem
  .tabs-wrapper
    margin 1px 0 .46rem
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
  .panel-wrapper
    margin 0 0 .3rem
    .field-wrapper
      padding 0 .15rem
      overflow: hidden
      .field-item
        float left
        box-sizing border-box
        width 33.333%
        padding .1rem
        .btn
          box-sizing border-box
          width 100%
          height .9rem
          line-height .9rem
          border 1px solid #ddd
          border-radius 4px
          text-align center
          font-size .28rem
          ellipsis()
</style>