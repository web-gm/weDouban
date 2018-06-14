//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tags:["经典", "冷门佳片", "豆瓣高分", "动作", "喜剧", "爱情", "悬疑", "恐怖", "科幻", "治愈", "文艺", "成长", "动画", "华语", "欧美", "韩国", "日本"],
   in_theaters : [],
   coming_soon:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this      
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/in_theaters?count=8',
      header: {
        "Content-Type": "json"
      },
      success:function(res){
        res.data.subjects.map(subject => {
          subject.rating.averageStar = Math.round(subject.rating.average/2)
        })
        that.setData({in_theaters : res.data.subjects})
      }
    })
     wx.request({
       url: 'https://douban.uieee.com/v2/movie/coming_soon?count=8',
      header: {
        "Content-Type": "json"
      },
      success:function(res){
        res.data.subjects.map(subject =>{
          subject.rating.averageStar = Math.round(subject.rating.average/2)
        })
        that.setData({ coming_soon : res.data.subjects})
      }
    })
     wx.request({
       url: 'https://douban.uieee.com/v2/movie/new_movies?count=8',
       header: {
         "Content-Type": "json"
       },
       success: function (res) {
         res.data.subjects.map(subject => {
           subject.rating.averageStar = Math.round(subject.rating.average/2)
         })
         that.setData({ new_movies: res.data.subjects })
       }
     })
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toDetail: function (event) {
    var id=event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../movieDetail/movieDetail?id=' + id,
    })
  },
  toMovie: function (event) {
    var tag = event.currentTarget.dataset.tag
    wx.navigateTo({
      url: '../movie/movie?tag=' + tag,
    })
  }
})
