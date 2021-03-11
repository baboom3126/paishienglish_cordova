var div_opacity = function () {
    $('body').append(`<div id="div_opacity"><div class="div_opacity"></div>
        <div class="div_loading">
            <div class="card" style="
    padding-top: 65px;
    padding-bottom: 65px;
    text-align: center;
    border-radius: 15px;
    color: #7fa8e6;
    box-shadow: 0px 30px 30px #0000001A;
    ">

                <span style="font-size: x-large;" >
            是否要登出?</span>
            </div>
                    <div class="row" style="margin-top: 30px;">
                    <div class="col s1"></div>
                    <div class="col s4" style="text-align: center;padding:13px;background-color: #7FA8E6;border-radius:4px;" onclick="javascript:btn_logout()">
                        <a style="color: white;">確認</a>
                    </div>
                    <div class="col s2"></div>
                    <div class="col s4" style="text-align: center;padding:13px; background-color:#9FC5FF; border-radius:4px;" onclick="javascript:remove_div_opacity()">
                        <a style="color: white;">返回</a>
                    </div>
                    <div class="col s1"></div>

                    </div>

        </div>
        </div>`)
}

var remove_div_opacity = function () {
    $('#div_opacity').remove()
}

var btn_logout = function (){
    console.log('btn_logout')
    localStorage.clear()
    location.href = 'login.html'

}

if(localStorage.getItem('student')==null){
    location.href='login.html'
}