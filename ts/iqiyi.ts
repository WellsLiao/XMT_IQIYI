// 引入 MD 库
/// <reference path="md5.ts" />
namespace XMT_IQIYI {
  function getQueryString(name): string {
    try {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURIComponent(r[2]); return "";
    } catch (error) {
      return "";
    }
  }

  interface GetUserInfoParam {
    source: string;
    uid: string;
    game_id: string;
    time: string;
  }
  //请求连接
  let IQIYI_BASE_API: string = "https://api.dsgame.iqiyi.com";
  // url上的数据
  export let QueryData = {
    user_id: getQueryString("user_id") || "user_id",
    agent: getQueryString("agent") || "agent",
    time: getQueryString("time") || "time",
    sign: getQueryString("sign") || "sign",
    is_vip: getQueryString("is_vip") || "is_vip",
    is_tourist: getQueryString("is_tourist") || "is_tourist",
    city: getQueryString("city") || "city",
    province: getQueryString("province") || "province",
    nickname: getQueryString("nickname") || "nickname",
    sex: getQueryString("sex") || "sex",
    icon: getQueryString("icon") || "icon",
  };
  //配置信息 需要CP填写
  export let Config = {
    GameID: "",
    SignKey: "",
    CheckLoginKey: "",
    ADBannerPostID: "",
    ADVideoPostID: "",
  }
  //登录校验
  export function CheckLogin(): Boolean {
    let data = {
      user_id: getQueryString("user_id") || "user_id",
      agent: getQueryString("agent") || "agent",
      time: getQueryString("time") || "time",
      sign: getQueryString("sign") || "sign",
      key: Config.CheckLoginKey,
    }
    let signStr =
      "user_id=" +
      data.user_id +
      "&agent=" +
      data.agent +
      "&time=" +
      data.time +
      "&key=" +
      data.key;
    let sign = hex_md5(signStr).toLowerCase();

    return sign !== data.sign;
  }
  /**
   * 【SDK数据投递】开始游戏页展示
   */
  export function GameLoaded(): void {
    SdkPost({
      type: "dataCount",
      msg: "server"
    });
  }

  /**
   * 加密签名计算
   *
   * @param {any} data - 参与加密的对象
   * @returns {any} newData - 加密后的对象
   */
  function AddSign(data: any): any {
    // 统一增加 sign_key 字段
    let signObj = Object.assign(
      {
        sign_key: Config.SignKey // 正式环境加密 key
      },
      data
    );

    let dataArr = Object.keys(signObj).sort();

    let signStr = "";

    dataArr.map((item, key) => {
      signStr += key === 0 ? "" : "&";
      signStr += item + "=" + signObj[item];
    });
    // console.log("signStr", signStr);
    // 示例 signStr ： game_id=7954&sign_key=b1edae00adbf49a29d85d37b25fae382&source=4&time=1533349826275&uid=2014302436

    // 将加密签名追加回原对象
    let newData = Object.assign(
      {
        sign: hex_md5(signStr)
      },
      data
    );

    return newData;
  }

  /**
   * 获取用户信息的 JSONP
   * 
   * @param {GetUserInfoParam} data
   * @param {number} data.source - 固定值 4
   * @param {number} data.uid - URL 中获取
   * @param {string} data.game_id - 固定值，分配的游戏 ID
   * @param {number} data.time - new 时间戳
   * @returns {Promise} 
   * @example
   * ```javascript
let data = {
  source: 4,
  uid: loginData.user_id || 1,
  game_id: '7954',
  time: new Date().getTime()
}
Api.GetUserInfoJsonp(data).then(res => {
  // 回调
  console.log('GetUserInfo: ', res)
})
   * ```
   */
  function GetUserInfoJsonp(data: GetUserInfoParam): any {
    return new Promise((resolve, reject) => {
      // jsonp callback
      let callbackData = Object.assign(
        {
          callback: "jsonpCallback"
        },
        data
      );

      // 计算签名
      let finalData = AddSign(callbackData);

      // jsonp 的 url 地址
      let url = `${IQIYI_BASE_API}/minigame/userInfo?source=${
        finalData.source
        }&uid=${finalData.uid}&game_id=${finalData.game_id}&time=${
        finalData.time
        }&callback=${finalData.callback}&sign=${finalData.sign}`;

      window["jsonpCallback"] = function (data: any) {
        // 注册全局回调函数
        resolve(data);
      };

      // 创建 script 标签，设置其属性
      let script = document.createElement("script");
      script.setAttribute("src", url);
      // 把 script 标签加入head，此时调用开始
      document.getElementsByTagName("body")[0].appendChild(script);
      script.onload = function () {
        // console.log('jsonp script.onload')
      };
    });
  }

