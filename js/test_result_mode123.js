$(document).ready(function () {
    $('ul.tabs').tabs({
        swipeable: true,
        responsiveThreshold: 1920
    });

    show_word_socre_list()

});


var show_word = function (wordId) {
    $('body').css('overflow-y', 'hidden')
    var wordInfo = JSON.parse(localStorage.getItem('word')).filter(function (item, index, array) {
        return item.WordId == wordId
    })

    var word_theWord = wordInfo[0].TheWord
    var word_audioPath = wordInfo[0].AudioPath
    var word_remarks = wordInfo[0].Remarks

    let wordInfo_filter_by_wordDef = {}

    for (let i in wordInfo) {
        if (!wordInfo_filter_by_wordDef[wordInfo[i].WordDefId]) {
            wordInfo_filter_by_wordDef[wordInfo[i].WordDefId] = []
            wordInfo_filter_by_wordDef[wordInfo[i].WordDefId].push(wordInfo[i])
        } else {
            wordInfo_filter_by_wordDef[wordInfo[i].WordDefId].push(wordInfo[i])
        }
    }

    if (word_audioPath != "null") {
        $('#audio_source').attr('src', word_audioPath)
        audio_word.load()
        audio_word.play()
    }
    var appendHtmlForWordInfo = `<div class="back_card_word_title">${word_theWord}</div>`

    ///
    let appendHtmlForWordBlocks = ``
    for (let i of Object.keys(wordInfo_filter_by_wordDef)) {
        appendHtmlForWordBlocks += `<div class="back_card_word_block">`
        appendHtmlForWordBlocks += `<div>解釋</div><div><span>${wordInfo_filter_by_wordDef[i][0].Speech === null ? '' : wordInfo_filter_by_wordDef[i][0].Speech} </span>${wordInfo_filter_by_wordDef[i][0].ChiDefinition}</div><br><div>例句</div>`
        let counter = 1
        for (let j of wordInfo_filter_by_wordDef[i]) {
            ///for sentences
            if (j.EngSentence || j.ChiSentence) {
                appendHtmlForWordBlocks += `<div class="back_card_word_sen_eng">${counter}. ${j.EngSentence}</div>
                                        <div class="back_card_word_def_chi">${j.ChiSentence}</div><br>
                                        `
                counter = counter + 1
            }
        }
        appendHtmlForWordBlocks += `</div>`
    }

    appendHtmlForWordBlocks = appendHtmlForWordBlocks.replaceAll(word_theWord, '<span class="word_highlight">' + word_theWord + '</span>')


    let device_height = document.documentElement.clientHeight

    $('body').append(`<div id="div_opacity">
                            <div class="div_opacity"  onclick="javascript:close_word(this)"></div>

                            <div class="flip-container" onclick="this.classList.toggle('hover');" style="top:${device_height * 0.15}px">
                                    <div class="flipper">
                                        <div class="front div-deck-card align-middle" style="height:${device_height * 0.7}px;">
                                            <div style="top:42%;position:relative;text-align: center;color: #7FA8E6;font-size: 26px;">
                                                ${word_theWord}<br><div style="font-size: 14px;">${wordInfo[0].Speech === null ? '' : wordInfo[0].Speech}</div>
                                            </div>

                                        </div>
                                        <div class="back div-deck-card" style="height:${device_height * 0.7}px;">
                                            <div class="row">
                                                <div class="back_card_info">
                                                
                                                ${appendHtmlForWordInfo}
                                                ${appendHtmlForWordBlocks}
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





var show_word_socre_list = function () {

    var urlParam = location.href.split('?')[1]
    let mode = urlParam.split('mode=')[1]


    if (mode === '1') {

        var test_result_mode1 = localStorage.getItem('test_result_mode1')
        if(test_result_mode1==null){
            swal.fire('沒有成績')
        }
        let JSON_test_result_data = JSON.parse(test_result_mode1)
        show_word_socre_list_for_every_mode(JSON_test_result_data)

    } else if (mode === '2') {
        var test_result_mode2 = localStorage.getItem('test_result_mode2')
        if(test_result_mode2==null){
            swal.fire('沒有成績')
        }
        let JSON_test_result_data = JSON.parse(test_result_mode2)
        show_word_socre_list_for_every_mode(JSON_test_result_data)


    } else if (mode === '3') {
        var test_result_mode3 = localStorage.getItem('test_result_mode3')
        if(test_result_mode3==null){
            swal.fire('沒有成績')
        }
        let JSON_test_result_data = JSON.parse(test_result_mode3)
        show_word_socre_list_for_every_mode(JSON_test_result_data)

    }


}

var show_word_socre_list_for_every_mode = function (data) {

    let appendHTMLforGood = ``
    let appendHTMLforNormal = ``
    let appendHTMLforBad = ``

    let goodCount = parseInt(data.good.length)
    let normalCount = parseInt(data.normal.length)
    let badCount = parseInt(data.bad.length)

    let scoreNumerator = goodCount
    let socredenominator = parseInt(data.good.length)+normalCount+badCount

    ///// pie chart
    const pieData = {
        labels: [
            '我認得的',
            '我不確定的',
            '我不記得的'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [goodCount, normalCount, badCount],
            backgroundColor: [
                '#A5E6C3',
                '#FFF29E',
                '#FFA3A3'
            ],
            hoverOffset: 4
        }]
    };
    const config = {
        type: 'pie',
        data: pieData,
    };
    var myChart = new Chart(
        document.getElementById('myChart'),
        config
    );


    ///


    $('#div_score').text('得分：'+scoreNumerator+'/'+socredenominator)

    for (let i of data.good) {
        appendHTMLforGood += `<div class="row div_word_row" onclick="javascript:show_word('${i.id}')">${i.word}</div>`
    }
    for (let i of data.normal) {
        appendHTMLforNormal += `<div class="row div_word_row" onclick="javascript:show_word('${i.id}')">${i.word}</div>`

    }
    for (let i of data.bad) {
        appendHTMLforBad += `<div class="row div_word_row" onclick="javascript:show_word('${i.id}')">${i.word}</div>`

    }
    $('#div_tab_for_good').html(appendHTMLforGood)
    $('#div_tab_for_normal').html(appendHTMLforNormal)
    $('#div_tab_for_bad').html(appendHTMLforBad)
}