/*
저장 공간 관리
0 : [view 상태 정보(페이지당 문제 수), 마지막 연 페이지, 정렬 정보(새로운 랜덤, 기존 랜덤, 틀린순, 맞춘순, 안푼순), 
    답보기 상태 정보(맞춘여부,맞춘여부+정답보기,전체 정답보기),맞춘/틀린/안푼 횟수보기,
    테이블 칸 크기 조절, 랜덤 배열 index숫자 array]
1 : [문제, 답, 마지막으로 입력한 답(입력, 미입력), 틀린 횟수, 맞춘 횟수, 안 푼 횟수]

맨 위 표시
    문제입력 input | 답 입력 input
    view페이지당 문제 수(문제수~all) | 정렬셋팅(기존 랜덤, 새 랜덤, 틀린순, 맞춘순, 안푼순) | 
    제출시 답 보기 상태(맞춘여부, 맟춘여부+정답보기, 맞춘여부 가리기,걍 전체답 확인하기) | 
    틀린횟수, 맞춘 횟수, 안 푼 횟수 표시하기(체크박스)

중간 표 테이블
    문제표시 (클릭시 정답보기 가능-문제\n답\n틀린맞춘안푼 횟수)-두번클릭시 문제&답 수정 가능
    | 답 입력란(input)-입력 후 제출시 텍스트만 남음. 두번 클릭시 입력 답 수정 가능 
    | 정답여부 보는 칸(안보기 해둘 시 클릭해서 볼 수 있음)

맨 아래 표시정보
    페이지 안 문제수/맞춘 문제수 | < 1page >
    전체 문제수/맞춘문제수(퍼센트로 표시%)/틀린문제수(%)/안푼문제수(%)
    | 복사/삭제하기 - 클릭시 체크박스 표시. 문제+답 복사, 해당 문제+답 삭제 가능
    | 진행사항 제출 후 새로 시작-클릭시 이전까지 입력된 답을 기준으로 맞춘여부/틀린여부/안푼여부 정보를 갱신하고 입력되었던 제출답 없애기
    | 테이블 칸 크기 조절 - 입력 또는 막대바
*/

let W_showTap_array = [];
const W_tapShow_array = localStorage.getItem("tapShow_array");
if(W_tapShow_array != null){
    const W_parsed_tapShow_array = JSON.parse(M_tapShow_array);
    W_showTap_array = W_parsed_tapShow_array;
}


