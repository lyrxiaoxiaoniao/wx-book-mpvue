import Vue from 'vue'
import Counter from './index'

const app = new Vue(Counter)
app.$mount()

export default {
  config: {
    enablePullDownRefresh: true
  }
}
