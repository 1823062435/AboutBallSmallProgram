// pages/place/place.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userr: [],
    list: [],
    id: '',
    avatarUrl: '',
    nickName: '',
    city: '',
    nameF: 'add',
    nameS: 'btn',
    text: '加入',
  },
  onLoad: function (e) {
    const tian = wx.cloud.database().collection('users')
    const di = wx.cloud.database().collection('notelist')
    var that = this;
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log(e.id)
        //让房主无法二次加入房间
        di.where({
          _id: e.id,
          _openid: res.result.openid
        }).get({
          success: function (res) {
            if (res.data.length != 0) {
              that.setData({
                nameF: 'add1',
                nameS: 'btn1',
                text: '已加入'
              })
            }
          }
        })
        //让加入用户无法二次加入房间
        tian.where({
          id: e.id,
          _openid: res.result.openid
        }).get({
          success: function (res) {
            if (res.data.length != 0) {
              that.setData({
                nameF: 'add1',
                nameS: 'btn1',
                text: '已加入'
              })
            }
          }
        })
      }
    })

    //渲染房间用户信息
    tian.where({
      id: e.id
    }).get().then(res => {
      that.setData({
        userr: res,
      })
      console.log(res);
    })
    console.log(e)
    that.setData({
      id: e.id
    })
    //渲染房间信息
    di.doc(e.id).get({
      success: function (res) {
        console.log(res);
        that.setData({
          list: res,
        })
      }
    })
    wx.cloud.callFunction({
      name: 'peoplenums',
      data:{
        name:that.data.id
      },
      complete: res => {
        console.log(res)
      }
    })
    
  },
  dii: function (e) { //通过经纬度打开地图
    var that = this;
    var latitude = that.data.list.data.latitude;
    var longitude = that.data.list.data.longitude;
    wx.openLocation({
      latitude,
      longitude,
      scale: 18
    })
  },
  add: function (e) {    //加入房间
    var that = this;
    console.log(this);
    var time = util.formatTime(new Date());
    const a = wx.cloud.database().collection('users');
    const ab = wx.cloud.database().collection('notelist');
    const corre = wx.cloud.database().collection('corre');
    const jilu = wx.cloud.database().collection('jilu');
    //加入房间用户积分更新
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log(res.result.openid)
        corre.where({
          _openid: res.result.openid   //查找使用用户
        }).get().then( res => {
            console.log(res.data[0].core)
            var ap = res.data[0].core + 5
            console.log(ap)
              corre.doc(res.data[0]._id).update({
                data:{
                  core:res.data[0].core + 2    //加入房间+2分
                }
              })
              console.log(ap)
        })
      }
    })
    jilu.add({
      data:{
        content:"加入房间,积分+2",
        time:time
      }
    })
          wx.getUserProfile({
            desc:'用于完善用户信息',
            success: (res => {
              console.log(res)
              if (res.userInfo.id != that.data.id) {
                console.log(res);
                console.log(res.userInfo.avatarUrl)
                that.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  city: res.userInfo.city,
                  nickName: res.userInfo.nickName,
                })
                a.add({
                  data: {
                    avatarUrl: that.data.avatarUrl,
                    city: that.data.city,
                    nickName: that.data.nickName,
                    id: that.data.id,
                  }
                }).then(res => {
                  a.where({
                    id: that.data.id
                  }).get().then(res => {
                    that.setData({
                      userr: res,
                    })
                    console.log(res);
                  })
                })
              }
            }
            )
          })
      
    
    a.where({
      id: that.data.id
    }).count().then(res => {
      console.log(that.data.id)
      var aaa = res.total + 1
        ab.doc(that.data.id).update({
        data: {
            people:10
        },
        success:function(res){
          console.log(res);
          console.log(123412411);
        }
      })
    })
    // get().then(res => {
    //   var aaa = res.data.length + 1
    //      ab.doc(that.data.id).update({
    //      data: {
    //          people: aaa
    //        }
    //    })
    // }) 
    console.log(that.data.id)
    that.setData({
      nameF: 'add1',
      nameS: 'btn1',
      text: '已加入'
    })
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      duration: 2000
    });
  },
  gochat:function(e){
    var id=this.data.id;
    console.log(id);
    wx.navigateTo({
      url: '../chat/chat?id='+id,
    })
  },
  add1: function (e) {
    var that = this
    const tian1 = wx.cloud.database().collection('users')
    const di1 = wx.cloud.database().collection('notelist')
    wx.showActionSheet({ //设置退出
      itemList: ['退出房间'],
      //成功时回调
      success: function (res) {
        if (!res.cancel) { //判断用户是否选择
          wx.cloud.callFunction({ //寻找对应用户的数据进行删除,删除一行
            name: 'getOpenid',
            complete: res => {
              console.log(that.data.id)
              tian1.where({
                id: that.data.id, //房间id
                _openid: res.result.openid //在房间内的用户自己的id
              }).remove({})
            }
          })

          wx.navigateBack({
            delta: 1,
            success: function (res) {
              wx.showToast({
                title: '房间已成功退出',
                icon: 'success',
                duration: 2000
              });
            }
          })
          //   di1.where({
          //     _id: that.data.id,
          //   }).get().then(res => {
          //     console.log(res.data[0].roomId)
          //     wx.navigateTo({
          //       url: '../join/join?id='+res.data[0].roomId,   //传值进行跳转
          //       success: function(res) {
          //         wx.showToast({
          //           title: '房间已成功退出',
          //           icon: 'success',
          //           duration: 2000
          //         });
          //         wx.navigateBack({
          //           delta: 2
          //         })
          //       }
          //     })
          //  })
        }
      }
    })


  }
})