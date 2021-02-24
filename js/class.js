var urlKeyValue = location.href.split('?')[1]
var splitUrlKeyValue = urlKeyValue.split('&')
var thisClass = {}
for (var i in splitUrlKeyValue) {
    var temp = splitUrlKeyValue[i].split('=')
    thisClass[temp[0]] = temp[1]
}



$(document).ready(function () {
    $('#div_className').text(decodeURIComponent(thisClass.className))

    getTextbookByClassId()

})

var getTextbookByClassId = function () {
    console.log('[AJAX] getAllClassByStudentId')
    let postData = {}
    postData.classId = thisClass.classId
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": baseUrl + "app/getTextbookByClassId",
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
        } else if (code == 200) {
            let data = response.data

            showDivChapterList(data)

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


var showDivChapterList = function (data) {
    console.log(data)
    var appendHtml = ``
    for (let i in data) {

        appendHtml += `
        <div class="row" style="margin-bottom: 0;">
        <div class="col s2" style="padding-top: 20px;padding-bottom: 20px;text-align: center; font-size: large;font-weight: bold;">
            >
        </div><a href="textbook.html?textbookId=${data[i].TextbookId}&textbookName=${data[i].TextbookName}">
        <div class="col s10" style="padding-top: 20px;padding-bottom: 20px;border-bottom: 1px solid #03a9f4;word-break: break-all">
            ${data[i].TextbookName}
        </div></a>
    </div>
    `
    }


    $('#div_textbookList').html(appendHtml)
}