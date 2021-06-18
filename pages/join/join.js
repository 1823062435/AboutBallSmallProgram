// pages/join/join.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    latitude: 0,
    longitude: 0,
    ide:'',
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

  onLoad: function (options) {
    var a = options.id-1
    var that = this
    that.setData({
        ide:options.id
    },function(){
      console.log(options.id)
    })
   wx.setNavigationBarTitle({ title: this.data.sports[a].sport})  
    const note = wx.cloud.database().collection('notelist');
     console.log(options.id)
     note.where({ 
      roomId:options.id
    }).get({         //获取记录数据，或获取根据查询条件筛选后的记录数据
       success:function(res){
         console.log(res);
         that.setData({    //函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 this.data 的值（同步）
           list:res
         })
       },
       fail(err){
         console.log(err)
       }
     })
  },
  // onShow: function (options) {
  //     var pages = getCurrentPages();
  //     var currpage = pages[pages.length-1];
  //     console.log(currpage._data_.mydata);
  // },
  place: function (e) {
    console.log(e);
      wx.navigateTo({
        url: '../place/place?id='+e.currentTarget.id,
      })
  },
  createe:function(e){
    console.log(this.data.ide);
    wx.navigateTo({
      url: '../creatRoom/creatRoom?id='+this.data.ide,
    })
  }
  
})