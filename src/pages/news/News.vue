<template>
  <div>
    <common-header></common-header>
    <scroll-nav></scroll-nav>
    <div class="location">
      <span class="iconfont">&#xe60e;</span>
      <router-link to="/">首页</router-link> > <router-link to="/news">政务资讯</router-link>
    </div>
    <div class="loading-container" v-show="!jryw.list">
      <loading></loading>
    </div>
    <div class="container-wrapper">
      <panel-list :lists="jryw.list" :title="jryw.title" :columnUrl="'/list/' + jryw.id"></panel-list>
      <panel-list :lists="dtxx.list" :title="dtxx.title" :columnUrl="'/list/' + dtxx.id"></panel-list>
      <panel-list :lists="spxw.list" :title="spxw.title" :columnUrl="'/list/' + spxw.id"></panel-list>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonHeader from '../common/Header'
import CommonFooter from '../common/Footer'
import ScrollNav from '../common/ScrollNav'
import PanelList from '../common/PanelList'
import Loading from '../common/loading'
import axios from 'axios'
export default {
  name: 'News',
  components: {
    CommonHeader,
    CommonFooter,
    ScrollNav,
    PanelList,
    Loading
  },
  data () {
    return {
      jryw: {},
      dtxx: {},
      spxw: {}
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
        this.jryw = data.jryw
        this.dtxx = data.dtxx
        this.spxw = data.spxw
      }
    }
  },
  mounted () {
    this.getHomeInfo()
  }
}
</script>

<style lang="stylus" scoped>
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
</style>