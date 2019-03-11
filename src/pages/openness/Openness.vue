<template>
  <div>
    <common-header></common-header>
    <scroll-nav></scroll-nav>
    <div class="location">
      <span class="iconfont">&#xe60e;</span>
      <router-link to="/">首页</router-link> > <router-link to="/openness">信息公开</router-link>
    </div>
    <div class="loading-container" v-show="!zcwj.list">
      <loading></loading>
    </div>
    <div class="container-wrapper">
      <div class="btns-wrapper">
        <div class="btn-item">
          <a class="btn" href="http://www.luan.gov.cn/opennessGuide/?branch_id=5212bc2d682e09147c7c4a8a">
            <span class="iconfont">&#xe6f8;</span>
            信息公开指南
          </a>
        </div>
        <div class="btn-item">
          <a class="btn" href="http://www.luan.gov.cn/opennessRules/?branch_id=5212bc2d682e09147c7c4a8a">
            <span class="iconfont">&#xe72c;</span>
            信息公开制度
          </a>
        </div>
        <div class="btn-item">
          <a tag="div" class="btn" href="http://www.luan.gov.cn/opennessAnnualReport/?branch_id=">
            <span class="iconfont">&#xe645;</span>
            信息公开年报
          </a>
        </div>
        <div class="btn-item">
          <a tag="div" class="btn" href="http://www.luan.gov.cn/opennessRequest/?type=0&branch_id=5212bc2d682e09147c7c4a8a">
            <span class="iconfont">&#xe65b;</span>
            依申请公开
          </a>
        </div>
      </div>
      <div class="tabs-wrapper" v-if="zcwj.list">
        <van-tabs v-model="active1" :line-width="tabWidth2">
          <van-tab title="政策文件">
            <div class="tab-content">
              <ul>
                <router-link
                        tag="li"
                        v-for="list of zcwj.list"
                        :key="list.id"
                        :to="'/detail/' + list.columnId + '/' + list.id"
                >
                  <i class="dot"></i>{{list.title}}
                </router-link>
              </ul>
              <router-link tag="div" class="more" :to="'/list/' + zcwj.id">
                <div class="inner">查看更多</div>
              </router-link>
            </div>
          </van-tab>
          <van-tab title="新闻发布会">
            <div class="tab-content">
              <ul>
                <router-link
                        tag="li"
                        v-for="list of xwfbh.list"
                        :key="list.id"
                        :to="'/fbhDetail/' + list.columnId + '/' + list.id"
                >
                  <i class="dot"></i>{{list.title}}
                </router-link>
              </ul>
              <router-link tag="div" class="more" :to="'/interactionLive/' + xwfbh.id">
                <div class="inner">查看更多</div>
              </router-link>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <div class="tabs-wrapper" v-if="rsxx.list">
        <van-tabs v-model="active2" :line-width="tabWidth2">
          <van-tab title="人事信息">
            <div class="tab-content">
              <ul>
                <router-link
                        tag="li"
                        v-for="list of rsxx.list"
                        :key="list.id"
                        :to="'/detail/' + list.columnId + '/' + list.id"
                >
                  <i class="dot"></i>{{list.title}}
                </router-link>
              </ul>
              <router-link tag="div" class="more" :to="'/list/' + rsxx.id">
                <div class="inner">查看更多</div>
              </router-link>
            </div>
          </van-tab>
          <van-tab title="招标采购">
            <div class="tab-content">
              <ul>
                <router-link
                        tag="li"
                        v-for="list of zbcg.list"
                        :key="list.id"
                        :to="'/detail/' + list.columnId + '/' + list.id"
                >
                  <i class="dot"></i>{{list.title}}
                </router-link>
              </ul>
              <router-link tag="div" class="more" :to="'/list/' + zbcg.id">
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
  name: 'Openness',
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
      active2: 0,
      zcwj: {},
      xwfbh: {},
      rsxx: {},
      zbcg: {}
    }
  },
  methods: {
    getHomeInfo () {
      axios.get('http://mtest.luan.gov.cn/index.php?c=OpennessJson').then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.zcwj = data.zcwj
        this.xwfbh = data.xwfbh
        this.rsxx = data.rsxx
        this.zbcg = data.zbcg
      }
    }
  },
  mounted () {
    this.getHomeInfo()
  },
  computed: {
    tabWidth2 () {
      const tabW = window.innerWidth / 2
      return tabW
    }
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
        height .9rem
        line-height .9rem
        border 1px solid #ddd
        border-radius 4px
        text-align center
        font-size .28rem
        .iconfont
          vertical-align top
          margin-bottom .12rem
          color #cc0c0d
          font-size .5rem
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
    margin 1px 0 .46rem
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
    .field-wrapper
      margin .12rem 0 .38rem
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