//index.js
//获取应用实例
const app = getApp()
import Dialog from '/vant-weapp/dialog/dialog';

Page({
  data: {
    getJWC : false,
    getXSB : false,
    jwcNews : null,
    xsbNews : null,
    active : 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let xm = this
    this.getNews('jwc').then(data => {
      xm.setData({ jwcNews: data, getJWC: true })
    })
    this.getNews('xsb').then(data => {
      xm.setData({ xsbNews: data, getXSB: true })
    })
  },
  //事件处理函数
  tabSwitch(event) {
    let xm = this;
    console.log(event)
    switch (event.detail)
    {
      case 0:
      {
        this.getNews('jwc').then(data =>{
          xm.setData({ jwcNews: data, getJWC: true})
        })
        this.getNews('xsb').then(data => {
          xm.setData({xsbNews: data, getXSB: true})
        })
        break;
      }
      case 1:
      {
          Dialog.alert({
            title: '^_^',
            message: '暂未开通,敬请期待'
          }).then(() => {
            console.log('sss')
            console.log(xm.data.active)
            // xm.setData({ active : 0})
            console.log(xm.data.active)
          });
          break;
      }
      default:{
        console.log('sss')
        // xm.setData({ active: 0 })
        console.log(xm.data.active)
      }
    }
  },
  openUrl: function(event){
    let dataset = event.currentTarget.dataset
    let url = ''
    
    if (dataset.type==='jwc')
    {
      url = `http://jwc.sjtu.edu.cn/web/sjtu/${dataset.url}`
    }
    if (dataset.type === 'xsb')
    {
      url = `http://xsb.seiee.sjtu.edu.cn${dataset.url}`
    }
    wx.navigateTo({
      url: `../navigator/navigator?url=${url}`
    })
  }
  ,
  getNews: function(type)
  {
      return new Promise(function (resolve, reject) {
        var reso = resolve
        var reje = reject
        wx.request({
          url: `https://collect.seiee.com/get_news?type=${type}`,
          method: "get",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: (res) => {
            reso(res.data.news)
          },
          fail: () => {
            reje("fail to get news!")
          }
      })
    })
  }
})
