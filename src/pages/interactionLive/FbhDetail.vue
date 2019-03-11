<template>
  <div>
    <div class="banner-wrapper">
      <img :src="this.photo" class="banner-img">
      <div class="banner-mask">
        <router-link :to="'/interactionLive/' + this.columnId">
          <span class="iconfont">&#xe601;</span>
        </router-link>
      </div>
    </div>
    <div class="interact-wrapper">
      <h2 class="interact-title">{{this.title}}</h2>
      <p class="interact-text"><span>地点：</span>{{this.addr}}</p>
      <p class="interact-text"><span>简介：</span>{{this.intro}}</p>
    </div>
    <div class="live-title">发布会直播</div>
    <div class="live-content">
      <div class="article" v-html="this.text"></div>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
  import CommonFooter from '../common/Footer'
  import axios from 'axios'
  export default {
    name: 'FbhDetail',
    components: {
      CommonFooter
    },
    data () {
      return {
        columnId: '',
        photo: '',
        title: '',
        addr: '',
        intro: '',
        text: ''
      }
    },
    methods: {
      getHomeInfo () {
        axios.get('http://mtest.luan.gov.cn/index.php?c=DetailJson&branchid=' + this.$route.params.branch + '&id=' + this.$route.params.id).then(this.getHomeInfoSucc)
      },
      getHomeInfoSucc (res) {
        res = res.data
        if (res.ret && res.data) {
          const data = res.data
          this.columnId = data.columnId
          this.photo = data.photo
          this.title = data.title
          this.addr = data.addr
          this.intro = data.intro
          this.text = data.text
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
    .article
      padding .2rem .25rem
      line-height .44rem
      text-align justify
      font-size .26rem
</style>