<template>
  <div  class="swiper">
      <swiper
        :indicator-dots="true"
        indicator-color="#ea5149"
        :autoplay="true"
        :circular="true"
      >
        <div v-for="(imgdata, imgindex) in bookList" :key="imgindex">
          <swiper-item>
            <img
              @click="bookDetail(item)"
              mode="aspectFit"
              v-for="item in imgdata"
              :key="item.id"
              class="swiper-img"
              :src="item.image"/>
          </swiper-item>
        </div>
      </swiper>
  </div>
</template>

<script>
export default {
  props: ['books'],
  computed: {
    bookList() {
      let books = this.books
      return [books.slice(0, 3), books.slice(3)]
    }
  },
  methods: {
    bookDetail(item) {
      wx.navigateTo({
        url: '/pages/bookDetail/main?id=' + item.id
      })
    }
  },
  mounted() {
    console.log(this.bookList, 'bookList')
  }
}
</script>

<style lang="scss">
.swiper {
  margin-top: 5px;
  .swiper-img {
    width: 33%;
    height: 250rpx;
  }
}
</style>
