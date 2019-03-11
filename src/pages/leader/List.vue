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
    <div class="list-wrapper">
      <van-list
              v-model="loading"
              :finished="finished"
              @load="onLoad"
      >
        <van-cell v-for="(item, index) in list" :key="index">
          <router-link
                  tag="div"
                  class="list-item"
                  :to="'/detail/'+ item.columnId + '/' + item.id"
          >
            <div class="title">{{item.title}}</div>
            <div class="other-wrapper">
              <div class="source">{{item.source}}</div>
              <div class="time">{{item.time | formatDate}}</div>
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
    name: 'List',
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
        axios.get('http://mtest.luan.gov.cn/index.php?c=ListJson&branchid=' + this.$route.params.branch + '&id=' + this.$route.params.id).then((res) => {
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
    computed: {
      isSecRount() {
        return (this.columnTitle === '政务活动' || this.columnTitle === '政务视频') ? true : false
      }
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
    color #999
    font-size .22rem
    .iconfont
      font-size .28rem
      color #c0c0c0
    a
      color #999
  .list-wrapper
    padding: 0 .2rem .4rem
    .list-item
      border-top 1px dashed #ddd
      padding: .1rem 0
      .title
        height .6rem
        line-height .6rem
        font-size .28rem
        ellipsis()
      .other-wrapper
        height .44rem
        line-height .38rem
        overflow hidden
        font-size .22rem
        color: #666
        .source
          float: left
        .time
          float right
          color: #999

</style>