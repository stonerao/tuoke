// pages/module/goods_list/index.js
let util = require('../../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_style: true, //切换列表样式
    slect_alert: false, //购物车模态框
    cartVal: 1, //购物车选择数量,
    items: [],
    animationData: {},
    alert: {
      slect_alert: false,
      cartVal: 1,
      animationData: {}
    }, //弹框
    listActive: 0, //头部点击
    listSelect: {
      def: 1,
      price: 1, //价格
      nums: 1, //销量
      pop: 1 //人气
    }, //1为选择初始值，2为从高往低，3为低到高
    allData: {
      mime: `json`, //接口请求标识
      from_dis: ``, //1：分销商品
      bid: ``, //品牌id
      cid: ``, //分类id
      title: ``, //搜索关键字
      order: ``, //up:价格从大到小排序，down:价格从小到大排序，sales_volume_up:销量从大到小排序，sales_volume_down:销量从小到大排序，pv_up:人气从大到小排序，pv_down:人气从小到大排序，
      p: 1, //分页
    },
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
  onLoad: function(options) {

    wx.showLoading({
      title: '加载中',
    })
    let _this = this;
    // 列表数据
    wx.request({
      url: util.goods_list, // 
      data: this.data.allData,
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        _this.setData({
          items: res.data.data
        })
        console.log(_this.data.items)
      }
    })

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideLoading();

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // 底部刷新
    let page = parseInt(this.data.allData.p)
    if (isNaN(page)) {
      this.data.allData.p = 1;
    } else {
      this.data.allData.p += 1;
    }

    // 加载数据
    let _this = this;
    // 列表数据
    wx.request({
      url: util.goods_list, // 商品列表
      data: this.data.allData,
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        // 更新数据 
        _this.setData({
            items: [_this.data.items, ...res.data.data]
          })
          // 关闭加载模态框
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  search_btn() {
    // 搜索
    this.dataAjax();
    // 初始状态
    this.setData({
      listActive: 0, //头部点击
      listSelect: {
        def: 1,
        price: 1, //价格
        nums: 1, //销量
        pop: 1 //人气
      }, //1为选择初始值，2为从高往低，3为低到高
    })
  },
  shopping_style(option) {
    // 点击商品样式
    this.setData({
      is_style: !this.data.is_style
    })
  },
  select_over() {
    // 关闭选择模态框
    this.setData({
      slect_alert: false,
      cartVal: 1,
    })
  },
  cartTap(e) {
    // 点击购物车按钮
    // ajax 
    console.log(e.currentTarget.dataset)
    var obj = e.currentTarget.dataset;
    this.setData({
      cartActiveData: {
        img: obj.img,
        name: obj.name,
        price: obj.price,
        goodsId:obj.goods_id
      }
    })
    var _this = this;
    let goodsId = e.target.dataset.goods_id;
    wx.request({
        url: util.add_cart, // 商品列表
        data: {
          goods_id: `${goodsId}`
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          // 更新数据 
          _this.setData({
            addCartData: res.data,
            dataObj: res.data.data.list,
            list: res.data.data.list
          })
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
  select_class(option) {
    //选择种类
    let data = option.target.dataset.items;
    console.log(option)
  },
  headList(e) {
    // 当前点击索引
    this.data.allData.p = 1;
    let index = e.target.dataset.num;
    let sort = e.target.dataset.sort;
    this.setData({
      listActive: index
    });
    // 判断当前点击位置

    switch (index) {
      case '0':
        console.log(1)
        break;;
      case '1':
        //价格 
        let $num = 0;
        if (sort != 2) {
          $num = 2;
          this.data.allData.order = 'up';
          //价格从大到小排序
        } else {
          $num = 3;
          this.data.allData.order = 'down';
        }
        this.setData({
          listSelect: {
            price: $num, //价格
            nums: 1, //销量
            pop: 1 //人气
          }
        })
        break;
      case '2':
        //点击销量
        let nums = 0;
        if (sort != 2) {
          nums = 2;
          this.data.allData.order = 'sales_volume_up';
        } else {
          nums = 3;
          this.data.allData.order = 'sales_volume_down';
        }
        this.setData({
          listSelect: {
            price: 1, //价格
            nums: nums, //销量
            pop: 1 //人气
          }
        })
        break;
      case '3':
        //人气
        let pop = 0;
        if (sort != 2) {
          pop = 2;
          this.data.allData.order = 'pv_up';
        } else {
          pop = 3;
          this.data.allData.order = 'pv_down';
        }
        this.setData({
          listSelect: {
            price: 1, //价格
            nums: 1, //销量
            pop: pop //人气
          }
        })
        break;
      default:
        // 没进入
        ;
    }
    // 重新请求
    this.dataAjax()
  },
  dataAjax(data) {
    //模态框
    wx.showLoading({
      title: '加载中',
    })
    let _this = this;
    // 列表数据
    wx.request({
      url: util.goods_list, // 商品列表
      data: this.data.allData,
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        // 更新数据 
        _this.setData({
            items: res.data.data
          })
          // 关闭加载模态框
        wx.hideLoading();
      }
    })
  },
  searchVal(option) {
    // 搜索框input事件
    this.data.allData.title = option.detail.value
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
        goods_id: this.data.shopData.goods_id?this.data.shopData.goods_id:this.data.cartActiveData.goodsId,
        id: this.data.shopData.id?this.data.shopData.id:this.data.cartActiveData.goodsId, //true 商品id
        num: _this.data.cartVal, //true 
        sku_id: `63`, //false，
        t: '1', //false
        debug_user: util.debug_user
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
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
        num: _this.data.cartVal, //true 
        sku_id: `63`, //false
        t: `1`, //false，
        debug_user: util.debug_user
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
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

    for (var key in thisData) {

      for (var j in thisArr) {

        if (thisData[key][`s${parseInt(j+1)}`] == thisArr[j] && thisData[key][`s${parseInt(j+2)}`] == thisArr[parseInt(j) + 1]) {

          console.log(thisData[key])
          this.data.cartActiveData.price = thisData[key].price;
          thisData[key].sku_img ? this.data.cartActiveData.img = thisData[key].sku_img : '';
          this.data.addCartData.data.stock_num = thisData[key].stock_num;
          this.setData({
            cartActiveData: this.data.cartActiveData,
            addCartData: this.data.addCartData,
            shopData:thisData[key]
          })

        }


      }
    }

  }
})