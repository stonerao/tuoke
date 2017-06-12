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
    addCartData: [],
    dataObj: [],
    addCartData: {}, //购物车规格
    thisArr: [],
    selectIndex: [],
    dataObj: [],
    list: [],
    cartActiveData: {
      img: "",
      name: "",
      price: "",
    }, //点击购物车信息
    shopData: {}, //確認后的商品規格
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
        mime: `json`,
        sid: `1493708646`,
        id: options.goods_id,
        did: ``
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
  activeTap(e) {
    // 状态值 1为详情 2为评价
    var index = e.target.dataset.active;
    this.setData({
      active: index
    })
  },
  cartTap(e) {
    // 点击购物车按钮
    // ajax 
    var _this = this;
    var obj = e.currentTarget.dataset;
    this.setData({
      cartActiveData: {
        img: obj.img,
        name: obj.name,
        price: obj.price,
        goodsId: obj.goods_id
      }
    })
    let goodsId = this.data.goods.goods_id;
    wx.request({
      url: util.add_cart, // 商品列表
      data: {
        goods_id: `${goodsId}`
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // 更新数据 
        _this.setData({
          addCartData: res.data,
          dataObj: res.data.data.list,
          list: res.data.data.list
        })
        console.log(res.data)
      }
    })
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
  select_over() {
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
    console.log(this.data.cartActiveData)
    let _this = this;
    // 列表数据
    wx.request({
      method: "POST",
      url: util.add_cart_sub, // 添加到购物车去
      data: {
        goods_id: this.data.shopData.goods_id ? this.data.shopData.goods_id : this.data.cartActiveData.goodsId,
        id: this.data.shopData.id ? this.data.shopData.id : this.data.cartActiveData.goodsId, //true 商品id
        num: _this.data.cartVal, //true 
        sku_id: `63`, //false，
        t: '1', //false
        debug_user: util.debug_user
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // 关闭加载模态框
        wx.hideLoading();
        // 更新数据 
        if (res.data.status == 0) {
          wx.showToast({
            title: res.data.msg,
            duration: 500
          })
        } else {
          _this.setData({
            slect_alert: false
          })
          wx.showToast({
            title: res.data.msg,
            duration: 500
          })
        }
        _this.setData({

        })

      }
    })

    // let _this = this;
    // // 列表数据
    // wx.request({
    //   method: "POST",
    //   url: util.add_cart_sub, // 添加到购物车去
    //   data: {
    //     goods_id: `33`,
    //     id: `33`,//true 商品id
    //     num: _this.data.cartVal,//true 
    //     sku_id: `63`,//false
    //     t: `1`//false
    //   },
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   success: function (res) {
    //     // 关闭加载模态框
    //     wx.hideLoading();
    //     // 更新数据 
    //     if (res.data.status == 0) {
    //       wx.showToast({
    //         title: res.data.msg,
    //         duration: 500
    //       })
    //     } else {
    //       _this.setData({
    //         slect_alert: false
    //       })
    //       wx.showToast({
    //         title: res.data.msg,
    //         duration: 500
    //       })
    //     }
    //     _this.setData({

    //     })

    //   }
    // })
  },
  go_shop(option) {
    //立即购买
    // ajax请求
    let _this = this;
    // 列表数据
    wx.request({
      method: "POST",
      url: util.buy_sub, // 立即购买
      data: {
        goods_id: `34`,
        id: `34`, //true 商品id
        num: '1', //true 
        sku_id: `63`, //false
        t: `1`, //false，
        debug_user: util.debug_user
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        //立即购买第二步

        var data = res.data.data
        data['debug_user'] = "169";
        console.log(JSON.stringify(data))
        wx.navigateTo({
          url: `../oder_page/index?class=2&obj=${JSON.stringify(data)}`
        })
        // wx.request({
        //   method: "POST",
        //   url: util.buy_sub1, // 立即购买
        //   data: data,
        //   header: {
        //     'content-type': 'applicatiozn/json',
        //   },
        //   success: function (res) {
        //   }
        // })
      }
    })
  },
  selectOption(e) {
    // 选择规格
    var obj = e.currentTarget.dataset; //当前选择当前的数据
    var thisData = this.data.list; //所有数据列表
    var nums = this.data.addCartData.data.tree.length; //选择的数量长度
    var index = parseInt(obj.index);
    this.data.thisArr[index] = obj.id;
    var thisArr = this.data.thisArr;
    this.data.selectIndex[index] = obj.id;
    this.setData({
      selectIndex: this.data.selectIndex
    })
    var arr = this.data.selectIndex; //ID數組
    console.log(thisData, thisArr)
    for (var key in thisData) {
      for (var j in thisArr) {
        if (thisData[key][`s${parseInt(j + 1)}`] == thisArr[j] && thisData[key][`s${parseInt(j + 2)}`] == thisArr[parseInt(j) + 1]) {

          console.log(thisData[key])
          this.data.cartActiveData.price = thisData[key].price;
          thisData[key].sku_img ? this.data.cartActiveData.img = thisData[key].sku_img : '';
          this.data.addCartData.data.stock_num = thisData[key].stock_num;
          this.setData({
            cartActiveData: this.data.cartActiveData,
            addCartData: this.data.addCartData,
            shopData: thisData[key]
          })

        }


      }
    }

  }
})