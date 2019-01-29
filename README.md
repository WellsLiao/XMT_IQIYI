# 爱奇艺小游戏对接说明

> 文档版本：1.0
>
> 文档时间：2019.01.29
>
> 编写人员：Jeremy@爱菲动漫

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
```

## 2. 接口说明

### 2.1. 接口初始化

1. 使用场景

游戏进入后第一时间调用。

2. 接口示例

```javascript
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

2. 接口示例

```javascript
XMT_IQIYI.Share();
```

### 2.4. 【广告 SDK 接口】展示 Banner 广告

1. 使用场景

2. 接口示例

```javascript
XMT_IQIYI.ShowBannerAd();
```

### 2.4. 【广告 SDK 接口】隐藏 Banner 广告

1. 使用场景

2. 接口示例

```javascript
XMT_IQIYI.HideBannerAd();
```

### 2.5. 【广告 SDK 接口】初始化视频广告，需要在初始化成功后的回调中再调用展示视频

1. 使用场景

2. 接口示例

```javascript
XMT_IQIYI.InitVideoAd();
```

### 2.6. 【广告 SDK 接口】视频广告初始化成功监听回调（需在此处调用展示视频接口，如示例）

1. 使用场景

2. 接口示例

```javascript
XMT_IQIYI.EventCallbacks.onRewardADLoaded = function() {
  XMT_IQIYI.ShowVideoAd();
};
```

### 2.7. 【广告 SDK 接口】【重点】激励视频广告激励发放

1. 使用场景

2. 接口示例

```javascript
XMT_IQIYI.EventCallbacks.onRewardADReward = function() {
  console.log('Enter onRewardADReward');
};
```

### 2.8. 【广告 SDK 接口】其他广告监听事件

可在接口方法 `EventCallbacks` 中查看所有监听事件。

---

## 3.运营数据上报

### 3.1. 【数据投递】开始游戏页展示

1. 使用场景：

首屏（Loading 页）加载成功，执行该投递。
【每次进入游戏只投递一次。】

2. 接口示例

```javascript
XMT_IQIYI.GameLoaded();
```

### 3.2. 【数据投递】进游戏活跃

1. 使用场景：

Loading 完成，“成功进入游戏场景”时，执行该投递。
【每次进入游戏只投递一次。】

2. 接口示例

```javascript
XMT_IQIYI.GameStart();
```
