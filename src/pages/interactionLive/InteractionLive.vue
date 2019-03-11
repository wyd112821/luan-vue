<template>
  <div>
    <common-header></common-header>
    <scroll-nav></scroll-nav>
    <div class="location">
      <span class="iconfont">&#xe60e;</span>
      <router-link to="/">首页</router-link> > <router-link to="/openness">信息公开</router-link> > <router-link :to="'/interactionLive' + this.columnId">{{this.columnTitle}}</router-link>
    </div>
    <div class="interaction-wrapper">
      <van-list
              v-model="loading"
              :finished="finished"
              @load="onLoad"
      >
        <van-cell v-for="(item, index) in list" :key="index">
          <router-link
                  tag="div"
                  class="list-item"
                  :to="'/fbhDetail/'+ item.columnId + '/' + item.id"
          >
            <img class="item-img" :src="item.photo" v-show="item.photo" />
            <div class="item-info">
              <h2 class="item-title">{{item.title}}</h2>
              <p>时间：{{item.time | formatDate}}</p>
              <p>地点：{{item.addr}}</p>
              <p>简介：{{item.intro}}</p>
            </div>
          </router-link>
        </van-cell>
      </van-list>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
import { List, Cell } from 'vant';
import CommonHeader from '../common/Header'
import CommonFooter from '../common/Footer'
import ScrollNav from '../common/ScrollNav'
import axios from 'axios'
import {formatDate} from 'assets/js/date'
export default {
  name: 'InteractionLive',
  components: {
    CommonHeader,
    CommonFooter,
    ScrollNav,
    [List.name]: List,
    [Cell.name]: Cell
  },
  data () {
    return {
      columnTitle: '',
      columnId: '',
      totalPage: 0,
      pageNumber: 0,
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        this.pageNumber++
        axios.get('http://mtest.luan.gov.cn/index.php?c=ListJson&branchid=' + this.$route.params.id).then((res) => {
          res = res.data
          if (res.ret && res.data) {
            const data = res.data
            this.columnTitle = data.columnTitle
            this.columnId = data.columnId
            this.totalPage = Math.ceil(data.list.length / 10)
            this.list = this.list.concat(data.list.slice((this.pageNumber - 1) * 10, this.pageNumber * 10))
            // 加载状态结束
            this.loading = false;
            this.pageNumber++
            // 数据全部加载完成
            if (this.pageNumber >= this.totalPage) {
              this.finished = true;
            }
          }
        })
      }, 1000);
    }
  },
  activated () {
    this.onLoad()
  },
  filters: {
    formatDate(time) {
      let t = JSON.parse(time)
      let date = new Date(t*1000)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
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
  border-bottom 1px solid #ddd
  color #999
  font-size .22rem
  .iconfont
    font-size .28rem
    color #c0c0c0
  a
    color #999
.interaction-wrapper
  .list-item
    overflow: hidden
    display: flex
    padding: .3rem .2rem
    border-bottom 1px dashed #ddd
    .item-img
      width: 2.5rem
      height 1.87rem
      padding-right: .26rem
    .item-info
      flex: 1
      min-width: 0
      color: #666
      .item-title
        margin-bottom .1rem
        line-height: .36rem
        font-size: .26rem
        color #333
      p
        line-height: .36rem
        color #666
        font-size .24rem
        ellipsis()
</style>