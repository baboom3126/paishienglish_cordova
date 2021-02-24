var div_opacity = function () {
    $('body').append(`<div id="div_opacity"><div class="div_opacity"></div>
        <div class="div_loading">
            <div class="card" style="
    padding-top: 65px;
    padding-bottom: 65px;
    text-align: center;
    font-size: large;
    font-weight: bold;border-radius:10px;">

                <span style="font-size: x-large;" >
            是否要登出?</span>
            </div>
                    <div class="row">
                    <div class="col s1"></div>
                    <div class="col s4" style="text-align: center;padding:15px;background-color: #03a9f4;border-radius:10px;" onclick="javascript:btn_logout()">
                        <a style="color: white;">確認</a>
                    </div>
                    <div class="col s2"></div>
                    <div class="col s4" style="text-align: center;padding:15px; background-color:#03a9f4; border-radius:10px;" onclick="javascript:remove_div_opacity()">
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