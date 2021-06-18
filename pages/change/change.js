// pages/change/change.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    id: '',
  },
  //修改数据
  formSubmit: function(e) {
    var id=this.data.id;
    const note=wx.cloud.database().collection("sportnote");
    console.log(id);
    note.doc(id).update({
      data:{
        content:e.detail.value.change_content
      },
      success:function(res){
        console.log(res)
        wx.navigateBack({
           url: '../plan/plan',
        })
      }
    })
  },
  onLoad: function(e) {
    const note = wx.cloud.database().collection("sportnote");
    console.log(e);
    var that = this;
    note.doc(e.id).get({
      success:function(res){
        console.log(res)
        that.setData({
        id: res.data._id,
        content: res.data.content,
       })
      }
    })
     
  }

})