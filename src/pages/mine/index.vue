<template>
  <div class="container">
    <div class="userinfo">
      <img :src="userinfo.avatarUrl" alt="">
      <p v-if="logged">{{userinfo.nickName}}</p>
      <button v-else open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo" @click="getUserInfo1">点击登录</button>
      <!-- <button v-else open-type="getUserInfo" lang="zh_CN" @click="doLogin">获取用户信息</button> -->
    </div>
    <YearProgress></YearProgress>

    <button v-if='userinfo.openId' @click='scanBook' class='btn'>添加图书</button>
  </div>
</template>

<script>
import { showSuccess, showModel, post } from '@/api.js'
import config from '@/config.js'
import qcloud from 'wafer2-client-sdk'
import YearProgress from '@/components/YearProgress'
export default {
  data() {
    return {
      userinfo: {
        avatarUrl: '../../../static/img/unlogin.png',
        nickName: '点击登录'
      },
      logged: false
    }
  },
  components: { YearProgress },
  created() {
    qcloud.setLoginUrl(config.loginUrl)
    const session = qcloud.Session.get()
    console.log(session, 'session')
    if (session) {
      this.userinfo = session.userinfo
      this.logged = true
    }
  },
  methods: {
    async addBook(isbn) {
      console.log(this.userinfo, 'this.userinfo')
      const res = await post('/weapp/addbook', {
        isbn,
        openid: this.userinfo.openId
      })
      if (res.code === 0 && res.data.title) {
        showSuccess('添加成功', `res.data.title`)
      }
    },
    scanBook() {
      wx.scanCode({
        success: res => {
          console.log(res, '扫码')
          if (res.result) {
            this.addBook(res.result)
          }
        }
      })
    },
    getUserInfo1() {
      console.log('click事件首先触发')
      // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
      // console.log(wx.canIUse('button.open-type.getUserInfo'))
      if (wx.canIUse('button.open-type.getUserInfo')) {
        // 用户版本可用
      } else {
        console.log('请升级微信版本')
      }
    },
    bindGetUserInfo(e) {
      console.log(e.mp.detail, '12312312')
      if (e.mp.detail.rawData) {
        // 用户按了允许授权按钮
        console.log('用户按了允许授权按钮')
        this.doLogin()
      } else {
        // 用户按了拒绝按钮
        console.log('用户按了拒绝按钮')
      }
    },
    doLogin() {
      const session = qcloud.Session.get()
      console.log(session, 'session')
      wx.showLoading({ title: '登录中' })
      const self = this
      if (session) {
        // 第二次登录
        // 或者本地已经有登录态
        // 可使用本函数更新登录态
        qcloud.loginWithCode({
          success: res => {
            console.log(res, 'loginWithCode')
            self.userinfo = res
            self.logged = true
            showSuccess('登录成功')
          },
          fail: err => {
            showModel('登录错误', err.message)
          }
        })
      } else {
        // 首次登录
        qcloud.login({
          success: res => {
            showSuccess('登录成功')
            // console.log(res, 'deadasdasd')
            wx.hideLoading()
            self.userinfo = res
            self.logged = true
          },
          fail: err => {
            showModel('登录错误', err.message)
          }
        })
      }
    }
    // 旧版小程序验证登录，回话功能
    // login() {
    //   let user = wx.getStorageSync('userinfo')
    //   const self = this
    //   if (!user) {
    //     // qcloud.setLoginUrl(config.loginUrl) // app.vue设置过了
    //     qcloud.login({
    //       success: function(userinfo) {
    //         qcloud.request({
    //           url: config.userUrl,
    //           login: true,
    //           success(userRes) {
    //             showSuccess('登录成功')
    //             wx.setStorageSync('userinfo', userRes.data.data)
    //             self.userinfo = userRes.data.data
    //           }
    //         })
    //       },
    //       fail: function(err) {
    //         console.log('登录失败', err)
    //       }
    //     })
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 30rpx;
}
.userinfo {
  margin-top: 100rpx;
  text-align: center;
  img {
    width: 150rpx;
    height: 150rpx;
    margin: 20rpx;
    border-radius: 50%;
  }
  button {
    background-color: #fff;
    color: #000;
  }
  button::after {
    border: none;
  }
}
</style>
