let deviceHeight = document.documentElement.clientHeight
let testWords = randomArray(getTestWordsByChapterInLocalStorage())
// let testWords = ["competence",  "stockpile", "trigger","consumer", "phenomenon", "ration"]
let testCount = 0;
let correct = []
let wrong = []
$(document).ready(function () {

    $('#div_row1').css('height', deviceHeight / 10 * 1 + 'px')
    $('#div_row2').css('height', deviceHeight / 10 * 1 + 'px')
    $('#div_row3').css('height', deviceHeight / 10 * 5 + 'px')
    $('#div_row4').css('height', deviceHeight / 10 * 1 + 'px')
    $('#div_row4_1').css('height', deviceHeight / 10 * 1 + 'px')

    $('#div_row5').css('height', deviceHeight / 10 * 1 + 'px')


    $('#div_input').focusin(function () {
        $('#div_row1').hide()
        $('#div_row2').hide()
        $('#div_row5').hide()
        $('#test_card_for_mode45').css('height', '98%')
        $('#div_row3').css('height', deviceHeight / 10 * 5 - 20 + 'px')

    })

    $('#div_input').focusout(function () {
        setTimeout(function () {

            $('.test_card_for_mode45').css('height', '90%')
            $('#div_row3').css('height', deviceHeight / 10 * 5 + 'px')

            $('#div_row1').show()
            $('#div_row2').show()
            $('#div_row5').show()
        }, 50)

    })

    $('#btn_start').click(function () {
        $('#btn_start').remove()
        $('#div_start').remove()

        init_test()

    })

    $('#test_card_for_mode45').click(function () {
        audio_word.play()
    })


    $('#confirm_answer_button').click(function () {
        let answer = $('#input_test_mode4_answer').val().toLowerCase()
        if (answer === "") {

            M.toast({html: '請輸入答案', displayLength: 1000})

        } else {

            $('#confirm_answer_button').hide()
            $('#btn_nextWord').show()

            show_wordDetail()
            $('#span_correct_or_wrong').show()

            if (answer == getWordInfo(testWords[testCount]).word.TheWord.toLowerCase()) {


                correct.push(testWords[testCount])
                $('#span_correct_or_wrong').css('color', '#7FA8E6')
                $('#span_correct_or_wrong').text('答對了')

                // M.toast({html: '正確', displayLength: 1000, classes: 'green'})


            } else {

                wrong.push(testWords[testCount])
                $('#span_correct_or_wrong').css('color', '#E25A53')
                $('#span_correct_or_wrong').text('答錯了')

                // M.toast({html: '錯誤 正確答案為' + testWords[testCount], displayLength: 1000, classes: 'red'})


            }


        }

    })


    $('#btn_nextWord').click(function () {


        if (testCount == testWords.length - 1) {
            $('#btn_nextWord').text('測驗結束')
            console.log('done')
            let test_result = {}
            test_result.correct = correct
            test_result.wrong = wrong

            localStorage.setItem('test_result_mode5', JSON.stringify(test_result))


        } else {
            $('#input_test_mode4_answer').val('')

            $('#span_correct_or_wrong').hide()
            $('#btn_nextWord').hide()
            $('#confirm_answer_button').show()
            testCount = testCount + 1
            $('#test_progressCounter').text((testCount + 1) + '/' + testWords.length)
            $('#test_progressBar').css('width', ((testCount + 1) / testWords.length) * 100 + '%')
            next_word()
        }


    })


})

let init_test = function () {
    $('#test_progressCounter').text((testCount + 1) + '/' + testWords.length)
    $('#test_progressBar').css('width', ((testCount + 1) / testWords.length) * 100 + '%')

    let currentWordInfo = getWordInfo(testWords[0])

    let sentenceHtml = ``
    if (currentWordInfo.wordSen.length == 0) {
        sentenceHtml = `<div><span style="color: #7FA8E6;">此單字沒有例句</span></div>`
        $('#input_test_mode4_answer').val(currentWordInfo.word.TheWord)

    } else {
        for (let i in currentWordInfo.wordSen) {
            if (parseInt(i) > 1) {
                break
            }
            sentenceHtml += `   <span style="color: #7FA8E6;">${currentWordInfo.wordSen[i].EngSentence}</span>
                            <br>
                            <span style="color: #707070;">${currentWordInfo.wordSen[i].ChiSentence}</span>
                            <br><br>
                        `
        }
        if (sentenceHtml.includes(currentWordInfo.word.TheWord)) {
            sentenceHtml = sentenceHtml.replaceAll(currentWordInfo.word.TheWord, '<span style="text-decoration: underline;">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>')
        } else if (sentenceHtml.includes(currentWordInfo.word.TheWord.slice(0, -1))) {
            sentenceHtml = sentenceHtml.replaceAll(currentWordInfo.word.TheWord.slice(0, -1), '<span style="text-decoration: underline;">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>')

        }
    }

    $('#div_sentence').html(sentenceHtml)


    if (currentWordInfo.word.AudioPath != "") {
        $('#audio_source').attr('src', currentWordInfo.word.AudioPath)

    } else {


    }


}


