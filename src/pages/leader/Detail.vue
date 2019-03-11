<template>
  <div>
    <common-header></common-header>
    <scroll-nav></scroll-nav>
    <div class="location">
      <span class="iconfont">&#xe60e;</span>
      <router-link to="/">首页</router-link> > <router-link to="/leader">领导之窗</router-link>
    </div>
    <div class="loading-container" v-show="!zwhd.list">
      <loading></loading>
    </div>
    <div class="container-wrapper">
      <div class="leader-wrapper" v-if="zwhd.list">
        <div class="leader-box">
          <div class="item-img">
            <img :src="this.photo" />
          </div>
          <div class="item-info">
            <p class="item-title">{{this.name}}</p>
            <p class="item-desc">{{this.jobTitle}}</p>
          </div>
        </div>
        <div class="duty-wrapper">
          <div class="title">
            <h2>工作分工</h2>
          </div>
          <p class="text">{{this.duty}}</p>
        </div>
        <div class="duty-wrapper">
          <div class="title">
            <h2>领导简历</h2>
          </div>
          <p class="text">{{this.resume}}</p>
        </div>
        <panel-list :lists="zwhd.list" :title="zwhd.columnTitle" :columnUrl="'/leaderList/' + zwhd.columnId + '/' + this.id"></panel-list>
        <panel-list :lists="zwsp.list" :title="zwsp.columnTitle" :columnUrl="'/leaderList/' + zwsp.columnId + '/' + this.id"></panel-list>
      </div>
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
  name: 'Detail',
  components: {
    CommonHeader,
    CommonFooter,
    ScrollNav,
    PanelList,
    Loading
  },
  data () {
    return {
      id: '',
      name: '',
      jobTitle: '',
      duty: '',
      photo: '',
      resume: '',
      zwhd: {},
      zwsp: {}
    }
  },
  methods: {
    getHomeInfo () {
      axios.get('http://mtest.luan.gov.cn/index.php?c=LeaderJson&id=' + this.$route.params.id).then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.id = data.id
        this.name = data.name
        this.jobTitle = data.jobTitle
        this.duty = data.duty
        this.photo = data.photo
        this.resume = data.resume
        this.zwhd = data.zwhd
        this.zwsp = data.zwsp
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
  .leader-wrapper
    padding: 0 .2rem
    .leader-box
      overflow: hidden
      display: flex
      margin-bottom: .14rem
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
          line-height: .36rem
          font-size .24rem
          text-align justify
    .duty-wrapper
      .title
        position relative
        height .58rem
        border-bottom 1px solid #ddd
        h2
          position absolute
          left: 0
          bottom: -1px
          float: left
          height .53rem
          padding: 0 .2rem
          line-height: .4rem
          border-bottom .05rem solid #cc0c0d
          font-size .3rem
          color #cc0c0d
          font-weight normal
      .text
        padding: .16rem 0 .2rem
        line-height .46rem
        font-size .24rem
        text-align justify
</style>