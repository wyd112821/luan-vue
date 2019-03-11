<template>
  <div class="loading">
    <img src="../../assets/images/loading.gif" width="24" height="24">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
  export default {
    name: 'loading',
    props: {
      title: {
        type: String,
        default: '正在加载...'
      }
    }
  }
</script>

<style lang="stylus" scoped>
.loading
  width 100%
  text-align center
  .desc
    line-height 20px
    font-size .24rem
    color #666
</style>
