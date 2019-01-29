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
    function InitVideoAd(): void;
    function ShowVideoAd(): void;
    function ShowBannerAd(): void;
    function HideBannerAd(): void;
    let EventCallbacks: {
        onRewardADLoaded: () => void;
        onRewardVideoCached: () => void;
        onRewardADShow: () => void;
        onRewardADExpose: () => void;
        onRewardADReward: () => void;
        onRewardADClick: () => void;
        onRewardVideoComplete: () => void;
        onRewardADClose: () => void;
        onRewardADError: () => void;
        onRewardADhasExpired: () => void;
        onRewardADhasShown: () => void;
        onRewardADneedInit: () => void;
        onBannerADReceiv: () => void;
        onNoBannerAD: () => void;
        onBannerADExposure: () => void;
        onBannerADClicked: () => void;
        onBannerADClosed: () => void;
        onBannerADOpenOverlay: () => void;
        onBannerADCloseOverlay: () => void;
        onBannerADLeftApplication: () => void;
    };
    function Init(): void;
}
