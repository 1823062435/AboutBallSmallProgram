// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  qiu1:function(){
wx.navigateTo({
  url: '../bollplace/bollplace',
})
  },
  firend:function(e){
   wx.navigateTo({
    url:'../chooseBoll/chooseBoll',
   })
  },
  daka1:function(e){
   wx.navigateTo({
     url: '../logs/logs',
   })
  },
  new1:function(e){
    wx.navigateTo({
      url: '../plan/plan',
    })
  },
  onLoad:function(){
    var that = this
    const corre = wx.cloud.database().collection('corre');
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log(res.result.openid)
        corre.where({
          _openid: res.result.openid   //查找用户是否是第一次使用,否,则创建积分表
        }).get({
          success: function(res) {
            console.log(res.data.length)
            if (res.data.length == 0){  //创建积分表,初始值为0
              corre.add({
                data:{
                  core:0
                }
              })
            }
          }
        })
      }
    })



  }
})
