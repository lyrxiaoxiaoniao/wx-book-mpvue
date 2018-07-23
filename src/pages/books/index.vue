<template>
  <div>
    <swipe-card :books="topList"></swipe-card>
    <book-card v-for="item in books" :key="item.id" :book="item"></book-card>
    <p class="text-footer" v-if="!more">
      没有更多数据
    </p>
  </div>
</template>

<script>
import { get } from '../../api.js'
import BookCard from '@/components/BookCard.vue'
import SwipeCard from '@/components/SwipeCard.vue'
export default {
  data() {
    return {
      books: [],
      topList: [],
      page: 0,
      more: true
    }
  },
  components: { BookCard, SwipeCard },
  methods: {
    async getList(init) {
      if (init) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      const books = await get('/weapp/booklist', { page: this.page })
      if (books.list.length < 10 && this.page >= 0) {
        this.more = false
      }
      if (init) {
        this.books = books.list
        wx.stopPullDownRefresh()
      } else {
        this.books = this.books.concat(books.list)
      }
      wx.hideNavigationBarLoading()
    },
    async getTopList () {
      const topList = await get('/weapp/booktop')
      this.topList = topList.list
      console.log(topList, 'topList')
    }
  },
  onPullDownRefresh() {
    this.getList(true)
  },
  onReachBottom() {
    if (!this.more) return
    this.page += 1
    this.getList()
  },
  mounted() {
    this.getList(true)
    this.getTopList()
  }
}
</script>

<style>
</style>
