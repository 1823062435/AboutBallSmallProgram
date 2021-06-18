// pages/my/my.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    core:0,
  },
daka:function(e){
    wx.navigateTo({
       url: '../logs/logs',
     })
  },
  plan:function(e){
    wx.navigateTo({
      url: '../plan/plan',
    })
  },
  duihuan:function(e){
    wx.navigateTo({
      url: '../duihuan/duihuan',
    })
  },
  jifen:function(e){
    wx.navigateTo({
      url: '../jilu/jilu',
    })
  },
  mySet:function(){
    wx.openSetting({})
  },
  onLoad:function(option){
    var that = this
    wx.setNavigationBarTitle({ title: ""})
    const corre = wx.cloud.database({}).collection('corre')
     //打卡积分更新
     wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log(res.result.openid)
        corre.where({
          _openid: res.result.openid   //查找使用用户
        }).get().then( res => {       //修改积分数值渲染
            that.setData({
              core:res.data[0].core    
            })
            console.log(res.data[0].core  )
        })
      }
    })
  },
  onPullDownRefresh: function() {    
    this.onLoad();
  },
})