<template>
  <div>
    <common-header></common-header>
    <scroll-nav></scroll-nav>
    <div class="location">
      <span class="iconfont">&#xe60e;</span>
      <router-link to="/">首页</router-link> > <router-link to="/leader">领导之窗</router-link>
    </div>
    <div class="loading-container" v-show="!leaderSw.length">
      <loading></loading>
    </div>
    <div class="container-wrapper">
      <div class="tabPanel-wrapper leader-wrapper" v-if="leaderSw.length">
        <van-tabs v-model="active1">
          <van-tab title="市委领导">
            <div class="tab-content">
              <ul>
                <router-link
                        tag="li"
                        class="item"
                        v-for="list of leaderSw"
                        :key="list.id"
                        :to="'/leaderDetail/' + list.id"
                >
                  <div class="item-img">
                    <img :src="list.photo" />
                  </div>
                  <div class="item-info">
                    <p class="item-title">{{list.name}}</p>
                    <p class="item-desc">{{list.jobTitle}}</p>
                    <p class="item-duty">{{list.duty}}</p>
                    <button class="item-button">详情介绍</button>
                  </div>
                </router-link>
              </ul>
            </div>
          </van-tab>
          <van-tab title="市政府领导">
            <div class="tab-content">
              <ul>
                <router-link
                        tag="li"
                        class="item"
                        v-for="list of leaderSzf"
                        :key="list.id"
                        :to="'/leaderDetail/' + list.id"
                >
                  <div class="item-img">
                    <img :src="list.photo" />
                  </div>
                  <div class="item-info">
                    <p class="item-title">{{list.name}}</p>
                    <p class="item-desc">{{list.jobTitle}}</p>
                    <p class="item-duty">{{list.duty}}</p>
                    <button class="item-button">详情介绍</button>
                  </div>
                </router-link>
              </ul>
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
  name: 'Leader',
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
      leaderSw: [],
      leaderSzf: []
    }
  },
  methods: {
    getHomeInfo () {
      axios.get('http://mtest.luan.gov.cn/index.php?c=LeaderJson').then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.leaderSw = data.leaderSw
        this.leaderSzf = data.leaderSzf
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
  .tabPanel-wrapper
    margin-bottom .46rem
    .tab-content
      ul
        padding-bottom .3rem
        .item
          overflow: hidden
          display: flex
          padding: .3rem .2rem
          border-bottom 1px dashed #ddd
          .item-img
            width: 1.97rem
            height 2.6rem
            padding: .02rem
            border: 1px solid #ddd
            img
              width: 1.97rem
              height 2.6rem
          .item-info
            flex: 1
            padding: .1rem 0 .1rem .26rem
            min-width: 0
            color: #666
            .item-title
              line-height: .54rem
              font-size: .32rem
              font-weight bold
              color #cc0c0d
            .item-desc
              line-height: .4rem
              padding: .06rem 0 .1rem
              font-size .28rem
            .item-duty
              height: .7rem
              line-height .36rem
              font-size .24rem
              text-align justify
              display -webkit-box
              -webkit-box-orient vertical
              -webkit-line-clamp 2
              overflow hidden
            .item-button
              line-height: .54rem
              margin-top: .16rem
              background: #e14e4e
              padding: 0 .26rem
              border-radius: .26rem
              color: #fff
</style>