var urlKeyValue = location.href.split('?')[1]
var splitUrlKeyValue = urlKeyValue.split('&')
var thisChapter = {}
for (var i in splitUrlKeyValue) {
    var tempURL = splitUrlKeyValue[i].split('=')
    thisChapter[tempURL[0]] = tempURL[1]
}

var filterDeck;
var wordListArray = []

$(document).ready(function () {

    $('#div_chapterName').html('<img src="./img/main/iconBACKWARD@3x.png" height="18"> &nbsp' + decodeURIComponent(thisChapter.chapterName))
    var textbookContentChapterDeck = JSON.parse(localStorage.getItem('textbookContentChapterDeck'))
    if (textbookContentChapterDeck == null) {

    } else {
        filterDeck = textbookContentChapterDeck.filter(function (item, index, array) {
            return item.TextbookContentChapterId == thisChapter.chapterId
        })
        showWordList(filterDeck)
    }

    for (let i in filterDeck) {
        wordListArray.push(filterDeck[i].TheWord)
    }

})

var showWordList = function (data) {
    var appendHtml = ``
    for (let i in data) {
        appendHtml += `    <div class="row div_word_row" onclick="javascript:show_word('${data[i].TheWord}')">
                            <div class="col s10">
                                <div class="">
                                ${data[i].TheWord}
                                </div>

                            </div>
                            <div class="col s2">
                                <div class="div_word_element_right">
                                    <img src="./img/main/iconSTAR@3x.png" height="16">
<!--                                    <img src="./img/main/iconSTAR_selected@3x.png" height="16">-->

                                </div>
                            </div>
                        </div>`
    }
    $('#div_word_list').html(appendHtml)
}

var show_word = function (word) {
    $('body').css('overflow-y', 'hidden')
    var wordInfo = JSON.parse(localStorage.getItem('word')).find(function (item, index, array) {
        return item.TheWord == word
    })
    if (wordInfo.AudioPath != "") {
        $('#audio_source').attr('src', wordInfo.AudioPath)
        audio_word.load()
        audio_word.play()
    }
    var wordSen = JSON.parse(localStorage.getItem('wordSen')).filter(function (item, index, array) {
        return item.TheWord == word
    })

    var wordDef = JSON.parse(localStorage.getItem('wordDef')).filter(function (item, index, array) {
        return item.TheWord == word
    })
    var appendHtmlForWordInfo = `<div class="back_card_word_title">${word}<div class="back_card_word_speech">${wordInfo.Speech}</div></div>`
    var appendHtmlForWordSen = `<div class="back_card_word_sen"><div style="color: #707070;font-weight: 600">例句</div>`
    var appendHtmlForWordDef = `<div class="back_card_word_def"><div style="color: #707070;font-weight: 600">解釋</div>`


    for (let i in wordDef) {
        console.log(wordDef[i])
        appendHtmlForWordDef += `<div class="back_card_word_def_chi"> ${parseInt(i) + 1}. ${wordDef[i].ChiDefinition}</div><br>`
    }
    appendHtmlForWordDef += `</div>`

    for (let i in wordSen) {
        appendHtmlForWordSen += `<div class="back_card_word_sen_eng"> ${parseInt(i) + 1}. ${wordSen[i].EngSentence.replace(word, '<span style="color:#E25A53">' + word + '</span>')}</div>${wordSen[i].ChiSentence}<br><br>`
    }
    appendHtmlForWordSen += `</div>`
    let device_height = document.documentElement.clientHeight

    $('body').append(`<div id="div_opacity">
                            <div class="div_opacity"  onclick="javascript:close_word(this)"></div>
                            <div class="div_previous_word waves-effect" onclick="javascript:show_previous_word('${word}')"><img src="./img/btn/buttonBACK@3x.png" height="41" width="41"></div>                            
                            <div class="div_next_word waves-effect" onclick="javscript:show_next_word('${word}')"><img src="./img/btn/buttonNEXT@3x.png" height="41" width="41"></div>

                            <div class="flip-container" onclick="this.classList.toggle('hover');" style="top:${device_height * 0.15}px">
                                    <div class="flipper">
                                        <div class="front div-deck-card align-middle" style="height:${device_height * 0.7}px;">
                                            <div style="top:42%;position:relative;text-align: center;color: #7FA8E6;font-size: 26px;">
                                                ${word}<br><div style="font-size: 14px;">adj.</div>
                                            </div>

                                        </div>
                                        <div class="back div-deck-card" style="height:${device_height * 0.7}px;">
                                            <div class="row">
                                                <div class="back_card_info">
                                                
                                                ${appendHtmlForWordInfo}
                                                ${appendHtmlForWordDef}
                                                ${appendHtmlForWordSen}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                      </div>
                            
    `)


}

var close_word = function (that) {
    console.log($(that).parent().remove())
    $('body').css('overflow-y', '')

}

var show_previous_word = function (word) {
    let wordIndex = wordListArray.findIndex(function (element) {
        return element == word
    })

    if (wordIndex > 0) {
        $('#div_opacity').remove()
        show_word(wordListArray[wordIndex - 1])
    }else{
        alert('前面沒有單字了')
    }
}

var show_next_word = function (word) {
    let wordIndex = wordListArray.findIndex(function (element) {
        return element == word
    })

    if (wordIndex < wordListArray.length-1) {
        $('#div_opacity').remove()
        show_word(wordListArray[wordIndex + 1])
    }else{
        alert('後面沒有單字了')
    }
}

var page_go_back = function (){
    window.history.back();

}