<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.fade-enter-active,
.fade-leave-active{
  transition: opacity .5s
}
.fade-enter,
.fade-leave-active{
  opacity: 0
}
.fade-enter-active{
  animation: fadeIn .6s;
}
.fade-leave-active{
  animation: fadeOut .6s;
}
</style>
