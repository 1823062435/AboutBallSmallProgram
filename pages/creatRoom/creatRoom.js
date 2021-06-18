// pages/creatRoom/creatRoom.js
const date = new Date();
const years = [];
const months = [];
const days = [];
const hours = [];
const minutes = [];
//获取年
for (let i = 2021; i <= date.getFullYear() + 5; i++) {
  years.push("" + i);
}
//获取月份
for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  months.push("" + i);
}
//获取日期
for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  days.push("" + i);
}
//获取小时
for (let i = 0; i < 24; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  hours.push("" + i);
}
//获取分钟
for (let i = 0; i < 60; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  minutes.push("" + i);
}
Page({
  data: {
    //房间数据
    roomId:'',
    id: '',
    room: '0',
    num: '',
    place: '',
    time: '',
    tempFilePaths: 'http://m.qpic.cn/psc?/V50BGOrg3vM7KA3Qi63j0Inul91jUz8d/ruAMsa53pVQWN7FLK88i5iCNDQG4HxFfvZJuGSp80M75MkQ6OfNIFN3.MaPSPEPoi4kvNcn7vF5jeLCIx9CmGFzx7x4KHSTsZDpQCUgNbMs!/mnull&bo=kwCTAAAAAAADByI!&rf=photolist&t=5',
    sourceType: ['camera', 'album'],

    multiArray: [years, months, days, hours, minutes],
    multiIndex: [0, 9, 16, 10, 17],
    choose_year: '',
    //位置数据
    name: '',
    address: '', //详细地名
    latitude: '', //维度
    longitude: '', //精度

    //球类
    sports:[
      {
         
         id: 1,
         sport:'羽毛球' 
      },
      {
       
       id: 2,
       sport:'篮球'
      },
      {
       
       id: 3,
       sport:'足球'
      },
      {
       id: 4,
       sport:'棒球'
      },
      {
        id: 5,
        sport:'排球'
      },
      {
        id: 6,
        sport:'毽球'
      },
      {
        id: 7,
        sport:'橄榄球'
      },
      {
        id: 8,
        sport:'网球'
      },
      {
       id: 9,
       sport:'乒乓球'
      },
    ]
  },
  onLoad: function (e) {
    console.log(e)
    var a = e.id-1
    var that = this
    that.setData({
      roomId:e.id,
      room:that.data.sports[a].sport
    })
  },
  //获取时间日期
  bindMultiPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]];
    const month = this.data.multiArray[1][index[1]];
    const day = this.data.multiArray[2][index[2]];
    const hour = this.data.multiArray[3][index[3]];
    const minute = this.data.multiArray[4][index[4]];
    // console.log(`${year}-${month}-${day}-${hour}-${minute}`);
    this.setData({
      time: year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    })
    // console.log(this.data.time);
  },
  //监听picker的滚动事件
  bindMultiPickerColumnChange: function(e) {
    //获取年份
    if (e.detail.column == 0) {
      let choose_year = this.data.multiArray[e.detail.column][e.detail.value];
      console.log(choose_year);
      this.setData({
        choose_year
      })
    }
    //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 1) {
      let num = parseInt(this.data.multiArray[e.detail.column][e.detail.value]);
      let temp = [];
      if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) { //判断31天的月份
        for (let i = 1; i <= 31; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 4 || num == 6 || num == 9 || num == 11) { //判断30天的月份
        for (let i = 1; i <= 30; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 2) { //判断2月份天数
        let year = parseInt(this.data.choose_year);
        console.log(year);
        if (((year % 400 == 0) || (year % 100 != 0)) && (year % 4 == 0)) {
          for (let i = 1; i <= 29; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        } else {
          for (let i = 1; i <= 28; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        }
      }
      console.log(this.data.multiArray[2]);
    }
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },
  buttonclick: function () {
    const that = this
    wx.showActionSheet({
      itemList: ['拍照', '相册'],
      //成功时回调
      success: function (res) {
        console.log(res)
        if (!res.cancel) {
          /*
           res.tapIndex返回用户点击的按钮序号，从上到下的顺序，从0开始
          */
          that.chooseImage(res.tapIndex) //传值
        }
      },
      //失败时回调
      fail: function (res) {
        console.log('调用失败')
      },
      complete: function (res) {},
    })
  },
  chooseImage: function (num) {
    var that = this;
    wx.chooseImage({
      count: 1, //表示只能选一张图片
      sizeType: ['original', 'compressed'],
      sourceType: [that.data.sourceType[num]], //根据传来的num选择使用相机或者本地图
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        wx.cloud.uploadFile({
          cloudPath: 'test/' + Math.floor(Math.random() * 1000000),
          filePath: res.tempFilePaths[0],
          success(res) {
            that.setData({
              tempFilePaths: res.fileID,
            })
            console.log(res);
          },
          fail(res) {
            console.log("失败")
          }
        })
      }
    });
  },
  creatPosition: function () {
    var that = this;
    wx.getSetting({
      success(res) {
        console.log('res是否开启授权', res)
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              wx.chooseLocation({
                success: function (res) {
                  that.setData({
                    name: res.name,
                    address: res.address,
                    latitude: res.latitude,
                    longitude: res.longitude
                  })
                },
              })
            },
            fail() {
              // 用户点击不允许引导重新获取授权
              that.creatPosition()
            }
          })
        } else {
          wx.chooseLocation({
            success: function (res) {
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
  formSubmit: function (e) {
    console.log(e);
    var that = this;
    const poee = wx.cloud.database({
      env: 'abc-0gyid392e322833b'
    }); //以下调用获取当前环境的数据库的引用,不填为默认环境的数据库
    const room = poee.collection('notelist'); //获取集合的引用

    
          // getUserProfile获取房主头像昵称
          wx.getUserProfile({
            desc:'用于完善用户信息',
            success: function (res) {
              room.add({
                data: {
                  roomId:that.data.roomId,
                  num: e.detail.value.num,
                  place: e.detail.value.place,
                  time: e.detail.value.time,
                  tempFilePaths: that.data.tempFilePaths,
                  latitude: that.data.latitude,
                  longitude: that.data.longitude,
                  avatarUrl: res.userInfo.avatarUrl,
                  nickName: res.userInfo.nickName,
                  people:0
                }
              }).then(res =>{
                // wx.navigateTo({
                //   url: '../join/join?id='+that.data.roomId,
                // })
                wx.navigateBack({
                  delta: '1',
                })
                //放回上一个页面并传参
                // var pages = getCurrentPages();
                // var preve = pages[pages.length - 2];
                // preve.setData({
                //   mydataea:that.data.roomId
                // })
              })

            }
          })
      
    
  }
})