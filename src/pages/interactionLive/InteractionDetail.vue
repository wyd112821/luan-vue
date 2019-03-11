<template>
  <div>
    <div class="banner-wrapper">
      <img :src="photo" class="banner-img">
      <div class="banner-mask">
        <router-link to="/interactionLive">
          <span class="iconfont">&#xe601;</span>
        </router-link>
      </div>
    </div>
    <div class="interact-wrapper">
      <h2 class="interact-title">{{this.title}}</h2>
      <p class="interact-text"><span>时间：</span>{{this.time}}</p>
      <p class="interact-text"><span>地点：</span>{{this.addr}}</p>
      <p class="interact-text"><span>嘉宾：</span>{{this.guests}}</p>
      <p class="interact-text"><span>简介：</span>{{this.intro}}</p>
    </div>
    <div class="live-title">文字直播</div>
    <div class="live-content">
      <div class="live-item">
        <div class="item-info">
          <div class="info-left">
            <span class="iconfont">&#xe602;</span>
            【欢迎词】
          </div>
          <div class="info-right"></div>
        </div>
        <div class="info-text" v-html="this.starttxt"></div>
      </div>
      <div v-for="item of liveText" :key="item.id">
        <div class="live-item issue-item">
          <div class="item-info">
            <div class="info-left">
              <span class="iconfont">&#xe62c;</span>
              【{{item.issuePerson}}】
            </div>
            <div class="info-right">{{item.issueTime}}</div>
          </div>
          <div class="info-text" v-html="item.issueText"></div>
        </div>
        <div class="live-item reply-item">
          <div class="item-info">
            <div class="info-left">
              <span class="iconfont">&#xe655;</span>
              【{{item.replyPerson}}】
            </div>
            <div class="info-right">{{item.replyTime}}</div>
          </div>
          <div class="info-text" v-html="item.replyText"></div>
        </div>
      </div>
      <div class="live-item issue-item">
        <div class="item-info">
          <div class="info-left">
            <span class="iconfont">&#xe639;</span>
            【结束语】
          </div>
          <div class="info-right"></div>
        </div>
        <div class="info-text" v-html="this.overtxt"></div>
      </div>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonFooter from '../common/Footer'
import axios from 'axios'
export default {
  name: 'InteractionDetail',
  components: {
    CommonFooter
  },
  data () {
    return {
      photo: '',
      title: '',
      time: '',
      addr: '',
      guests: '',
      intro: '',
      starttxt: '',
      overtxt: '',
      liveText: []
    }
  },
  methods: {
    getHomeInfo () {
      axios.get('/api/interactionDetail.json', {
        params: {
          id: this.$route.params.id
        }
      }).then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.photo = data.photo
        this.title = data.title
        this.time = data.time
        this.addr = data.addr
        this.guests = data.guests
        this.intro = data.intro
        this.starttxt = data.starttxt
        this.overtxt = data.overtxt
        this.liveText = data.liveText
      }
    }
  },
  mounted () {
    this.getHomeInfo()
  }
}
</script>

<style lang="stylus" scoped>
.banner-wrapper
  position relative
  overflow: hidden
  height: 3.9rem
  .banner-img
    width 100%
  .banner-mask
    position absolute
    left: 0
    top: 0
    width 100%
    height .8rem
    line-height .8rem
    padding 0 .25rem
    box-sizing: border-box
    background rgba(0, 0, 0, .5)
    .iconfont
      color #fff
      font-size .32rem
.interact-wrapper
  padding: .2rem .25rem
  .interact-title
    line-height: .44rem
    padding 0 0 .14rem
    text-align center
    font-size .3rem
    color #d90000
    font-weight bold
  .interact-text
    line-height: .42rem
    font-size .24rem
    text-align justify
    span
      color #d90000
.live-title
  line-height .74rem
  border-top: 1px solid #ddd
  border-bottom: 1px solid #ddd
  background #eee
  text-align center
  font-size .3rem
  color #d90000
.live-content
  .live-item
    overflow: hidden
    padding .14rem .24rem .2rem
    background #fff
    &.issue-item
      background #f5f4f4
    &.reply-item
      background #fff
    .item-info
      display flex
      height .52rem
      line-height .52rem
      .info-left
        flex 1
        font-size .26rem
        color #d90000
        .iconfont
          font-size .4rem
          vertical-align top
      .info-right
        flex 0 0 3rem
        font-size .18rem
        color #999
        text-align right
    .info-text
      line-height .4rem
      font-size .24rem
      text-align justify
</style>