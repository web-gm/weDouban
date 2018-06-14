// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start:0,
    total:0,
    movie_list:[],
    height:null,
    types:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载中',
      mask:'true',
    })
    var that = this;
    
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res.model)
        // console.log(res.pixelRatio)
        // console.log(res.windowWidth)
        // console.log(res.windowHeight)
        // console.log(res.language)
        // console.log(res.version)
        // console.log(res.platform)
        that.setData({height: res.windowHeight})
      }
    }) 
    if(options.type){
      wx.request({
        url: 'https://douban.uieee.com/v2/movie/' + options.type,
        header: {
          "Content-Type": "json"
        },
        success: function (res) {
          that.setData({ movie_list: res.data.subjects, total: res.data.total, types: options.type })
          that.data.start += 20
          wx.hideLoading()
        }
      })
    }
    if(options.tag){
      wx.request({
        url: 'https://douban.uieee.com/v2/movie/search?tag=' + options.tag,
        header: {
          "Content-Type": "json"
        },
        success: function (res) {
          that.setData({ movie_list: res.data.subjects, total: res.data.total, types: options.tag })
          that.data.start += 20
          wx.hideLoading()
        }
      })
    }
   
  },
  lower :function(){
    var that = this;
    
    if (that.data.total > that.data.movie_list.length){
      wx.showLoading({
        title: '正在加载中',
        mask: 'true',
      });
      wx.request({
        url: 'https://douban.uieee.com/v2/movie/search?tag=' + that.data.types + "&start="+that.data.start,
        header: {
          "Content-Type": "json"
        },
        success: function (res) {
          var subjects = that.data.movie_list.concat(res.data.subjects)
          that.setData({ movie_list: subjects,start:that.data.start+20 })
          wx.hideLoading();
        }
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  toDetail: function (event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../movieDetail/movieDetail?id=' + id,
    })
  }
})