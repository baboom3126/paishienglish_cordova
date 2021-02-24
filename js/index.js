var studentId;

$(document).ready(function () {
    let studentInfo = JSON.parse(localStorage.getItem("student"))
    studentId = studentInfo.studentId
    $('#nav_student_name').text(studentInfo.name)

    getAllClassByStudentId()


})


var getAllClassByStudentId = function () {
    console.log('[AJAX] getAllClassByStudentId')
    let postData = {}
    postData.studentId = studentId
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": baseUrl + "app/getAllClassByStudentId",
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
            divShowClassList()


        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log('[FAIL] ')
        // swal.fire('沒有網路連線')
        console.log(jqXHR)
        console.log(textStatus)
        console.log(errorThrown)
        divShowClassList()

    });
}


var divShowClassList = function () {
    console.log('[INFO] divShowClassList')
    let data = JSON.parse(localStorage.getItem('classList'))
    if (data != undefined) {
        let appendHtml = ``
        for (let i in data) {
            appendHtml += `
                <div class="col s6">
            <div class="row">
                <div class="col s12 m7">
                    <a href="class.html?classId=${data[i].ClassId}&className=${encodeURIComponent(data[i].ClassName)}" class="card no_shadow" style="margin-bottom: 0px;">
                        <div class="" style="width: 100%;padding-top: 30px;padding-bottom:60px;background-color: #03a9f4;">
                        </div>
                        <div class="" style="padding: 12px;background-color:#e1f5fe;">
                            <div style="color:black;">${data[i].ClassName}</div>
                            <div style="color:grey;">${data[i].ClassDescription}&nbsp</div>
                        </div>

                    </a>
                </div>
            </div>
        </div>
        
        `
        }

        $('#div_classList').html(appendHtml)
    }else{
        swal.fire('沒有網路連線')
    }
}


var getAllData = function (){

}

var getAllWord = function (){

}


var join_class = function (){

    let classCode = $('#classCode').val()
    if(classCode==""){
        swal.fire('請輸入班級代碼')
    }else{
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
            divShowClassList()

        });
    }
}