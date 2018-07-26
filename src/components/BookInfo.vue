<template>
  <div class="bookinfo">
    <div class="bookinfo-header">
      <img class="bookinfo-header-bg" mode="aspectFill" :src="book.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: ['book']
}
</script>

<style lang="scss" scoped>
.bookinfo {
  &-header {
    &-bg{
      width: 100%;
      filter: blur(55);
    }
  }
}
</style>
