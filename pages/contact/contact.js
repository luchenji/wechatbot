// pages/contact/contact.js
const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;
var url = "http://127.0.0.1:5000/message";

/**
 * 初始化数据
 */
function initData(that) {
 inputVal = '';

 msgList = [{
   speaker: 'server',
   contentType: 'text',
   content: 'hello，我是智能超级宝宝'
  },
  {
   speaker: 'customer',
   contentType: 'text',
   content: '你好'
  }
 ]
 that.setData({
  msgList,
  inputVal
 })
}

/**
 * 计算msg总高度
 */
// function calScrollHeight(that, keyHeight) {
//  var query = wx.createSelectorQuery();
//  query.select('.scrollMsg').boundingClientRect(function(rect) {
//  }).exec();
// }

Page({

 /**
  * 页面的初始数据
  */
 data: {
  scrollHeight: '100vh',
  inputBottom: 0
 },

 /**
  * 生命周期函数--监听页面加载
  */
 onLoad: function(options) {
  initData(this);
  this.setData({
   cusHeadIcon: app.globalData.userInfo.avatarUrl,
  });
 },

 /**
  * 生命周期函数--监听页面显示
  */
 onShow: function() {

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

 },

 /**
  * 获取聚焦
  */
 focus: function(e) {
  keyHeight = e.detail.height;
  this.setData({
   scrollHeight: (windowHeight - keyHeight) + 'px'
  });
  this.setData({
   toView: 'msg-' + (msgList.length - 1),
   inputBottom: keyHeight + 'px'
  })
  //计算msg高度
  // calScrollHeight(this, keyHeight);

 },

 //失去聚焦(软键盘消失)
 blur: function(e) {
  this.setData({
   scrollHeight: '100vh',
   inputBottom: 0
  })
  this.setData({
   toView: 'msg-' + (msgList.length - 1)
  })

 },

 /**
  * 发送点击监听
  */
  getData (value){
    return new Promise(function(resolve,reject){
      wx.request({
        url: url,
        data:{'data':value},
        method:'GET',
        success:function(result){
          console.log(result.data)
          resolve(result.data.data)
          // msgList.push({
          //   speaker: 'server',
          //   contentType: 'text',
          //   content: result.data.data
          //  })
           console.log("请求成功")
        },
        fail(){
          msgList.push({
            speaker: 'server',
            contentType: 'text',
            content: '服务忙，请稍后再试'
           })
        }
      })
   })

  },

  sendClick: async function(e) {
    let that = this
  msgList.push({
   speaker: 'customer',
   contentType: 'text',
   content: e.detail.value
  })
  this.setData({
    msgList,
    inputVal
   });
 
  console.log(e.detail.value)
  console.log("开始请求")
  await this.getData(e.detail.value).then(function(res){
    msgList.push({
    speaker: 'server',
    contentType: 'text',
    content: res
    })
    console.log("加载页面")
    that.setData({
      msgList,
      inputVal
     });
  })

  // wx.request({
  //   url: url,
  //   header: {},
  //   data: {'data': e.detail.value},
  //   success:function(result){
  //     console.log(result.data)
  //     return result.data.data
  //     // msgList.push({
  //     //   speaker: 'server',
  //     //   contentType: 'text',
  //     //   content: result.data.data
  //     //  })
  //   },
  //   fail(){
  //     return "服务忙，请稍后再试"
  //     // msgList.push({
  //     //   speaker: 'server',
  //     //   contentType: 'text',
  //     //   content: '服务忙，请稍后再试'
  //     //  })

  //   }
  // })

 },

 /**
  * 退回上一页
  */
 toBackClick: function() {
  wx.navigateBack({})
 }

})