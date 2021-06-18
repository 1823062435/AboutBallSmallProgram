// pages/creatRoom/creatRoom.js
Page({
  data: {
    id:'',
    room:'1000',
    place:'',
    time:'',
    tempFilePaths:'http://m.qpic.cn/psc?/V50BGOrg3vM7KA3Qi63j0Inul91jUz8d/ruAMsa53pVQWN7FLK88i5iCNDQG4HxFfvZJuGSp80M75MkQ6OfNIFN3.MaPSPEPoi4kvNcn7vF5jeLCIx9CmGFzx7x4KHSTsZDpQCUgNbMs!/mnull&bo=kwCTAAAAAAADByI!&rf=photolist&t=5',
    sourceType: ['camera', 'album'],

    name: '',
    address: '',
    latitude: '',
    longitude: ''
  },
  onLoad: function () {
    },
   //头像点击处理事件，使用wx.showActionSheet()调用菜单栏
    
    creatPosition:function(){
      var that=this;
      wx.getSetting({
        success(res) {
          console.log('res是否开启授权', res)
          if (!res.authSetting['scope.userLocation']) { 
            wx.authorize({
              scope: 'scope.userLocation',  
              success() {
                wx.chooseLocation({
                  success:function(res){
                      var name = res.name
                      var address = res.address
                      var latitude = res.latitude
                      var longitude = res.longitude
                      that.setData({
                        name: name,
                        address: address,
                        latitude: latitude,
                        longitude: longitude
                      })
                  },
                })
              },
              fail() {
                // 用户点击不允许引导重新获取授权
                that.fetchAgainLocation()
              }
            })
          } else {
            wx.chooseLocation({
              success:function(res){
                  var name = res.name
                  var address = res.address
                  var latitude = res.latitude
                  var longitude = res.longitude
                  that.setData({
                    name: name,
                    address: address,
                    latitude: latitude,
                    longitude: longitude
                  })
              },
            })
          }
        }
      })
       
    },
})