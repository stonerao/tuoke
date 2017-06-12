// pages/module/shopping_address/index.js
let util = require('../../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adrData: [],
    array: ['美国', '中国', '巴西', '日本'],
    index: 1,
    is_alert: false,//弹出框
    setAdr: {

    },
    adrDataAjax: {
      debug_user: util.debug_user,
      name: "stone",
      mobile: "18583671750",
      address: "四川省",
      zip: "610000",
      province_id: "110000",
      city_id: "110100",
      area_id: "110101",
      address_id: ``
    },
    address_id: "",
    is_set: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求地址列表
    var _this = this;
    wx.request({
      url: util.adr_list,
      data: {
        debug_user: util.debug_user
      },
      header: {},
      method: 'get',
      dataType: 'json',
      success: function (res) {
        if (res.data.status != 1) { return }
        _this.setData({
          adrData: res.data.data
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
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
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  alert_good(e) {
    this.setData({
      is_alert: !this.data.is_alert
    });
    //获取地址id  如果是修改地址进来
    if (e.currentTarget.dataset.address_id) {
      this.data.address_id = e.currentTarget.dataset.address_id;
      this.data.is_set = true;
    }
  },
  delect(e) {
    console.log(e)
    var id = e.target.dataset.id
    var _this = this;
    // 点击删除当前地址
    wx.showModal({
      title: '提示',
      content: '确定要删除该地址？',
      success: function (res) {
        if (res.confirm) {
          //确认
          var _this = this;
          wx.request({
            url: util.adr_delect,
            data: {
              debug_user: util.debug_user,
              address_id: id
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: 'POST',
            dataType: 'json',
            success: function (res) {
              if (res.data.status != 1) { return };
              // 提示
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1000,
                success() {
                  wx.reLaunch({
                    url: "index"
                  })
                }
              })
            },
            fail: function (res) { },
          })
        } else if (res.cancel) {
          //取消
          console.log('用户点击取消')
        }
      }
    })
  },
  formSubmit(e) {
    var _this = this;
    var obj = e.detail.value;
    this.data.adrDataAjax.address_id = this.data.address_id;
    //如果是点击修改进来提交
    if (this.data.is_set) {
      wx.request({
        url: util.set_adr,
        data: this.data.adrDataAjax,
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        method: 'POST',
        success: function (res) {
          console.log(res.data);
          // 修改成功
          if (res.data.status == 1) {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 1000,
              success() {
                //关闭模态框
                _this.setData({
                  is_alert: !_this.data.is_alert,
                  is_set: false
                });
              }
            });
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else{
      // 添加地址
      wx.request({
        url: util.add_adr,
        data: this.data.adrDataAjax,
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        method: 'POST',
        success: function (res) {
          console.log(res.data);
          // 修改成功
          if (res.data.status == 1) {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 1000,
              success() {
                //关闭模态框
                _this.setData({
                  is_alert: !_this.data.is_alert,
                  is_set: false
                });
                // 重新加载
                wx.reLaunch({
                  url: "index"
                })
              }
            });
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  }
})