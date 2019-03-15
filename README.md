# 爱奇艺小游戏对接说明

> 文档版本： 1.0.5
>
> 最后修改时间： 2019.02.20
>
> 编写人员： Wells, Jeremy

## 1. 游戏对接须知

### 1.1. 接入前须知

1. 游戏需要提供 http 的游戏入口地址（https 的会有问题）。
2. 游戏接入前，请联系我方获取 `game_id` 、 `加密签名Key` 、 `登录签名Key` 、 `视频广告位 id` 、 `Banner 广告位 id` 。
3. 游戏需要将上述字段在游戏载入后使用如下方式进行接口的初始化：

```javascript
XMT_IQIYI.Config = {
  GameID: 'xxxx', // game_id
  SignKey: 'xxxx', // 加密签名Key
  CheckLoginKey: '', // 登录签名，【暂不需要】
  ADBannerPostID: 'xxxx', // Banner 广告位 id
  ADVideoPostID: 'xxxx' // 视频广告位 id
};
XMT_IQIYI.Init();
```

## 2. 接口说明

### 2.1. 接口初始化

1. 使用场景

游戏进入后第一时间调用。

2. 接口示例

```javascript
XMT_IQIYI.Config = {
  GameID: 'xxxx', // game_id
  SignKey: 'xxxx', // 加密签名Key
  CheckLoginKey: '', // 登录签名，【暂不需要】
  ADBannerPostID: 'xxxx', // Banner 广告位 id
  ADVideoPostID: 'xxxx' // 视频广告位 id
};
XMT_IQIYI.Init();
```

### 2.2. 获取用户信息接口

1. 使用场景

游戏开始载入后随时可以获得。包含：

- `user_id`
- `agent`
- `time`
- `sign`
- `is_vip`
- `is_tourist`
- `city`
- `province`
- `nickname`
- `sex`
- `icon`

2. 接口示例

```javascript
const userInfo = XMT_IQIYI.QueryData;
```

### 2.3. 唤起分享接口

1. 使用场景

若游戏内带有“分享”功能，当点击分享按钮，通知平台弹出分享弹框。

分享成功/失败回调见 [2.9. 其他监听事件](#29-其他监听事件)

2. 接口示例

```javascript
XMT_IQIYI.Share();
```

### 2.4. 【广告 SDK 接口】展示 Banner 广告

1. 使用场景

（仅在 APP 内可用）

调用此接口时，可以按需传入自定义参数，如多次调用时的内部编号。回调函数中会原样返回。

2. 接口示例

```javascript
XMT_IQIYI.ShowBannerAd();
// or
XMT_IQIYI.ShowBannerAd({
  myKey: 'myValue' // 自定义参数
});
```

### 2.5. 【广告 SDK 接口】隐藏 Banner 广告

1. 使用场景

（仅在 APP 内可用）

调用此接口时，可以按需传入自定义参数，如多次调用时的内部编号。回调函数中会原样返回。

2. 接口示例

```javascript
XMT_IQIYI.HideBannerAd();
// or
XMT_IQIYI.HideBannerAd({
  myKey: 'myValue' // 自定义参数
});
```

### 【已取消】~~2.6. 【广告 SDK 接口】初始化视频广告，需要在初始化成功后的回调中再调用展示视频~~

1. 使用场景

（仅在 APP 内可用）

调用此接口时，可以按需传入自定义参数，如多次调用时的内部编号。回调函数中会原样返回。

2. 接口示例

```javascript
XMT_IQIYI.InitVideoAd();
// or
XMT_IQIYI.InitVideoAd({
  myKey: 'myValue' // 自定义参数
});
```

### 2.6. 【广告 SDK 接口】展示视频广告

1. 使用场景

（仅在 APP 内可用）

需要展示激励广告时直接调用即可，广告观看完成激励可以发放时会调用 2.7. onRewardADLoaded 回调。
调用此接口时，可以按需传入自定义参数，如多次调用时的内部编号。回调函数中会原样返回。

2. 接口示例

```javascript
XMT_IQIYI.ShowVideoAd()
```

### 【接口变更】2.7. 【广告 SDK 接口】激励视频广告激励发放

1. 使用场景

（仅在 APP 内可用）

2. 接口示例

```javascript
XMT_IQIYI.EventCallbacks.onRewardADShow = function() {
  // 激励视频广告激励发放
};
```

### 2.8. 【广告 SDK 接口】【重点】激励视频广告激励发放

1. 使用场景

（仅在 APP 内可用）

2. 接口示例

```javascript
XMT_IQIYI.EventCallbacks.onRewardADReward = function() {
  console.log('Enter onRewardADReward');
};
```

### 2.9. 其他监听事件

（仅在 APP 内可用）

可在接口方法 `EventCallbacks` 中查看所有可用监听事件，事件列表如下：

```javascript
  XMT_IQIYI.EventCallbacks = {
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
    onBannerADLeftApplication: onBannerADLeftApplication, // 由于广告被点击离开 APP 时
    // PART.4 - SHARE
    onShareSuccess: onShareSuccess,//  分享成功时
    onShareFail: onShareFail,//  分享失败时
  };
```

---

## 3.运营数据上报

### 3.1. 【数据投递】开始游戏页展示

1. 使用场景：

首屏（Loading 页）加载成功，执行该投递。
【每次进入游戏只投递一次。】

在浏览器控制台看到 `SdkPost: { msg: "server" }` 的输出即可视为成功。

2. 接口示例

```javascript
XMT_IQIYI.GameLoaded();
```

### 3.2. 【数据投递】进游戏活跃

1. 使用场景：

Loading 完成，“成功进入游戏场景”时，执行该投递。
【每次进入游戏只投递一次。】

在浏览器控制台看到 `SdkPost: { msg: "start" }` 的输出即可视为成功。

2. 接口示例

```javascript
XMT_IQIYI.GameStart();
```
