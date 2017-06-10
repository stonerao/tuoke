let util = require('../../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    adr: {
      s1: [],
      s2: [],
      s3: []
    },
    index: 1,
    is_alert: false,//弹出框
    adrData: {
      debug_user: "169",
      name: "stone",
      mobile: "18583671750",
      address: "四川省",
      zip: "610000",
      province_id: "110000",
      city_id: "110100",
      area_id: "110101"
    },
    shenId: 0,//省ID
    shenIndex: 0,//省索引
    shiId: 0,//市ID
    shiIndex: 0,//市索引
    allData: {},//所有数据
    data: {
      debug_user: util.debug_user,
      groupbuy_id: '',
      chief_uid: '',
      cid: ``,
      item_id: ``,
      sku_id: ``,
      num: ``,
      total_price: ``,
      current_price: ``,
      payment: ``,
      address_id: `10`,
      postfee: ``,
      message: ``,
      cart_ids: ``,
      code: `0`
    },//提交訂單所有信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log(option)
    var _this = this;
    // 购物车进来
    if (option.class == 1) {
      wx.request({
        method: "POST",
        url: util.Order_go,
        data: {
          debug_user: util.debug_user,
          checkbox: option.arr
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          _this.setData({
            allData: res.data
          })
          _this.data.data.groupbuy_id = res.data.groupbuy_id;
          _this.data.data.chief_uid = res.data.chief_uid;
          _this.data.data.cid = res.data.cid;
          _this.data.data.total_price = res.data.total_price;
          _this.data.data.cart_ids = res.data.cart_ids;
          _this.data.data.payment = res.data.total_price;
          _this.data.data.postfee = res.data.shipping_fee;
          // 商品id skuId
          var [item_id, skuId, num, current_price] = [[], [], [], []]

          for (var key in res.data.cart) {
            item_id.push(res.data.cart[key].goods_id)
            skuId.push(res.data.cart[key].skuId)
            num.push(res.data.cart[key].buy_num)
            current_price.push(res.data.cart[key].price2 ? res.data.cart[key].price2 : res.data.cart[key].price)
          }
          _this.data.data.item_id = item_id;
          _this.data.data.skuId = skuId;
          _this.data.data.num = num;
          _this.data.data.current_price = current_price;

        }
      })
    } else if (option.class ==2) {

      var data = JSON.parse(option.obj)
      //请求数据
      wx.request({
        url: util.buy_sub1, // 立即购买
        data: data,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          _this.setData({
            allData: res.data
          })
          _this.data.data.groupbuy_id = res.data.groupbuy_id;
          _this.data.data.chief_uid = res.data.chief_uid;
          _this.data.data.cid = res.data.cid;
          _this.data.data.total_price = res.data.total_price;
          _this.data.data.cart_ids = res.data.cart_ids;
          _this.data.data.payment = res.data.total_price;
          _this.data.data.postfee = res.data.shipping_fee;
          // 商品id skuId
          var [item_id, skuId, num, current_price] = [[], [], [], []]

          for (var key in res.data.cart) {
            item_id.push(res.data.cart[key].goods_id)
            skuId.push(res.data.cart[key].skuId)
            num.push(res.data.cart[key].buy_num)
            current_price.push(res.data.cart[key].price2 ? res.data.cart[key].price2 : res.data.cart[key].price)
          }
          _this.data.data.item_id = item_id;
          _this.data.data.skuId = skuId;
          _this.data.data.num = num;
          _this.data.data.current_price = current_price;

          console.log(_this.data.data)
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    // console.log(options)
    // var data = options.obj
    // console.log(data)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function (options) {
    console.log(options)
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

  bindPickerChange1(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      shenId: this.data.adr.s1[e.detail.value].province_id,
      shenIndex: e.detail.value
    })
  },
  bindPickerChange2: function (e) {


    this.setData({
      shiId: this.data.adr.s1[e.detail.value].province_id,
      shiIndex: e.detail.value
    })
  },
  bindPickerChange3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  alert_good() {
    this.setData({
      is_alert: !this.data.is_alert
    })
  },
  formSubmit: function (e) {
    // 添加地址
    var _this = this;
    wx.request({
      method: "POST",
      url: util.add_adr, // 
      data: this.adrData,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        if (res.data.data.address_id) {
          _this.setData({
            is_alert: !_this.data.is_alert
          })
        }
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  s1(e) {
    // 获取判断是什么
    var _this = this;
    console.log(e.target)
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
        console.log(_this.data.adr)
      }
    })

  },
  s2(e) {
    // 获取判断是什么
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
        console.log(_this.data.adr.s2)
      }
    })

  },
  s3(e) {
    // 获取判断是什么
    var _this = this;
    console.log(e.target)
    wx.request({
      url: util.adr.s3, // 立即购买
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
        console.log(_this.data.adr)
      }
    })
  },
  subOrder() {
    //  提交订单
    var _this = this;
    wx.request({
      method: "POST",
      url: util.sub_oder + `&did=0`, // 立即购买
      data: this.data.data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.status == 1) {

        } else {
          wx.showToast({
            title: res.data.msg,
            duration: 500
          })
        }
      }
    })
  },
  textInput(e) {
    var value = e.detail.value;
    //留言
    this.data.data.message = value;
  }
})