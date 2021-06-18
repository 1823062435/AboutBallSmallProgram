// index.js
// 获取应用实例
// page/index/index.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   arr: [],
   sysW: null,
   lastDay: null,//这个月的最后一天
   firstDay: null,//这个月的第一天
   weekArr: ['日', '一', '二', '三', '四', '五','六'],
   year: null,
   today:null,
   time:0,//打卡次数
   timeselect:'',//当天是否打卡,0为未打卡，1为打卡
   cha:1,//差几天没签到
   core:0,//用户积分
   openid:'',
   runtime:'',
  },
 
  //获取日历相关参数
  dataTime: function () {
   var date = new Date();
   var year = date.getFullYear();
   var month = date.getMonth() ;
   var months = date.getMonth() + 1;
 
   //获取现今年份
   this.data.year = year;
 
   //获取现今月份
   this.data.month = months;
 
   //获取今日日期
   this.data.getDate = date.getDate();
 
   //最后一天是几号
   var d = new Date(year, months, 0);
   this.data.lastDay = d.getDate();
 
   //第一天星期几
   let firstDay = new Date(year, month, 1);
   this.data.firstDay = firstDay.getDay();
  },
  check:function(e){
    console.log(e);
    const note=wx.cloud.database().collection('daynumber');
    const corre = wx.cloud.database().collection('corre');
    const jilu = wx.cloud.database().collection('jilu');
    var time = util.formatTime(new Date());
    var that=this;
    console.log(this.data.runtime);
    jilu.add({
      data:{
        content:"打卡成功,积分+5",
        time:time
      }
    })
    if(this.data.timeselect==0){
      //提示打卡成功
      wx.showModal({
        title: '打卡成功√',
        content: '今天你已经走了'+this.data.runtime+'步'+',积分+5',     
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            console.log('用户点击确定')
          } else {//这里是点击了取消以后
            console.log('用户点击取消')
          }
        }
      })
      //获取数据库
      note.get({
        success:function(res){
          wx.cloud.callFunction({
            name: 'getOpenid',
            complete: res => {
              console.log(res.result.openid);
              // words:数据记录的名称
              // chapter:words中一条记录中的一个字段名
              note.where({
              _openid: res.result.openid// 查询条件：chapter=1
              }).get().then(res=>{
                console.log(res)//打印返回结果
                //之后编写 需要利用返回数据的代码 看个人情况吧
                that.setData({
                  time: res.data[0].time+1
                });
                //更新数据库
                note.doc(res.data[0]._id).update({
                  data:{
                    timeselect: 1,
                    time: that.data.time,
                    today: that.data.today,
                    core: that.data.time*2,
                  },
                  success:function(res){
                    console.log(res);
                    that.setData({
                      timeselect: 1,
                      core: that.data.time*2,
                    });
                  }
                })
                console.log(that.data.time);
            }).catch(err=>{
              console.log(err)//打印错误信息
            });
          }
          })
        },
        fail(err){
          console.log(err)
          console.log(1)
        }
      })
       //打卡积分更新
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
                  core:res.data[0].core + 5    //打卡+5分
                }
              })
              console.log(ap)
        })
      }
    })
    }
   
  },
  onShow: function () {
    const note=wx.cloud.database().collection('daynumber');
    wx.setNavigationBarTitle({title:"打卡"})
    this.authorizeWeRun();
   this.dataTime();
   //根据得到今月的最后一天日期遍历 得到所有日期
   for (var i = 1; i < this.data.lastDay + 1; i++) {
    this.data.arr.push(i);
   }
   var res = wx.getSystemInfoSync();
   this.setData({
    sysW: res.windowHeight / 14,//更具屏幕宽度变化自动设置宽度
    marLet: this.data.firstDay,
    arr: this.data.arr,
    year: this.data.year,
    getDate: this.data.getDate,
    today: this.data.getDate,
    month: this.data.month
   });
   console.log(this.data.today);
   //获取数据库里的数据
   var that=this;
   note.get({
     success:function(res){
      wx.cloud.callFunction({
        name: 'getOpenid',
            complete: res =>{
              note.where({
                _openid: res.result.openid// 查询条件：chapter=1
                }).get().then(res=>{
                  console.log(res);
                  if(res.data.length==0){
                    note.add({
                      data:{
                        time:0,
                        timeselect:0,
                        today:that.data.today,
                        core:0,
                      }
                    })
                  }else{
                    if(that.data.today!=res.data[0].today){
                      //中端打卡提示
                      var cha=that.data.today-res.data[0].today;
                      console.log(cha);
                      if(cha!=1){
                        that.setData({
                           cha:cha
                        })
                        wx.showModal({
                         title: '提示',
                         content: '你已经有'+cha+'天没来了',      
                         success: function (res) {
                           if (res.confirm) {//这里是点击了确定以后
                             console.log('用户点击确定')
                           } else {//这里是点击了取消以后
                             console.log('用户点击取消')
                           }
                         }
                       })
                      }
                      //新的一天，更新timeselect的数据
                     note.doc(res.data[0]._id).update({
                       data:{
                         timeselect: 0,
                       },
                       success:function(res){
                         console.log(res);
                         that.setData({
                           timeselect: 0
                         });
                       }
                     })
                    }
                    console.log(that.data.time);
                  }
                }).catch(err=>{
                  console.log(err)//打印错误信息
                });
            }
      })
       console.log(that.data.today);
       that.setData({
         timeselect: res.data[0].timeselect,
         time: res.data[0].time,
         core: res.data[0].core,
       });
       
     },
     fail(err){
       console.log(err)
       console.log(1)
     }
   })
  },
  /**
   * 用户授权读取微信运动数据
   */
  /**
   * 用户授权读取微信运动数据
   */

  authorizeWeRun(){
    var that = this
//首先获取用户的授权状态
    wx.getSetting({
      success(res){
        // console.log(res)
        if(!res.authSetting['scope.werun']){
// 如果用户还未授权过，需要用户授权读取微信运动数据
          wx.authorize({
            scope: 'scope.werun',
            success() {
              //读取微信步数数据
              that.getWeRunData()
            },
            fail() {
              //如果用户拒绝授权，提示用户需要同意授权才能获取他的微信运动数据
              wx.showModal({
                title: '读取微信运动数据失败',
                content: '请在小程序设置界面（「右上角」 - 「关于」 - 「右上角」 - 「设置」）中允许我们访问微信运动数据',
              })
            }
          })

        }else{
           //如果用户已授权过，直接开始同步微信运动数据
          //读取微信步数数据
          that.getWeRunData()
        }
      }
    })
  },
   /**
   * 获取微信运动数据
   */

  getWeRunData(){
    var that = this
    wx.getWeRunData({
      success(res){
        console.log(res)
      wx.cloud.callFunction({
        name:'getOpenid',
        data:{
         weRunData: wx.cloud.CloudID(res.cloudID)  //直到云函数被替换
        }
      }).then(res=>{
      console.log(res)
        that.setData({
          runtime: res.result.event.weRunData.data.stepInfoList[30].step
        })
      })
      }
    })
  },



 })
