let W_showTap_array = [];
const W_tapShow_array = localStorage.getItem("tapShow_array");
if (W_tapShow_array != null) {
    const W_parsed_tapShow_array = JSON.parse(M_tapShow_array);
    W_showTap_array = W_parsed_tapShow_array;
}
let DIVNAME = "";
let doxsize = [150,150];

function doxSize(DIVNAME){
    doxsize = saveWord(DIVNAME, 8);
}

function skill_apply_word(txt) {
    const div_wordName = `s${txt}`;
    //console.log(txt);
    doxSize(`s${txt}`);
    if (div_wordName.charAt(div_wordName.length - 1) == `3`) {
        const w_divWord = document.querySelector(`.${div_wordName}`);

        const getSaveWord = localStorage.getItem(div_wordName);
        const getSaveWordPar = JSON.parse(getSaveWord);

        const firstSpan = document.createElement("span");
        const QandAForm = document.createElement("form");
        const questionInput = document.createElement("input");
        const answerInput = document.createElement("input");
        const QandASubmitBtn = document.createElement("button");
        QandASubmitBtn.type = "submit";
        QandASubmitBtn.innerText = "sub";
        QandAForm.addEventListener("submit", newQAndA);
        QandAForm.appendChild(questionInput);
        QandAForm.appendChild(answerInput);
        QandAForm.appendChild(QandASubmitBtn);
        firstSpan.appendChild(QandAForm);

        const viewSpan = document.createElement("span");
        const viewText = document.createElement("span");
        viewText.innerText = "view";
        const viewQuestionSelect = document.createElement("select");
        viewQuestionSelect.addEventListener("change", pageSelectEvent)

        let lastPage = 1;
        let limitPage = 2;
        let limitPage2 = [1, 1];
        let sortIndex = 0;
        let randomArray = [];
        let OXandAnswer = 0;
        let countCheckArray = [null, null, null];
        let percentArray = [[0,0.0],[0,0.0],[0,0.0]];
        if (getSaveWordPar != null && getSaveWordPar.length != null && getSaveWordPar.length != 0) {
            limitPage = getSaveWordPar.length;
            if (getSaveWordPar[0][0] != null) {
                limitPage2 = getSaveWordPar[0][0];
            }
            if (getSaveWordPar[0][1] != null) {
                lastPage = getSaveWordPar[0][1];
                if (limitPage2[1] < lastPage) {
                    lastPage = 1;
                }
            }
            if (getSaveWordPar[0][2] != null) {
                sortIndex = getSaveWordPar[0][2];
            }
            if (getSaveWordPar[0][6] != null) {
                randomArray = getSaveWordPar[0][6];
            }
            if (getSaveWordPar[0][3] != null) {
                OXandAnswer = getSaveWordPar[0][3];
            }
            if (getSaveWordPar[0][4] != null) {
                countCheckArray = getSaveWordPar[0][4];
            }
            if(getSaveWordPar[0][5] != null ){
                percentArray = getSaveWordPar[0][5] ;
            }

        }
        if(limitPage < 2){
            limitPage = 2;
        }
        for (i = 1; i < limitPage; i++) {
            const viewQuestionOption = document.createElement("option");
            viewQuestionOption.value = i;
            viewQuestionOption.innerText = i;
            viewQuestionSelect.appendChild(viewQuestionOption);
            //tableC = Math.ceil(getSaveWordPar.length - 1 / 1);
        }
        viewQuestionSelect.selectedIndex = 0;
        if(limitPage2[0] >= 1){
            viewQuestionSelect.selectedIndex = limitPage2[0] - 1;
        }

        viewSpan.appendChild(viewText);
        viewSpan.appendChild(viewQuestionSelect);
        firstSpan.appendChild(viewSpan);

        const lineSpan = document.createElement("span");
        const linetext = document.createElement("span");
        linetext.innerText = "line set";
        const lineSelect = document.createElement("select");
        lineSelect.addEventListener("change", lineSetEvent);
        let lineSetOtion = ["new", "old", "existing random", "wrong", "correct", "not solve", "new random"];
        for (i = 0; i < lineSetOtion.length; i++) {
            const lineOption = document.createElement("option");
            lineOption.value = i;
            lineOption.innerText = lineSetOtion[i];
            lineSelect.appendChild(lineOption);
        }
        lineSelect.addEventListener("change", sortSelectEvent);
        lineSelect.selectedIndex = sortIndex;
        const newRandomText = document.createElement("span");
        newRandomText.innerText = "Create a new sort? (Existing sort disappears)";
        const newRandom = document.createElement("button");
        newRandom.innerText = "yes";
        newRandom.addEventListener("click", newRandomEvent);
        const newRandom2 = document.createElement("button");
        newRandom2.innerText = "no";
        newRandom2.addEventListener("click", newRandomEvent);
        newRandomText.appendChild(newRandom);
        newRandomText.appendChild(newRandom2);
        newRandomText.style.display = "none";

        lineSpan.appendChild(linetext);
        lineSpan.appendChild(lineSelect);
        lineSpan.appendChild(newRandomText);
        firstSpan.appendChild(lineSpan);

        const seeCorrectSelect = document.createElement("select");
        //(맞춘여부,맞춘여부+정답보기,전체 정답보기)
        let seeCorrect = ["OX", "OX and answer", "OX&see all answer", "all hide"];
        for (i = 0; i < seeCorrect.length; i++) {
            const seeCoreectOption = document.createElement("option");
            seeCoreectOption.value = i;
            seeCoreectOption.innerText = seeCorrect[i];
            seeCorrectSelect.appendChild(seeCoreectOption);
        }
        seeCorrectSelect.selectedIndex = OXandAnswer;
        seeCorrectSelect.addEventListener("change", showOXandOthers);
        firstSpan.appendChild(seeCorrectSelect);
        //2
        //틀린횟수, 맞춘 횟수, 안 푼 횟수 표시하기(체크박스)
        const countSpan = document.createElement("span");
        const countBtn = document.createElement("button");
        countBtn.innerText = "count show option";
        countBtn.addEventListener("click", nextTargetDisplayShow);
        const countSpanInner = document.createElement("span");
        let countOptin = ["wrong count", "right count", "not solve count"];
        for (i = 0; i < countOptin.length; i++) {
            const countText = document.createElement("span");
            countText.innerText = countOptin[i];
            const countCheckBox = document.createElement("input");
            countCheckBox.type = "checkbox";
            countCheckBox.value = i;
            countCheckBox.innerText = countOptin[i];
            if (countCheckArray[i] != null) {
                countCheckBox.checked = countCheckArray[i];
            }
            countCheckBox.addEventListener("click", checkboxCount);
            countSpanInner.appendChild(countText);
            countSpanInner.appendChild(countCheckBox);
        }
        countSpanInner.style.display = "none";
        countSpan.appendChild(countBtn);
        countSpan.appendChild(countSpanInner);
        firstSpan.appendChild(countSpan);
        w_divWord.appendChild(firstSpan);

        const secondSpan = document.createElement("span");
        let wordsArray = [
            [],
            ["[  ]예시문제1", "답", "마지막", 3, 2, 1],
            ["[  ]예시문제2", "답", "답", 3, 2, 1],
            ["[  ]예시문제3", "답", null, 3, 2, 1]
        ]

        if (getSaveWordPar != null) {
            wordsArray = getSaveWordPar;
        }

        const tableWord = document.createElement("table");

        newTableInner(tableWord, wordsArray, randomArray, limitPage2, lastPage, sortIndex, countCheckArray, OXandAnswer);
        secondSpan.appendChild(tableWord);

        w_divWord.appendChild(secondSpan);
        /*
        맨 아래 표시정보
            페이지 안 문제수/맞춘 문제수 | < 1page >
            전체 문제수/맞춘문제수(퍼센트로 표시%)/틀린문제수(%)/안푼문제수(%)
            | 복사/삭제하기 - 클릭시 체크박스 표시. 문제+답 복사, 해당 문제+답 삭제 가능
            | 진행사항 제출 후 새로 시작-클릭시 이전까지 입력된 답을 기준으로 맞춘여부/틀린여부/안푼여부 정보를 갱신하고 입력되었던 제출답 없애기
            | 테이블 칸 크기 조절 - 입력 또는 막대바
         */
        const thirdSpan = document.createElement("span");
        const spanCountPageQA = document.createElement("span");

        if (limitPage2 != null && lastPage != null) {
            spanCountPageQA.innerText = `${limitPage2[1]}/${lastPage}`;
        } else if (limitPage2 != null && lastPage == null) {
            spanCountPageQA.innerText = `${limitPage2[1]}/${1}`;
        } else {
            spanCountPageQA.innerText = `${1}/${1}`;
        }
        thirdSpan.appendChild(spanCountPageQA);

        const pageBtnSpan = document.createElement("span");
        const beforePageBtn = document.createElement("button");
        beforePageBtn.innerText = "<";
        beforePageBtn.addEventListener("click", pagePastNextBtn);
        const nowPageBtn = document.createElement("select");
        for (h = 1; h <= limitPage2[1]; h++) {
            const pageNum = document.createElement("option");
            pageNum.innerText = `page${h}`;
            pageNum.value = h;
            nowPageBtn.appendChild(pageNum);
        }
        nowPageBtn.addEventListener("change", pageShowSelectEvent);

        if (lastPage != null && limitPage2[1] >= lastPage) {

            nowPageBtn.selectedIndex = lastPage - 1;
        } else {
            nowPageBtn.selectedIndex = 0;
        }
        const nextPageBtn = document.createElement("button");
        nextPageBtn.innerText = ">";
        nextPageBtn.addEventListener("click", pagePastNextBtn);
        pageBtnSpan.appendChild(beforePageBtn);
        pageBtnSpan.appendChild(nowPageBtn);
        pageBtnSpan.appendChild(nextPageBtn);
        thirdSpan.appendChild(pageBtnSpan);

        const allCountText = document.createElement("span");

        allCountText.innerText = `\nall:${wordsArray.length-1} / coreect:${percentArray[0][0]}(${percentArray[0][1]}%)wrong:${percentArray[1][0]}(${percentArray[1][1]}%) / not solve:${percentArray[2][0]}(${percentArray[2][1]}%)\n`;
        thirdSpan.appendChild(allCountText);

        const checkboxOption = document.createElement("span");
        const checkboxCopyAndDelBtn = document.createElement("button");
        checkboxCopyAndDelBtn.innerText = "copy or dell";
        checkboxCopyAndDelBtn.addEventListener("click", nextTargetDisplayShow2);
        checkboxOption.appendChild(checkboxCopyAndDelBtn);
        const checkboxCopyDelBtn = document.createElement("span");
        let copyDellArray = ["copy", "del"];
        for (j = 0; j < copyDellArray.length; j++) {
            const copyDelOption = document.createElement("button");
            copyDelOption.addEventListener("click",copyAndDellBtnEvent);
            copyDelOption.innerText = `${copyDellArray[j]}`;
            checkboxCopyDelBtn.appendChild(copyDelOption);
        }
        const allCheckText = document.createElement("span");
        allCheckText.innerText = "all checked";
        const allCheckInput = document.createElement("input");
        allCheckInput.type = "checkbox";
        allCheckInput.addEventListener("click",copyAndDellBtnEvent);
        checkboxCopyDelBtn.appendChild(allCheckText);
        checkboxCopyDelBtn.appendChild(allCheckInput);

        checkboxCopyDelBtn.style.display = "none";
        checkboxOption.appendChild(checkboxCopyDelBtn);
        thirdSpan.appendChild(checkboxOption);

        const sizeTdSpan = document.createElement("span");
        const sizeTdSpanBtn = document.createElement("button");
        sizeTdSpanBtn.innerText = "size box set";
        sizeTdSpanBtn.addEventListener("click", nextTargetDisplayShow);
        const boxSizeForm = document.createElement("form");
        const questionBoxSizeInput = document.createElement("input");
        questionBoxSizeInput.placeholder = "question box size(px)";
        questionBoxSizeInput.type = "number";
        const answerBoxSizeInput = document.createElement("input");
        answerBoxSizeInput.placeholder = "answer box size(px)";
        answerBoxSizeInput.type = "number";
        const resetSizeBtn = document.createElement("button");
        resetSizeBtn.innerText = "reset(150px)";

        boxSizeForm.appendChild(questionBoxSizeInput);
        boxSizeForm.appendChild(answerBoxSizeInput);
        boxSizeForm.appendChild(resetSizeBtn);
        boxSizeForm.addEventListener("submit", trWithEditInputEvent);
        boxSizeForm.style.display = "none";
        sizeTdSpan.appendChild(sizeTdSpanBtn);
        sizeTdSpan.appendChild(boxSizeForm);
        thirdSpan.appendChild(sizeTdSpan);

        const submitAllSpan = document.createElement("span");
        const submitAll = document.createElement("button");
        submitAll.innerText = "submit all";
        submitAll.addEventListener("click", nextTargetDisplayShow);
        const submiSpan = document.createElement("span");
        submiSpan.innerText = "all input text will reset(count only save).ok?";
        const submitYesBtn = document.createElement("button");
        submitYesBtn.innerText = "yes";
        submitYesBtn.addEventListener("click", submitAllEvent);
        const submitNoBtn = document.createElement("button");
        submitNoBtn.addEventListener("click",noEvent);
        submitNoBtn.innerText = "no";
        submiSpan.appendChild(submitYesBtn);
        submiSpan.appendChild(submitNoBtn);
        submiSpan.style.display = "none"
        submitAllSpan.appendChild(submitAll);
        submitAllSpan.appendChild(submiSpan);
        thirdSpan.appendChild(submitAllSpan);

        w_divWord.appendChild(thirdSpan);
        w_divWord.style.display = "none";
        if (W_showTap_array != null) {
            for (i = 0; i < W_showTap_array.length; i++) {
                if (`${W_showTap_array[i]}` == txt) {
                    w_divWord.style.display = "block";
                }
            }
        }
    }
}
//1 : [문제, 답, 마지막으로 입력한 답(입력, 미입력), 틀린 횟수, 맞춘 횟수, 안 푼 횟수]
//체크박스(삭제시에만 표시),문제(답, 횟수), 답입력칸, OX
//(테이블, 인덱스, 질문, 답, 마지막답, wC,cC,nC, 옵션, 정렬인덱스)
function makeTrTdWord(table, index, question, answer, lastAnswer, wrongC, correctC, notSolveC, option, sortIndex, countCheckArray, OXandAnswer, checkboxShow) {
    const trW = document.createElement("tr");
    let beforeNum = 0;
    for (i = 0; i < 4; i++) {
        if (i == 0) {
            const tdW = document.createElement("td");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox"
            checkbox.value = index;
            tdW.appendChild(checkbox);

            tdW.style.borderBottom = "1px solid #ffffff";
            tdW.style.padding = "5px";
            tdW.style.width = "20px";
            if (checkboxShow != 1) {
                tdW.style.display = "none";
            }
            trW.appendChild(tdW);
        } else if (i == 1) {
            const tdW = document.createElement("td");

            const questionSpan = document.createElement("span");
            questionSpan.innerText = `${question}\n`;

            const QnAFrom = document.createElement("form");
            const questionInput = document.createElement("input");
            questionInput.value = question;
            const answerInput = document.createElement("input");
            answerInput.value = answer;
            const submitBtn = document.createElement("button");
            submitBtn.type = "submit";
            submitBtn.style.display = "none";
            QnAFrom.appendChild(questionInput);
            QnAFrom.style.display = "none";
            QnAFrom.appendChild(answerInput);
            QnAFrom.appendChild(submitBtn);
            QnAFrom.addEventListener("submit", editQandASumitEvent);
            tdW.appendChild(QnAFrom);

            const answerSpan = document.createElement("span");
            answerSpan.innerText = `${answer}`;
            answerSpan.style.display = "none";
            if (OXandAnswer == 2) {
                answerSpan.style.display = "block";
            }

            const countSpan = document.createElement("span");
            let t = null;
            let w = `wrong:${correctC}`;
            let c = `correct:${wrongC}`;
            let n = `notSolve:${notSolveC}`;
            if (countCheckArray != null) {
                t = ``;
                if (countCheckArray[0] == true) {
                    t += w;
                }
                if (countCheckArray[1] == true) {
                    if (t != null && t != '') {
                        t += `,`;
                    }
                    t += c;
                }
                if (countCheckArray[2] == true) {
                    if (t != null && t != '') {
                        t += `,`;
                    }
                    t += n;
                }
            }
            if (t == null) {
                countSpan.style.display = "none";
            } else {
                countSpan.innerText = `${t}`;
            }

            tdW.appendChild(questionSpan);
            tdW.appendChild(answerSpan);
            tdW.appendChild(countSpan);

            tdW.style.borderBottom = "1px solid #ffffff";
            tdW.style.padding = "5px";
            tdW.style.width = `${doxsize[0]}px`;
            
            trW.addEventListener("dblclick", editEvent);
            trW.appendChild(tdW);
        } else if (i == 2) {
            const tdW = document.createElement("td");

            const answerForm = document.createElement("form");
            const answerInput = document.createElement("input");
            const answerSpan = document.createElement("span");
            if (lastAnswer != null) {
                answerInput.value = lastAnswer[0];
                answerSpan.innerText = `${lastAnswer[0]}`;
                answerForm.style.display = "none";
            } else {
                answerSpan.style.display = "none";
                answerForm.style.display = "block";
            }

            //answerForm.style.display = "none";
            answerForm.addEventListener("submit", AnswerInputEvent);
            answerForm.appendChild(answerInput);
            answerInput.style.width = `${doxsize[1]}px`;

            tdW.appendChild(answerForm);
            tdW.appendChild(answerSpan);

            tdW.style.borderBottom = "1px solid #ffffff";
            tdW.style.padding = "5px";
            tdW.style.width = `${doxsize[1]}px`;
            trW.addEventListener("dblclick", editEvent);
            trW.appendChild(tdW);
        } else if (i == 3) {
            const tdW = document.createElement("td");
            const OXspan = document.createElement("span");
            if (lastAnswer != null) {
                if (lastAnswer[1] == true) {
                    OXspan.innerText = "O";
                } else if (lastAnswer[1] == false) {
                    OXspan.innerText = "X";
                } else if (lastAnswer[1] == null) {
                    OXspan.innerText = "?";
                }
            } else {
                OXspan.innerText = "";
            }

            tdW.appendChild(OXspan);

            tdW.style.borderBottom = "1px solid #ffffff";
            tdW.style.padding = "5px";
            tdW.style.width = "20px";
            if (OXandAnswer == 3) {
                tdW.style.display = "none";
            }
            trW.appendChild(tdW);
        }
    }
    if (option == 1) {
        trW.style.display = "block";
    } else if (option == 0) {
        trW.style.display = "none";
    }
    if (sortIndex == 0 || sortIndex == 2) {
        table.prepend(trW);
    } else if (sortIndex == 1) {
        table.appendChild(trW);
    } else if(sortIndex == 3){
        if(beforeNum >= wrongC){
            table.appendChild(trW);
        }else{
            table.prepend(trW);
        }
        beforeNum = wrongC;
    } else if(sortIndex == 4){
        if(beforeNum >= correctC){
            table.appendChild(trW);
        }else{
            table.prepend(trW);
        }
        beforeNum = correctC;
    }else if(sortIndex == 5){
        if(beforeNum >= notSolveC){
            table.appendChild(trW);
        }else{
            table.prepend(trW);
        }
        beforeNum = notSolveC;
    }
}
//function=======================================================
/*
0 : [view 상태 정보(페이지당 문제 수)-0, 마지막 연 페이지-1, 정렬 정보(새롭게,올드, 기존 랜덤, 틀린순, 맞춘순, 안푼순새로운 랜덤)-2, 
    OX and Other-3,답보기 상태 정보(맞춘여부,맞춘여부+정답보기,전체 정답보기)-4,
    전체 맞춘/틀린/안푼 횟수와 퍼센트-5, 랜덤 배열 index숫자 array-6, 칸 길이[1,2]-7]
1 : [문제-0, 답-1, 마지막으로 입력한 답(입력, (미입력,정답여부))-2, 틀린 횟수-3, 맞춘 횟수-4, 안 푼 횟수-5]
 */
