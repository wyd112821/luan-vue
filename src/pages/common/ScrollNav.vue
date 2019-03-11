<template>
  <div class="sortMenu">
    <ul class="sortMenu-ul" >
      <li class="cell" v-for="(item, index) in columnMenu" :key="index">
        <router-link :to="item.columnUrl">{{item.columnName}}</router-link>
      </li>
      <li class="cell">
        <a href="http://la.ahzwfw.gov.cn/">办事服务</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ScrollNav',
  data () {
    return {
      columnMenu: [
        {
          columnName: '首页',
          columnUrl: '/'
        },
        {
          columnName: '走进六安',
          columnUrl: '/about'
        },
        {
          columnName: '政务资讯',
          columnUrl: '/news'
        },
        {
          columnName: '领导之窗',
          columnUrl: '/leader'
        },
        {
          columnName: '信息公开',
          columnUrl: '/openness'
        },
        {
          columnName: '互动回应',
          columnUrl: '/interact'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.sortMenu
  width 100%
  background-color #cc0c0d
  overflow-x scroll
  -webkit-overflow-x scroll
  &::-webkit-scrollbar
    width 0
    height 0
    background-color: #fff
  .sortMenu-ul
    display flex
    justify-content flex-start
    .cell
      display: inline-block
      font-size .34rem
      padding 0px 1em
      height 0.9rem
      line-height 0.9rem
      text-align center
      position relative
      text-overflow ellipsis
      word-break keep-all
      a
        color #fff
</style>