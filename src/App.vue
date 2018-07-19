<script>
export default {
  created() {
    // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style>
.text-footer {
  text-align: center;
  font-size: 12px;
  margin-bottom: 5px;
}
.text-primary {
  color: #ea5149;
}
.btn {
  color: white;
  background: #ea5a49;
  margin-bottom: 10px;
  padding-left: 15px;
  padding-left: 15px;
  border-radius: 2px;
  font-size: 16px;
  line-height: 40px;
  height: 40px;
  width: 100%;
}
.btn:active {
  background: #fa5a49;
}
</style>
