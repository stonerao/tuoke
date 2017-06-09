let host = "wfx.dev.kh888.cn";
let sid = `&sid=1493708646&mime=json`;
let config = {
  host,
  goods_list: `http://wfx.dev.kh888.cn/index.php?m=Shop&c=Item&a=lists${sid}`,//商品列表
  add_cart: `http://wfx.dev.kh888.cn/index.php?m=Shop&c=Item&a=get_sku_list${sid}`,//添加购物车规格
  goods_details: `http://wfx.dev.kh888.cn/index.php?m=Shop&c=Item&a=index${sid}`,//商品详情
  add_cart_sub: `http://wfx.dev.kh888.cn/index.php?m=Shop&c=Item&a=addCart${sid}`,//添加购物车
  buy_sub: `http://wfx.dev.kh888.cn/index.php?m=Shop&c=Item&a=dec_buy&mime=json&sid=1493708646&is_api=1${sid}`,//立即购买
  cart_list: `http://wfx.dev.kh888.cn/index.php?m=Shop&c=Item&a=cart${sid}`,//购物车列表
  Order_go: `http://wfx.dev.kh888.cn/index.php?m=Shop&c=Order&a=buy&mime=json&sid=1493708646&is_api=1${sid}`,//购物车结算
  Order_delect: `http://wfx.dev.kh888.cn/index.php?m=Shop&c=Item&a=del{sid}`,//删除购物车
}
module.exports = config
