<template>
  <div>
    <common-header></common-header>
    <scroll-nav></scroll-nav>
    <div class="loading-container" v-show="!jryw.list">
      <loading></loading>
    </div>
    <div class="container-wrapper">
      <home-swiper :tpxw="tpxw"></home-swiper>
      <notice-bar :gsgg="gsgg"></notice-bar>
      <div class="tabs-wrapper" v-if="jryw.list">
        <van-tabs v-model="active1" :line-width="tabWidth3">
          <van-tab title="今日要闻">
            <div class="tab-content">
              <ul>
                <router-link
                        tag="li"
                        v-for="list of jryw.list"
                        :key="list.id"
                        :to="'/detail/' + list.columnId + '/' + list.id"
                >
                  <i class="dot"></i>{{list.title}}
                </router-link>
              </ul>
              <router-link tag="div" class="more" :to="'/list/' + jryw.id">
                <div class="inner">查看更多</div>
              </router-link>
            </div>
          </van-tab>
          <van-tab title="动态信息">
            <div class="tab-content">
              <ul>
                <router-link
                        tag="li"
                        v-for="list of dtxx.list"
                        :key="list.id"
                        :to="'/detail/' + list.columnId + '/' + list.id"
                >
                  <i class="dot"></i>{{list.title}}
                </router-link>
              </ul>
              <router-link tag="div" class="more" :to="'/list/' + dtxx.id">
                <div class="inner">查看更多</div>
              </router-link>
            </div>
          </van-tab>
          <van-tab title="视频新闻">
            <div class="tab-content">
              <ul>
                <router-link
                        tag="li"
                        v-for="list of spxw.list"
                        :key="list.id"
                        :to="'/detail/' + list.columnId + '/' + list.id"
                >
                  <i class="dot"></i>{{list.title}}
                </router-link>
              </ul>
              <router-link tag="div" class="more" :to="'/list/' + spxw.id">
                <div class="inner">查看更多</div>
              </router-link>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <panel-list :lists="ztzl.list" :title="ztzl.title" :columnUrl="'/list/' + ztzl.id"></panel-list>
      <panel-list :lists="zxgk.list" :title="zxgk.title" :columnUrl="'/list/' + zxgk.id"></panel-list>
      <div class="btnList-wrapper" v-if="jryw.list">
        <div class="btn-item" v-show="jryw.list">
          <router-link tag="div" class="btn" to="/interactionLive/1">
            <span class="iconfont">&#xe67d;</span>
            新闻发布会
          </router-link>
        </div>
        <div class="btn-item">
          <router-link tag="div" class="btn" to="/list/150000">
            <span class="iconfont">&#xe624;</span>
            预决算三公经费
          </router-link>
        </div>
        <div class="btn-item">
          <router-link tag="div" class="btn" to="/list/4000000">
            <span class="iconfont">&#xe60f;</span>
            政策文件
          </router-link>
        </div>
        <div class="btn-item">
          <router-link tag="div" class="btn" to="/list/40420">
            <span class="iconfont">&#xe625;</span>
            政策解读
          </router-link>
        </div>
        <div class="btn-item">
          <router-link tag="div" class="btn" to="/list/30000">
            <span class="iconfont">&#xe66c;</span>
            人事信息
          </router-link>
        </div>
        <div class="btn-item">
          <router-link tag="div" class="btn" to="/list/171100">
            <span class="iconfont">&#xe61e;</span>
            招标采购
          </router-link>
        </div>
      </div>
      <div class="tabPanel-wrapper" v-if="bxcy.list">
        <div class="title">
          <h2>互动回应</h2>
        </div>
        <van-tabs v-model="active3">
          <van-tab title="百姓畅言">
            <div class="tab-content">
              <ul>
                <router-link
                  tag="li"
                  v-for="(list,index) of bxcy.list"
                  :key="index"
                  :to="'/interactDetail/' + list.columnId + '/' + list.id"
                >
                  <i class="dot"></i>{{list.title}}
                </router-link>
              </ul>
              <router-link tag="div" class="more" :to="'/interactList/' + bxcy.id">
                <div class="inner">查看更多</div>
              </router-link>
            </div>
          </van-tab>
          <van-tab title="部门信箱">
            <div class="tab-content">
              <ul>
                <router-link
                        tag="li"
                        v-for="(list,index) of bmxx.list"
                        :key="index"
                        :to="'/interactDetail/' + list.columnId + '/' + list.id"
                >
                  <i class="dot"></i>{{list.title}}
                </router-link>
              </ul>
              <router-link tag="div" class="more" :to="'/interactList/' + bmxx.id">
                <div class="inner">查看更多</div>
              </router-link>
            </div>
          </van-tab>
          <van-tab title="回应关切">
            <div class="tab-content">
              <ul>
                <router-link
                        tag="li"
                        v-for="(list,index) of hygq.list"
                        :key="index"
                        :to="'/interactDetail/' + list.columnId + '/' + list.id"
                >
                  <i class="dot"></i>{{list.title}}
                </router-link>
              </ul>
              <router-link tag="div" class="more" :to="'/interactList/' + hygq.id">
                <div class="inner">查看更多</div>
              </router-link>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <div class="btns-wrapper" v-if="jryw.list">
        <div class="btn-item">
          <router-link tag="div" class="btn" to="/interactionLive">
            <span class="iconfont">&#xe604;</span>
            在线访谈
          </router-link>
        </div>
        <div class="btn-item">
          <a tag="div" class="btn" href="http://www.luan.gov.cn/interactionColl/">
            <span class="iconfont">&#xe62b;</span>
            意见征集
          </a>
        </div>
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
import HomeSwiper from './components/Swiper'
import NoticeBar from './components/NoticeBar'
import PanelList from '../common/PanelList'
import Loading from '../common/loading'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    CommonHeader,
    CommonFooter,
    ScrollNav,
    HomeSwiper,
    NoticeBar,
    PanelList,
    Loading,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data() {
    return {
      active1: 0,
      active2: 0,
      active3: 0,
      jryw: {},
      dtxx: {},
      spxw: {},
      ztzl: {},
      zxgk: {},
      bxcy: {},
      bmxx: {},
      hygq: {},
      tpxw: {},
      gsgg: {}
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
        this.ztzl = data.ztzl
        this.zxgk = data.zxgk
        this.bxcy = data.bxcy
        this.bmxx = data.bmxx
        this.hygq = data.hygq
        this.tpxw = data.tpxw
        this.gsgg = data.gsgg
      }
    }
  },
  created () {
    this.getHomeInfo()
  },
  computed: {
    tabWidth3 () {
      const tabW = window.innerWidth / 3
      return tabW
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'
.loading-container
  position: absolute
  width: 100%
  top: 50%
  transform: translateY(-50%)
.container-wrapper
  min-height 10.3rem
  .tabs-wrapper
    margin 1px 0 .46rem
    height 0
    padding-bottom 6rem
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
  .btnList-wrapper
    margin -0.2rem 0 .40rem
    padding 0 .15rem
    overflow: hidden
    .btn-item
      float left
      box-sizing border-box
      width 33.333%
      padding .1rem
      .btn
        box-sizing border-box
        display block
        width 100%
        height 1.25rem
        padding-top .18rem
        border 1px solid #ddd
        border-radius 4px
        text-align center
        font-size .28rem
        .iconfont
          display block
          margin-bottom .12rem
          color #cc0c0d
          font-size .48rem
  .tabPanel-wrapper
    margin-bottom .46rem
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
    .serve-list
      padding 0 .15rem
      overflow: hidden
      .serve-item
        float left
        width 33.33%
        height 2rem
        box-sizing border-box
        padding-top .4rem
        text-align center
        font-size .24rem
        .icon-bg
          width 1rem
          height 1rem
          line-height 1rem
          border-radius 50%
          background #f0f0f0
          margin 0 auto .2rem
          .iconfont
            color #cc0c0d
            font-size .5rem
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
  .btns-wrapper
    margin 0 0 .40rem
    padding 0 .15rem
    overflow: hidden
    .btn-item
      float left
      box-sizing border-box
      width 50%
      padding .1rem
      .btn
        box-sizing border-box
        display block
        width 100%
        height 1.25rem
        line-height 1.25rem
        border 1px solid #ddd
        border-radius 4px
        text-align center
        font-size .28rem
        .iconfont
          vertical-align top
          margin-bottom .12rem
          color #cc0c0d
          font-size .64rem
</style>