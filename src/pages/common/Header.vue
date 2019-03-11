<template>
  <div>
    <div class="header-wrapper">
      <div class="logo">
        <img class="logo-img" src="../../assets/images/logo.png">
      </div>
      <div class="btn-items">
        <div class="item" @click="foldHandle"><span class="iconfont">&#xe600;</span></div>
        <div class="item"><span class="iconfont wb-icon">&#xe661;</span></div>
        <div class="item"><span class="iconfont wx-icon">&#xe66e;</span></div>
      </div>
    </div>
    <transition name="fold">
      <div class="search-wrapper" v-show="isSearchShow">
        <form action="/">
          <van-search
                  v-model="value"
                  placeholder="请输入搜索关键词"
                  show-action
                  @search="onSearch"
                  @cancel="onCancel"
          />
        </form>
        <div class="search-content">
          <div v-show="isRecordShow">
            <div class="search-title">
              <h2>历史记录</h2>
              <span class="iconfont" @click="clearHistory()">&#xe615;</span>
            </div>
            <div class="search-record">
              <ul>
                <li
                  v-for="(item, index) in recordList"
                  :key="index"
                  @click="historySearch(item)"
                >
                  {{item}}
                </li>
              </ul>
            </div>
          </div>
          <div class="search-title">
            <h2>搜索热词</h2>
          </div>
          <div class="search-hot">
            <ul>
              <li
                  v-for="(item, index) in hotList.list"
                  :key="index"
                  @click="historySearch(item.title)"
              >
                {{item.title}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Search } from 'vant'
import {saveSearch} from '../../assets/js/cache.js'
import storage from 'good-storage'
import axios from 'axios'
export default {
  name: 'Header',
  components: {
    [Search.name]: Search
  },
  data () {
    return {
      value: '',
      isSearchShow: false,
      recordList: [],
      isRecordShow: false,
      hotList: {}
    }
  },
  methods: {
    initRecord () {
      this.recordList = []
      let searches = storage.get('_search_')
      this.recordList = searches ? searches : []
      if (this.recordList.length > 0) {
        this.isRecordShow = true
      } else {
        this.isRecordShow = false
      }
    },
    onSearch () {
      if (this.value != '') {
        saveSearch(this.value)
        let params = {
          majorInfo : this.value
        }
        this.isSearchShow = false
        this.$router.push({
          path:'/list/' + params.majorInfo
        })
        this.value = ''
      }
    },
    onCancel () {
      this.isSearchShow = false
    },
    foldHandle () {
      this.isSearchShow = !this.isSearchShow
    },
    historySearch (item) {
      this.value = item
      this.onSearch()
    },
    clearHistory () {
      storage.remove('_search_')
      this.recordList = []
      this.isRecordShow = false
    },
    getSearchHot () {
      axios.get('http://mtest.luan.gov.cn/index.php?c=SearchJson').then((res) => {
        res = res.data
        if (res.ret) {
          this.hotList = res.data
        }
      })
    }
  },
  mounted () {
    this.initRecord()
    this.getSearchHot()
  }
}
</script>

<style lang="stylus" scoped>
.header-wrapper
  display flex
  padding 0.3rem
  .logo
    flex 0 0 3.96rem
    .logo-img
      width 100%
  .btn-items
    flex 1
    text-align right
    .item
      display inline-block
      width .53rem
      height .53rem
      line-height .53rem
      margin .14rem 0 0 .15rem
      border 1px solid #999
      border-radius 50%
      text-align center
      .iconfont
        font-size .38rem
        color #999
.search-wrapper
  position: fixed
  left: 0
  top: 0
  bottom 0
  z-index: 100
  width: 100%
  opacity: 1;
  height 100%
  background #f5f5f5
  transform: translate3d(0, 0, 0)
  &.fold-enter-active, &.fold-leave-active
    transition: all 0.5s
  &.fold-enter, &.fold-leave-active
    transform: translate3d(0, -100%, 0)
    opacity 0
  .search-content
    padding: .1rem .24rem
    .search-title
      height .62rem
      line-height .62rem
      border-bottom 1px solid #ddd
      h2
        font-size: .28rem
        float left
      .iconfont
        float right
        font-size .3rem
        color #b3b3b3
    .search-record
      margin-bottom .3rem
      overflow hidden
      li
        float left
        width 50%
        line-height .6rem
        box-sizing border-box
        border-bottom 1px solid #ddd
        font-size .24rem
        color #999
        &:nth-child(2n)
          border-left 1px solid #ddd
          padding-left .18rem
    .search-hot
      overflow hidden
      li
        float left
        line-height .46rem
        padding 0 .2rem
        background #d9d9d9
        margin .2rem .2rem 0 0
        font-size .24rem
        border-radius 20px
</style>