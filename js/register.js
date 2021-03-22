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
    }

}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}