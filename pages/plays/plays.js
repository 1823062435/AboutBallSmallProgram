// pages/foodBall/foodBall.js
Page({
  data: {
    id:'',
    sports:[
      {
         img:'http://m.qpic.cn/psc?/V50g3ub82YX3UG26wLR82H7w0V121mu4/45NBuzDIW489QBoVep5mcVwzYcMbTVAj5HPd64GX2YxnMwcbOlo6lRkq9jr*DpAy0E9LK3A1Txj7XXP51EqgfliuPwxCsjbaeqlnGCCCHj4!/b&bo=UQBQAAAAAAADFzM!&rf=viewer_4',
         id: 1,
         sport:'羽毛球' 
      },
      {
       img:'http://m.qpic.cn/psc?/V50g3ub82YX3UG26wLR82H7w0V121mu4/45NBuzDIW489QBoVep5mcVwzYcMbTVAj5HPd64GX2YwJtfscKPwWvw1Haoogq6jJJXm0a7TwYGpc2ltWg8UohSMbFoj2lN8AX7vqV747eVo!/b&bo=UgBRAAAAAAADFzE!&rf=viewer_4',
       id: 2,
       sport:'篮球'
      },
      {
       img:'http://m.qpic.cn/psc?/V50g3ub82YX3UG26wLR82H7w0V121mu4/45NBuzDIW489QBoVep5mcRGCsTlD1PkEC1tvvrmXO4HotiZ5RN*fsnoYhyVsmsyJ.l5SALVHl5.od6ErLbKJIVlIhV*IKQecg2.5Ae0zWUM!/b&bo=UgBSAAAAAAADFzI!&rf=viewer_4',
       id: 3,
       sport:'足球'
      },
      {
       img:'http://m.qpic.cn/psc?/V50g3ub82YX3UG26wLR82H7w0V121mu4/45NBuzDIW489QBoVep5mcdyTuF2b98uOp0zMb9BSP*BdIV1UvuIJRABhGU3Iu8HztmoV004hHGQ0KtKOALm7xezMD9T7eXSXVl1jwz3FWyU!/b&bo=TQBNAAAAAAADFzI!&rf=viewer_4',
       id: 4,
       sport:'棒球'
      },
      {
        img:'http://m.qpic.cn/psc?/V50g3ub82YX3UG26wLR82H7w0V121mu4/45NBuzDIW489QBoVep5mcdyTuF2b98uOp0zMb9BSP*CK3hh.7UMXMCJvM9BrQ5PCoPvjIu0uMpxob5.N3mxL9IplnBQNKgNgdsE.V.r*NVM!/b&bo=cQByAAAAAAADFzE!&rf=viewer_4',
        id: 5,
        sport:'排球'
      },
      {
        img:'http://m.qpic.cn/psc?/V50g3ub82YX3UG26wLR82H7w0V121mu4/45NBuzDIW489QBoVep5mcdyTuF2b98uOp0zMb9BSP*AH3VZXYns2YOwKPwJfCZVU*6LUblabB7di8J2N29*7YlUh17klkFiiJxXVIyHqPXM!/b&bo=UgBQAAAAAAADFzA!&rf=viewer_4',
        id: 6,
        sport:'毽球'
      },
      {
        img:'http://m.qpic.cn/psc?/V50g3ub82YX3UG26wLR82H7w0V121mu4/45NBuzDIW489QBoVep5mce*WQaSeDgMPk*zKmfzuqCXNjBep27Hx*PsAQt0cTccWJKfJhHHfTDJiQiXwGkeM.pmW9JLdCIaJQGviMxEYmnY!/b&bo=SgBMAAAAAAADFzQ!&rf=viewer_4',
        id: 7,
        sport:'橄榄球'
      },
      {
        img:'http://m.qpic.cn/psc?/V50g3ub82YX3UG26wLR82H7w0V121mu4/45NBuzDIW489QBoVep5mce*WQaSeDgMPk*zKmfzuqCWzt5Jcws5.rx1fhPsAUWGzC*bkAOWteSvzxiNJJ8CGr3MXQMh0DyFmL*JDJnZmXUw!/b&bo=TABOAAAAAAADFzA!&rf=viewer_4',
        id: 8,
        sport:'网球'
      },
      {
       img:'http://m.qpic.cn/psc?/V50g3ub82YX3UG26wLR82H7w0V121mu4/45NBuzDIW489QBoVep5mce*WQaSeDgMPk*zKmfzuqCXCKVSFmaXPgvT7ycqERxARqQydiKnsHjVe0oO9nm4x3uXbcQ.0dGc1hYUkSJ3sOT8!/b&bo=UwBOAAAAAAADFy8!&rf=viewer_4',
       id: 9,
       sport:'乒乓球'
      },
    ],
    content: []
  },
  onLoad: function (e) {
    var id = e.id - 1;
    var content = this.data.sports[id];
    this.setData({
      content: content,
      id:e.id
    })
  },
  creatRoom:function(e){
    var id = this.data.id
    console.log(id)
   wx.navigateTo({
     url: '../creatRoom/creatRoom?id='+id,
   })
  },
  joinRoom:function(){
    var id = this.data.id
    wx.navigateTo({
       url:'../join/join?id='+id,
    })
  }
})