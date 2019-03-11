<template>
  <div>
    <common-header></common-header>
    <scroll-nav></scroll-nav>
    <div class="location">
      <span class="iconfont">&#xe60e;</span>
      <router-link to="/">首页</router-link> > <router-link to="/interact">互动回应</router-link> > <router-link :to="'/interactList/' + this.columnId">{{this.columnTitle}}</router-link>
    </div>
    <div class="main-body-wrapper" v-if="this.list">
      <h1 class="title">{{this.list.title}}</h1>
      <div class="other-info">
        <span>来信人：{{this.list.creator_name}}</span>
        <span>来信时间：{{this.list.time | formatDate}}</span>
        <br>
        <span>处理情况：{{this.list.process_status}}</span>
        <span>浏览量：{{this.list.views}}</span>
      </div>
      <div class="article" v-html="this.list.text"></div>
      <div v-if="!(this.list.post_text==='')">
        <div class="other-info">
          <span>回复单位：{{this.list.source}}</span>
          <span>回复时间：{{this.list.post_time | formatDate}}</span>
        </div>
        <div class="article" v-html="this.list.post_text"></div>
      </div>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonHeader from '../common/Header'
import CommonFooter from '../common/Footer'
import ScrollNav from '../common/ScrollNav'
import {formatDate} from 'assets/js/date'
import axios from 'axios'
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
      list: {}
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
      }
    }
  },
  mounted () {
    this.getHomeInfo()
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
  padding: .1rem
  min-height 11.1rem
  .title
    margin .12rem 0
    line-height .52rem
    font-size .32rem
    font-weight bold
    text-align center
  .other-info
    padding .1rem .2rem
    line-height .4rem
    background #f6f6f6
    font-size .22rem
    color #999
    span
      padding-right: .24rem
  .article
    padding .2rem .1rem
    line-height .44rem
    text-align justify
    font-size .26rem
    text-indent 2em
    img
      max-width 100%
</style>