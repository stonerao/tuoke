let host = "mall.s.kh888.cn";
let sid = `&sid=1493708646&mime=json`;
let config = {
  host,
  debug_user:'169',
  ischeckin:`1`,//用戶ID
  index_id:`6`,//diyid
  sid:`1493708646`,//sid
  goods_list: `https://mall.s.kh888.cn/index.php?m=Shop&c=Item&a=lists${sid}`,//商品列表
  add_cart: `https://mall.s.kh888.cn/index.php?m=Shop&c=Item&a=get_sku_list${sid}`,//添加购物车规格
  goods_details: `https://mall.s.kh888.cn/index.php?m=Shop&c=Item&a=index${sid}`,//商品详情
  add_cart_sub: `https://mall.s.kh888.cn/index.php?m=Shop&c=Item&a=addCart${sid}`,//添加购物车
  buy_sub: `https://mall.s.kh888.cn/index.php?m=Shop&c=Item&a=dec_buy&mime=json&sid=1493708646&is_api=1${sid}`,//立即购买
  buy_sub1: `https://mall.s.kh888.cn/index.php?m=Shop&c=Order&a=buy&mime=json&sid=1493708646&is_api=1${sid}`,//立即购买2
  cart_list: `https://mall.s.kh888.cn/index.php?m=Shop&c=Item&a=cart${sid}`,//购物车列表
  Order_go: `https://mall.s.kh888.cn/index.php?m=Shop&c=Order&a=buy&mime=json&sid=1493708646&is_api=1${sid}`,//购物车结算
  Order_delect: `https://mall.s.kh888.cn/index.php?m=Shop&c=Item&a=del${sid}`,//删除购物车
  get_adr: `https://mall.s.kh888.cn/index.php?m=Shop&c=Item&a=del${sid}`,//收获地址列表
  add_adr: `https://mall.s.kh888.cn/index.php?m=Shop&c=Order&a=addAddress&sid=1493708646&mime=json`,//addd=地址列表
  adr_list: `https://mall.s.kh888.cn/index.php?m=Shop&c=Order&a=addressList&sid=1493708646&mime=json`,//地址列表
  set_adr: `https://mall.s.kh888.cn/index.php?m=Shop&c=Order&a=editAddress&sid=1493708646&mime=json`,//修改
  adr_delect: `https://mall.s.kh888.cn/index.php?m=Shop&c=Order&a=delAddress&sid=1493708646&mime=json`,//刪除购物车
  adr:{
    s1:`https://mall.s.kh888.cn/index.php?m=Shop&c=Order&a=getProvince&sid=1493708646&mime=json`,//省
    s2: `https://mall.s.kh888.cn/index.php?m=Shop&c=Order&a=getCity&sid=1493708646&mime=json`,//市
    s3: `https://mall.s.kh888.cn/index.php?m=Shop&c=Order&a=getArea&sid=1493708646&mime=json`,//区
  },
  member:`https://mall.s.kh888.cn/index.php?m=Shop&c=User&a=index&sid=1493708646&mime=json`,//个人中心
  sub_oder:`https://mall.s.kh888.cn/index.php?m=Shop&c=Order&a=add_order&mime=json&sid=1493708646`,//提交订单
  check_in:`https://mall.s.kh888.cn/index.php?m=Shop&c=User&a=checkin&sid=1493708646&mime=json`,//签到
  order_list:`https://mall.s.kh888.cn/index.php?m=Shop&c=Order&a=lists&sid=1493708646&mime=json`,//订单列表
  quit_order:`https://mall.s.kh888.cn/index.php?m=Shop&c=Order&a=order_status&sid=1493708646&mime=json`,//取消订单
  comment_list:`https://mall.s.kh888.cn/index.php?m=Shop&c=Order&a=comment_list&sid=1493708646&mime=json`,//待评价
  order_info:`https://mall.s.kh888.cn/index.php?m=Shop&c=Order&a=order_pay&sid=1493708646&mime=json`,//订单详情
  diy:`https://mall.s.kh888.cn/index.php?m=Shop&c=Magazine&a=index&sid=1493708646&mime=json`,//diy
  
}
module.exports = config
