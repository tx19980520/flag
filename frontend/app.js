//app.js
App({
  onLaunch: function () {
    wx.login({
      success: res => {
        console.log('[debug] code='+res.code);
          this.globalData.userCode = res.code;
      }
    })
  },
  globalData: {
    userInfo: null,
    userCode: null
  }
})