// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    list:[
      {
        img:'http://m.qpic.cn/psc?/V54NI8dB2ZGydx1FSlhx2fu1De2Ae5jM/TmEUgtj9EK6.7V8ajmQrEC66Bv93sBBdmvkjrn97nv.5hEtZ1x2cpv53NZEd39hx.swtKZuxbvbk3JG4bD9aqKctDfwikf*zVQ2r2w6*Tis!/b&bo=KgEuAQAAAAADJwY!&rf=viewer_4',
        name:'篮球',
        core:'8000',
        id:1
      },
      {
        img:'http://m.qpic.cn/psc?/V54NI8dB2ZGydx1FSlhx2fu1De2Ae5jM/TmEUgtj9EK6.7V8ajmQrEJ1Z2z4QNQKhKj6L1pKpfFLviDbErLfrtIcX12Stb0M9jHbKa1NXDgNzBviyAojOXB5t*ivmB3I6d8dxr6xUEYE!/b&bo=hwFmAQAAAAADJ.M!&rf=viewer_4',
        name:'足球',
        core:'6000',
        id:2
      },
      {
        img:'http://m.qpic.cn/psc?/V54NI8dB2ZGydx1FSlhx2fu1De2Ae5jM/TmEUgtj9EK6.7V8ajmQrEDpoACKfPtCirYPOQb2hEs6yn3LaXfB2nWwfO7vYDu6MgAq0Gk2oSEuiqLYxlYRcVeLl8E*jBKPb*wL8g76UNr4!/b&bo=qAGbAQAAAAADJzE!&rf=viewer_4',
        name:'排球',
        core:'4000',
        id:3
      },
      {
        img:'http://m.qpic.cn/psc?/V54NI8dB2ZGydx1FSlhx2fu1De2Ae5jM/TmEUgtj9EK6.7V8ajmQrEHfdI42PzIjsyQfXWgvXuo9vASqih*kIc.UVme5cCz*Nfo*xwdfEvSC0m9qtfpUMohYaiJGudkSMN2PhQZ6SlAU!/b&bo=owGXAQAAAAADJzY!&rf=viewer_4',
        name:'中医古籍珍本集成',
        core:'4500',
        id:4
      },
      {
        img:'http://m.qpic.cn/psc?/V54NI8dB2ZGydx1FSlhx2fu1De2Ae5jM/TmEUgtj9EK6.7V8ajmQrEL7phWfJ2cFfo.UUmfZp5ELQ2uNz4Bdxh60frgfevp*WL5kJFNbmvpYdV0b.uhzbWW.zmBoodOdc828O9SKFkok!/b&bo=RwF5AQAAAAADFww!&rf=viewer_4',
        name:'盛世针灸疗法',
        core:'4000',
        id:5
      },
    ]
  },
    duihuan:function(){
      wx.setNavigationBarTitle({title:"积分兑换"})
      console.log("点击了"); 
    }
})
