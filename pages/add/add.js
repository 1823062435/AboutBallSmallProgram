// pages/add/add.js
var util=require('../../utils/util');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    today:'',
  },
  formSubmit: function (e) {
    const db = wx.cloud.database();//获取数据库的引用，不填就是默认环境。 {  env:'test'}
    const note=db.collection('sportnote');//获取集合的引用
    var date = new Date();
    var today = date.getDate();
    console.log(e);
    if(e.detail.value.content!=null){
      note.add({
        data:{
          content:e.detail.value.content,
          today:today,
          cla:'btn',
          tex:"完成请点击",
          tap:"finish"
        },
        success:function(res){
          //console.log(res);
          wx.navigateBack({
          url: '../plan/plan',
         });
        },
        fail:function(err){
          console.log(err)
          console.log(2);
        }
      })
    }
  }
})