//SAVE
function saveWord(divName, option, question, answer, lastAnswer, wrongC, correctC, notSolveC) {
    const getSaveWord = localStorage.getItem(divName);
    const getSaveWordlPar = JSON.parse(getSaveWord);
    let wordsArray;
    if (getSaveWordlPar != null && getSaveWordlPar.length != 0) {
        wordsArray = getSaveWordlPar;
    } else {
        wordsArray = [[null, null, null, null, null, null, null, null]];
    }
    if (option == 0) {
        let pls = [question, answer, null, null, null, null];
        wordsArray.push(pls);
        wordsArray[0][5] =  saveCountAndPercent(wordsArray, divName);
        doxsize = saveWord(divName, 8);
        localStorage.setItem(divName, JSON.stringify(wordsArray));
        newViewSelectMake(divName, wordsArray.length, wordsArray[0][0]);
        return wordsArray.length - 1;

    } else if (option == 1) {
        if (question == 0) {
            let len = wordsArray.length - 1;
            let an = answer;
            let pageLimit = Math.ceil(Math.ceil(len / an));
            wordsArray[0][0] = [answer, pageLimit];
            wordsArray[0][1] = 1;////new
            localStorage.setItem(divName, JSON.stringify(wordsArray));
            return pageLimit;
        } else if (question == 1) {
            wordsArray[0][1] = answer;
            localStorage.setItem(divName, JSON.stringify(wordsArray));
            return wordsArray[0][0][1];
        } else if (question == 2) {
            let randomArray = [];
            for (i = 1; i < wordsArray.length; i++) {
                randomArray.push(i);
            }
            shuffle(randomArray);
            wordsArray[0][6] = randomArray;
            localStorage.setItem(divName, JSON.stringify(wordsArray));
        } else if (question == 3) {
            wordsArray[0][2] = answer;
            localStorage.setItem(divName, JSON.stringify(wordsArray));
            return wordsArray;
        } else if (question == 4) {
            wordsArray[0][3] = answer;
            localStorage.setItem(divName, JSON.stringify(wordsArray));
        } else if (question == 5) {
            let boxArray = [null, null, null];
            if (wordsArray[0][4] != null) {
                boxArray = wordsArray[0][4];
            }
            if (lastAnswer != false) {
                boxArray[answer] = true;
            } else {
                boxArray[answer] = false;
            }
            wordsArray[0][4] = boxArray;
            localStorage.setItem(divName, JSON.stringify(wordsArray));
        }
    } else if (option == 2) {
        wordsArray[question][2] = [answer, lastAnswer];//입력답, 정답여부
        wordsArray[0][5] =  saveCountAndPercent(wordsArray, divName);
        localStorage.setItem(divName, JSON.stringify(wordsArray));
    } else if (option == 3) {
        wordsArray[lastAnswer][0] = question;
        wordsArray[lastAnswer][1] = answer;
        wordsArray[lastAnswer][2][1] = wrongC;
        wordsArray[0][5] =  saveCountAndPercent(wordsArray, divName);
        localStorage.setItem(divName, JSON.stringify(wordsArray));
    } else if (option == 4) {
        return wordsArray;
    }else if(option == 5 ){
        let newWordArray = [];
        let checkArray = [];
        for(i=0; i<wordsArray.length; i++){
            let target = null;
            for(j=0;j<question.length;j++){
                if(i==question[j]){
                    target = i;
                }
            }
            if(i != target){
                newWordArray.push(wordsArray[i]);
            }else{
                checkArray.push(wordsArray[i]);
            }
        }
        if(answer == 0){
            let text = "";
            for(i=0;i<checkArray.length;i++){
                text +=`${checkArray[i][0]}\t${checkArray[i][1]}`;
                if(checkArray[i][2]!=null){
                    text+= `\t${checkArray[i][2][0]}\n`
                }else{
                    text+=`\n`
                }
            }
            return text;
        }else if(answer == 1){
            /*
            let randomArray;
            console.log(wordsArray[0][6])
            if(wordsArray !=null && wordsArray[0][6] != null){
                randomArray =wordsArray[0][6];
                let newRandomArray = [];
                for(i=0; i<randomArray.length; i++){
                    let target = null;
                    for(j=0;j<question.length;j++){
                        if(randomArray[i]==question[j]){
                            target = randomArray[i];
                    }
                }
                    if(randomArray[i] != target){
                        newRandomArray.push(randomArray[i]);
                    }
                }
                console.log(newRandomArray);//삭제시 랜덤 숫자도 변경 
            }*/

            wordsArray[0][5] =  saveCountAndPercent(newWordArray, divName);
            localStorage.setItem(divName, JSON.stringify(newWordArray));
        }
    }else if(option == 6){
        if(wordsArray != null && wordsArray.length > 1){
            for(i=1;i<wordsArray.length;i++){
                for(j=3;j<6;j++){
                    if(wordsArray[i][j] == null){
                        wordsArray[i][j] = 0;
                    };
                }
                if(wordsArray[i][2] != null){
                    if(wordsArray[i][2][1] == true){
                        wordsArray[i][3] += 1
                    }else if(wordsArray[i][2][1] == false){
                        wordsArray[i][4] += 1
                    }else{
                        wordsArray[i][5] += 1
                    }
                }else{
                    wordsArray[i][5] += 1
                }
                wordsArray[i][2] = null;
            }
            localStorage.setItem(divName, JSON.stringify(wordsArray));
        }
    }else if(option == 7){
        let size1 = 150;
        let size2 = 150;
        if(question != null && question.length > 0){
            size1 = Number(question);
        }
        if(answer != null && answer.length > 0){
            size2 = Number(answer);
        }
        wordsArray[0][7] = [size1, size2];
        doxsize = [size1, size2];
        localStorage.setItem(divName, JSON.stringify(wordsArray));
    }else if(option == 8){
        if(wordsArray != null && wordsArray[0][7] != null){
            return wordsArray[0][7];
        }else{
            return [150, 150];
        }
        
    }
}

