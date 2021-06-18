// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const tian11 = cloud.database().collection('users')
  const di11 = cloud.database().collection('notelist')
  console.log(event.name)
  tian11.where({
    id: event.name
  }).count().then(res => {
    console.log(event.name)
    di11.doc(event.name).update({
      data: {
          people:res.total + 1
      },
      success:function(res){
        console.log(res);
        console.log(123412411);
      }
    })
  })
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}