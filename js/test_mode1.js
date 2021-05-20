let testWords = randomArray(getTestWordsByChapterInLocalStorage())
let testCount = 0;
let good = []
let normal = []
let bad = []
$(document).ready(function () {


        nextCard(0)
        testCount = 1


})

let answer_click = function (status) {
    let id = testWords[testCount-1]
    let word = getWordInfo(id)[0].TheWord

    switch(status){
        case "good":
            good.push({id:id,word:word})
            break;
        case "normal":
            normal.push({id:id,word:word})
            break;
        case "bad":
            bad.push({id:id,word:word})
            break;
    }


    if(testCount==testWords.length){
        let test_result_mode1 = {}
        test_result_mode1.good = good
        test_result_mode1.normal = normal
        test_result_mode1.bad = bad
        localStorage.setItem("test_result_mode1",JSON.stringify(test_result_mode1))
        $('#div_answers').css('margin-top','15%')
        $('#div_answers').html('<a href="./test_result_mode.html?mode=1" class="btn confirm_button waves-effect">結束測驗</a>')
        console.log('done')
    }else{
        currentWord = testWords[testCount]
        nextCard(testCount)
    }



}


let nextCard = function (index) {

    let cardHtml = getCardHtmlForMode1ByWord(testWords[index])
    $('#word_card').html(cardHtml)
    testCount = testCount + 1
    $('#test_progressCounter').text(testCount+'/'+testWords.length)
    $('#test_progressBar').css('width',(testCount/testWords.length)*100+'%')
}


let getCardHtmlForMode1ByWord = function (wordId) {
    let wordInfo = getWordInfo(wordId)
    let word = wordInfo[0].TheWord

    let appendDetailHtml = ``
    for (let i of wordInfo) {
        appendDetailHtml += `<div class="back_card_word_block"><b><span style="color:grey;">解釋</span><p><span style="color: green;">${i.Speech===null?'':i.Speech} </span> ${i.ChiDefinition}</b> </p><b><span style="color:grey;">例句</span></b>`
        let counter = 1
        for (let j of i.wordSen) {
            appendDetailHtml += `<p style="color: #7FA8E6;">${counter}. ${j.EngSentence}</p><p >${j.ChiSentence}</p>`
            counter = counter + 1
        }
        appendDetailHtml += `</div>`
    }

    appendDetailHtml = appendDetailHtml.replaceAll(word,'<span class="word_highlight">'+word+'</span>')


    let cardHtml = `
            <div class="flip-container" onclick="this.classList.toggle('hover');">
            <div class="flipper">
                <div class="front align-middle">
                    <div class="test_card">
                        <div class="row" style="height: 5%;">
                        </div>
                        <div class="row" style="height: 15%;">
                            <div class="col s10">

                            </div>
                            <div class="col s2">
                                <img src="./img/main/iconSTAR@3x.png" height="20" style="margin-top: 10px;">
                            </div>
                        </div>
                        <div class="row" style="height: 22%;"></div>

                        <div class="row" style="">
                            <div class="col s12" style="text-align: center;font-size: 26px;color: #7FA8E6;">
                                ${word}
                            </div>

                        </div>
                    </div>

                </div>
                <div class="back ">
                    <div class="test_card">
                        <div class="row" style="height: 5%;">
                        </div>
                        <div class="row" style="height: 15%;border-bottom: 1px solid #E1F2FF;">
                            <div class="col s10">
                                <span class="test_card_back_title">${word}</span>
                            </div>
                            <div class="col s2">
                                <img src="./img/main/iconSTAR@3x.png" height="20" style="margin-top: 10px;">
                            </div>
                        </div>
                        <div class="row" style="margin-top: 5px;">
                            <div class="col s12" style="font-size: 14px;color: #707070;padding-bottom: 5px;">
                                ${appendDetailHtml}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    
    
    `
    return cardHtml
}


