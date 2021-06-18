// pages/jilu/jilu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    userr:''
  },
  onLoad: function (options) {
    const a = wx.cloud.database().collection('jilu');
    const b = wx.cloud.database().collection('corre');
    var that = this
    wx.setNavigationBarTitle({title:"积分记录"})
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log(res.result.openid)
        a.where({
          _openid: res.result.openid   //查找使用用户
        }).get().then( res => {
           console.log(res)
           that.setData({
             list:res.data.reverse()
           })
        })
        b.where({
          _openid: res.result.openid   //查找使用用户
        }).get().then( res => {
           console.log(res.data[0].core)
           that.setData({
             userr:res.data[0].core
           })
        })
      }
    })
    
  },

 
  onShow: function () {
     
  },

})