let next_word = function () {
    let currentWordInfo = getWordInfo(testWords[testCount])


    $('#test_card_for_mode45_back').html('')
    $('#test_card_for_mode45').show()


    let sentenceHtml = ``
    if (currentWordInfo.wordSen.length == 0) {
        sentenceHtml = `<div><span style="color: #7FA8E6;">此單字沒有例句</span></div>`
        $('#input_test_mode4_answer').val(currentWordInfo.word.TheWord)
    } else {
        for (let i in currentWordInfo.wordSen) {
            if (parseInt(i) > 1) {
                break
            }
            sentenceHtml += `   <span style="color: #7FA8E6;">${currentWordInfo.wordSen[i].EngSentence}</span>
                            <br><br>
                            <span style="color: #707070;">${currentWordInfo.wordSen[i].ChiSentence}</span>
                            <br>
                        `
        }

        if (sentenceHtml.includes(currentWordInfo.word.TheWord)) {
            sentenceHtml = sentenceHtml.replaceAll(currentWordInfo.word.TheWord, '<span style="text-decoration: underline;">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>')
        } else if (sentenceHtml.includes(currentWordInfo.word.TheWord.slice(0, -1))) {
            sentenceHtml = sentenceHtml.replaceAll(currentWordInfo.word.TheWord.slice(0, -1), '<span style="text-decoration: underline;">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>')

        }
    }
    $('#div_sentence').html(sentenceHtml)


    $('#test_card_for_mode45_back').hide()

}

let show_wordDetail = function () {

    let currentWordInfo = getWordInfo(testWords[testCount])
    let wordDefHtml = ``
    let wordSenHtml = ``

    for (let i in currentWordInfo.wordDef) {
        wordDefHtml += `<div> ${parseInt(i) + 1}. ${currentWordInfo.wordDef[i].ChiDefinition}</div><br>`
    }

    for (let i in currentWordInfo.wordSen) {
        wordSenHtml += `<div style="color: #7FA8E6;"> ${parseInt(i) + 1}. ${currentWordInfo.wordSen[i].EngSentence}</div>
                        <div>${currentWordInfo.wordSen[i].ChiSentence}</div>
                        <br>`
    }

    wordSenHtml = wordSenHtml.replaceAll(testWords[testCount], '<font color="E25A53">' + testWords[testCount] + '</font>')

    $('#test_card_for_mode45').hide()

    $('#test_card_for_mode45_back').html(`
    
    <div class="" style="height:100%;">
                        <div class="row" style="height: 5%;">
                        </div>
                        <div class="row" style="height: 15%;border-bottom: 1px solid #E1F2FF;">
                            <div class="col s10">
                                <span class="test_card_back_title">${currentWordInfo.word.TheWord}</span><span style="color: #E25A53;font-size: 14px;margin-left: 10px;">${currentWordInfo.word.Speech}</span>
                            </div>
                            <div class="col s2">
                                <img src="./img/test/iconSOUNDON@3x.png" height="20" style="margin-top: 10px;">
                            </div>
                        </div>
                        <div class="row" style="margin-top: 5px;">
                            <div class="col s12" style="font-size: 14px;color: #707070;border-bottom: 1px solid #E1F2FF;padding-bottom: 5px;">
                                <span style="font-weight: bold;">解釋</span>
                                
                       ${wordDefHtml}
                        
                            </div>
                            <div class="col s12" style="font-size: 14px;color: #707070;margin-top: 5px;">
                                <span style="font-weight: bold;">例句</span>
                                
                        ${wordSenHtml}

        

                            </div>
                        </div>
                    </div>
    
    `)

    $('#test_card_for_mode45_back').show()

}


let play_audio = function () {
    audio_word.load()
    audio_word.play()
}