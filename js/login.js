var btn_login = function (){
    var account = $('#user_account').val()
    var password = $('#user_password').val()

    if(account==''||password==''){
        swal.fire('請輸入帳號密碼')
    }else{
        let postData = {}
        postData.account = account
        postData.password = password
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": baseUrl+"app/login",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
            },
            data:JSON.stringify(postData)
        }

        $.ajax(settings).done(function (response) {
            var code = response.code
            if(code !=200){
                swal.fire('伺服器維修中')
            }else{
                let data = response.data
                if(data.studentId != null){
                    localStorage.setItem('student',JSON.stringify(data))
                    location.href = './index.html'
                }else{
                    swal.fire('帳號密碼錯誤')
                    $('#user_password').val('')
                }
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log('[FAIL] ')
            swal.fire('伺服器維修中')
            console.log(jqXHR)
            console.log(textStatus)
            console.log(errorThrown)
        });




    }

}