function skill_apply_word(txt){
    const div_wordName = `s${txt}`;
    if(div_wordName.charAt(div_wordName.length-1) == `3`){
        const w_divWord = document.querySelector(`.${div_wordName}`);

        const firstSpan = document.createElement("span");
        const QandAForm = document.createElement("form");
        const questionInput = document.createElement("input");
        const answerInput = document.createElement("input");
        const QandASubmitBtn = document.createElement("button");
        QandASubmitBtn.type = "submit";
        QandASubmitBtn.innerText = "sub";
        QandAForm.addEventListener("submit",newQAndA);
        QandAForm.appendChild(questionInput);
        QandAForm.appendChild(answerInput);
        QandAForm.appendChild(QandASubmitBtn);
        firstSpan.appendChild(QandAForm);

        const viewSpan = document.createElement("span");
        const viewText = document.createElement("span");
        viewText.innerText = "view";
        const viewQuestionSelect = document.createElement("select");
        for(i=0;i<10;i++){
            const viewQuestionOption = document.createElement("option");
            viewQuestionOption.value = i;
            viewQuestionOption.innerText = i;
            viewQuestionSelect.appendChild(viewQuestionOption);
        }
        viewSpan.appendChild(viewText);
        viewSpan.appendChild(viewQuestionSelect);
        firstSpan.appendChild(viewSpan);

        const lineSpan = document.createElement("span");
        const linetext = document.createElement("span");
        linetext.innerText = "line set";
        const lineSelect = document.createElement("select");
        lineSelect.addEventListener("change",lineSetEvent);
        let lineSetOtion = ["new","old","existing random","wrong","correct", "not solve","new random"];
        for(i=0;i<lineSetOtion.length;i++){
            const lineOption = document.createElement("option");
            lineOption.value = i;
            lineOption.innerText =lineSetOtion[i];
            lineSelect.appendChild(lineOption);
        }
        const newRandomText = document.createElement("span");
        newRandomText.innerText = "Create a new sort? (Existing sort disappears)";
        const newRandom = document.createElement("button");
        newRandom.innerText = "yes";
        const newRandom2 = document.createElement("button");
        newRandom2.innerText = "no";
        newRandomText.appendChild(newRandom);
        newRandomText.appendChild(newRandom2);
        newRandomText.style.display = "none";

        lineSpan.appendChild(linetext);
        lineSpan.appendChild(lineSelect);
        lineSpan.appendChild(newRandomText);
        firstSpan.appendChild(lineSpan);

        const seeCorrectSelect = document.createElement("select");
        //(맞춘여부,맞춘여부+정답보기,전체 정답보기)
        let seeCorrect = ["OX","OX and answer", "OX&see all answer", "all hide"];
        for(i=0;i<seeCorrect.length;i++){
            const seeCoreectOption = document.createElement("option");
            seeCoreectOption.value = i;
            seeCoreectOption.innerText =seeCorrect[i];
            seeCorrectSelect.appendChild(seeCoreectOption);
        }
        firstSpan.appendChild(seeCorrectSelect);
    //2
        //틀린횟수, 맞춘 횟수, 안 푼 횟수 표시하기(체크박스)
        const countSpan = document.createElement("span");
        const countBtn = document.createElement("button");
        countBtn.innerText = "count show option";
        countBtn.addEventListener("click",nextTargetDisplayShow);
        const countSpanInner = document.createElement("span");
        let countOptin = ["wrong count","right count", "not solve count"];
        for(i=0;i<countOptin.length;i++){
            const countText = document.createElement("span");
            countText.innerText = countOptin[i];
            const countCheckBox = document.createElement("input");
            countCheckBox.type = "checkbox";
            countCheckBox.value = i;
            countCheckBox.innerText = countOptin[i];
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
            ["[  ]는 무엇일까요", "밥", "마지막", 3,2,1],
            ["[  ]는 무엇일까요", "밥", "밥", 3,2,1],
            ["[  ]는 무엇일까요", "밥", null, 3,2,1]
        ]
        const getSaveWord = localStorage.getItem(div_wordName);
        const getSaveWordPar = JSON.parse(getSaveWord);
        if(getSaveWordPar!=null){
            wordsArray = getSaveWordPar;
        }
        let n=1;
        for(k=1;k<2;k++){
            const tableWord = document.createElement("table");
            tableWord.className = `${k}`;
            for(j=1;j<wordsArray.length;j++){
                makeTrTdWord(tableWord,n,wordsArray[n][0],wordsArray[n][1],wordsArray[n][2],wordsArray[n][3],wordsArray[n][4],wordsArray[n][5]);
                n++;
            }
            secondSpan.appendChild(tableWord);
        }
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
        spanCountPageQA.innerText = `${3}/${2}`;
        thirdSpan.appendChild(spanCountPageQA);

        const pageBtnSpan = document.createElement("span");
        const beforePageBtn = document.createElement("button");
        beforePageBtn.innerText = "<";
        const nowPageBtn = document.createElement("select");
        for(h=1;h<4;h++){
            const pageNum = document.createElement("option");
            pageNum.innerText = `${h}page`;
            pageNum.value = h;
            nowPageBtn.appendChild(pageNum);
        }
        const nextPageBtn = document.createElement("button");
        nextPageBtn.innerText = ">";
        pageBtnSpan.appendChild(beforePageBtn);
        pageBtnSpan.appendChild(nowPageBtn);
        pageBtnSpan.appendChild(nextPageBtn);
        thirdSpan.appendChild(pageBtnSpan);

        const allCountText = document.createElement("span");
        allCountText.innerText = `\nall:${3} / coreect:${2}(${Math.floor(2/3*100)}%)wrong:${1}(${Math.floor(1/3*100)}%) / not solve:${0}(${Math.floor(0/3*100)}%)\n`;
        thirdSpan.appendChild(allCountText);

        const checkboxOption = document.createElement("span");
        const checkboxCopyAndDelBtn = document.createElement("button");
        checkboxCopyAndDelBtn.innerText = "copy or dell";
        checkboxCopyAndDelBtn.addEventListener("click",nextTargetDisplayShow);
        checkboxOption.appendChild(checkboxCopyAndDelBtn);
        const checkboxCopyDelBtn = document.createElement("span");
        let copyDellArray = ["copy", "del"];
        for(j=0;j<copyDellArray.length;j++){
            const copyDelOption = document.createElement("button");
            copyDelOption.innerText = `${copyDellArray[j]}`;
            checkboxCopyDelBtn.appendChild(copyDelOption);
        }
        checkboxCopyDelBtn.style.display = "none";
        checkboxOption.appendChild(checkboxCopyDelBtn);
        thirdSpan.appendChild(checkboxOption);

        const sizeTdSpan = document.createElement("span");
        const sizeTdSpanBtn = document.createElement("button");
        sizeTdSpanBtn.innerText = "size box set";
        sizeTdSpanBtn.addEventListener("click",nextTargetDisplayShow);
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
        boxSizeForm.style.display = "none";
        sizeTdSpan.appendChild(sizeTdSpanBtn);
        sizeTdSpan.appendChild(boxSizeForm);
        thirdSpan.appendChild(sizeTdSpan);

        const submitAllSpan = document.createElement("span");
        const submitAll = document.createElement("button");
        submitAll.innerText = "submit all";
        submitAll.addEventListener("click",nextTargetDisplayShow);
        const submiSpan = document.createElement("span");
        submiSpan.innerText = "all input text will reset(count only save).ok?";
        const submitYesBtn = document.createElement("button");
        submitYesBtn.innerText = "yes";
        const submitNoBtn = document.createElement("button");
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
function makeTrTdWord(table,index,question,answer,lastAnswer,wrongC,correctC,notSolveC){
    const trW = document.createElement("tr");
    for(i=0;i<4;i++){
        if(i==0){
            const tdW = document.createElement("td");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox"
            checkbox.value = index;
            tdW.appendChild(checkbox);

            tdW.style.borderBottom = "1px solid #ffffff";
            tdW.style.padding = "5px";
            tdW.style.width = "20px";
            tdW.style.display = "none";
            trW.appendChild(tdW);
        }else if(i==1){
            const tdW = document.createElement("td");

            const questionSpan = document.createElement("span");
            questionSpan.innerText = `${question}\n`;
            
            const QnAFrom = document.createElement("form");
            const questionInput = document.createElement("input");
            questionInput.value = question;
            const answerInput = document.createElement("input");
            answerInput.value = answer;
            QnAFrom.appendChild(questionInput);
            QnAFrom.style.display = "none";
            QnAFrom.appendChild(answerInput);
            QnAFrom.style.display
            tdW.appendChild(QnAFrom);

            const answerSpan = document.createElement("span");
            answerSpan.innerText = `${answer}\n`;
            answerSpan.style.display = "none";

            const countSpan = document.createElement("span");
            countSpan.innerText = `wrong:${wrongC},correct:${correctC},notSolve:${notSolveC}`;
            //countSpan.style.display = "none";

            tdW.appendChild(questionSpan);
            tdW.appendChild(answerSpan);
            tdW.appendChild(countSpan);

            tdW.style.borderBottom = "1px solid #ffffff";
            tdW.style.padding = "5px";
            tdW.style.width = "150px";
            trW.appendChild(tdW);
        }else if(i==2){
            const tdW = document.createElement("td");

            const answerForm = document.createElement("form");
            const answerInput = document.createElement("input");
            const answerSpan = document.createElement("span");
            if(lastAnswer!=null){
                answerInput.value = lastAnswer;
                answerSpan.innerText = `${lastAnswer}`;
                answerInput.style.display = "none";
            }else{
                answerSpan.style.display = "none";
            }
            answerForm.appendChild(answerInput);

            tdW.appendChild(answerForm);
            tdW.appendChild(answerSpan);
            
            tdW.style.borderBottom = "1px solid #ffffff";
            tdW.style.padding = "5px";
            tdW.style.width = "150px";
            trW.appendChild(tdW);
        }else if(i==3){
            const tdW = document.createElement("td");

            const OXspan = document.createElement("span");
            if(lastAnswer != null){
                if(answer == lastAnswer){
                    OXspan.innerText = "O";
                }else if(answer != lastAnswer){
                    OXspan.innerText = "X";
                }
            }else{
                OXspan.innerText = "";
            }

            tdW.appendChild(OXspan);
            
            tdW.style.borderBottom = "1px solid #ffffff";
            tdW.style.padding = "5px";
            tdW.style.width = "20px";
            trW.appendChild(tdW);
        }
    }
    table.prepend(trW);
}
//function=======================================================
/*
0 : [view 상태 정보(페이지당 문제 수), 마지막 연 페이지, 정렬 정보(새로운 랜덤, 기존 랜덤, 틀린순, 맞춘순, 안푼순), 
    답보기 상태 정보(맞춘여부,맞춘여부+정답보기,전체 정답보기),맞춘/틀린/안푼 횟수보기,
    테이블 칸 크기 조절, 랜덤 배열 index숫자 array]
1 : [문제, 답, 마지막으로 입력한 답(입력, 미입력), 틀린 횟수, 맞춘 횟수, 안 푼 횟수]
 */
function saveWord(divName,option,question,answer,lastAnswer,wrongC,correctC,notSolveC){
    const getSaveWord = localStorage.getItem(divName);
    const getSaveWordlPar = JSON.parse(getSaveWord);
    let wordsArray;
    if(getSaveWordlPar!=null && getSaveWordlPar.length !=0){
        wordsArray = getSaveWordlPar;
    }else{
        wordsArray = ["0"];
    }
    if(option ==0){
        let pls = [question,answer,null,null,null,null];
        wordsArray.push(pls);
        localStorage.setItem(divName, JSON.stringify(wordsArray));
        console.log(pls);
        console.log(wordsArray);
        return wordsArray.length-1;

    }else if(option == 1){
        let change = wordsArray[num];
        change[0] = text;
        wordsArray[num] = change;
        localStorage.setItem(divName, JSON.stringify(wordsArray));
    }
}
function newQAndA(event){
    event.preventDefault();
    const divName = event.target.parentElement.parentElement.className;
    const table = event.target.parentElement.parentElement.childNodes[1].childNodes[0];
    const question = document.querySelector(`.${divName}`).firstChild.firstChild.childNodes[0];
    const answer = document.querySelector(`.${divName}`).firstChild.firstChild.childNodes[1];
    console.log(divName);
    let index = saveWord(divName,0,question.value,answer.value);
    makeTrTdWord(table,index,question.value,answer.value,null,null,null,null);
    question.value = null;
    answer.value=null;
    
}

function nextTargetDisplayShow(event){
    const target = event.target.nextSibling;
    if(target.style.display == "none"){
        target.style.display = "block";
    }else{
        target.style.display = "none";
    }
}

function lineSetEvent(event){
    const selectOption = event.target.value;
    if(selectOption == 6){
        if(event.target.nextSibling.style.display == "none"){
            event.target.nextSibling.style.display = "block";
        }else{
            event.target.nextSibling.style.display = "none";
        }
    }else{
        event.target.nextSibling.style.display = "none";
    }
}

//window==========================================================
let divWord = [];
const in_stor_tap_array_word = localStorage.getItem("tap_array");
if(in_stor_tap_array_word != null){
    const parsed_tap3 = JSON.parse(in_stor_tap_array_word);
    divWord = parsed_tap3;
    divWord.forEach(skill_apply_word);
}