function newViewSelectMake(divName,len, page){
    let page2 = 0;
    if(page != null){
        page2 = page[0]-1;
    }
    const view = document.querySelector(`.${divName}`).firstChild.childNodes[1].childNodes[1];
    view.replaceChildren();
    for(i=1;i<len;i++){
        const viewQuestionOption = document.createElement("option");
        viewQuestionOption.value = i;
        viewQuestionOption.innerText = i;
        view.appendChild(viewQuestionOption);
    }
    view.selectedIndex = page2;
}

function saveCountAndPercent(wordsArray,divName){
    let correct = 0;
    let wrong = 0;
    let notSolve = 0;
    let len = wordsArray.length-1;
    if(len > 0){
        for(i=1;i<wordsArray.length; i++){
            if(wordsArray[i][0]!=null){
                if(wordsArray[i][2]!=null){
                    if(wordsArray[i][2][1]==true){
                        correct+=1;
                    }else if(wordsArray[i][2][1]==false){
                        wrong+=1;
                    }else{
                        notSolve+=1;
                    }
                }else{
                    notSolve+=1;
                }
            }
        }

        let correctP = ((correct/len)*100).toFixed(1);
        let wrongP = ((wrong/len)*100).toFixed(1);
        let notSolveP = ((notSolve/len)*100).toFixed(1);

        const pageText = document.querySelector(`.${divName}`).childNodes[2].childNodes[2];
        pageText.innerText= `\nall:${len}/correct:${correct}(${correctP}%)/wrong:${wrong}(${wrongP}%)/not solve:${notSolve}(${notSolveP}%)\n`;
        return [[correct, correctP], [wrong, wrongP], [notSolve, notSolveP]];
    }
}
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
//---SAVE
function newQAndA(event) {
    event.preventDefault();
    const divName = event.target.parentElement.parentElement.className;
    const table = event.target.parentElement.parentElement.childNodes[1].childNodes[0];
    const question = document.querySelector(`.${divName}`).firstChild.firstChild.childNodes[0];
    const answer = document.querySelector(`.${divName}`).firstChild.firstChild.childNodes[1];
    let index = saveWord(divName, 0, question.value, answer.value);
    //(테이블, 인덱스, 질문, 답, 마지막답, wC,cC,nC, 옵션(보일지 여부), 정렬인덱스)
    const sortIndex = event.target.nextSibling.nextSibling.childNodes[1].value;
    let sortIndex2 = Number(sortIndex);
    makeTrTdWord(table, index, question.value, answer.value, null, null, null, null, 0, sortIndex2);
    question.value = null;
    answer.value = null;
    const view = document.querySelector(`.${divName}`).firstChild.childNodes[1].childNodes[1];
    view.dispatchEvent(new Event('change'));//select의 chage이벤트 강제 실행
}

