//index.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    msgData:[],
    id:'',
    userurl:'',
  },
  changeInputValue(ev){
    this.setData({
      inputVal:ev.detail.value
    })
  },
//删除留言
  // DelMsg:function(event){
  //   const note = wx.cloud.database().collection('chatdata');
  //   var that = this;
  //   note.doc(event.currentTarget.id).remove({
  //     success:function(res){
  //       console.log(res)
  //       note.get({
  //         success:function(res){
  //           console.log(res)
  //           wx.showToast({
  //             title: '成功',
  //             icon: 'success',
  //             duration: 2000
  //           })
  //           that.setData({
  //             msgData: res
  //           })
  //         }
  //       })
  //     }
  //   })
  // },
//添加留言
  addMsg:function(e){
    var list = this.data.msgData;
    var that=this;
    const note=wx.cloud.database().collection("chatdata");
    var time = util.formatTime(new Date());
    console.log(time)
    console.log(that.data.inputVal);
    if (that.data.inputVal!=null) {
      note.add({
        data:{
          time:time,
          content:that.data.inputVal,
          id:that.data.id,
          avaurl:that.data.userurl,
        },
        success:function(res){
          //更新
          console.log(res);
          note.where({ 
            id:that.data.id
          }).get({
            success:function(res){
              console.log(res);
              that.setData({
                msgData: res,
                inputVal:''
              });
            },
            fail(err){
              console.log(err)
              console.log(1)
            }
          })
        },
      })
    }
  },
  onLoad:function(e){
    var that=this;
    const note=wx.cloud.database().collection("chatdata");
    const user=wx.cloud.database().collection("users"); 
    const own=wx.cloud.database().collection("notelist")
     var that = this;
     console.log(e.id)
     wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res =>{
        var oid=res.result.openid
        user.where({
          id:e.id,
          _openid:oid,
        }).get({
          success:function(res){
            if(res.data.length!=0){
              console.log(res);
              console.log(res.data[0].avatarUrl);
              that.setData({    //函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 this.data 的值（同步）
              userurl:res.data[0].avatarUrl,
            })
            }
            else {
              own.where({
                _id:e.id,
                _openid:oid,
              }).get({
                success:function(res){
                  console.log(res);
                  console.log(res.data[0].avatarUrl);
                  that.setData({    //函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 this.data 的值（同步）
                  userurl: res.data[0].avatarUrl,
                  })
                }
              })
            }
          }
        })
      }
    })
     note.where({ 
      id:e.id
    }).get({         //获取记录数据，或获取根据查询条件筛选后的记录数据
       success:function(res){
         console.log(res);
         that.setData({    //函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 this.data 的值（同步）
           msgData:res,
           id:e.id,
         })
       },
       fail(err){
         console.log(err)
       }
     })
  },
  onPullDownRefresh:function(){
    this.onLoad();
  }
})