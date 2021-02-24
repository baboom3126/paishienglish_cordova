var urlKeyValue = location.href.split('?')[1]
var splitUrlKeyValue = urlKeyValue.split('&')
var thisTextbook = {}
for (var i in splitUrlKeyValue) {
    var tempURL = splitUrlKeyValue[i].split('=')
    thisTextbook[tempURL[0]] = tempURL[1]
}



$(document).ready(function () {
    $('#div_textbookName').text(decodeURIComponent(thisTextbook.textbookName))

    getTextbookInfo()

})



var getTextbookInfo = function (){
    console.log('[AJAX] getTextbookInfo')
    let postData = {}
    postData.textbookId = thisTextbook.textbookId
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": baseUrl + "app/getTextbookInfo",
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

            showDivTextbookInfos(data)

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


var showDivTextbookInfos = function (data){

    var temp = {}
    for(var i in data){
        if(temp[data[i].TextbookContentId]==undefined){
            temp[data[i].TextbookContentId]=[]
            temp[data[i].TextbookContentId].push(data[i])
        }else{
            temp[data[i].TextbookContentId].push(data[i])

        }
    }
    console.log(temp)
    var appendHTML = ``
    for(var i of Object.keys(temp)){
        appendHTML+=`    
                        <li>
                            <div class="collapsible-header"><i class="fa fa-book" aria-hidden="true"></i>${temp[i][0].TextbookContentName}</div>
                            <div class="collapsible-body" style="background-color: white;">
                        `

        var tempHTML = ``

        for(var j of temp[i]){
            console.log(j)
            appendHTML += `<a href="chapter.html?chapterId=${j.TextbookContentChapterId}" 
                        class="btn no_shadow a_for_chapter" style="">
                    ${j.TextbookContentChapterName}
                    </a>`
        }

        appendHTML+=`    
            </div>
        </li>
    `
    }


    $('#div_textbookInfo').html(appendHTML)

    var elem = document.querySelector('.collapsible.expandable');
    var instance = M.Collapsible.init(elem, {
        accordion: false
    });
}
