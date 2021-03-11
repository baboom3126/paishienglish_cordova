var urlKeyValue = location.href.split('?')[1]
var splitUrlKeyValue = urlKeyValue.split('&')
var thisChapter = {}
for (var i in splitUrlKeyValue) {
    var tempURL = splitUrlKeyValue[i].split('=')
    thisChapter[tempURL[0]] = tempURL[1]
}

$(document).ready(function () {

    $('#div_chapterName').text(decodeURIComponent(thisChapter.chapterName))
    var textbookContentChapterDeck = JSON.parse(localStorage.getItem('textbookContentChapterDeck'))
    if (textbookContentChapterDeck == null) {

    } else {
        var filterDeck = textbookContentChapterDeck.filter(function (item, index, array) {
            return item.TextbookContentChapterId == thisChapter.chapterId
        })
        showWordList(filterDeck)
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
                                    ☆
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
                            <div class="div_opacity" onclick="javascript:close_word(this)"></div>
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