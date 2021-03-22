let testWords = randomArray(getTestWordsByChapterInLocalStorage())
let testCount = 0;
$(document).ready(function () {


        nextCard(0)
        testCount = 1


})

let answer_click = function () {
    if(testCount==testWords.length){
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


let getCardHtmlForMode1ByWord = function (word) {
    let wordInfo = getWordInfo(word)
    let front_card_html = ``
    let wordDefHtml = ``
    for (let i in wordInfo.wordDef) {
        wordDefHtml += `
                       <div> ${parseInt(i) + 1}. ${wordInfo.wordDef[i].ChiDefinition}</div>
                       <br>
                        `
    }

    let wordSenHtml = ``
    for (let i in wordInfo.wordSen) {
        wordSenHtml += `
                        <div style="color: #7FA8E6;"> ${parseInt(i) + 1}. ${wordInfo.wordSen[i].EngSentence}</div>
                        <div>${wordInfo.wordSen[i].ChiSentence}</div>
                        <br>

        `

    }
    wordSenHtml = wordSenHtml.replaceAll(word,'<font color="E25A53">'+word+'</font>')
    ////only get the first sentence as example
    front_card_html+=`
        <div style="color: #7FA8E6;"> ${wordInfo.wordSen[0].EngSentence}</div>
        <br>
        `

    front_card_html = front_card_html.replaceAll(word,'<font color="E25A53">'+word+'</font>')


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
                        <div class="row" style="height: 20%;"></div>

                        <div class="row" style="">
                            <div class="col s12" style="text-align: center;font-size: 18px;color: #7FA8E6;">
                                ${front_card_html}
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
                                <span class="test_card_back_title">${word}</span><span
                                    style="color: #E25A53;font-size: 14px;margin-left: 10px;">${wordInfo.word.Speech}</span>
                            </div>
                            <div class="col s2">
                                <img src="./img/main/iconSTAR@3x.png" height="20" style="margin-top: 10px;">
                            </div>
                        </div>
                        <div class="row" style="margin-top: 5px;">
                            <div class="col s12"
                                 style="font-size: 14px;color: #707070;border-bottom: 1px solid #E1F2FF;padding-bottom: 5px;">
                                <span style="font-weight: bold;">解釋</span>
                                ${wordDefHtml}
                            </div>
                            <div class="col s12" style="font-size: 14px;color: #707070;margin-top: 5px;">
                                <span style="font-weight: bold;">例句</span>
                                ${wordSenHtml}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    
    
    `
    return cardHtml
}


