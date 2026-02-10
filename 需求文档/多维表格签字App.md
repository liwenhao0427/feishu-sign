---
tags:
  - 工作
工作项目:
开始时间: 2026-02-10
结束时间:
产品经理:
---

# 任务说明

参考以下插件，自己实现一个基本一样的效果，最后将签字图片回写到插件中选择的字段对应列

![[Pasted image 20260210133033.png]]


![[Pasted image 20260210132859.png]]



![[Pasted image 20260210133005.png]]





![[Pasted image 20260210133102.png]]

[签字确认](https://www.yygongzi.com/salary/wx/h5/index.html#/pluginsConfirm?userType=0&confirmId=2021094070765641730&field_id=&sort=1&recordId=rec1PX0BmQ)

请求api参考：

```
curl ^"https://www.yygongzi.com/gw/feishuapi/bitable/confirm/env-lang/2021094070765641730?confirm_id=2021094070765641730^" ^
  -H ^"Accept: application/json, text/plain, */*^" ^
  -H ^"Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en-GB;q=0.7,en;q=0.6^" ^
  -H ^"Cache-Control: no-cache^" ^
  -H ^"Connection: keep-alive^" ^
  -b ^"salary_uid=6e107ae0e587460689756a5f45746fbe; session=065062d7b7404b2c8c528d737e6fe2f7; gray-tag=normal^" ^
  -H ^"Pragma: no-cache^" ^
  -H ^"Referer: https://www.yygongzi.com/salary/wx/h5/index.html^" ^
  -H ^"Sec-Fetch-Dest: empty^" ^
  -H ^"Sec-Fetch-Mode: cors^" ^
  -H ^"Sec-Fetch-Site: same-origin^" ^
  -H ^"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0^" ^
  -H ^"X-Requested-With: XMLHttpRequest^" ^
  -H ^"curl: https://www.yygongzi.com/salary/wx/h5/index.html^#/pluginsConfirm?userType=0^&confirmId=2021094070765641730^&field_id=^&sort=1^&recordId=rec1PX0BmQ^" ^
  -H ^"lang: zh^" ^
  -H ^"sec-ch-ua: ^\^"Not(A:Brand^\^";v=^\^"8^\^", ^\^"Chromium^\^";v=^\^"144^\^", ^\^"Microsoft Edge^\^";v=^\^"144^\^"^" ^
  -H ^"sec-ch-ua-mobile: ?0^" ^
  -H ^"sec-ch-ua-platform: ^\^"Windows^\^"^" ^
  -H ^"source: CORPWX^"
```

```

{
    "success": true,
    "code": 0,
    "msg": "处理成功",
    "data": {
        "confirmId": "2021094070765641730",
        "lang": "zh",
        "env": "feishu"
    },
    "ok": true
}
```



```
curl ^"https://www.yygongzi.com/gw/feishuapi/bitable/confirm/2021094070765641730/rec1PX0BmQ?field_id=^&userType=0^&sort=1^" ^
  -H ^"Accept: application/json, text/plain, */*^" ^
  -H ^"Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en-GB;q=0.7,en;q=0.6^" ^
  -H ^"Cache-Control: no-cache^" ^
  -H ^"Connection: keep-alive^" ^
  -b ^"salary_uid=6e107ae0e587460689756a5f45746fbe; session=065062d7b7404b2c8c528d737e6fe2f7; gray-tag=normal^" ^
  -H ^"Pragma: no-cache^" ^
  -H ^"Referer: https://www.yygongzi.com/salary/wx/h5/index.html^" ^
  -H ^"Sec-Fetch-Dest: empty^" ^
  -H ^"Sec-Fetch-Mode: cors^" ^
  -H ^"Sec-Fetch-Site: same-origin^" ^
  -H ^"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0^" ^
  -H ^"X-Requested-With: XMLHttpRequest^" ^
  -H ^"curl: https://www.yygongzi.com/salary/wx/h5/index.html^#/pluginsConfirm?userType=0^&confirmId=2021094070765641730^&field_id=^&sort=1^&recordId=rec1PX0BmQ^" ^
  -H ^"lang: zh^" ^
  -H ^"sec-ch-ua: ^\^"Not(A:Brand^\^";v=^\^"8^\^", ^\^"Chromium^\^";v=^\^"144^\^", ^\^"Microsoft Edge^\^";v=^\^"144^\^"^" ^
  -H ^"sec-ch-ua-mobile: ?0^" ^
  -H ^"sec-ch-ua-platform: ^\^"Windows^\^"^" ^
  -H ^"source: CORPWX^"

```


```

{
    "success": true,
    "code": 0,
    "msg": "处理成功",
    "data": {
        "confirmName": "项目汇总",
        "signUrl": null,
        "signTime": null,
        "fields": [
            {
                "id": "fldDF0AM6q",
                "fieldType": 1,
                "propertyData": null,
                "value": "系统开发外包项目",
                "name": "项目名称"
            },
            {
                "id": "fldD8BFYPW",
                "fieldType": 3,
                "propertyData": null,
                "value": "安盛科技",
                "name": "客户名称"
            },
            {
                "id": "fldi3tVsrm",
                "fieldType": 3,
                "propertyData": null,
                "value": "未开始",
                "name": "项目状态"
            },
            {
                "id": "fldtNKQYB3",
                "fieldType": 11,
                "propertyData": null,
                "value": "",
                "name": "项目负责人"
            },
            {
                "id": "fldNPf3ZUP",
                "fieldType": 3,
                "propertyData": null,
                "value": "华东区",
                "name": "所属区域"
            },
            {
                "id": "fldWr4Pb9Z",
                "fieldType": 2,
                "propertyData": null,
                "value": "10000",
                "name": "项目总金额（元）"
            },
            {
                "id": "fld54KMHQb",
                "fieldType": 5,
                "propertyData": null,
                "value": "2025/12/22",
                "name": "预计回款时间"
            },
            {
                "id": "fld5Oc6sqV",
                "fieldType": 2,
                "propertyData": null,
                "value": "2000",
                "name": "项目已回款金额（元）"
            },
            {
                "id": "fld8cS3dA3",
                "fieldType": 20,
                "propertyData": null,
                "value": "8000",
                "name": "项目剩余应回款（元）"
            },
            {
                "id": "fldyZuzPUJ",
                "fieldType": 2,
                "propertyData": null,
                "value": "5000",
                "name": "项目总成本（元）"
            },
            {
                "id": "fld4JF5Sig",
                "fieldType": 2,
                "propertyData": null,
                "value": "3000",
                "name": "项目已付成本（元）"
            },
            {
                "id": "fldglfDi4f",
                "fieldType": 20,
                "propertyData": null,
                "value": "2000",
                "name": "项目应付成本（元）"
            },
            {
                "id": "fldJEFtVyB",
                "fieldType": 20,
                "propertyData": null,
                "value": "5000",
                "name": "项目利润（元）"
            }
        ],
        "isVerifyIdentity": 0,
        "isNewRecordConfirm": 0,
        "signFlows": [
            {
                "signId": "2021094071705165825",
                "signPeopleName": null,
                "signTime": null,
                "signStatus": 2,
                "signUrl": null,
                "signImageBase64": null,
                "isCurrentNode": true
            }
        ],
        "recordStatus": 0,
        "signType": 0,
        "confirmType": 2,
        "saveFinishedImage": 0,
        "confirmImageFieldId": "",
        "finishedImageUrl": "",
        "userConfigDTO": {
            "openid": "ou_995328b088836a664c4340dd5b9f7f08",
            "tenantId": "2cdea2cc7e4d175d",
            "totalAmount": 30,
            "usedAmount": 1,
            "remainingAmount": 29,
            "giftAmount": null,
            "expiredTime": "2026-12-16 11:19:18",
            "isExpired": false,
            "createTime": null,
            "modifyTime": null,
            "hasMobile": false,
            "corpName": null,
            "userName": null,
            "mobile": null
        }
    },
    "ok": true
}

```



```

<html lang="zh" data-rem="375" data-vxe-ui-theme="light" style="font-size: 20px;"><style id="videoRecorder-eacgphdf">
            ._ext_highlight {
                outline: 3px solid rgba(255, 0, 0, 0.5);
                outline-offset: -3px;
                transition: all 0.1s ease;
                z-index: 2147483647;
            }
            ._ext__floating_popup {
                position: fixed;
                top: 80px;
                right: 30px;
            
                background-color: #333;
                color: #fff;
                text-align: center;
                border-radius: 2px;
                margin: auto;
                height: 30px;
                white-space: nowrap;
                padding: 8px;
                z-index: 2147483647;
            }
            
            ._ext__floating_popup > button {
                margin-left: 5px;
                color: black;
                background-color: white;
                border: 2px solid #e7e7e7;
                cursor: pointer;
            }
        </style><style id="countdown-eacgphdf">
        .countdown-eacgphdf-button {
            background: 0 0;
            border: none;
            box-sizing: border-box;
            color: #ffffff;
            cursor: pointer;
            display: block;
            font-family: 'Open-Sans';
            font-size: 12px;
            height: auto;
            line-height: 1;
            margin: 0 auto;
            padding: 0 12px;
        }
        .countdown-eacgphdf-button:focus {
            background: 0 0;
        }
        .countdown-eacgphdf-button:hover {
            background: 0 0;
        }
        .countdown-eacgphdf {
            background: rgba(59, 59, 59, 0.8);
            border-radius: 4px;
            color: #ffffff;
            left: 50%;
            padding: 14px 14px 10px;
            position: fixed;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 110000;
        }
        .countdown-eacgphdf.capture-delayed {
            left: 50px;
            top: 50px;
            transform: translate(0, 0);
        }
        .countdown-eacgphdf-content {
            height: 120px;
            position: relative;
            width: 120px;
        }
        .countdown-eacgphdf-progress {
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
        }
        .countdown-eacgphdf-progress svg {
            display: block;
            height: 100%;
            width: 100%;
        }
        .countdown-eacgphdf-sep {
            background: #758386;
            height: 1px;
            margin: 7px 0;
        }
        .countdown-eacgphdf-cancel .nsc-button {
            color: #ffffff;
            display: block;
            font-size: 14px;
            padding: 0 3px;
            text-align: center;
            width: 100%;
        }
        </style><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,user-scalable=0,initial-scale=1,maximum-scale=1,minimum-scale=1,viewport-fit=cover"><meta name="apple-mobile-web-app-capable" content="yes"><meta http-equiv="pragma" content="no-store"><meta http-equiv="cache-control" content="no-store"><meta http-equiv="expires" content="-1"><meta name="format-detection" content="telephone=no"><meta name="HandheldFriendly" content="true"><meta name="MobileOptimized" content="320"><meta name="screen-orientation" content="portrait"><meta name="x5-orientation" content="portrait"><meta name="full-screen" content="yes"><meta name="x5-fullscreen" content="true"><meta name="browsermode" content="application"><meta name="x5-page-mode" content="app"><meta name="msapplication-tap-highlight" content="no"><meta http-equiv="Content-Security-Policy" content="default-src data: wss: 'self' 'unsafe-inline' 'unsafe-eval' *.qwps.cn *.kdocs.cn *.wpscdn.cn *.ksyun.com dw-online.ksosoft.com shuc-js.ksord.com *.wps.cn *.yygongzi.com *.qq.com *.dingtalk.com *.alicdn.com *.npsmeter.cn *.ahc.ink *.rumt-zh.com rumt-zh.com *.aihecong.com *.myqcloud.com *.giocdn.com *.bytegoofy.com clarity.ms *.clarity.ms cdn-go.cn *.cdn-go.cn *.growingio.com;img-src data: wss: 'self' 'unsafe-inline' 'unsafe-eval' *;"><title>签字确认</title><script async="" src="https://assets.giocdn.com/2.1/gio.js"></script><script id="salaryAegisConfig" data-type="staffH5" src="https://salary-1307799014.cos.ap-beijing.myqcloud.com/static/js/aegisConfig.js"></script><script type="text/javascript" src="https://cdn-go.cn/aegis/aegis-sdk/latest/aegis.min.js"></script><script src="./static/js/burialPoint.js"></script><script src="./static/js/common.js"></script><script>function getQueryVariable(variable) {
      var query = window.location.hash;
      if (!query) {
        return (false);
      }
      query = query.split("?")[1];
      if (!query) {
        return (false);
      }
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
      }
      return (false);
    }
    // 获取cookie
    function getcookie(key) {
      var str = document.cookie;
      var startIndex = str.indexOf(key);
      var value = "";
      if (startIndex == -1) {
        return value;
      }
      var endIndex = str.indexOf(";", startIndex);
      if (endIndex == -1) {
        value = str.substring(startIndex + key.length + 1)
      } else {
        value = str.substring(startIndex + key.length + 1, endIndex)
      }
      return value;
    }</script><script>;(function(){
      try{
        var appId = getQueryVariable("appId");
        appId = appId?appId:getQueryVariable("appid");
        appId = appId.replace(/#\/$/,'');
        if(appId){
          window.sessionStorage.setItem("appId",appId)
        }
      }catch(e){
        console.log(e)
      }
    })();</script><script>// var consoleTep = console.error;
    // console.error = function () {
    //   return true
    // }
    // var onerrorTep = window.onerror;
    // window.onerror = function () {
    //   return true
    // }</script><script>//同步加载js css
    function onLoadScript(src) {
      for (let i = 0; i < src.length; i++) {
        document.write("\<script  src=" + src[i] + " \/\>\<\/script\>")
      }
    }
    function onLoadLink(hrefs) {
      for (let i = 0; i < hrefs.length; i++) {
        document.write("\<link rel='stylesheet' href='" + hrefs[i] + "' \/\>")
      }
    }</script><script>//发起请求
    function handleRequest(url, params = '') {
      let XHR = new XMLHttpRequest();
      try {
        let currentOrigin = window.location.origin.indexOf('localhost') > 0 ? 'https://dev.yygongzi.com' : window.location.origin;
        let result = {};
        XHR.open('post', currentOrigin + url, false);
        XHR.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        XHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        XHR.setRequestHeader('curl', window.location.href);
        XHR.setRequestHeader('source', getQueryVariable("source") || window.sessionStorage.getItem('source'));
        if (getQueryVariable('xfs_header_session') || sessionStorage.getItem('xfs_header_session')) {
          window.sessionStorage.setItem('xfs_header_session', getQueryVariable('xfs_header_session'))
          XHR.setRequestHeader('xfs_header_session', getQueryVariable('xfs_header_session') || sessionStorage.getItem('xfs_header_session'));
        }
        XHR.onreadystatechange = function () {
          if (XHR.readyState == 4 && XHR.status == 200) {
            result = XHR;
          }
        };
        XHR.send(params);
        return result;
      } catch (error) {
        console.log(error)
        return XHR;
      }
    }</script><script>//域名白名单
    let writeHostName = ['dev.yygongzi.com', 'demo.yygongzi.com', 'uat.yygongzi.com', 'www.yygongzi.com']
    //获取source
    function isSource(source) {
      return getQueryVariable("source") == source.toLocaleLowerCase() || getQueryVariable("source") == source || window.sessionStorage.getItem('source') === source;
    }
    //加载外部js且判断是否需要重定向进行登录
    function loginUrlChoose(loginurl = '') {
      let isWxWorkPc = navigator.userAgent.indexOf('wxwork') > 0 && navigator.userAgent.indexOf('Mobile') < 0 && navigator.userAgent.toLowerCase().indexOf('miniprogram') < 0;
      if (isSource('WPS')) {
        onLoadScript([
          './static/js/dw-web.min.js?v=1',
          './static/js/wps.js?v=1.0'
        ]);
        // if (loginurl) {
        //   var url = getcookie("wpsLogin");
        //   url = decodeURIComponent(url);
        //   location.replace(url);
        //   return false;
        // }
        try {
          dw && dw.setAppKey('55c7e27bb603a2fb');
        } catch (error) {
          
        }
      } else if (isSource('FEISHU')) {
        // if (loginurl) {
        //   let codeData = handleRequest('/feishuapi' + '/feishu/login/mina/code', 'code=' + getQueryVariable('feishuCode') || sessionStorage.getItem('feishuCode'))
        //   let data = JSON.parse(codeData.responseText).data;
        //   sessionStorage.setItem('xfs_header_session', data && data.xfs_header_session ? data.xfs_header_session : '');
        //   location.reload();
        //   return false;
        // }
        onLoadScript(['https://lf1-cdn-tos.bytegoofy.com/goofy/lark/op/h5-js-sdk-1.5.23.js']);
      } else if (isSource('DINGTALK')) {
        // dingtalkPoint(window, document, "https://g.alicdn.com/woodpeckerx/jssdk??wpkReporter.js", "__wpk");
        onLoadScript([
          'https://auth.dingtalk.com/opendata-1.1.0.js',
          './static/js/dingtalk.js?v=3.0',
          'https://g.alicdn.com/dingding/dingtalk-jsapi/3.0.45/dingtalk.open.js'
        ]);
        function loadDingtalkMonitor() {
          document.write('<meta name="wpk-bid" content="dta_2_81280">');
          onLoadScript(["./static/js/dingtalkMonitor.js"]);
        }
        function loadDingtalkFreeMonitor() {
          document.write('<meta name="wpk-bid" content="dta_2_118614">');
          onLoadScript(["./static/js/dingtalkFreeMonitor.js"]);
        }
        try {
          var free = window.sessionStorage.getItem("PAYROLLPAYVERSION");
          if (!free) {
            free = getQueryVariable("version");
          }
          if (free === "free") {
            window.sessionStorage.setItem("PAYROLLPAYVERSION", free);
            loadDingtalkFreeMonitor();
          } else {
            loadDingtalkMonitor();
          }
        } catch (e) {
          console.log(e)
        }
        // if (loginurl) {
        //   var corpId = window.sessionStorage.getItem("corpId");
        //   dd.ready(function () {
        //     dd.runtime.permission.requestAuthCode({
        //       corpId: corpId, // 企业id
        //       onSuccess: function (info) {
        //         var code = info.code // 通过该免登授权码可以获取用户身份
        //         handleRequest('/salarydingtalkapi/dingtalk/loginFree', 'code=' + code + '&corpId=' + corpId).then((res) => {
        //           res = res.data;
        //           if (res.success) {
        //             location.reload();
        //           }
        //         });
        //       }
        //     });
        //   });
        //   return false;
        // }
      } else if (isSource('CORPWX') || isSource('WECOM')) {
        // if (loginurl) {
        //   location.replace(loginurl);
        //   return false;
        // }
        var str = "";
        if (isWxWorkPc) {
          str = "https://res.wx.qq.com/open/js/jweixin-1.2.0.js?t=" + Date.now();
          onLoadScript([str, 'https://open.work.weixin.qq.com/wwopen/js/jwxwork-1.0.0.js']);
        } else {
          str = "https://res.wx.qq.com/open/js/jweixin-1.6.0.js?t=" + Date.now();
          onLoadScript([str, 'https://open.work.weixin.qq.com/wwopen/js/jwxwork-1.0.0.js']);
        }
      } else if (isSource('YOUROOM')) {
        onLoadScript(['./static/js/youroom.js']);
        // if (loginurl) {
        //   YYEsnBridge.ready(function () {
        //     YYEsnBridge.do('getOAuthCode', {
        //       success(res1) {
        //         let code = res1.OAuthCode;
        //         location.replace(loginurl + '?code=' + code);
        //       },
        //       fail(err) { },
        //       complete(res) { },
        //     });
        //   });
        //   return false;
        // }
      } else if (isSource('MALL')) {
        var str = "";
        if (isWxWorkPc) {
          str = "https://res.wx.qq.com/open/js/jweixin-1.2.0.js?t=" + Date.now();
          onLoadScript([str]);
        } else {
          str = "https://res.wx.qq.com/open/js/jweixin-1.6.0.js?t=" + Date.now();
          onLoadScript([str]);
        }
      } else if (isSource('WOA')) {
        onLoadScript([
          "./static/js/xz-sdk-v0.0.23.js"
        ]);
        onLoadScript([
          "./static/js/woa.js"
        ]);
      } else if (!getQueryVariable("source") && !window.sessionStorage.getItem('source')) {
        // if (loginurl) {
        //   location.replace(loginurl);
        //   return false;
        // }
        // dingtalkPoint(window, document, "https://g.alicdn.com/woodpeckerx/jssdk??wpkReporter.js", "__wpk");
        var str = "";
        if (isWxWorkPc) {
          str = "https://res.wx.qq.com/open/js/jweixin-1.2.0.js?t=" + Date.now();
          onLoadScript([str]);
        } else {
          str = "https://res.wx.qq.com/open/js/jweixin-1.6.0.js?t=" + Date.now();
          onLoadScript([str]);
        }
        onLoadScript([
          './static/js/dw-web.min.js?v=1',
          './static/js/wps.js?v=1.0',
          './static/js/youroom.js',
          'https://lf1-cdn-tos.bytegoofy.com/goofy/lark/op/h5-js-sdk-1.5.23.js',
          'https://open.work.weixin.qq.com/wwopen/js/jwxwork-1.0.0.js',
          'https://auth.dingtalk.com/opendata-1.1.0.js',
          './static/js/dingtalk.js?v=3.0',
          'https://g.alicdn.com/dingding/dingtalk-jsapi/3.0.45/dingtalk.open.js'
        ]);
      } else {
        // if (loginurl) {
        //   location.replace(loginurl);
        //   return false;
        // }
      }
    }
    //判断是否是本地运行 或 是查询工资条入口
    let hash = window.location.hash;
    path = '';
    // if (hash) {
    //   path = hash.split('?')[0].split('/')[1]
    // }
    // if (writeHostName.some(e => e === location.hostname) && path.toLocaleLowerCase() === 'login') {
    //   let xhrData = handleRequest('/salaryempapi/account/isLogin');
    //   loginUrlChoose(xhrData.getResponseHeader('loginurl'))
    // } else {
    //   loginUrlChoose()
    // }
    loginUrlChoose()</script><script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js?t=1770701472577"></script><script src="https://open.work.weixin.qq.com/wwopen/js/jwxwork-1.0.0.js"></script><script>// (function () {
    //   try{
    //     if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
    //       handleFontSize();
    //     } else {
    //       if (document.addEventListener) {
    //         document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
    //       } else if (document.attachEvent) {
    //         document.attachEvent("WeixinJSBridgeReady", handleFontSize);
    //         document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
    //       }
    //     }

    //     function handleFontSize() {
    //       if (!WeixinJSBridge) return
    //       // 设置网页字体为默认大小
    //       WeixinJSBridge.invoke('setFontSizeCallback', {
    //         'fontSize': 0
    //       });
    //       // 重写设置网页字体大小的事件
    //       WeixinJSBridge.on('menu:setfont', function () {
    //         WeixinJSBridge.invoke('setFontSizeCallback', {
    //           'fontSize': 0
    //         });
    //       });
    //     }
    //   }catch(e){
    //     console.log(e)
    //   }
    // })();</script><script>! function (e, t, n, g, i) {
      e[i] = e[i] || function () {
        (e[i].q = e[i].q || []).push(arguments)
      }, n = t.createElement("script"), tag = t.getElementsByTagName("script")[0], n.async = 1, n.src = ('https:' ==
        document.location.protocol ? 'https://' : 'http://') + g, tag.parentNode.insertBefore(n, tag)
    }(window, document, "script", "assets.giocdn.com/2.1/gio.js", "gio");
    var yygio = function () {
      var args = Array.prototype.slice.call(arguments);
      var type = args[0];
      if (type == 'track') {
        var opts = args[2] || {};
        var source = window.sessionStorage.getItem("source");
        args[2] = Object.assign({}, opts, { source: source });
      }
      // console.log('gio',args)
      gio.apply(gio, args)
    }
    gio('init', '86ed1f1a541272b5', {})
    gio('config', {
      hashtag: true,
    })
    gio('send');</script><script>console.log(getQueryVariable('collectMonthId'));
    if (getQueryVariable('collectMonthId')) {
      onLoadLink([
        './static/luckysheet/plugins/css/pluginsCss.css',
        './static/luckysheet/plugins/plugins.css',
        './static/luckysheet/css/luckysheet.css',
        './static/luckysheet/assets/iconfont/iconfont.css',
      ])
      onLoadScript([
        './static/luckysheet/plugins/js/plugin.js',
        './static/luckysheet/luckysheet.umd.js'
      ]);
    }</script><script defer="defer" src="js/chunk-vendors.eea4b6e2.js" crossorigin="anonymous" integrity="sha384-5gnRqV8akm/O8+GAvr8PSx3/9cFk5YA26oRioLZ7Ht2jO+BUmzB6z7AmiFsWGMiH" type="module"></script><script defer="defer" src="js/app.aeeeeadc.js" crossorigin="anonymous" integrity="sha384-lOkPr96BaGaWyPRCQBChHjIfhmm6HIuXOsYfr4xOIOgOumdK2KCoFUs6ljGG/Q6p" type="module"></script><link href="css/chunk-vendors.47e02fa5.css" rel="stylesheet" crossorigin="anonymous" integrity="sha384-Bpn30F3+8mEFYQyiFSBUzPdBxo1o92qiAl/e+MJViLJ8zN9XoVOhftmaR0rAY5h5"><link href="css/app.069d781b.css" rel="stylesheet" crossorigin="anonymous" integrity="sha384-P4kZI06UrfgGPSimLWhBjZKQrtSXL8uPzUFsTJllbuNUtoUFXdL42bCrbaw9F8I3"><script defer="defer" src="js/chunk-vendors-legacy.8dde9127.js" crossorigin="anonymous" integrity="sha384-m1p6i/EmhlUIZPFbemlLn6dmALt29yQ1ePtF3FRY4OlZ6XmMhRLLfgvwqpJDqVWf" nomodule=""></script><script defer="defer" src="js/app-legacy.d8dea40c.js" crossorigin="anonymous" integrity="sha384-cvy1urTIn4WzEGXODV/RLlNyizbRC0GVMdeeUt/k0Ais3rSHMXJ9HfcpesNXwB0K" nomodule=""></script><style id="z-index-style">:root{--dom-main-z-index:1000;--dom-sub-z-index:2000}</style><link rel="stylesheet" type="text/css" href="css/9555.5a2ef382.css"><style type="text/css" title="fading circle style">.circle-color-9 > div::before { background-color: #fff; }</style><link rel="icon" href="https://www.yygongzi.com/salary/wx/h5/plugin.ico" type="image/x-icon"></head><body class=""><noscript><strong>We're sorry but payrollh5 doesn't work properly without JavaScript enabled. Please enable it to continue.</strong></noscript><div data-v-623b5cde="" class=""><div data-v-623b5cde="" id="app" class="app"><!----> <!----> <!----> <div data-v-6a9d3c0a="" data-v-623b5cde=""><div data-v-6a9d3c0a="" class="confrim-contents"><div data-v-7460d8f6="" data-v-6a9d3c0a="" class="code-container"><img data-v-7460d8f6="" src="data:image/png;base64,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" alt="" width="136px" style="margin-top: 4px;"> <span data-v-7460d8f6="" style="font-size: 14px;">当前确认单也支<br data-v-7460d8f6="">
持手机扫码操作</span> <!----> <!----></div> <div data-v-6a9d3c0a="" class="confrim-head"><div data-v-6a9d3c0a="" class="confrim-head-title">项目汇总</div> <span data-v-6a9d3c0a="" class="confrim-head-status status0">未确认</span></div> <div data-v-6a9d3c0a="" class="confrim-content"><div data-v-6a9d3c0a="" class="content-item single-head"><div data-v-6a9d3c0a=""><div data-v-6a9d3c0a="" class="item-name width-min">
              项目名称
            </div> <div data-v-6a9d3c0a="" class="item-value item-value-text width-min">系统开发外包项目</div></div></div><div data-v-6a9d3c0a="" class="content-item single-head"><div data-v-6a9d3c0a=""><div data-v-6a9d3c0a="" class="item-name width-min">
              客户名称
            </div> <div data-v-6a9d3c0a="" class="item-value width-min">安盛科技</div></div></div><div data-v-6a9d3c0a="" class="content-item single-head"><div data-v-6a9d3c0a=""><div data-v-6a9d3c0a="" class="item-name width-min">
              项目状态
            </div> <div data-v-6a9d3c0a="" class="item-value width-min">未开始</div></div></div><div data-v-6a9d3c0a="" class="content-item single-head"><div data-v-6a9d3c0a=""><div data-v-6a9d3c0a="" class="item-name width-min">
              项目负责人
            </div> <div data-v-6a9d3c0a="" class="item-value width-min">-</div></div></div><div data-v-6a9d3c0a="" class="content-item single-head"><div data-v-6a9d3c0a=""><div data-v-6a9d3c0a="" class="item-name width-min">
              所属区域
            </div> <div data-v-6a9d3c0a="" class="item-value width-min">华东区</div></div></div><div data-v-6a9d3c0a="" class="content-item single-head"><div data-v-6a9d3c0a=""><div data-v-6a9d3c0a="" class="item-name width-min">
              项目总金额（元）
            </div> <div data-v-6a9d3c0a="" class="item-value width-min">10000</div></div></div><div data-v-6a9d3c0a="" class="content-item single-head double-head"><div data-v-6a9d3c0a=""><div data-v-6a9d3c0a="" class="item-name width-min">
              预计回款时间
            </div> <div data-v-6a9d3c0a="" class="item-value width-min">2025/12/22</div></div></div><div data-v-6a9d3c0a="" class="content-item single-head"><div data-v-6a9d3c0a=""><div data-v-6a9d3c0a="" class="item-name width-min">
              项目已回款金额（元）
            </div> <div data-v-6a9d3c0a="" class="item-value width-min">2000</div></div></div><div data-v-6a9d3c0a="" class="content-item single-head"><div data-v-6a9d3c0a=""><div data-v-6a9d3c0a="" class="item-name width-min">
              项目剩余应回款（元）
            </div> <div data-v-6a9d3c0a="" class="item-value width-min">8000</div></div></div><div data-v-6a9d3c0a="" class="content-item single-head"><div data-v-6a9d3c0a=""><div data-v-6a9d3c0a="" class="item-name width-min">
              项目总成本（元）
            </div> <div data-v-6a9d3c0a="" class="item-value width-min">5000</div></div></div><div data-v-6a9d3c0a="" class="content-item single-head"><div data-v-6a9d3c0a=""><div data-v-6a9d3c0a="" class="item-name width-min">
              项目已付成本（元）
            </div> <div data-v-6a9d3c0a="" class="item-value width-min">3000</div></div></div><div data-v-6a9d3c0a="" class="content-item single-head"><div data-v-6a9d3c0a=""><div data-v-6a9d3c0a="" class="item-name width-min">
              项目应付成本（元）
            </div> <div data-v-6a9d3c0a="" class="item-value width-min">2000</div></div></div><div data-v-6a9d3c0a="" class="content-item single-head"><div data-v-6a9d3c0a=""><div data-v-6a9d3c0a="" class="item-name width-min">
              项目利润（元）
            </div> <div data-v-6a9d3c0a="" class="item-value width-min">5000</div></div></div></div> <div data-v-6a9d3c0a="" class="border-line"></div> <div data-v-59014eab="" data-v-6a9d3c0a="" class="container"><div data-v-59014eab="" class="sign-container"><div data-v-59014eab="" class="sign_box"><div data-v-59014eab="" class="sign_box_head"><div data-v-59014eab="" class="sign_title">
            签字确认
          </div> <div data-v-59014eab="" class="sign_desc">
            请在下方灰色区域内签字
          </div> <div data-v-59014eab="" class="fill-screen-wrap"><img data-v-59014eab="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAWlBMVEUAAAA7dv86df8+d/87df86d/86dv86dv88d/86dv86df87df86dv87d/9Be/86dv9Jif86df88dv88eP89dv88dv87dv86dv87df88dv86d/9Adv89ev86df+RbwGXAAAAHXRSTlMAf/A1ooOl7jOf8t3VWw9zCYxqUUAqtrOYYU8cGf9O2jQAAADxSURBVEjH7dRJDoMwEETRxpiEgM1MZt//mhFiUSCwOoWUXf7+qTetEiVfhp0KWykuDZGsArMYLBTYhVgKbBwJIX2y7AxIdcFF0iHSId6ZGyDl0gSQcgLIOUDOAXIOkHMctHCApAMkHSDhONjBcbCcXS6H4HnppJ43R8lvnIzzymn1tn3JuqcztpJ/v6iyxvWy7p3dh++eeJRl+TT0XoPFBOuNC06DYSrbuFBSEC4kFIQ7CQfhOAjHQTgOwnEwNXAMhOMgHAfhOAjHwSscBwPvRHU6tHIMmmSZb1QYyVUcRLW6OZFadeUiDequ7t4sH4r7AMMaTPn6EpiSAAAAAElFTkSuQmCC" width="13px" alt="" class="fill-screen"> <span data-v-59014eab="">
              全屏签字</span></div></div> <!----> <div data-v-59014eab="" class="sign_in_box" style="pointer-events: initial;"><canvas data-v-907a1eec="" data-v-59014eab="" signid="2021094071705165825" class="esignature" height="277" width="452" style="background: rgb(242, 242, 242); width: 452px;"></canvas></div> <!----> <div data-v-59014eab="" class="sign_btns sign_btns_min"><button data-v-45b1fd2b="" data-v-59014eab="" class="btn clear btn_primary"><!----> 清除重写</button> <button data-v-45b1fd2b="" data-v-59014eab="" class="btn my_btns btn_primary"><!----> 
            签好了，提交
          </button></div></div></div> <div data-v-37091436="" data-v-59014eab="" class="mint-popup my-popup my-popup-pc" style="display: none;"><div data-v-37091436="" class="top"><div data-v-37091436="" class="title">确认数据</div> <div data-v-37091436="" class="content"><div data-v-59014eab="" class="content_t">我已查看并确认以上数据无误</div></div> <!----></div> <div data-v-37091436="" class="buttons"><div data-v-59014eab="" class="btn btn_cancle">
          取消
        </div> <div data-v-59014eab="" class="btn_line"></div> <div data-v-59014eab="" class="btn btn_confirm">
          确认
        </div></div></div> <div data-v-45c6f541="" data-v-59014eab=""><div data-v-45c6f541="" class="mint-popup my-popup" style="display: none;"><div data-v-45c6f541="" class="sign-container"><div data-v-45c6f541="" class="sign_box"><div data-v-45c6f541="" class="sign_box_head"><div data-v-45c6f541="" class="sign_title">
						签字确认
					</div> <div data-v-45c6f541="" class="sign_desc">
						请在下方灰色区域内签字
					</div> <img data-v-45c6f541="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAY9JREFUSEut1r1Lw0AYBvDniQhtwcF2lA4dpX9FF7GT4OxccHDxD3BwsJObi+AquDoJUj8wuiWrawfrmEEo6qB9Jf2yaXPJ3fUyJnC/vLn3fS6898OWAEcQufGqlYNGrfYNh1cQBKsfX2gDbHrECe/8sCciG7FB4NarVnZcoSOMVyKyO16/x44fnkOkNSnKFTqPjdbnJR+63cLgLboWYMsVmoaRePHKxW3GiEs0C2vU6/0h6ApN/YzE80q52Iyx8T7+t+QylepgC6BtpbpYKmiKmmBKUBc1xTLBPHQtin5nh3o0ZskGSQusaZeq0kzVSCD7kwTRxXIrzBqZxAtqVDYTKqrakvfTKjWpzBhMz0bzwM/dw/jNVJhN9uaCqtan4NMm8DPBrDlDqfRjc8ooQZ2htsneVFAHsz1lFkATzAZNgDaYKToFl8FM0CHoAtNF6RLTQdnxg1MIDqfJaRDEWSmsGJkLdp7CV0A2bYI4L/bnUZLvMbhHSBseH731wv7k7ypvMd3nMSq96GwANkEc/wFnC++5rVO0iwAAAABJRU5ErkJggg==" width="14px" alt="" class="popup-close"></div> <div data-v-45c6f541="" class="sign_in_box"><canvas data-v-907a1eec="" data-v-45c6f541="" class="esignature" height="266" width="782" style="background: rgb(242, 242, 242); width: 782px;"></canvas></div> <div data-v-45c6f541="" class="sign_btns"><button data-v-45b1fd2b="" data-v-45c6f541="" class="btn clear btn_primary"><!----> 清除重写</button> <button data-v-45b1fd2b="" data-v-45c6f541="" disabled="disabled" class="btn my_btns btn_primary"><!----> 
						签好了，提交</button></div></div></div></div> <div data-v-37091436="" data-v-45c6f541="" class="mint-popup my-popup my-popup-pc" style="display: none;"><div data-v-37091436="" class="top"><div data-v-37091436="" class="title">确认数据</div> <div data-v-37091436="" class="content"><div data-v-45c6f541="" class="content_t">我已查看并确认以上数据无误</div></div> <!----></div> <div data-v-37091436="" class="buttons"><div data-v-45c6f541="" class="btn btn_cancle">
				取消
			</div> <div data-v-45c6f541="" class="btn_line"></div> <div data-v-45c6f541="" class="btn btn_confirm">
				确认
			</div></div></div></div></div> <!----> <div data-v-37091436="" data-v-6a9d3c0a="" class="mint-popup my-popup my-popup-pc" style="display: none;"><div data-v-37091436="" class="top"><div data-v-37091436="" class="title">清除，重新签字? </div> <div data-v-37091436="" class="content"><div data-v-6a9d3c0a="" class="content_t">确定后，签字人所签内容将被清除！清除后可再次签字</div></div> <!----></div> <div data-v-37091436="" class="buttons"><div data-v-6a9d3c0a="" class="btn btn_cancle">
          取消
        </div> <div data-v-6a9d3c0a="" class="btn_line"></div> <div data-v-6a9d3c0a="" class="btn btn_confirm">
          确定
        </div></div></div> <div data-v-37091436="" data-v-6a9d3c0a="" class="mint-popup my-popup my-popup-pc" style="display: none;"><div data-v-37091436="" class="top"><div data-v-37091436="" class="title"> 温馨提示 </div> <div data-v-37091436="" class="content"><div data-v-6a9d3c0a="" class="content_t">当前签字次数已用完，请联系管理员及时购买，以免影响使用！</div></div> <!----></div> <div data-v-37091436="" class="buttons"><div data-v-6a9d3c0a="" class="btn btn_cancle">
          取消
        </div> <div data-v-6a9d3c0a="" class="btn_line"></div> <div data-v-6a9d3c0a="" class="btn btn_confirm">
          确定
        </div></div></div></div></div> <div data-v-a49b075e="" data-v-623b5cde="" class="loading-wrap" style="display: none;"><div data-v-a49b075e="" class="content"><span data-v-a49b075e=""><div class="mint-spinner-fading-circle circle-color-9" style="width: 32px; height: 32px;"><div class="mint-spinner-fading-circle-circle is-circle2"></div><div class="mint-spinner-fading-circle-circle is-circle3"></div><div class="mint-spinner-fading-circle-circle is-circle4"></div><div class="mint-spinner-fading-circle-circle is-circle5"></div><div class="mint-spinner-fading-circle-circle is-circle6"></div><div class="mint-spinner-fading-circle-circle is-circle7"></div><div class="mint-spinner-fading-circle-circle is-circle8"></div><div class="mint-spinner-fading-circle-circle is-circle9"></div><div class="mint-spinner-fading-circle-circle is-circle10"></div><div class="mint-spinner-fading-circle-circle is-circle11"></div><div class="mint-spinner-fading-circle-circle is-circle12"></div><div class="mint-spinner-fading-circle-circle is-circle13"></div></div></span></div></div> <div data-v-623b5cde=""></div> <div data-v-aa2c6c3e="" data-v-623b5cde=""><!----> <span data-v-aa2c6c3e="" class="markGifSrc" style="display: none;"></span> <span data-v-aa2c6c3e="" class="card_date_bg" style="display: none;"></span> <span data-v-aa2c6c3e="" class="card_date1" style="display: none;"></span> <span data-v-aa2c6c3e="" class="card_date2" style="display: none;"></span> <span data-v-aa2c6c3e="" class="card_date3" style="display: none;"></span> <span data-v-aa2c6c3e="" class="card_date4" style="display: none;"></span> <span data-v-aa2c6c3e="" class="card_date5" style="display: none;"></span></div></div></div><script>// var _hmt = _hmt || [];
    // (function () {
    //   var hm = document.createElement("script");
    //   hm.src = "https://hm.baidu.com/hm.js?6fa7af9944b635e7e0bccf58fe42a857";
    //   // hm.src = "https://hm.baidu.com/hm.js?756330d54b7464f0d3aecd6358d7a7d9";
    //   // hm.src = "https://hm.baidu.com/hm.js?4fb5513285e24b1edb682a32bb45bb38";
    //   var s = document.getElementsByTagName("script")[0];
    //   s.parentNode.insertBefore(hm, s);
    // })();
    var _hmt = function () { };

    // 配置应用的AppKey 修复ios下点击其他区域 input不会失去焦点问题
    window.onload = function () {
      document.querySelector('body').addEventListener('touchend', function (e) {
        if (e.target.tagName.toLowerCase() != 'input') {
          var inputLists = document.getElementsByTagName('input');
          for (var i = 0; i < inputLists.length; i++) {
            inputLists[i].blur();
          }
        }
      });
    }</script><iframe id="dl-eacgphdf" src="chrome-extension://eacgphdfnajkknnipeifdpemcokahngo/html/downloading.html" style="display: none;"></iframe><iframe id="dl-rec-eacgphdf" src="chrome-extension://eacgphdfnajkknnipeifdpemcokahngo/html/recording.html" allow="camera *; microphone *; display-capture *" style="display: none;"></iframe><div class="region-selector-container" style="position: fixed; top: 0px; left: 0px; width: 100vw; height: 100vh; z-index: 2147483645; display: none;"><template shadowrootmode="open"><div class="region-selector-overlay" style="position: fixed; top: 0px; left: 0px; width: 100vw; height: 100vh; background: transparent; z-index: 2147483646; display: none; cursor: default; user-select: none; pointer-events: auto;"></div><div class="region-selector-box" style="position: fixed; padding: 4px; top: 25%; left: 25%; width: 50%; height: 50%; border: 2px dashed rgb(255, 255, 255); background: transparent; z-index: 2147483647; display: none; box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 0px 100vmax; cursor: move;"><div style="width: 100%; height: 100%; background: transparent; pointer-events: none; cursor: none;"></div><div class="handle top-left" style="position: absolute; width: 8px; height: 8px; background: white; border: 1px solid rgb(51, 51, 51); border-radius: 50%; top: -6px; left: -6px; cursor: nw-resize;"></div><div class="handle top" style="position: absolute; width: 8px; height: 8px; background: white; border: 1px solid rgb(51, 51, 51); border-radius: 50%; top: -6px; left: 50%; margin-left: -6px; cursor: n-resize;"></div><div class="handle top-right" style="position: absolute; width: 8px; height: 8px; background: white; border: 1px solid rgb(51, 51, 51); border-radius: 50%; top: -6px; right: -6px; cursor: ne-resize;"></div><div class="handle right" style="position: absolute; width: 8px; height: 8px; background: white; border: 1px solid rgb(51, 51, 51); border-radius: 50%; top: 50%; right: -6px; margin-top: -6px; cursor: e-resize;"></div><div class="handle bottom-right" style="position: absolute; width: 8px; height: 8px; background: white; border: 1px solid rgb(51, 51, 51); border-radius: 50%; bottom: -6px; right: -6px; cursor: se-resize;"></div><div class="handle bottom" style="position: absolute; width: 8px; height: 8px; background: white; border: 1px solid rgb(51, 51, 51); border-radius: 50%; bottom: -6px; left: 50%; margin-left: -6px; cursor: s-resize;"></div><div class="handle bottom-left" style="position: absolute; width: 8px; height: 8px; background: white; border: 1px solid rgb(51, 51, 51); border-radius: 50%; bottom: -6px; left: -6px; cursor: sw-resize;"></div><div class="handle left" style="position: absolute; width: 8px; height: 8px; background: white; border: 1px solid rgb(51, 51, 51); border-radius: 50%; top: 50%; left: -6px; margin-top: -6px; cursor: w-resize;"></div><div style="position: absolute; top: -25px; left: 50%; transform: translateX(-50%); background: rgba(0, 0, 0, 0.7); color: white; padding: 2px 6px; border-radius: 3px; font-size: 12px; white-space: nowrap;"></div><div style="position: absolute; left: 50%; transform: translateX(-50%); display: flex; gap: 10px; bottom: -45px;"><button style="padding: 8px 16px; background: rgb(76, 175, 80); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;">开始记录</button><button style="padding: 8px 16px; background: rgb(244, 67, 54); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;">取消记录</button></div></div></template></div><div id="z-index-manage" data-m="1000" style="display: none;" data-s="1000"></div><div class="el-loading-mask is-fullscreen" style="z-index: 2000; display: none;"><div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg><!----></div></div></body><div style="all: initial;"><div id="__hcfy__" style="all: initial;"><template shadowrootmode="open"><style>#root{-webkit-text-size-adjust:100%;box-sizing:border-box;font-size:14px;font-weight:400;letter-spacing:0;line-height:1.28581;text-transform:none;color:#182026;font-family:-apple-system,"BlinkMacSystemFont","Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Open Sans","Helvetica Neue","Icons16",sans-serif}#root{touch-action:manipulation}#root>.bp6-portal{z-index:9999999999}</style><link rel="stylesheet" href="chrome-extension://oikmahiipjniocckomdccmplodldodja/normalize.css"><link rel="stylesheet" href="chrome-extension://oikmahiipjniocckomdccmplodldodja/blueprint.css"><link rel="stylesheet" href="chrome-extension://oikmahiipjniocckomdccmplodldodja/blueprint-select.css"><link rel="stylesheet" href="chrome-extension://oikmahiipjniocckomdccmplodldodja/cropper.css"><style>#translate-panel{background-color:#f6f7f9}.bp6-dark #translate-panel{background-color:#1c2127}#translate-panel{display:flex;flex-direction:column;padding-bottom:8px}#translate-panel .fixed{flex-shrink:0;margin-bottom:10px}#translate-panel .body{flex-grow:1;overflow:auto;overscroll-behavior:contain}#translate-panel .body::-webkit-scrollbar{width:8px;background-color:rgba(0,0,0,0);-webkit-border-radius:100px}#translate-panel .body::-webkit-scrollbar:hover{background-color:rgba(0,0,0,.09)}#translate-panel .body::-webkit-scrollbar-thumb:vertical{background:rgba(0,0,0,.5);-webkit-border-radius:100px}#translate-panel .body::-webkit-scrollbar-thumb:vertical:active{background:rgba(0,0,0,.61);-webkit-border-radius:100px}#translate-panel.size-small,#translate-panel.size-small h6.bp6-heading,#translate-panel.size-small .bp6-control.bp6-large,#translate-panel.size-small textarea.bp6-input.bp6-small{font-size:14px}#translate-panel.size-small .phonetic-item,#translate-panel.size-small .quick-settings a{font-size:12px}#translate-panel.size-middle,#translate-panel.size-middle h6.bp6-heading,#translate-panel.size-middle .bp6-control.bp6-large,#translate-panel.size-middle textarea.bp6-input{font-size:18px}#translate-panel.size-middle .phonetic-item,#translate-panel.size-middle .quick-settings a{font-size:14px}#translate-panel.size-large,#translate-panel.size-large h6.bp6-heading,#translate-panel.size-large .bp6-control.bp6-large,#translate-panel.size-large textarea.bp6-input.bp6-large{font-size:22px}#translate-panel.size-large .source,#translate-panel.size-large .phonetic-item,#translate-panel.size-large .quick-settings a{font-size:18px}#translate-panel .bp6-button.bp6-small,#translate-panel .bp6-small .bp6-button{min-height:20px;min-width:20px}#translate-panel .header{display:flex;align-items:center;padding:4px 6px 4px 10px;border-bottom:1px solid #d1d1d1}.bp6-dark #translate-panel .header{border-bottom-color:rgba(17,20,24,.4)}#translate-panel .header .drag-block{min-width:5px;flex-shrink:0;flex-grow:1;align-self:stretch}#translate-panel .header .left{flex-shrink:0;display:flex}#translate-panel .header .right{flex-shrink:0;display:flex;align-items:center}#translate-panel .header .right .bp6-icon-arrow-right{flex-shrink:0;margin:0 5px}#translate-panel .header .right>.bp6-button{flex-shrink:0;margin:0 1px}#translate-panel .header .right>.bp6-button:last-child{margin-right:0}#translate-panel .quick-settings{padding:4px 9px;margin:0 1px}#translate-panel .quick-settings>div{margin-bottom:5px}#translate-panel .quick-settings .bp6-control{margin-bottom:0}#translate-panel .query-text{position:relative;padding:10px 10px 2px 10px}#translate-panel .query-text textarea.bp6-input{min-height:44px;font-family:system-ui,-apple-system,"Segoe UI","Roboto","Ubuntu","Cantarell","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";overscroll-behavior:contain}#translate-panel .query-text .translate-btn{position:absolute;opacity:.6}#translate-panel .query-text .translate-btn:hover{opacity:1}#translate-panel .body{padding:0 10px}#translate-panel .body .bp6-card:first-child{margin-top:1px}#translate-panel .body .bp6-card:last-child{margin-bottom:1px}#translate-panel .body .no-api{margin:20px 0}.result-block{margin:8px 0;padding:2px 5px}.result-block .bp6-button{visibility:hidden}.result-block .error .bp6-button,.result-block:hover .bp6-button{visibility:visible}.result-block .legend{display:flex;align-items:center;justify-content:space-between}.result-block .legend .legend-left{display:flex;align-items:center}.result-block .legend .api-ico,.result-block .legend .bp6-heading{flex-shrink:0;white-space:nowrap}.result-block .legend .api-ico{display:inline-block;width:14px;height:14px;background-size:contain;margin-right:3px}.result-block .legend .bp6-heading{margin-bottom:0;margin-right:10px}.result-block .legend .source{cursor:pointer;font-size:12px;display:inline-flex;align-items:center}.result-block .legend .source .source-text{overflow:hidden}.result-block .legend .source .bp6-icon{position:relative;top:-1px;margin-left:1px}.result-block .phonetic{display:flex;flex-wrap:wrap}.result-block .phonetic .phonetic-item{display:flex;align-items:center;font-size:12px}.result-block .phonetic .phonetic-item:not(:last-child){margin-right:12px}.result-block .common-result p{line-height:1.3;margin:2px 0;overflow-wrap:break-word}.result-block .common-result .dict a{text-decoration:underline}.result-block .error{font-size:12px;padding:5px 10px}.result-block .dict-pos{margin-right:5px}.external-translators{margin-bottom:3px;padding:0;display:flex;flex-wrap:wrap}.external-translators>div{margin:0 5px 5px 0}.quick-links a{margin:0 5px 5px 0}#popper-container{width:250px;max-width:100%;position:absolute;left:0;top:0;z-index:9999999998;touch-action:none;transition:opacity .2s;background-color:#f6f7f9}.bp6-dark #popper-container{background-color:#1c2127}#popper-container.show{opacity:1;pointer-events:auto;user-select:auto}#popper-container,#popper-container[data-popper-reference-hidden=true]{opacity:0;pointer-events:none;user-select:none}#popper-container .drag-block{cursor:grab}#popper-container.pin{position:fixed}#popper-container.pin .arrow{display:none}#popper-container .arrow,#popper-container .arrow::before{position:absolute;width:8px;height:8px;z-index:-1}#popper-container .arrow::before{content:"";transform:rotate(45deg);background:#f6f7f9}.bp6-dark #popper-container .arrow::before{background-color:#1c2127}#popper-container .arrow{display:none}#popper-container.show[data-popper-placement]:not([data-popper-reference-hidden=true]) .arrow{display:block}#popper-container[data-popper-placement^=top] .arrow{bottom:-5px}#popper-container[data-popper-placement^=top] .arrow::before{border-right:1px solid #d1d1d1;border-bottom:1px solid #d1d1d1}#popper-container[data-popper-placement^=bottom] .arrow{top:-5px}#popper-container[data-popper-placement^=bottom] .arrow::before{border-left:1px solid #d1d1d1;border-top:1px solid #d1d1d1}#popper-container[data-popper-placement^=left] .arrow{right:-5px}#popper-container[data-popper-placement^=left] .arrow::before{border-right:1px solid #d1d1d1;border-top:1px solid #d1d1d1}#popper-container[data-popper-placement^=right] .arrow{left:-5px}#popper-container[data-popper-placement^=right] .arrow::before{border-left:1px solid #d1d1d1;border-bottom:1px solid #d1d1d1}#translate-btn{display:none;position:absolute;z-index:9999999999;left:0;top:0}#translate-btn .bp6-button{padding:2px;min-width:0;min-height:0}#translate-btn .btn-icon{width:18px;height:18px;background-image:url(chrome-extension://oikmahiipjniocckomdccmplodldodja/logo.png);background-size:contain}.bp6-dark #translate-btn .btn-icon{background-image:url(chrome-extension://oikmahiipjniocckomdccmplodldodja/logowhite36.png)}#translate-btn.show{display:block}.translate-type-selector .bp6-label{display:inline}.translate-type-selector .bp6-radio{margin-bottom:0}#ocr-container{position:fixed;z-index:99999999999999;left:0;top:0;right:0;bottom:0}#ocr-container .toolbar{display:none;position:absolute;z-index:1}#ocr-container img{max-width:100%}#app{cursor:default}.switch-pin{flex-shrink:0;cursor:pointer}.switch-pin .bp6-icon-pin{transition:transform .2s,color .2s;transform:rotate(-45deg)}.pin .switch-pin .bp6-icon-pin{transform:rotate(-70deg)}.cut-btn{margin-left:2px}.app-toaster-container{position:fixed !important;z-index:9999999999 !important}.app-toaster-container .bp6-toast{min-width:auto}#web-trs-panel .app-toaster-container{padding-right:0;padding-left:0}#web-trs-panel .page-trs-form-group{margin:0 0 0 0;align-items:center}#web-trs-panel .page-trs-form-group>label{width:70px}</style><div id="root" dir="ltr"><div id="app"><div id="translate-btn"><button type="button" class="bp6-button"><span class="btn-icon"></span></button></div><div id="popper-container" class="bp6-elevation-4" style="width: 287px; transform: translate(0px, 0px);"><div id="translate-panel" class="size-small"><div class="fixed"><div class="header"><div class="left"><div class="switch-pin"><button type="button" class="bp6-button bp6-small bp6-minimal"><span aria-hidden="true" class="bp6-icon bp6-icon-pin"><svg data-icon="pin" height="14" role="img" viewBox="0 0 16 16" width="14"><path d="M9.41.92c-.51.51-.41 1.5.15 2.56L4.34 7.54C2.8 6.48 1.45 6.05.92 6.58l3.54 3.54-3.54 4.95 4.95-3.54 3.54 3.54c.53-.53.1-1.88-.96-3.42l4.06-5.22c1.06.56 2.04.66 2.55.15L9.41.92z" fill-rule="evenodd"></path></svg></span></button></div><button type="button" title="图片翻译" class="bp6-button bp6-small bp6-minimal"><span aria-hidden="true" class="bp6-icon bp6-icon-media"><svg data-icon="media" height="14" role="img" viewBox="0 0 16 16" width="14"><path d="M11.99 6.99c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm3-5h-14c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-10c0-.55-.45-1-1-1zm-1 9l-5-3-1 2-3-4-3 5v-7h12v7z" fill-rule="evenodd"></path></svg></span></button><button type="button" title="语音翻译" class="bp6-button bp6-small bp6-minimal"><span class="bp6-icon"><svg version="1.1" id="Capa_1" width="14" height="14" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 490.9 490.9" xml:space="preserve"><g><g><path d="M245.5,322.9c53,0,96.2-43.2,96.2-96.2V96.2c0-53-43.2-96.2-96.2-96.2s-96.2,43.2-96.2,96.2v130.5 C149.3,279.8,192.5,322.9,245.5,322.9z M173.8,96.2c0-39.5,32.2-71.7,71.7-71.7s71.7,32.2,71.7,71.7v130.5 c0,39.5-32.2,71.7-71.7,71.7s-71.7-32.2-71.7-71.7V96.2z"></path><path d="M94.4,214.5c-6.8,0-12.3,5.5-12.3,12.3c0,85.9,66.7,156.6,151.1,162.8v76.7h-63.9c-6.8,0-12.3,5.5-12.3,12.3 s5.5,12.3,12.3,12.3h152.3c6.8,0,12.3-5.5,12.3-12.3s-5.5-12.3-12.3-12.3h-63.9v-76.7c84.4-6.3,151.1-76.9,151.1-162.8 c0-6.8-5.5-12.3-12.3-12.3s-12.3,5.5-12.3,12.3c0,76.6-62.3,138.9-138.9,138.9s-138.9-62.3-138.9-138.9 C106.6,220,101.2,214.5,94.4,214.5z"></path></g></g></svg></span></button></div><div class="drag-block" title="按住不放可以拖动"></div><div class="right"><button type="button" disabled="" title="添加到收藏夹" tabindex="-1" class="bp6-button bp6-disabled bp6-small bp6-minimal"><span aria-hidden="true" class="bp6-icon bp6-icon-star-empty"><svg data-icon="star-empty" height="14" role="img" viewBox="0 0 16 16" width="14"><path d="M16 6.11l-5.53-.84L8 0 5.53 5.27 0 6.11l4 4.1L3.06 16 8 13.27 12.94 16 12 10.21l4-4.1zM4.91 13.2l.59-3.62L3 7.02l3.45-.53L8 3.2l1.55 3.29 3.45.53-2.5 2.56.59 3.62L8 11.49 4.91 13.2z" fill-rule="evenodd"></path></svg></span></button><button type="button" class="bp6-button bp6-small bp6-minimal settings" title="快捷设置"><span aria-hidden="true" class="bp6-icon bp6-icon-cog"><svg data-icon="cog" height="14" role="img" viewBox="0 0 16 16" width="14"><path d="M15.19 6.39h-1.85c-.11-.37-.27-.71-.45-1.04l1.36-1.36c.31-.31.31-.82 0-1.13l-1.13-1.13a.803.803 0 00-1.13 0l-1.36 1.36c-.33-.17-.67-.33-1.04-.44V.79c0-.44-.36-.8-.8-.8h-1.6c-.44 0-.8.36-.8.8v1.86c-.39.12-.75.28-1.1.47l-1.3-1.3c-.3-.3-.79-.3-1.09 0L1.82 2.91c-.3.3-.3.79 0 1.09l1.3 1.3c-.2.34-.36.7-.48 1.09H.79c-.44 0-.8.36-.8.8v1.6c0 .44.36.8.8.8h1.85c.11.37.27.71.45 1.04l-1.36 1.36c-.31.31-.31.82 0 1.13l1.13 1.13c.31.31.82.31 1.13 0l1.36-1.36c.33.18.67.33 1.04.44v1.86c0 .44.36.8.8.8h1.6c.44 0 .8-.36.8-.8v-1.86c.39-.12.75-.28 1.1-.47l1.3 1.3c.3.3.79.3 1.09 0l1.09-1.09c.3-.3.3-.79 0-1.09l-1.3-1.3c.19-.35.36-.71.48-1.1h1.85c.44 0 .8-.36.8-.8v-1.6a.816.816 0 00-.81-.79zm-7.2 4.6c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" fill-rule="evenodd"></path></svg></span></button><button type="button" title="关闭(Esc)" class="bp6-button bp6-small bp6-minimal"><span aria-hidden="true" class="bp6-icon bp6-icon-cross"><svg data-icon="cross" height="18" role="img" viewBox="0 0 16 16" width="18"><path d="M9.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L8 6.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42L6.59 8 3.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71L8 9.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L9.41 8z" fill-rule="evenodd"></path></svg></span></button></div></div><div class="bp6-collapse"><div class="bp6-collapse-body" aria-hidden="true"><div class="quick-settings bp6-card bp6-elevation-0"><div><span aria-controls="listbox-0" class="lang-select bp6-popover-target" aria-expanded="false" aria-haspopup="listbox"><button type="button" class="bp6-button bp6-small"><span class="bp6-button-text">自动检测</span><span aria-hidden="true" class="bp6-icon bp6-icon-caret-down"><svg data-icon="caret-down" height="16" role="img" viewBox="0 0 16 16" width="16"><path d="M12 6.5c0-.28-.22-.5-.5-.5h-7a.495.495 0 00-.37.83l3.5 4c.09.1.22.17.37.17s.28-.07.37-.17l3.5-4c.08-.09.13-.2.13-.33z" fill-rule="evenodd"></path></svg></span></button></span><span aria-hidden="true" class="bp6-icon bp6-icon-arrow-right" style="margin: 0px 10px;"><svg data-icon="arrow-right" height="12" role="img" viewBox="0 0 16 16" width="12"><path d="M14.7 7.29l-5-5a.965.965 0 00-.71-.3 1.003 1.003 0 00-.71 1.71l3.29 3.29H1.99c-.55 0-1 .45-1 1s.45 1 1 1h9.59l-3.29 3.29a1.003 1.003 0 001.42 1.42l5-5c.18-.18.29-.43.29-.71s-.12-.52-.3-.7z" fill-rule="evenodd"></path></svg></span><span aria-controls="listbox-1" class="lang-select bp6-popover-target" aria-expanded="false" aria-haspopup="listbox"><button type="button" class="bp6-button bp6-small"><span class="bp6-button-text">中文(简体)</span><span aria-hidden="true" class="bp6-icon bp6-icon-caret-down"><svg data-icon="caret-down" height="16" role="img" viewBox="0 0 16 16" width="16"><path d="M12 6.5c0-.28-.22-.5-.5-.5h-7a.495.495 0 00-.37.83l3.5 4c.09.1.22.17.37.17s.28-.07.37-.17l3.5-4c.08-.09.13-.2.13-.33z" fill-rule="evenodd"></path></svg></span></button></span></div><div><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>谷歌</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox" checked=""><span class="bp6-control-indicator"></span>必应</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox" checked=""><span class="bp6-control-indicator"></span>微软</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox" checked=""><span class="bp6-control-indicator"></span>DeepL(内置)</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>DeepL</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>ChatGPT</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>Claude</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>Gemini</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>Grok</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>Ol</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>硅基</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>混元</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>文心</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>文心（旧）</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>智谱</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>豆包</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>通义</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>DeepSeek</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>零一</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>MiniMax</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>百川</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>Kimi</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>百度</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>百度(专业版)</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>腾讯</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>彩云</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>阿里</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>阿里(专业版)</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>有道</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>火山</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox" checked=""><span class="bp6-control-indicator"></span>必应词典</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>搜狗</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>Yandex</label><div style="margin-top: 4px;"><a class="bp6-text-small">购买套餐包后可直接使用以上所有服务</a></div></div><div><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>自动朗读</label><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>自动复制</label></div><div role="radiogroup" class="bp6-radio-group"><label class="bp6-control bp6-radio bp6-inline"><input class="bp6-control-input" name="Blueprint6.RadioGroup-0" type="radio" value="small" checked=""><span class="bp6-control-indicator"></span>小</label><label class="bp6-control bp6-radio bp6-inline"><input class="bp6-control-input" name="Blueprint6.RadioGroup-0" type="radio" value="middle"><span class="bp6-control-indicator"></span>中</label><label class="bp6-control bp6-radio bp6-inline"><input class="bp6-control-input" name="Blueprint6.RadioGroup-0" type="radio" value="large"><span class="bp6-control-indicator"></span>大</label></div><div><label class="bp6-control bp6-checkbox bp6-inline"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>显示文本框</label><label class="bp6-control bp6-checkbox bp6-inline" style="margin-right: 0px;"><input class="bp6-control-input" type="checkbox"><span class="bp6-control-indicator"></span>鼠标悬浮取词</label></div><a class="bp6-text-small">打开完整设置</a></div></div></div></div><div class="body"><p>请输入需要翻译的文本。</p></div></div><div class="arrow"></div></div><div id="web-trs-panel"></div></div></div></template></div></div></html>

```


签字完成后链接对应跳转到已签名：

![[Pasted image 20260210133625.png]]



```
curl ^"https://www.yygongzi.com/gw/feishuapi/bitable/confirm/env-lang/2021094070765641730?confirm_id=2021094070765641730^" ^
  -H ^"Accept: application/json, text/plain, */*^" ^
  -H ^"Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en-GB;q=0.7,en;q=0.6^" ^
  -H ^"Cache-Control: no-cache^" ^
  -H ^"Connection: keep-alive^" ^
  -b ^"salary_uid=6e107ae0e587460689756a5f45746fbe; session=065062d7b7404b2c8c528d737e6fe2f7; gray-tag=normal^" ^
  -H ^"Pragma: no-cache^" ^
  -H ^"Referer: https://www.yygongzi.com/salary/wx/h5/index.html^" ^
  -H ^"Sec-Fetch-Dest: empty^" ^
  -H ^"Sec-Fetch-Mode: cors^" ^
  -H ^"Sec-Fetch-Site: same-origin^" ^
  -H ^"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0^" ^
  -H ^"X-Requested-With: XMLHttpRequest^" ^
  -H ^"curl: https://www.yygongzi.com/salary/wx/h5/index.html^#/pluginsConfirm?userType=0^&confirmId=2021094070765641730^&field_id=^&sort=1^&recordId=rec1PX0BmQ^" ^
  -H ^"lang: zh^" ^
  -H ^"sec-ch-ua: ^\^"Not(A:Brand^\^";v=^\^"8^\^", ^\^"Chromium^\^";v=^\^"144^\^", ^\^"Microsoft Edge^\^";v=^\^"144^\^"^" ^
  -H ^"sec-ch-ua-mobile: ?0^" ^
  -H ^"sec-ch-ua-platform: ^\^"Windows^\^"^" ^
  -H ^"source: CORPWX^"
  
  
  
  {
    "success": true,
    "code": 0,
    "msg": "处理成功",
    "data": {
        "confirmId": "2021094070765641730",
        "lang": "zh",
        "env": "feishu"
    },
    "ok": true
}
```

```
curl ^"https://www.yygongzi.com/gw/feishuapi/bitable/confirm/2021094070765641730/rec1PX0BmQ?field_id=^&userType=0^&sort=1^" ^
  -H ^"Accept: application/json, text/plain, */*^" ^
  -H ^"Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en-GB;q=0.7,en;q=0.6^" ^
  -H ^"Cache-Control: no-cache^" ^
  -H ^"Connection: keep-alive^" ^
  -b ^"salary_uid=6e107ae0e587460689756a5f45746fbe; session=065062d7b7404b2c8c528d737e6fe2f7; gray-tag=normal^" ^
  -H ^"Pragma: no-cache^" ^
  -H ^"Referer: https://www.yygongzi.com/salary/wx/h5/index.html^" ^
  -H ^"Sec-Fetch-Dest: empty^" ^
  -H ^"Sec-Fetch-Mode: cors^" ^
  -H ^"Sec-Fetch-Site: same-origin^" ^
  -H ^"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0^" ^
  -H ^"X-Requested-With: XMLHttpRequest^" ^
  -H ^"curl: https://www.yygongzi.com/salary/wx/h5/index.html^#/pluginsConfirm?userType=0^&confirmId=2021094070765641730^&field_id=^&sort=1^&recordId=rec1PX0BmQ^" ^
  -H ^"lang: zh^" ^
  -H ^"sec-ch-ua: ^\^"Not(A:Brand^\^";v=^\^"8^\^", ^\^"Chromium^\^";v=^\^"144^\^", ^\^"Microsoft Edge^\^";v=^\^"144^\^"^" ^
  -H ^"sec-ch-ua-mobile: ?0^" ^
  -H ^"sec-ch-ua-platform: ^\^"Windows^\^"^" ^
  -H ^"source: CORPWX^"
  
  
  {
    "success": true,
    "code": 0,
    "msg": "处理成功",
    "data": {
        "confirmName": "项目汇总",
        "signUrl": null,
        "signTime": "2026-02-10 13:35:39",
        "fields": [
            {
                "id": "fldDF0AM6q",
                "fieldType": 1,
                "propertyData": null,
                "value": "系统开发外包项目",
                "name": "项目名称"
            },
            {
                "id": "fldD8BFYPW",
                "fieldType": 3,
                "propertyData": null,
                "value": "安盛科技",
                "name": "客户名称"
            },
            {
                "id": "fldi3tVsrm",
                "fieldType": 3,
                "propertyData": null,
                "value": "未开始",
                "name": "项目状态"
            },
            {
                "id": "fldtNKQYB3",
                "fieldType": 11,
                "propertyData": null,
                "value": "",
                "name": "项目负责人"
            },
            {
                "id": "fldNPf3ZUP",
                "fieldType": 3,
                "propertyData": null,
                "value": "华东区",
                "name": "所属区域"
            },
            {
                "id": "fldWr4Pb9Z",
                "fieldType": 2,
                "propertyData": null,
                "value": "10000",
                "name": "项目总金额（元）"
            },
            {
                "id": "fld54KMHQb",
                "fieldType": 5,
                "propertyData": null,
                "value": "2025/12/22",
                "name": "预计回款时间"
            },
            {
                "id": "fld5Oc6sqV",
                "fieldType": 2,
                "propertyData": null,
                "value": "2000",
                "name": "项目已回款金额（元）"
            },
            {
                "id": "fld8cS3dA3",
                "fieldType": 20,
                "propertyData": null,
                "value": "8000",
                "name": "项目剩余应回款（元）"
            },
            {
                "id": "fldyZuzPUJ",
                "fieldType": 2,
                "propertyData": null,
                "value": "5000",
                "name": "项目总成本（元）"
            },
            {
                "id": "fld4JF5Sig",
                "fieldType": 2,
                "propertyData": null,
                "value": "3000",
                "name": "项目已付成本（元）"
            },
            {
                "id": "fldglfDi4f",
                "fieldType": 20,
                "propertyData": null,
                "value": "2000",
                "name": "项目应付成本（元）"
            },
            {
                "id": "fldJEFtVyB",
                "fieldType": 20,
                "propertyData": null,
                "value": "5000",
                "name": "项目利润（元）"
            }
        ],
        "isVerifyIdentity": 0,
        "isNewRecordConfirm": 0,
        "signFlows": [
            {
                "signId": "2021094071705165825",
                "signPeopleName": null,
                "signTime": "2026-02-10 13:35:39",
                "signStatus": 1,
                "signUrl": "https://salary-1307799014.cos.ap-beijing.myqcloud.com/images/micro-salaryfeishu-server/autograph/2026/02/10/986ff8a26fa048f98413ccb19b3b92a4.png",
                "signImageBase64": "iVBORw0KGgoAAAANSUhEUgAAAcQAAAEVCAYAAAB+PZWVAAAQAElEQVR4AeydCdxV0/rHn2O45ivzPE8Zw5UpboMxoQwZrkqDiEQXScaiZMxQ6ZIxqYikSIYSDaSQMhMl480YGeP+fXed/u/7tvY++7zvGfbw8+lMa6299lrf9Tq/s9Z6nmctt2DBgv/pIQb6G9DfgP4G9DeQ9r+B5Uz/iYAIiIAIiIAImAQxyX8E6psIiIAIiEBoAhLE0KhUUAREQAREIMkEJIhJHl31LckE1DcREIECE5AgFhioqhMBERABEYgnAQliPMdNrRYBEUgyAfWtLAQkiGXBrpuKgAiIgAhEjYAEMWojovaIgAiIgAiUhUCJBLEsfdNNRUAEREAERCA0AQliaFQqKAIiIAIikGQCEsQkj26J+qbbiIAIiEASCEgQkzCK6oMIiIAIiECNCUgQa4xQFYhAkgmobyKQHgISxPSMtXoqAiIgAiIQQECCGABHWSIgAiKQZALqW2UCEsTKPPRJBERABEQgpQQkiCkdeHVbBERABESgMoFkCWLlvumTCIiACIiACIQmIEEMjUoFRUAEREAEkkxAgpjk0U1W39QbERABESgqAQliUfGqchEQAREQgbgQkCDGZaTUThFIMgH1TQQiQECCGIFBUBNEQAREQATKT0CCWP4xUAtEQAREIMkEYtM3CWJshkoNFQEREAERKCYBCWIx6apuERABERCB2BCQIFZjqHSJCIiACIhA8ghIEJM3puqRCIiACIhANQhIEKsBTZckmYD6JgIikFYCEsS0jrz6LQIiIAIiUImABLESDn0QARFIMgH1TQSCCEgQg+goTwREQAREIDUEJIipGWp1VAREQASSTKDmfZMg1pyhahABERABEUgAAQliAgZRXRABERABEag5AQlizRkWqwbVKwIiIAIiUEICEsQSwtatREAEREAEoktAghjdsVHLkkxAfRMBEYgcAQli5IZEDRIBERABESgHAQliOajrniIgAkkmoL7FlIAEMaYDp2aLgAiIgAgUloAEsbA8VZsIiIAIiEBMCYQSxJj2Tc0WAREQAREQgdAEJIihUamgCIiACIhAkglIEJM8uqH6pkIiIAIiIAIQkCBCQQ8REAEREIHUE5Agpv5PQACSTEB9EwERCE9AghielUqKgAiIgAgkmIAEMcGDq66JgAgkmYD6VmgCEsRCE1V9IiACIiACsSQgQYzlsKnRIiACIiAChSYQJUEsdN9UnwiIgAiIgAiEJiBBDI1KBUVABERABJJMQIKY5NGNUt/UFhEQARGIOAEJYsQHSM0TAREQAREoDQEJYmk46y4ikGQC6psIJIKABDERw6hOiIAIiIAI1JSABLGmBHW9CIiACCSZQIr6JkFM0WCrq4sJvPnmm7bzzjvb3//+d++x5pprep9JX1xCzyIgAmkkIEFM46invM/HH3+8zZs3bymF//3vf97n5s2bL03TGxEQgfQRSKEgpm+Q1ePKBD799NPKCUs+ffLJJ0ve6UUERCCNBCSIaRx19VkEREAERGAZAhLEZZAoIc4EatL2TTfdtCaX61oREIGYE5AgxnwA1fzCERg+fHjhKlNNIiACsSMgQYzdkKnBxSKA5Wmx6la9hSCgOkSguAQkiMXlq9pFIG8CWL0++eSTVrduXVt77bU915Csi0iu14033tgaN25sZ599tl133XX24IMP2ksvvWQYElFv3o3RBSKQIgISxBQNtroaXQKI1dSpU61r166200472YknnmjvvvuuLVq0KK9G//jjjzZ58mQbNGiQ9ezZ09q3b2+HHnqo7bjjjlarVi2rXbu2l59XpSosAiUgEIVbSBCjMApqQyoJVBXBQw45xAYMGODN5ooBhPt99tln3gzy8MMPt9GjR9sff/xRjFupThGIJQEJYiyHTY2OKwFEqeJMsNgi6MdpypQpdsopp9iuu+5qffr0sW+//davqNJFIDUEJIjFGmrVGzsC+S5P5tPBV1991Q444ABvT7BcIuhqL8EIunfvbltuuaXXvtdff91VTGkikAoCEsRUDLM6GYbAhx9+GKZY6DIsR7IsyfJkgwYNbObMmZFdomTmSvsOPPBAq1+/vt122202ffp0+/PPP0P3VwVFIO4EJIhxH0G1P28C6623nvMaBMGZsWxiYArLjyxDshzJsiTLk4EXODI32WQTO/PMM+2ZZ56x77//3hYsWBD4+O677+ztt9+2p556ygYOHGiXXnqptWrVyv75z38awcsdt/BNeu211+yiiy6yRo0a2R577GG//vqrb1lliECSCEgQkzSa6ksoAsccc4yz3IwZM5zpYRPfeecd69ixo+2www7GMiTLkWGvpVxFEXzrrbfs2muvtX322ccymQzZgY/lllvOuH6/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at/0WQREQAREwJeABNEXjTJEQAREQATSRECCmKbRVl+TTEB9EwERqCEBCWINAepyERABERCBZBCQICZjHNULERCBJBNQ30pCQIJYEsy6iQiIgAiIQNQJSBCjPkJqnwiIgAiIQEkIlEkQS9I33UQEREAEREAEQhOQIIZGpYIiIAIiIAJJJiBBTPLolqlvuq0IiIAIxJGABDGOo6Y2i4AIiIAIFJyABLHgSFWhCCSZgPomAsklIEFM7tiqZyIgAiIgAnkQkCDmAUtFRUAERCDJBNLeNwli2v8C1H8REAEREAGPgATRw6AnERABERCBtBNItiCmfXTVfxEQAREQgdAEJIihUamgCIiACIhAkglIEJM8usnum3onAiIgAgUlIEEsKE5VJgIiIAIiEFcCEsS4jpzaLQJJJqC+iUAZCEgQywBdtxQBERABEYgeAQli9MZELRIBERCBJBOIbN8kiJEdGjVMBERABESglAQkiKWkrXuJgAiIgAhEloAEsQBDoypEQAREQATiT0CCGP8xVA9EQAREQAQKQECCWACIqiLJBNQ3ERCBtBCQIKZlpNVPERABERCBQAISxEA8yhQBEUgyAfVNBCoSkCBWpKH3IiACIiACqSUgQUzt0KvjIiACIpBkAvn3TYKYPzNdIQIiIAIikEACEsQEDqq6JAIiIAIikD8BCWL+zMp1he4rAiIgAiJQRAL/BwAA//91vTt1AAAABklEQVQDACmnwpiwd26FAAAAAElFTkSuQmCC",
                "isCurrentNode": false
            }
        ],
        "recordStatus": 1,
        "signType": 0,
        "confirmType": 2,
        "saveFinishedImage": 0,
        "confirmImageFieldId": "",
        "finishedImageUrl": "",
        "userConfigDTO": {
            "openid": "ou_995328b088836a664c4340dd5b9f7f08",
            "tenantId": "2cdea2cc7e4d175d",
            "totalAmount": 30,
            "usedAmount": 2,
            "remainingAmount": 28,
            "giftAmount": null,
            "expiredTime": "2026-12-16 11:19:18",
            "isExpired": false,
            "createTime": null,
            "modifyTime": null,
            "hasMobile": false,
            "corpName": null,
            "userName": null,
            "mobile": null
        }
    },
    "ok": true
}
```


