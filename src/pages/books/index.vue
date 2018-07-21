<template>
  <div>
    <book-card v-for="item in books" :key="item.id" :book="item"></book-card>
  </div>
</template>

<script>
import { get } from '../../api.js'
import BookCard from '@/components/BookCard.vue'
export default {
  data() {
    return {
      books: []
    }
  },
  components: { BookCard },
  methods: {
    async getList() {
      const books = await get('/weapp/booklist')
      this.books = books.list
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style>
</style>
