// pages/movieDetail/movieDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    rating: '',
    rating_count: '',
    movie_avtar: '',
    tags: '',
    summary: '',
    info: '',
    movie_people: [],
    movie_img: [],
    comments: [],
    review: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.id)
    wx.showLoading({
      title: '正在加载中',
      mask: 'true',
    })
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/subject/' + options.id,
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res)
        var data = res.data;
        wx.setNavigationBarTitle({
          title: data.title
        })
        var casts = data.casts.map(function (cast) { return cast.name})
        
        var info = data.durations[data.durations.length-1] + ' / '+
                    data.genres.join(' / ')+' / '+
          data.directors[0].name + '（导演） / '+
          casts.join(' / ') + ' / '+
          data.pubdates[data.pubdates.length-1] + '上映';
        var movie_people = data.directors.map(director => {director.type = '导演';return director} ).concat(
          data.casts.map(cast => { cast.type = '演员'; return cast })
        ).concat(
          data.writers.map(writer => { writer.type = '编剧'; return writer })
          )
          console.log(movie_people)
        that.setData({
          id: options.id,
          title: data.title,
          rating: data.rating.average,
          rating_count: data.ratings_count,
          movie_avtar: data.images.small,
          tags: data.tags,
          summary: data.summary,
          info: info,
          movie_people: movie_people,
          movie_img: data.photos,
          comments: data.popular_comments,
          review: data.popular_reviews,
        })
        wx.hideLoading()

      }
    })
  },
  toMovie: function (event) {
    var tag = event.currentTarget.dataset.tag
    wx.navigateTo({
      url: '../movie/movie?tag=' + tag,
    })
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

  }
})