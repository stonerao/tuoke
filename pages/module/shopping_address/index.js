// pages/module/shopping_address/index.js
let util = require('../../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adrData: [],
    index: 1,
    is_alert: false,//弹出框
    setAdr: {

    },
    adrDataAjax: {
      debug_user: util.debug_user,
      name: "",
      mobile: "",
      address: "",
      zip: "",
      province_id: "",
      city_id: "",
      area_id: "",
      address_id: ``
    },
    address_id: "",
    is_set: false,
    setAdr: "",
    adr: {
      s1: [],
      s2: [],
      s3: []
    },
    shenIndex: 0,
    setPageInfo: false,//设置是否是选择地址过来
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options['adr'] != '') {
      this.data.setPageInfo = true;
    }
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

    // 加载省地址
    var _this = this;
    wx.request({
      method: "POST",
      url: util.adr.s1, // 立即购买
      data: '',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {

        // get
        _this.data.adr.s1 = res.data.data;
        //updata
        _this.setData({
          adr: _this.data.adr
        })
      }
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
    this.setData({
      index: e.detail.value
    })
  }, bindPickerChange1(e) {
    this.setData({
      shenId: this.data.adr.s1[e.detail.value].province_id,
      shenIndex: e.detail.value
    })
    var _this = this;
    wx.request({
      method: "POST",
      url: util.adr.s2, // 立即购买
      data: {
        province_id: _this.data.shenId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // get
        _this.data.adr.s2 = res.data.data;
        //updata
        _this.setData({
          adr: _this.data.adr
        })
      }
    })
  },
  bindPickerChange2: function (e) {
    this.setData({
      shiId: this.data.adr.s2[e.detail.value].city_id,
      shiIndex: e.detail.value
    })
    // 获取判断是什么
    var _this = this;
    wx.request({
      url: util.adr.s3, // 立即购买
      method: "POST",
      data: {
        city_id: _this.data.shiId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {

        // get
        _this.data.adr.s3 = res.data.data;
        //updata
        _this.setData({
          adr: _this.data.adr
        })
      }
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
        }
      }
    })
  },
  formSubmit(e) {
    var _this = this;
    var obj = e.detail.value;
    for (var key in obj) {
      this.data.adrDataAjax[key] = obj[key]
    }
    this.data.adrDataAjax.address_id = this.data.address_id;
    //如果是点击修改进来提交
    if (this.data.is_set) {
      var adr = this.data.adrDataAjax;
      wx.request({
        url: util.set_adr,
        data: this.data.adrDataAjax,
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        method: 'POST',
        success: function (res) {
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
    } else {
      // 添加地址
      wx.request({
        url: util.add_adr,
        data: this.data.adrDataAjax,
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        method: 'POST',
        success: function (res) {
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
  },
  checkAdr(e) {
    //  判断是否是下单过来
    var id = e.target.dataset.id
    if (this.data.setPageInfo) {
      wx.setStorage({
        key: "address_id",
        data: id
      })
      wx.navigateBack({
        delta: 1
      })
    }
  }
})