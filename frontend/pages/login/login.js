// pages/login/login.js
import rpx2px from '../../utils/rpx2px.js'

const QRCode = require('../../utils/weapp-qrcode.js')
const app = getApp();
const qrCodeWidth = rpx2px(500)
const bindFlag = 'yes'
var qrCode;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasJaccount: false,
    hasBindUrl: false,
    btnBindClicked: false,
    qrCodeWidth: qrCodeWidth,
    qrCodeFailed: false,
    qrCodeLoaded: false,
    debug: true
  },

  bindViewTap: function () {

  },

  getUserInfo: function (e) {
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  bindJaccount: function (e) {
    this.setData({
      btnBindClicked: true
    })
    wx.showLoading({
      title: '加载中',
    })
    console.log(app.globalData.userCode);
    var code = app.globalData.userCode;
    var page = this;
    wx.request({
      url: "http://localhost:8000/get_code", // local debug
      // url: "https://collect.seiee.com/get_code",  // production
      method: "GET",
      header: {
        "content-type": "application/json",
        "host": "collect.seiee.com"
      },
      data: {
        "code": code
      },
      success: function (res) {
        page.setData({
          qrCodeFailed: false
        })
        console.log("[debug] get response: " + res.data);
        if (res.data == bindFlag) {
          // the user has successfully bind his/her Jaccount
          console.log('JAccount is already bind');
          wx.hideLoading();
          wx.redirectTo({
            url: '../index/index',
          })
          return;
        }
        page.setData({
          hasBindUrl: true
        })
        qrCode = new QRCode('loginQrCode', {
          // usingIn: this,
          text: res.data,
          width: qrCodeWidth,
          height: qrCodeWidth,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H,
        });
        wx.hideLoading();
        page.setData({
          qrCodeLoaded: true
        })
      },
      fail: (res => {
        page.setData({
          qrCodeFailed: true
        });
        wx.hideLoading();
        console.log('request failed');
      })
    })
  },

  save: function () {
    wx.showActionSheet({
      itemList: ['保存图片'],
      success: function (res) {
        if (res.tapIndex == 0) {
          qrCode.exportImage(function (path) {
            wx.saveImageToPhotosAlbum({
              filePath: path,
            })
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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