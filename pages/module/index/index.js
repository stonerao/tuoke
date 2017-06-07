// pages/module/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index_head:true,
    datas:[{},{},{},{}],
    shop1: {
      "id": "20176720233302",
      "type": 4,
      "draggable": true,
      "sort": 1,
      "content": {
        "layout": "2",
        "icon": "btn2",
        "showPrice": true,
        "showIco": true,
        "showName": true,
        "goodslist": [{
          "item_id": "31",
          "link": "http://wfx.dev.kh888.cn/index.php?m=Shop&c=Item&a=index&id=31&sid=8",
          "pic": "/Uploads/Images/2017-03-09/58c0c13fc3d15.png",
          "file_path": "/Uploads/Images/2017-03-09/58c0c13fc3d15.png",
          "price": "20.00",
          "title": "ceshi",
          "create_time": "2017-04-18 17:32:31"
        }, {
          "item_id": "30",
          "link": "http://wfx.dev.kh888.cn/index.php?m=Shop&c=Item&a=index&id=30&sid=8",
          "pic": "/Uploads/Images/2017-03-09/58c0c13f20eee.png",
          "file_path": "/Uploads/Images/2017-03-09/58c0c13f20eee.png",
          "price": "0.02",
          "title": "小测试",
          "create_time": "2017-04-18 16:56:24"
        }, {
          "item_id": "29",
          "link": "http://wfx.dev.kh888.cn/index.php?m=Shop&c=Item&a=index&id=29&sid=8",
          "pic": "/Uploads/Images/2017-03-09/58c0c841baf00.jpg",
          "file_path": "/Uploads/Images/2017-03-09/58c0c841baf00.jpg",
          "price": "0.02",
          "title": "Ptest",
          "create_time": "2017-04-18 13:36:14"
        }, {
          "item_id": "28",
          "link": "http://wfx.dev.kh888.cn/index.php?m=Shop&c=Item&a=index&id=28&sid=8",
          "pic": "/Uploads/Images/2017-01-10/5874aef1caa75.jpg",
          "file_path": "/Uploads/Images/2017-01-10/5874aef1caa75.jpg",
          "price": "0.02",
          "title": "PTtest",
          "create_time": "2017-04-17 10:49:58"
        }, {
          "item_id": "27",
          "link": "http://wfx.dev.kh888.cn/index.php?m=Shop&c=Item&a=index&id=27&sid=8",
          "pic": "/Uploads/Images/2017-01-10/5874aef1caa75.jpg",
          "file_path": "/Uploads/Images/2017-01-10/5874aef1caa75.jpg",
          "price": "0.02",
          "title": "pintuan",
          "create_time": "2017-04-14 14:46:09"
        }],
        "modulePadding": 5
      },
      "dom_conitem": null,
      "dom_ctrl": null,
      "ue": null
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  over_head(){
    console.log(1)
    this.setData({
      index_head:false
    })
  }
})