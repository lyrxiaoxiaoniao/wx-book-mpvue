<template>
  <div>
      <swiper>
        <div v-for="imgdata in bookList" :key="imgdata.id">
          <swiper-item
            :indicator-dots="true"
            indicator-color="#ea5149"
            :autoplay="true"
          >
            <image :src="imgdata.image"/>
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
      console.log(this.books, 'books')
      return [this.books.splice(0, 3), this.books.splice(3, 6)]
    }
  },
  mounted() {
    console.log(this.bookList, 'bookList')
  }
}
</script>

<style>
</style>
