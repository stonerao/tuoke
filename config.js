let host = "mall.s.kh888.cn";
let sid = `&sid=1493708646&mime=json&debug_user=169`;
let url= `https://mall.s.kh888.cn`;
let config = {
  host,
  debug_user:'169',
  ischeckin:`1`,//用戶ID
  index_id:`6`,//diyid
  sid:`1493708646`,//sid
  goods_list: `${url}/index.php?m=Shop&c=Item&a=lists${sid}`,//商品列表
  add_cart: `${url}/index.php?m=Shop&c=Item&a=get_sku_list${sid}`,//添加购物车规格
  goods_details: `${url}/index.php?m=Shop&c=Item&a=index${sid}`,//商品详情
  add_cart_sub: `${url}/index.php?m=Shop&c=Item&a=addCart${sid}`,//添加购物车
  buy_sub: `${url}/index.php?m=Shop&c=Item&a=dec_buy&is_api=1${sid}`,//立即购买
  buy_sub1: `${url}/index.php?m=Shop&c=Order&a=buy&is_api=1${sid}`,//立即购买2
  cart_list: `${url}/index.php?m=Shop&c=Item&a=cart${sid}`,//购物车列表
  Order_go: `${url}/index.php?m=Shop&c=Order&a=buy&is_api=1${sid}`,//购物车结算
  Order_delect: `${url}/index.php?m=Shop&c=Item&a=del${sid}`,//删除购物车
  get_adr: `${url}/index.php?m=Shop&c=Item&a=del${sid}`,//收获地址列表
  add_adr: `${url}/index.php?m=Shop&c=Order&a=addAddress${sid}`,//addd=地址列表
  adr_list: `${url}/index.php?m=Shop&c=Order&a=addressList${sid}`,//地址列表
  set_adr: `${url}/index.php?m=Shop&c=Order&a=editAddress${sid}`,//修改
  adr_delect: `${url}/index.php?m=Shop&c=Order&a=delAddress${sid}`,//刪除购物车
  adr:{
    s1: `${url}/index.php?m=Shop&c=Order&a=getProvince${sid}`,//省
    s2: `${url}/index.php?m=Shop&c=Order&a=getCity${sid}`,//市
    s3: `${url}/index.php?m=Shop&c=Order&a=getArea${sid}`,//区
  },
  member: `${url}/index.php?m=Shop&c=User&a=index${sid}`,//个人中心
  sub_oder: `${url}/index.php?m=Shop&c=Order&a=add_order${sid}`,//提交订单
  check_in: `${url}/index.php?m=Shop&c=User&a=checkin${sid}`,//签到
  order_list: `${url}/index.php?m=Shop&c=Order&a=lists${sid}`,//订单列表
  quit_order: `${url}/index.php?m=Shop&c=Order&a=order_status${sid}`,//取消订单
  comment_list: `${url}/index.php?m=Shop&c=Order&a=comment_list${sid}`,//待评价
  order_info: `${url}/index.php?m=Shop&c=Order&a=order_pay${sid}`,//订单详情
  diy:`${url}/index.php?m=Shop&c=Magazine&a=index${sid}`,//diy
  getLogin: `${url}/index.php?m=Shop&c=WeChatShopLogin&a=get_app_conf&mime=json`,//getLogin
  
  
}
module.exports = config
