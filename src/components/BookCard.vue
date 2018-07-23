<template>
  <a :href="detailUrl">
    <div class="book-card">
      <div class="thumb">
        <img :src="book.image" mode="aspectFit" class="image">
      </div>
      <div class="detail">
        <div class="row text-primary">
          <div class="left">{{book.title}}</div>
          <div class="right">{{book.rate}}<rate :value="book.rate"></rate></div>
        </div>
        <div class="row">
          <div class="left">{{book.author}}</div>
          <div class="right">浏览量：</div>
        </div>
        <div class="row">
          <div class="left">{{book.publisher}}</div>
          <div class="right">添加人：{{book.user_info.nickName}}</div>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
import Rate from './Rate'
export default {
  props: ['book'],
  components: { Rate },
  computed: {
    detailUrl() {
      return '/pages/bookDetail/main?id=' + this.book.id
    }
  }
}
</script>

<style lang="scss" scoped>
.book-card {
  padding: 5px;
  overflow: hidden;
  margin: 5px 0;
  display: flex;
  justify-content: flex-start;
  .thumb {
    width: 90px;
    height: 90px;
    .image {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .detail {
    flex: 1;
    padding: 0 5px;
    .row {
      height: 30px;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
