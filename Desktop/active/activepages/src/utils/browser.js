function browser() {
  var browser = {
    versions: (function () {
      var u = navigator.userAgent
      return {
        trident: u.indexOf('Trident') > -1,
        presto: u.indexOf('Presto') > -1,
        webKit: u.indexOf('AppleWebKit') > -1,
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        iPhone: u.indexOf('iPhone') > -1,
        iPad: u.indexOf('iPad') > -1,
        webApp: u.indexOf('Safari') === -1,
        weixin: u.indexOf('MicroMessenger') > -1,
        qq: u.match(/\sQQ/i) === " qq"
      };
    }()),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  };

  if (browser.versions.mobile || browser.versions.android || browser.versions.ios) {
    console.info("移动端");
  // window.location.href = "app/index.html";
  } else {
    // console.info("非移动端");
    window.location.href = "https://wmhcs.usfsoft.com/tuiguang";
  }
}

export default browser