function nextTargetDisplayShow(event) {
    const target = event.target.nextSibling;
    if (target.style.display == "none") {
        target.style.display = "block";
    } else {
        target.style.display = "none";
    }
}
function nextTargetDisplayShow2(event) {
    const target = event.target.nextSibling;
    if (target.style.display == "none") {
        target.style.display = "block";
    } else {
        target.style.display = "none";
    }
    const divName = event.target.parentElement.parentElement.parentElement.className;
    const selectValue = Number(event.target.parentElement.parentElement.previousSibling.previousSibling.childNodes[2].childNodes[1].selectedIndex);
    const tableWord = event.target.parentElement.parentElement.previousSibling.firstChild;
    let wordArray = saveWord(divName, 4);
    let lastPage = 1;
    let limitPage2 = [1, 1];
    let OXoption = 0;
    const targetState = event.target.nextSibling.style.display;
    if (tableWord != null) {
        if (targetState == "none") {
            tableWord.replaceChildren();
            if (wordArray[0][1] != null) {
                lastPage = wordArray[0][1];
            }
            if (wordArray[0][0] != null) {
                limitPage2 = wordArray[0][0];
            }
            if (wordArray[0][3] != null) {
                OXoption = wordArray[0][3];
            }
            newTableInner(tableWord, wordArray, wordArray[0][6], limitPage2, lastPage, selectValue, wordArray[0][4], OXoption, 0);
        } else if (targetState == "block") {
            tableWord.replaceChildren();
            if (wordArray[0][1] != null) {
                lastPage = wordArray[0][1];
            }
            if (wordArray[0][0] != null) {
                limitPage2 = wordArray[0][0];
            }
            if (wordArray[0][3] != null) {
                OXoption = wordArray[0][3];
            }
            newTableInner(tableWord, wordArray, wordArray[0][6], limitPage2, lastPage, selectValue, wordArray[0][4], OXoption, 1);
        }
    }
    //makeTrTdWord(table,index,question,answer,lastAnswer,wrongC,correctC,notSolveC,option,sortIndex,countCheckArray,OXandAnswer,checkboxShow)
}

