declare namespace XMT_IQIYI {
    function hex_md5(s: any): string;
}
declare namespace XMT_IQIYI {
    let QueryData: {
        user_id: string;
        agent: string;
        time: string;
        sign: string;
        is_vip: string;
        is_tourist: string;
        city: string;
        province: string;
        nickname: string;
        sex: string;
        icon: string;
    };
    let Config: {
        GameID: string;
        SignKey: string;
        CheckLoginKey: string;
        ADBannerPostID: string;
        ADVideoPostID: string;
    };
    function CheckLogin(): Boolean;
    function GameLoaded(): void;
    function GameStart(): void;
    function Share(): void;
    function InitVideoAd(data?: any): void;
    function ShowVideoAd(data?: any): void;
    function ShowBannerAd(data?: any): void;
    function HideBannerAd(data?: any): void;
    function onRewardADLoaded(): void;
    function onRewardVideoCached(): void;
    function onRewardADShow(): void;
    function onRewardADExpose(): void;
    function onRewardADReward(): void;
    function onRewardADClick(): void;
    function onRewardVideoComplete(): void;
    function onRewardADClose(): void;
    function onRewardADError(): void;
    function onRewardADhasExpired(): void;
    function onRewardADhasShown(): void;
    function onRewardADneedInit(): void;
    function onBannerADReceiv(): void;
    function onNoBannerAD(): void;
    function onBannerADExposure(): void;
    function onBannerADClicked(): void;
    function onBannerADClosed(): void;
    function onBannerADOpenOverlay(): void;
    function onBannerADCloseOverlay(): void;
    function onBannerADLeftApplication(): void;
    let EventCallbacks: {
        onRewardADLoaded: typeof onRewardADLoaded;
        onRewardVideoCached: typeof onRewardVideoCached;
        onRewardADShow: typeof onRewardADShow;
        onRewardADExpose: typeof onRewardADExpose;
        onRewardADReward: typeof onRewardADReward;
        onRewardADClick: typeof onRewardADClick;
        onRewardVideoComplete: typeof onRewardVideoComplete;
        onRewardADClose: typeof onRewardADClose;
        onRewardADError: typeof onRewardADError;
        onRewardADhasExpired: typeof onRewardADhasExpired;
        onRewardADhasShown: typeof onRewardADhasShown;
        onRewardADneedInit: typeof onRewardADneedInit;
        onBannerADReceiv: typeof onBannerADReceiv;
        onNoBannerAD: typeof onNoBannerAD;
        onBannerADExposure: typeof onBannerADExposure;
        onBannerADClicked: typeof onBannerADClicked;
        onBannerADClosed: typeof onBannerADClosed;
        onBannerADOpenOverlay: typeof onBannerADOpenOverlay;
        onBannerADCloseOverlay: typeof onBannerADCloseOverlay;
        onBannerADLeftApplication: typeof onBannerADLeftApplication;
        onShareSuccess: () => void;
        onShareFail: () => void;
    };
    function Init(): void;
}
