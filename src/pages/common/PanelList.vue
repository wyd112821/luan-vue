<template>
  <div class="panel-wrapper" v-if="lists">
    <div class="title">
      <router-link tag="h2" to="">{{title}}</router-link>
    </div>
    <div class="tab-content">
      <ul>
        <router-link
                tag="li"
                v-for="list of lists"
                :key="list.id"
                :to="'/detail/' + list.columnId + '/' + list.id"
        >
          <i class="dot"></i>{{list.title}}
        </router-link>
      </ul>
      <router-link tag="div" class="more" :to="columnUrl">
        <div class="inner">查看更多</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanelList',
  props: {
    lists: Array,
    title: String,
    columnUrl: String
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'
.panel-wrapper
  margin 1px 0 .46rem
  height 0
  padding-bottom 6rem
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
</style>