function lineSetEvent(event) {
    const selectOption = event.target.value;
    if (selectOption == 6) {
        if (event.target.nextSibling.style.display == "none") {
            event.target.nextSibling.style.display = "block";
        } else {
            event.target.nextSibling.style.display = "none";
        }
    } else {
        event.target.nextSibling.style.display = "none";
    }
}

function pageSelectEvent(event) { //view
    const divName = event.target.parentElement.parentElement.parentElement.className;
    const pageValue = event.target.value;
    let number = Number(pageValue);
    let pageLimit = saveWord(divName, 1, 0, number);
    const table = event.target.parentElement.parentElement.parentElement.childNodes[1].childNodes[0];

    let n = 1;
    for (i = 0; i < table.childNodes.length; i++) {
        if (n > number) {
            table.childNodes[i].style.display = "none";
        } else {
            table.childNodes[i].style.display = "block";
        }
        n++;
    }
    const pageNumSelect = event.target.parentElement.parentElement.parentElement.childNodes[2].childNodes[1].childNodes[1];
    pageNumSelect.replaceChildren();
    for (j = 1; j <= pageLimit; j++) {
        const option = document.createElement("option");
        option.value = j;
        option.innerText = `page${j}`
        pageNumSelect.appendChild(option);
    }
    const pageNumberShowSelect = event.target.parentElement.parentElement.parentElement.childNodes[2].firstChild;
    pageNumberShowSelect.innerText = `${pageLimit}/1`;
}
function pageShowSelectEvent(event) {
    const divName = event.target.parentElement.parentElement.parentElement.className;
    const table = event.target.parentElement.parentElement.previousSibling.firstChild;
    const pageNum = Number(event.target.value);
    const count0 = event.target.parentElement.parentElement.previousSibling.previousSibling.childNodes[1].childNodes[1].value;
    const count = Number(count0);
    const allPageCount = saveWord(divName, 1, 1, pageNum);
    let k = [];
    for (j = pageNum * count; j > pageNum * count - count; j--) {
        k.push(j);
    }
    k.reverse();
    let n = 0;
    let nn = [];
    for (i = 0; i <= table.childNodes.length; i++) {
        if (i == k[n] - 1 && table.childNodes[i] != null) {
            table.childNodes[i].style.display = "block";
            n++;
            nn.push(1);
        } else if (table.childNodes[i] != null) {
            table.childNodes[i].style.display = "none";
            nn.push(0);
        }
    }
    const pageNumberShowSelect = event.target.parentElement.parentElement.firstChild;
    pageNumberShowSelect.innerText = `${allPageCount}/${pageNum}`;
}
//tableWord,wordsArray,randomArray,limitPage2,lastPage,sortIndex
function sortSelectEvent(event) {
    const divName = event.target.parentElement.parentElement.parentElement.className;
    const selectValue = Number(event.target.value);
    const tableWord = event.target.parentElement.parentElement.nextSibling.firstChild;
    tableWord.replaceChildren();
    //tableWord,wordsArray,randomArray,limitPage2,lastPage,sortIndex
    let wordArray = saveWord(divName, 1, 3, selectValue);
    let lastPage = 1;
    let limitPage2 = [1, 1];
    if (wordArray[0][1] != null) {
        lastPage = wordArray[0][1];
    }
    if (wordArray[0][0] != null) {
        limitPage2 = wordArray[0][0];
    }
    
    newTableInner(tableWord, wordArray, wordArray[0][6], limitPage2, lastPage, selectValue, wordArray[0][4], wordArray[0][3]);
}

