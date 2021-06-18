// index.js
// 获取应用实例
const app = getApp()
var util = require('../../utils/util.js');

Page({
  data: {
    year: null,
    month: null,
    today: null, //为数据库赋值的日期
    today2: null,
    list: [],
    day: null, //今天的日期用于渲染
    core: '',
  },
  dataTime: function () {
    var date = new Date();
    var today = date.getDate();
    var year = date.getFullYear();
    var month = date.getMonth();
    var months = date.getMonth() + 1;

    //获取现今年份
    this.data.year = year;

    //获取现今月份
    this.data.month = months;

    //获取今日日期
    this.data.getDate = date.getDate();
    this.setData({
      year: year,
      month: months,
      today: today,
      day: today,
      today2: today,
    })
  },
  add: function () {
    //wx.navigateTo 保留当前页面，跳转到应用内的某个页面
    wx.navigateTo({
      url: '../add/add',
    })
  },
  tacc:function(){},
  finish:function(e){
    this.finish1(e);
    this.onShow();
  },
  finish1: function (e) {
    const note = wx.cloud.database().collection('sportnote');
    const corre = wx.cloud.database().collection('corre');
    const jilu = wx.cloud.database().collection('jilu');
    var time = util.formatTime(new Date());
    var that = this;
    console.log(e.currentTarget.id)
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log(res.result.openid)
        note.where({
          _openid: res.result.openid, //查找用户的计划记录
          _id: e.currentTarget.id
        }).get().then(res => {
          console.log(res)
          note.doc(res.data[0]._id).update({
            data: {
             cla:'btna',
             tex:"已完成",
             tap:'tacc'
            },
            success(res){
              console.log("他她它他他他他太太太太太太太太太太太")
              that.onShow();
            }
          })
        })
      }
    })
    jilu.add({
      data:{
        content:"完成计划,积分+1",
        time:time
      }
    })
    console.log(e.target.id);
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log(res.result.openid)
        corre.where({
          _openid: res.result.openid //查找使用用户
        }).get().then(res => {
          console.log(res)
          corre.doc(res.data[0]._id).update({
            data: {
              core: res.data[0].core + 1 //完成任务+1分
            }
          })
        })
      }
    })
  },
  onShow: function () {
    this.dataTime();
    const note = wx.cloud.database().collection('sportnote');
    var that = this;
    wx.setNavigationBarTitle({title:"运动计划"})
    console.log(note);
    note.get({
      success: function (res) {
        console.log(res);
        that.setData({
          list: res,
        });
      },
      fail(err) {
        console.log(err)
        console.log(1)
      }
    })
  },
  delect: function (e) {
    const note = wx.cloud.database().collection('sportnote');
    var that = this;
    wx.showActionSheet({
      itemList: ['删除', '修改'],
      //成功时回调
      success: function (res) {
        console.log(e);
        if (res.tapIndex == 0) { //触发删除
          note.doc(e.currentTarget.id).remove({
            success: function (res) {
              note.get({
                success: function (res) {
                  console.log(res);
                  wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 1000
                  })
                  that.setData({
                    list: res
                  })
                }
              })
            }
          })
        } else { //触发修改
          wx.navigateTo({
            url: '../change/change?id=' + e.currentTarget.id,
          })
        }
      },
      //失败时回调
      fail: function (res) {
        console.log('调用失败')
      },
      complete: function (res) {},
    })

  }
})