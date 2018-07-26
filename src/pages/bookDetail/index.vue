<template>
  <div>
    bookid: {{id}}
  </div>
</template>

<script>
import { get } from '@/api'
export default {
  data() {
    return {
      id: ''
    }
  },
  methods: {
    async getDetail() {
      const detail = await get('/weapp/bookdetail', { id: this.id })
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