function newTableInner(tableWord, wordsArray, randomArray, limitPage2, lastPage, sortIndex, countCheckArray, OXandAnswer, checkboxShow) {
    let optionPage = [];
    let optionPage1 = [];
    if (wordsArray != null && wordsArray.length != 0) {
        for (jp = lastPage * limitPage2[0]; jp > lastPage * limitPage2[0] - limitPage2[0]; jp--) {
            optionPage1.push(jp);
        }
        optionPage1.reverse();
        np = 0;
        for (ip = 0; ip < wordsArray.length - 1; ip++) {
            if (ip == optionPage1[np] - 1 && wordsArray[ip] != null) {
                optionPage.push(1);
                np++;
            } else if (wordsArray[ip] != null) {
                optionPage.push(0);
            }
        }
        if (sortIndex == 1) {
            optionPage.reverse();
        }
        if (sortIndex == 2) {
            for (j = 0; j < wordsArray.length - 1; j++) {
                //              (table,             index,   question,                     answer,                        lastAnswer                     ,wrongC,                       correctC,                      notSolveC,                    option,                          sortIndex)
                let n = randomArray[j];
                if(wordsArray[n] == null){
                    continue;
                }
                makeTrTdWord(tableWord, n, wordsArray[n][0], wordsArray[n][1], wordsArray[n][2], wordsArray[n][3], wordsArray[n][4], wordsArray[n][5], optionPage[optionPage.length - n], sortIndex, countCheckArray, OXandAnswer, checkboxShow);
            }
        } else {
            for (j = 1; j < wordsArray.length; j++) {
                if(wordsArray[j][0] == null){
                    continue;
                }
                makeTrTdWord(tableWord, j, wordsArray[j][0], wordsArray[j][1], wordsArray[j][2], wordsArray[j][3], wordsArray[j][4], wordsArray[j][5], optionPage[optionPage.length - j], sortIndex, countCheckArray, OXandAnswer, checkboxShow);
            }
        }
    }
}

