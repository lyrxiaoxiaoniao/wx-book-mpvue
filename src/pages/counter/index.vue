<template>
  <div class="counter-warp">
    <book-card v-for="item in books" :key="item.id" :book="item"></book-card>
    <p class="text-footer" v-if="!more">
      没有更多数据
    </p>
  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import { get } from '@/api.js'
import BookCard from '@/components/BookCard.vue'
export default {
  data() {
    return {
      books: [],
      userInfo: {},
      page: 0,
      more: true
    }
  },
  components: { BookCard },
  mounted() {
    const session = qcloud.Session.get()
    console.log(session, 'session')
    if (session) {
      this.userInfo = session.userinfo
      this.getBookList(true)
    }
    wx.setNavigationBarTitle({
      title: '我的书库'
    })
  },
  methods: {
    async getBookList(init) {
      if (init) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      const books = await get('/weapp/booklist', {
        page: this.page,
        openid: this.userInfo.openId
      })
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
    }
  },
  onPullDownRefresh() {
    this.getBookList(true)
  },
  onReachBottom() {
    if (!this.more) return
    this.page += 1
    this.getBookList()
  }
}
</script>

<style lang="scss" scoped>
</style>