  /**
   * SDK数据投递方法
   *
   * @param {number} data - 投递内容
   * @param {number} type - 投递数据格式，默认 `json`， 可以为 `json` or `jsonStr`
   */
  function SdkPost(data: any, type: string = "json") {
    console.log('SdkPost:', data)
    if (type === "jsonStr") {
      // 广告相关的投递格式为 JSON 字符串
      data = JSON.stringify(data);
    }
    try {
      // window.top.postMessage(data, 'http://togame.pps.tv')
      // window.top.postMessage(data, 'http://togame.iqiyi.com')
      // window.top.postMessage(data, 'http://playgame.pps.tv')
      // window.top.postMessage(data, 'http://playgame.iqiyi.com')
      // window.top.postMessage(data, 'http://playgame2.iqiyi.com')
      window.top.postMessage(data, "*");
    } catch (error) {
      console.log(error);
    }
  }



  /**
   * 【SDK数据投递】新用户上报
   * 在 `GetUserInfoJsonp` 中获取到是新用户才投递
   */
  function GameNewPlayer(): void {
    SdkPost({
      type: "dataCount",
      msg: "role"
    });
  }

  /**
   * 【SDK数据投递】进游戏活跃
   */
  function GameStart(): void {
    SdkPost({
      type: "dataCount",
      msg: "start"
    });
  }

  /**
   * 【SDK数据投递】每局游戏【可选】
   */
  function RoundStart(): void {
    SdkPost({
      type: "dataCount",
      msg: "round_start"
    });
  }

  /**
   * 【SDK数据投递】每局游戏结束【可选】
   */
  function RoundFinish(): void {
    SdkPost({
      type: "dataCount",
      msg: "round_finish"
    });
  }

  /**
   * 【SDK数据投递】游戏复活【可选】
   */
  function RoundRevive(): void {
    SdkPost({
      type: "dataCount",
      msg: "round_revive"
    });
  }

  /**
   * 【SDK接口】分享功能接口
   */
  function Share(): void {
    SdkPost({
      position: "minigame_share",
      data: "show"
    });
  }

  /**
   * 【广告SDK接口】初始化视频广告，需要监听初始化成功后再展示视频
   */
  export function InitVideoAd(): void {
    SdkPost(
      {
        adpos: "initAd",
        posid: Config.ADVideoPostID // 视频广告位 id
      },
      "jsonStr"
    );
  }

  /**
   * 【广告SDK接口】展示视频广告
   */
  export function ShowVideoAd(): void {
    SdkPost(
      {
        adpos: "showRewardVideoAD",
        posid: Config.ADVideoPostID // 视频广告位 id
      },
      "jsonStr"
    );
  }

  /**
   * 【广告SDK接口】展示 Banner 广告
   */
  export function ShowBannerAd(): void {
    SdkPost(
      {
        adpos: "showBannerAd",
        posid: Config.ADBannerPostID // Banner 广告位 id
      },
      "jsonStr"
    );
  }

  /**
   * 【广告SDK接口】展示 Banner 广告
   */
  export function HideBannerAd(): void {
    SdkPost(
      {
        adpos: "dismissBannerAd"
      },
      "jsonStr"
    );
  }


  // 广告加载成功
  function onRewardADLoaded() {
    console.log("Enter onRewardADLoaded");
    // 初始化成功，展示视频广告
    ShowVideoAd();
  }

  // 视频素材缓存成功
  function onRewardVideoCached() {
    console.log("Enter onRewardVideoCached");
  }

  // 激励视频广告页面展示
  function onRewardADShow() {
    console.log("Enter onRewardADShow");
  }

  // 激励视频广告曝光
  function onRewardADExpose() {
    console.log("Enter onRewardADExpose");
  }

  // 【重点】激励视频广告激励发放
  function onRewardADReward() {
    console.log("Enter onRewardADReward");
  }

  // 激励视频广告被点击
  function onRewardADClick() {
    console.log("Enter onRewardADClick");
  }

  // 广告视频素材播放完毕
  function onRewardVideoComplete() {
    console.log("Enter onRewardVideoComplete");
  }