function newRandomEvent(event) {
    const divName = event.target.parentElement.parentElement.parentElement.parentElement.className;
    const targetOption = event.target.innerText;
    const optionSpan = event.target.parentElement;
    const selectSet = event.target.parentElement.previousSibling;
    if ("yes" == targetOption) {
        saveWord(divName, 1, 2);
        optionSpan.style.display = "none";
        selectSet.selectedIndex = 2;
        selectSet.dispatchEvent(new Event('change'));
    } else {
        optionSpan.style.display = "none";
    }
}

function showOXandOthers(event) {
    const selectOption = event.target.value;
    let selectOption1 = Number(selectOption);
    const divName = event.target.parentElement.parentElement.className;
    saveWord(divName, 1, 4, selectOption1);
    const view = document.querySelector(`.${divName}`).firstChild.childNodes[2].childNodes[1];
    view.dispatchEvent(new Event('change'));//select의 chage이벤트 강제 실행
}

function checkboxCount(event) {
    const checkboxValue = event.target.value;
    const checkboxChecked = event.target.checked;
    const divName = event.target.parentElement.parentElement.parentElement.parentElement.className;
    saveWord(divName, 1, 5, checkboxValue, checkboxChecked);
    const view = document.querySelector(`.${divName}`).firstChild.childNodes[2].childNodes[1];
    view.dispatchEvent(new Event('change'));//select의 chage이벤트 강제 실행
}

