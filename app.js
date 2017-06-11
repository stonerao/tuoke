//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  },
  getOpentId() {
    //获取poenid
    var that = this;
    var data ;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function(loginCode) {
          var appid = 'wx636cc18048f2e7c1'; //填写微信小程序appid  
          var secret = '6f7ac4b16b57f43ad366a6deb232b983'; //填写微信小程序secret  
            //调用request请求api转换登录凭证  
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=‘+<code></code>appid+’&secret=‘+secret+’&grant_type=authorization_code&js_code=' + loginCode.code,
            header: {
              'content-type': 'application/json'
            },
            success: function(res) {
              data = res;
            }
          })
        }
      })
    }
    return data
  }
})