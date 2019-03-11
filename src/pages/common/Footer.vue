<template>
  <div>
    <div class="footer-wrapper">
      <p><a href="http://www.luan.gov.cn/">电脑版</a></p>
      <p>六安市人民政府 版权所有   技术支持：<a href="http://www.ishang.net/zh/index.html">商网信息</a></p>
      <p>皖ICP备11015645号-1</p>
    </div>
    <back-top></back-top>
  </div>
</template>

<script>
import BackTop from './backToTop'
export default {
  name: 'Footer',
  components: {
    BackTop
  }
}
</script>

<style lang="stylus" scoped>
.footer-wrapper
  padding .18rem 0 .3rem
  border-top .04rem solid #cc0c0d
  background #f5f5f5;
  p
    line-height .46rem
    text-align center
    font-size .24rem
    color #666
    a
      color #666
</style>