  // 激励视频广告被关闭
  function onRewardADClose() {
    console.log("Enter onRewardADClose");
  }

  // 广告流程出错
  function onRewardADError() {
    console.log("Enter onRewardADError");
  }

  // 激励视频广告已过期
  function onRewardADhasExpired() {
    console.log("Enter onRewardADhasExpired");
  }

  // 此条广告已经展示过
  function onRewardADhasShown() {
    console.log("Enter onRewardADhasShown");
  }

  // 未初始化成功时调用激励视频广告展示
  function onRewardADneedInit() {
    console.log("Enter onRewardADneedInit");
  }

  // 广告加载成功
  function onBannerADReceiv() {
    console.log("Enter onBannerADReceiv");
  }

  // 广告加载失败
  function onNoBannerAD() {
    console.log("Enter onNoBannerAD");
  }

  // 当广告曝光时
  function onBannerADExposure() {
    console.log("Enter onBannerADExposure");
  }

  // 当广告被点击时
  function onBannerADClicked() {
    console.log("Enter onBannerADClicked");
  }

  // 当广告关闭时
  function onBannerADClosed() {
    console.log("Enter onBannerADClosed");
  }

  // 当广告打开浮层时调用
  function onBannerADOpenOverlay() {
    console.log("Enter onBannerADOpenOverlay");
  }

  // 浮层关闭时
  function onBannerADCloseOverlay() {
    console.log("Enter onBannerADCloseOverlay");
  }

  // 由于广告被点击离开 APP 时
  function onBannerADLeftApplication() {
    console.log("Enter onBannerADLeftApplication");
  }

  //所有的事件监听
  export let EventCallbacks = {
    // PART.1
    onRewardADLoaded: onRewardADLoaded,// 广告加载成功
    onRewardVideoCached: onRewardVideoCached,// 视频素材缓存成功
    // PART.2
    onRewardADShow: onRewardADShow,// 激励视频广告页面展示
    onRewardADExpose: onRewardADExpose,// 激励视频广告曝光
    onRewardADReward: onRewardADReward,// 激励视频广告激励发放
    onRewardADClick: onRewardADClick,// 激励视频广告被点击
    onRewardVideoComplete: onRewardVideoComplete,// 广告视频素材播放完毕
    onRewardADClose: onRewardADClose,// 激励视频广告被关闭
    onRewardADError: onRewardADError,// 广告流程出错
    onRewardADhasExpired: onRewardADhasExpired,// 激励视频广告已过期
    onRewardADhasShown: onRewardADhasShown,// 此条广告已经展示过
    onRewardADneedInit: onRewardADneedInit,// 未初始化成功时调用激励视频广告展示
    // PART.3 - BANNER
    onBannerADReceiv: onBannerADReceiv,// 广告加载成功
    onNoBannerAD: onNoBannerAD,// 广告加载失败
    onBannerADExposure: onBannerADExposure,// 当广告曝光时
    onBannerADClicked: onBannerADClicked,// 当广告被点击时
    onBannerADClosed: onBannerADClosed,// 当广告关闭时
    onBannerADOpenOverlay: onBannerADOpenOverlay,// 当广告打开浮层时调用
    onBannerADCloseOverlay: onBannerADCloseOverlay,//  浮层关闭时
    onBannerADLeftApplication: onBannerADLeftApplication // 由于广告被点击离开 APP 时
  };

  window.addEventListener("message", e => {
    try {
      let data = JSON.parse(e.data);
      if (typeof data !== "object") {
        return;
      }
      if (data.back_adpos) {
        // 执行相应的回调
        EventCallbacks[data.back_adpos]();
      }
    } catch (error) {

    }
  });
  export function Init() {
    //获取用户信息
    let data = {
      source: "4",
      uid: QueryData.user_id,
      game_id: Config.GameID,
      time: new Date().getTime() + ""
    };
    console.log("GetUserInfoJsonp data", data)
    GetUserInfoJsonp(data).then(res => {
      // 获取用户信息
      try {
        console.log("GetUserInfoJsonp resp", res)
        if (res.data.new_user != 0) {
          GameNewPlayer();
          console.log("GetUserInfoJsonp Is New Player")
        } else {
          // 如果是新用户，投递新用户上报
          console.log("GetUserInfoJsonp Not New Player")
        }
      } catch (error) {
        console.log("GetUserInfoJsonp error", error)
      }
    });
  }
}
