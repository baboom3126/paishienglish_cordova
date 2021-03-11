var studentId;


$(document).ready(function () {
    let studentInfo = JSON.parse(localStorage.getItem("student"))
    studentId = studentInfo.studentId
    $('#nav_student_name').html('&nbsp&nbsp' + studentInfo.name)
    if (localStorage.getItem('class') == null) {
        downloadAllData()
    }else{
        index_show_class_list()
    }
    // downloadAllData()

})

var downloadAllData = function () {
    swal.showLoading()
    let postData = {}
    postData.studentId = studentId
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": baseUrl + "app/v2/downloadAllData",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache",
        },
        data: JSON.stringify(postData)
    }

    $.ajax(settings).done(function (response) {
        console.log(response)
        var code = response.code
        if (code != 200) {
            swal.fire('伺服器維修中')
        } else {

            for (i of Object.keys(response.data)) {
                localStorage.setItem(i, JSON.stringify(response.data[i]))
            }
            Swal.fire({
                title: '資料下載完成',
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: `確定`,
                denyButtonText: `No`,
            }).then((result) => {
                location.reload()
            })
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log('[FAIL] ')
        // swal.fire('沒有網路連線')
        console.log(jqXHR)
        console.log(textStatus)
        console.log(errorThrown)

    });
}


var join_class = function () {

    let classCode = $('#classCode').val()
    if (classCode == "") {
        swal.fire('請輸入班級代碼')
    } else {
        console.log('[AJAX] newClassStudentByCLassCode')
        let postData = {}
        postData.studentId = studentId
        postData.classCode = classCode
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": baseUrl + "app/newClassStudentByCLassCode",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
            },
            data: JSON.stringify(postData)
        }

        $.ajax(settings).done(function (response) {
            console.log(response)
            var code = response.code
            if (code != 200) {
                swal.fire('伺服器維修中')
            } else {
                let data = response.data.queryClassBySid

                localStorage.setItem('classList', JSON.stringify(data))
                Swal.fire({
                    title: '加入成功',
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: `確定`,
                    denyButtonText: `No`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        location.reload()
                    }
                })

            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log('[FAIL] ')
            // swal.fire('沒有網路連線')
            console.log(jqXHR)
            console.log(textStatus)
            console.log(errorThrown)

        });
    }
}


var index_show_class_list = function () {


    var classJson = JSON.parse(localStorage.getItem('class'))
    var appendHtmlForClassList = ``
    for (let i in classJson) {
        if (parseInt(i) % 4 == 0 || parseInt(i) % 4 == 3) {
            appendHtmlForClassList +=
                `        <div class="col s6">
                            <div class="row">
                                <div class="col s12 m7 ">
                                    <a href="class.html?classId=${classJson[i].ClassId}&className=${classJson[i].ClassName}" class="card no_shadow" style="margin-bottom: 0px;">
                                        <div class="div_border_top" style="width: 100%;padding-top: 60px;padding-bottom:60px;background-color: #9FC5FF;">
                                        </div>
                                        <div class="div_border_bottom" style="padding: 12px;background-color:#E3EEFF;">
                                            <div style="color:#7F7F7F;">${classJson[i].ClassName}&nbsp</div>
                                            <div style="color:#CCCCCC;">${classJson[i].ClassDescription}&nbsp</div>
                                        </div>

                                    </a>
                                </div>
                            </div>
                        </div>
                `
        } else {
            appendHtmlForClassList +=
                `        <div class="col s6">
                            <div class="row">
                                <div class="col s12 m7 ">
                                    <a href="class.html?classId=${classJson[i].ClassId}&className=${classJson[i].ClassName}" class="card no_shadow" style="margin-bottom: 0px;">
                                        <div class="div_border_top" style="width: 100%;padding-top: 60px;padding-bottom:60px;background-color: #E1F2FF;">
                                        </div>
                                        <div class="div_border_bottom" style="padding: 12px;background-color:#F6FBFF;">
                                            <div style="color:#7F7F7F;">${classJson[i].ClassName}&nbsp</div>
                                            <div style="color:#CCCCCC;">${classJson[i].ClassDescription}&nbsp</div>
                                        </div>

                                    </a>
                                </div>
                            </div>
                        </div>
                `
        }
    }
    $('#div_classList').html(appendHtmlForClassList)
}