function AnswerInputEvent(event) {
    event.preventDefault();
    const divName = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.className;
    const form = event.target;
    const input = event.target.childNodes[0];
    form.style.display = "none";
    const lastAnswer = event.target.nextSibling;
    lastAnswer.innerText = input.value;

    const OXandAnswer = event.target.parentElement.parentElement.parentElement.parentElement.previousSibling.childNodes[3].value;
    lastAnswer.style.display = "block";

    const realAnswer = event.target.parentElement.previousSibling.childNodes[2];
    if (OXandAnswer == "1") {
        realAnswer.style.display = "block";
    }
    const OXspan = event.target.parentElement.nextSibling.firstChild;
    let textOutput = textEquel(realAnswer.innerText, input.value);
    if (textOutput == true) {
        OXspan.innerText = "O";
    } else if (textOutput == false) {
        OXspan.innerText = "X";
    } else if (textOutput == null) {
        OXspan.innerText = "?";
    }
    const checkboxIndex = event.target.parentElement.previousSibling.previousSibling.firstChild.value;
    saveWord(divName, 2, Number(checkboxIndex), input.value, textOutput);

}
function editEvent(event) {
    //"dblclick"
    const target = event.target;
    if (target.tagName == "SPAN") {
        const form = event.target.previousSibling;
        if (form.style.display != "block") {
            form.style.display = "block";
            target.style.display = "none";
        } else {
            form.style.display = "none";
            target.style.display = "block";
        }
    } else if (target.tagName == "TD") {
        const form = event.target.childNodes[0];
        const span = event.target.childNodes[1];
        if (form.style.display != "block") {
            form.style.display = "block";
            span.style.display = "none";
        } else {
            form.style.display = "none";
            span.style.display = "block";
        }
    }
}
function textEquel(realText, inputText) {
    if (inputText != null && inputText.trim().length !== 0) {
        if (realText == inputText) {
            return true;
        } else {
            return false;
        }
    } else {
        return null;
    }
}

function editQandASumitEvent(event) {
    event.preventDefault();
    const questionInput = event.target.childNodes[0].value;
    const answerInput = event.target.childNodes[1].value;
    const checkboxIndex = event.target.parentElement.previousSibling.childNodes[0].value;
    const divName = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.className;
    const lastAnswer = event.target.parentElement.nextSibling.childNodes[1].innerText;
    const OXspan = event.target.parentElement.nextSibling.nextSibling.childNodes[0];
    let OXandAnswer = textEquel(answerInput, lastAnswer);

    if (OXandAnswer == true) {
        OXspan.innerText = "O";
    } else if (OXandAnswer == false) {
        OXspan.innerText = "X";
    } else if (OXandAnswer == null) {
        OXspan.innerText = "?";
    }
    const form = event.target;
    const questionSpan = event.target.nextSibling;
    const answerSpan = event.target.nextSibling.nextSibling;
    form.style.display = "none";
    questionSpan.innerText = questionInput;
    answerSpan.innerText = answerInput;
    questionSpan.style.display = "block";
    saveWord(divName, 3, questionInput, answerInput, Number(checkboxIndex), OXandAnswer);
}

function pagePastNextBtn(event) {
    const btnInText = event.target.innerText;
    const pageSelect = event.target.parentElement.childNodes[1];
    if (pageSelect.length > 1) {
        if (btnInText == '<' && pageSelect.selectedIndex > 0) {
            pageSelect.selectedIndex -= 1;
        } else if (btnInText == '>' && pageSelect.selectedIndex < pageSelect.length) {
            pageSelect.selectedIndex += 1;
        }
    }
    pageSelect.dispatchEvent(new Event('change'));
}

function copyAndDellBtnEvent(event){
    const divName = event.target.parentElement.parentElement.parentElement.parentElement.className;
    const tableWord = event.target.parentElement.parentElement.parentElement.previousSibling.firstChild;
    const text = event.target.innerText;
    const view = event.target.parentElement.parentElement.parentElement.previousSibling.previousSibling.childNodes[2].childNodes[1];
    let checkedArray = [];
    if(event.target.type == "checkbox"){
        for(j=0;j<tableWord.childNodes.length;j++){
            tableWord.childNodes[j].childNodes[0].childNodes[0].checked = event.target.checked;
        }
    }
    for(i=0;i<tableWord.childNodes.length;i++){
        let checkeds = tableWord.childNodes[i].childNodes[0].childNodes[0].checked;
        if(checkeds == true){
            let index = tableWord.childNodes[i].childNodes[0].childNodes[0].value;
            checkedArray.push(Number(index));
        }
    }
    if(text == "copy"){
        let copyText = saveWord(divName,5,checkedArray,0);
        window.navigator.clipboard.writeText(copyText);
    }else if(text == "del"){
        saveWord(divName,5,checkedArray,1);
        view.dispatchEvent(new Event('change'));
    }
}

function submitAllEvent(event){
    const divName = event.target.parentElement.parentElement.parentElement.parentElement.className;
    saveWord(divName, 6)
    const view = event.target.parentElement.parentElement.parentElement.previousSibling.previousSibling.childNodes[2].childNodes[1];
    view.dispatchEvent(new Event('change'));
    const targetShow = event.target.parentElement;
    targetShow.style.display = "none";
}
function noEvent(event){
    const span = event.target.parentElement;
    span.style.display = "none";
}
function trWithEditInputEvent(event){
    event.preventDefault();
    const divName = event.target.parentElement.parentElement.parentElement.className;
    const input1 =  document.querySelector(`.${divName}`).childNodes[2].childNodes[4].childNodes[1].childNodes[0];
    const input2 = document.querySelector(`.${divName}`).childNodes[2].childNodes[4].childNodes[1].childNodes[1];
    saveWord(divName, 7, input1.value, input2.value);
    input1.value = "";
    input2.value = "";
    const view = document.querySelector(`.${divName}`).childNodes[0].childNodes[2].childNodes[1];
    console.log(view);
    view.dispatchEvent(new Event('change'));
}

//window==========================================================
let divWord = [];
const in_stor_tap_array_word = localStorage.getItem("tap_array");
if (in_stor_tap_array_word != null) {
    const parsed_tap3 = JSON.parse(in_stor_tap_array_word);
    divWord = parsed_tap3;
    divWord.forEach(skill_apply_word);
}