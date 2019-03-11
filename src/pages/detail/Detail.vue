<template>
  <div>
    <common-header></common-header>
    <scroll-nav></scroll-nav>
    <div class="location">
      <span class="iconfont">&#xe60e;</span>
      <router-link to="/">首页</router-link>
        >
      <router-link :to="'/list/' + this.columnId" v-if="!isSecRount">{{this.columnTitle}}</router-link>
      <router-link to="/leader" v-if="isSecRount">领导之窗</router-link>
    </div>
    <div class="main-body-wrapper" v-if="this.list">
      <h1 class="title">{{this.list.title}}</h1>
      <div class="other-info">
        <span>{{this.list.time | formatDate}}</span>
        <span>阅读次数：{{this.list.views}}</span>
        <span>{{this.list.source}}</span>
      </div>
      <div class="article" v-html="this.list.text" v-if="!isHasVideo"></div>
      <div class="article" v-if="isHasVideo">
        <div class="video-box">
          <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"></video-player>
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
import axios from 'axios'
import {formatDate} from 'assets/js/date'
import 'video.js/dist/video-js.css'
export default {
  name: 'Detail',
  components: {
    CommonHeader,
    CommonFooter,
    ScrollNav
  },
  data () {
    return {
      columnTitle: '',
      columnId: '',
      list: {},
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4",
          src: "" //视频url地址
        }],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
      }
    }
  },
  methods: {
    getHomeInfo () {
      this.pageNumber++
      axios.get('http://mtest.luan.gov.cn/index.php?c=DetailJson&branchid=' + this.$route.params.branch + '&id=' + this.$route.params.id).then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.columnTitle = data.columnTitle
        this.columnId = data.columnId
        this.list = data.list
        this.playerOptions.sources[0].src = this.list.text
      }
    }
  },
  mounted () {
    this.getHomeInfo()
  },
  computed: {
    isHasVideo() {
      return (this.columnTitle === '视频新闻' || this.columnTitle === '政务视频') ? true : false
    },
    isSecRount() {
      return (this.columnTitle === '政务活动' || this.columnTitle === '政务视频') ? true : false
    }
  },
  filters: {
    formatDate(time) {
      let t = JSON.parse(time)
      let date = new Date(t*1000)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  }
}
</script>

<style lang="stylus" scoped>
.location
  height .8rem
  line-height .8rem
  padding 0 .2rem
  border-bottom 1px solid #ddd
  color #999
  font-size .22rem
  .iconfont
    font-size .28rem
    color #c0c0c0
  a
    color #999
.main-body-wrapper
  padding: .1rem .2rem
  min-height 11.1rem
  .title
    margin .12rem 0
    line-height .52rem
    font-size .32rem
    font-weight bold
  .other-info
    line-height .4rem
    font-size .22rem
    color #999
    span
      padding-right: .24rem
  .article
    padding-top .2rem
    line-height .44rem
    text-align justify
    font-size .26rem
    >>> img
        width 100% !important
        margin-left -2em !important
    video
      width 100%
</style>