<template>
  <div>
    <book-info :book="detail"></book-info>
  </div>
</template>

<script>
import { get } from '@/api'
import BookInfo from '@/components/BookInfo.vue'
export default {
  components: { BookInfo },
  data() {
    return {
      id: '',
      detail: {}
    }
  },
  methods: {
    async getDetail() {
      const detail = await get('/weapp/bookdetail', { id: this.id })
      this.detail = detail
      wx.setNavigationBarTitle({
        title: detail.title
      })
      console.log(detail, 'detail')
    }
  },
  mounted() {
    console.log(this.$root.$mp.query, 'this.$root.$mp.query')
    this.id = this.$root.$mp.query.id
    this.getDetail()
  }
}
</script>

<style>
</style>
