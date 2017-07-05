// pages/module/member/index.js
let util = require('../../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    static: [{
      name: "待付款",
      number: "0",
      url: ""
    }, {
      name: "待发货",
      number: "1",
      url: ""
    }, {
      name: "待收货",
      number: "2",
      url: ""
    }, {
      name: "待评价",
      number: "3",
      url: ""
    }, {
      name: "待换货",
      number: "4",
      url: ""
    }],
    check: [
      { name: "地址管理", img: "../../assets/images/08.png", url: "../shopping_address/index" },
      { name: "购物车", img: "../../assets/images/08.png", url: "../shopping_cart/index" }
    ],
    memberData: {},//会员信息
    orderList: "../order_list/index?active="
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面数据请求
    var _this = this;
    wx.request({
      method: "POST",
      url: util.member,
      data: {
        debug_user: util.debug_user
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
      ,
      success(res) {
        _this.setData({
          memberData: res.data
        })
      }
    });
     
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var a = getCurrentPages()
    console.log(a[0].route)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  member_check() {
    //签到
    var _this = this;
    wx.request({
      method: "POST",
      url: util.check_in,
      data: {
        debug_user: util.debug_user,
        ischeckin: util.ischeckin
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
      ,
      success(res) {
        if (res.data.status == 1) {
          var num = parseInt(res.data.points);
          _this.data.memberData.user_info.user_integral+=num;
          _this.setData({
            memberData:_this.data.memberData
          })
          wx.showToast({
            title: "签到成功",
            duration: 500
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            duration: 500
          })
        }
      }
    })

  }
})