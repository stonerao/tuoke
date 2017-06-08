// pages/module/goods_details/index.js
let util = require('../../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    goods: {},
    animationData: {},
    cartVal: 1,//购物车选择数量,
    alert: {
      slect_alert: false,
      cartVal: 1,
      animationData: {}
    },//弹框
    slect_alert: false,//购物车模态框
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    console.log(options);
    wx.request({
      url: util.goods_details, // 
      data: {
        mime:`json`,
        sid:`1493708646`,
        id: options.goods_id,
        did:``
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        _this.setData({
          goods: res.data.data.goods,
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
  activeTap(e){
    // 状态值 1为详情 2为评价
    var index = e.target.dataset.active;
    this.setData({
      active:index
    })
  },
  cartTap(e) {

    // 动画
    this.setData({
      animationData: {}
    })
    // 弹出弹框
    this.setData({
      slect_alert: true
    })
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    this.animation = animation

    animation.bottom(0).step()

    this.setData({
      animationData: animation.export()
    })
    animation.step()

  },
  select_over(){
    // 关闭
    this.setData({
      slect_alert: false
    })
  },
  cartValNum(option) {
    //选择数量
    let val = this.data.cartVal;
    let num = option.target.dataset.static;
    if (num == 0) {
      val > 1 ? val-- : '';
    } else {
      val++
    }
    console.log(val)
    this.setData({
      cartVal: val,
    })
  },
  add_carts(option) {
    //添加到购物车列表
    // ajax请求
    wx.showLoading({
      title: '添加中',
    })
    let _this = this;
    // 列表数据
    wx.request({
      method: "POST",
      url: util.add_cart_sub, // 添加到购物车去
      data: {
        goods_id: `33`,
        id: `33`,//true 商品id
        num: _this.data.cartVal,//true 
        sku_id: `63`,//false
        t: `1`//false
      },
      header: {
        'content-type': 'applicatiozn/json',
      },
      success: function (res) {
        // 关闭加载模态框
        wx.hideLoading();
        // 更新数据 
        console.log()
        if (res.data.status == 0) {
          wx.showToast({
            title: res.data.msg,
            duration: 500
          })
        }
        _this.setData({

        })

      }
    })
  },
  go_shop() {
    //立即购买
    // ajax请求
    let _this = this;
    // 列表数据
    wx.request({
      method: "POST",
      url: util.buy_sub, // 立即购买
      data: {
        goods_id: `33`,
        id: `33`,//true 商品id
        num: _this.data.cartVal,//true 
        sku_id: `63`,//false
        t: `1`//false
      },
      header: {
        'content-type': 'applicatiozn/json',
      },
      success: function (res) {

        if (res.data.status == 0) {
          wx.showToast({
            title: res.data.msg,
            duration: 500
          })
        }
        _this.setData({

        })

      }
    })
  }
})