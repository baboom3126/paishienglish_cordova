let register_account = function () {
    let user_name = $('#user_name').val()
    let user_email = $('#user_account').val()
    let user_password = $('#user_password').val()
    let user_password_confirm = $('#user_password_confirm').val()

    if (user_name == "" || user_email == "" || user_password == "" || user_password_confirm == "") {
        alert('請輸入註冊資訊')
    }else if(!validateEmail(user_email)){
        alert('Email格式錯誤')
    }else if(user_password!=user_password_confirm){
        alert('二次確認密碼錯誤')
        $('#user_password_confirm').val('')
        $('#user_password').val('')
    }else{

        let postData = {}
        postData.name = user_name
        postData.email = user_email
        postData.pwd = salt(user_password+salt("paishienglishsalt"))
        let settings = {
            "url": baseUrl+"app/studentRegister",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify(postData),
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            if(response.message == "success"){
                alert('註冊成功 返回登入頁面')
                location.href = "./login.html"
            }else if(response.data=='multiple email'){
                alert('相同的信箱 已註冊帳號')
                $('#user_password_confirm').val('')
                $('#user_password').val('')
            }else{
                alert('註冊失敗 請洽管理員')

            }
        });






    }

}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

!function(n){"use strict";function t(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function r(n,r,e,u,o,c){return t((f=t(t(r,n),t(u,c)))<<(i=o)|f>>>32-i,e);var f,i}function e(n,t,e,u,o,c,f){return r(t&e|~t&u,n,t,o,c,f)}function u(n,t,e,u,o,c,f){return r(t&u|e&~u,n,t,o,c,f)}function o(n,t,e,u,o,c,f){return r(t^e^u,n,t,o,c,f)}function c(n,t,e,u,o,c,f){return r(e^(t|~u),n,t,o,c,f)}function f(n,r){n[r>>5]|=128<<r%32,n[14+(r+64>>>9<<4)]=r;var f,i,a,h,d,g=1732584193,l=-271733879,v=-1732584194,C=271733878;for(f=0;f<n.length;f+=16)i=g,a=l,h=v,d=C,g=e(g,l,v,C,n[f],7,-680876936),C=e(C,g,l,v,n[f+1],12,-389564586),v=e(v,C,g,l,n[f+2],17,606105819),l=e(l,v,C,g,n[f+3],22,-1044525330),g=e(g,l,v,C,n[f+4],7,-176418897),C=e(C,g,l,v,n[f+5],12,1200080426),v=e(v,C,g,l,n[f+6],17,-1473231341),l=e(l,v,C,g,n[f+7],22,-45705983),g=e(g,l,v,C,n[f+8],7,1770035416),C=e(C,g,l,v,n[f+9],12,-1958414417),v=e(v,C,g,l,n[f+10],17,-42063),l=e(l,v,C,g,n[f+11],22,-1990404162),g=e(g,l,v,C,n[f+12],7,1804603682),C=e(C,g,l,v,n[f+13],12,-40341101),v=e(v,C,g,l,n[f+14],17,-1502002290),g=u(g,l=e(l,v,C,g,n[f+15],22,1236535329),v,C,n[f+1],5,-165796510),C=u(C,g,l,v,n[f+6],9,-1069501632),v=u(v,C,g,l,n[f+11],14,643717713),l=u(l,v,C,g,n[f],20,-373897302),g=u(g,l,v,C,n[f+5],5,-701558691),C=u(C,g,l,v,n[f+10],9,38016083),v=u(v,C,g,l,n[f+15],14,-660478335),l=u(l,v,C,g,n[f+4],20,-405537848),g=u(g,l,v,C,n[f+9],5,568446438),C=u(C,g,l,v,n[f+14],9,-1019803690),v=u(v,C,g,l,n[f+3],14,-187363961),l=u(l,v,C,g,n[f+8],20,1163531501),g=u(g,l,v,C,n[f+13],5,-1444681467),C=u(C,g,l,v,n[f+2],9,-51403784),v=u(v,C,g,l,n[f+7],14,1735328473),g=o(g,l=u(l,v,C,g,n[f+12],20,-1926607734),v,C,n[f+5],4,-378558),C=o(C,g,l,v,n[f+8],11,-2022574463),v=o(v,C,g,l,n[f+11],16,1839030562),l=o(l,v,C,g,n[f+14],23,-35309556),g=o(g,l,v,C,n[f+1],4,-1530992060),C=o(C,g,l,v,n[f+4],11,1272893353),v=o(v,C,g,l,n[f+7],16,-155497632),l=o(l,v,C,g,n[f+10],23,-1094730640),g=o(g,l,v,C,n[f+13],4,681279174),C=o(C,g,l,v,n[f],11,-358537222),v=o(v,C,g,l,n[f+3],16,-722521979),l=o(l,v,C,g,n[f+6],23,76029189),g=o(g,l,v,C,n[f+9],4,-640364487),C=o(C,g,l,v,n[f+12],11,-421815835),v=o(v,C,g,l,n[f+15],16,530742520),g=c(g,l=o(l,v,C,g,n[f+2],23,-995338651),v,C,n[f],6,-198630844),C=c(C,g,l,v,n[f+7],10,1126891415),v=c(v,C,g,l,n[f+14],15,-1416354905),l=c(l,v,C,g,n[f+5],21,-57434055),g=c(g,l,v,C,n[f+12],6,1700485571),C=c(C,g,l,v,n[f+3],10,-1894986606),v=c(v,C,g,l,n[f+10],15,-1051523),l=c(l,v,C,g,n[f+1],21,-2054922799),g=c(g,l,v,C,n[f+8],6,1873313359),C=c(C,g,l,v,n[f+15],10,-30611744),v=c(v,C,g,l,n[f+6],15,-1560198380),l=c(l,v,C,g,n[f+13],21,1309151649),g=c(g,l,v,C,n[f+4],6,-145523070),C=c(C,g,l,v,n[f+11],10,-1120210379),v=c(v,C,g,l,n[f+2],15,718787259),l=c(l,v,C,g,n[f+9],21,-343485551),g=t(g,i),l=t(l,a),v=t(v,h),C=t(C,d);return[g,l,v,C]}function i(n){var t,r="";for(t=0;t<32*n.length;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function a(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;for(t=0;t<8*n.length;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function h(n){var t,r,e="";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),e+="0123456789abcdef".charAt(t>>>4&15)+"0123456789abcdef".charAt(15&t);return e}function d(n){return unescape(encodeURIComponent(n))}function g(n){return function(n){return i(f(a(n),8*n.length))}(d(n))}function l(n,t){return function(n,t){var r,e,u=a(n),o=[],c=[];for(o[15]=c[15]=void 0,u.length>16&&(u=f(u,8*n.length)),r=0;r<16;r+=1)o[r]=909522486^u[r],c[r]=1549556828^u[r];return e=f(o.concat(a(t)),512+8*t.length),i(f(c.concat(e),640))}(d(n),d(t))}function v(n,t,r){return t?r?l(t,n):h(l(t,n)):r?g(n):h(g(n))}"function"==typeof define&&define.amd?define(function(){return v}):n.salt=v}(this);