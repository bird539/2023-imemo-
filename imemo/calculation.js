let C_showTap_array = [];
const C_tapShow_array = localStorage.getItem("tapShow_array");
if(C_tapShow_array != null){
    const C_parsed_tapShow_array = JSON.parse(C_tapShow_array);
    C_showTap_array = C_parsed_tapShow_array;
}

function skill_apply_calcul(txt){
    const div_calculName = `s${txt}`;
    if(div_calculName.charAt(div_calculName.length-1) == `2`){
        const w_divCalcul = document.querySelector(`.${div_calculName}`);

        const inputForm = document.createElement("form");
        const textInput = document.createElement("input");
        const numInput = document.createElement("input");
        const subBtn = document.createElement("button");
        subBtn.type = "submit";
        subBtn.innerText = "sub";
        inputForm.appendChild(textInput);
        inputForm.appendChild(numInput);
        inputForm.appendChild(subBtn);
        inputForm.addEventListener("submit",newInputCalcul);

        const tableCalcul = document.createElement("table");

        const getSaveCalcul = localStorage.getItem(div_calculName);
        const getSaveCalculPar = JSON.parse(getSaveCalcul);
        let calculArray;
        if(getSaveCalculPar!=null && getSaveCalculPar.length !=0){
            calculArray = getSaveCalculPar;
            for(i=0;i<calculArray.length;i++){
                let array  =calculArray[i];
                makeTrTd(i,array[0],array[1],array[2],tableCalcul);
            }
        }

        tableCalcul.style.borderTop = "1px solid #ffffff";
        tableCalcul.style.borderCollapse = "collapse";
        tableCalcul.style.width = "370px"
        
        const sumSpan = document.createElement("span");
        const allCheckSpan = document.createElement("span");
        const allCheckInput = document.createElement("input");
        allCheckInput.type = "checkbox";
        allCheckSpan.innerText = "all  ";
        allCheckSpan.prepend(allCheckInput);
        sumSpan.appendChild(allCheckSpan);

        const selectSumSpan = document.createElement("span");
        
        selectSumSpan.innerText = "selected sum";
        selectSumSpan.prepend(sumSpan);
        const selectSumInput = document.createElement("input");
        selectSumSpan.appendChild(selectSumInput);

        //-------------
        const otherBtnSpan = document.createElement("span");
        const selectDelBth = document.createElement("button");
        selectDelBth.innerText = "select del";
        selectDelBth.addEventListener("click",delCheckCalcul);
        otherBtnSpan.appendChild(selectDelBth);

        const selectCopyBth = document.createElement("button");
        selectCopyBth.innerText = "select copy";
        otherBtnSpan.appendChild(selectCopyBth);
    
        const pluseTableBtn = document.createElement("button");
        pluseTableBtn.innerText = "insert table sum";
        otherBtnSpan.appendChild(pluseTableBtn);

        const selectOption = document.createElement("select");
        let option = ["only text", "text + value","only value"];
        for(i=0;i<option.length;i++){
            const optionType = document.createElement("option");
            optionType.innerText = option[i];
            optionType.value = i;
            selectOption.appendChild(optionType);
        }
        otherBtnSpan.appendChild(selectOption);
        otherBtnSpan.style.display = "block";


        w_divCalcul.appendChild(inputForm);
        w_divCalcul.appendChild(tableCalcul);
        w_divCalcul.appendChild(selectSumSpan);
        w_divCalcul.appendChild(otherBtnSpan);

        w_divCalcul.style.display = "none";
        if (C_showTap_array != null) {
            for (i = 0; i < C_showTap_array.length; i++) {
                if (`${C_showTap_array[i]}` == txt) {
                    w_divCalcul.style.display = "block";
                }
            }
        }
    }
}
//========================================
function saveCalcul(divName,text, num,newOrDel){
    const getSaveCalcul = localStorage.getItem(divName);
    const getSaveCalculPar = JSON.parse(getSaveCalcul);
    let calculArray;
    if(getSaveCalculPar!=null && getSaveCalculPar.length !=0){
        calculArray = getSaveCalculPar;
    }else{
        calculArray = [];
    }
    if(newOrDel ==0){
        let pls = [false,text, num];
        calculArray.push(pls);
        localStorage.setItem(divName, JSON.stringify(calculArray));
        return calculArray.length-1;

    }else if(newOrDel == 1){
        let change = calculArray[num];
        change[0] = text;
        calculArray[num] = change;
        localStorage.setItem(divName, JSON.stringify(calculArray));

    }else if(newOrDel == 2){
        let newCalculArray = [];
        for(i=0;i<calculArray.length;i++){
            if(calculArray[i][0]==false){
                newCalculArray.push(calculArray[i]);
            }
        }
        calculArray = newCalculArray;
        localStorage.setItem(divName, JSON.stringify(calculArray));
        return calculArray;
    }
}

function makeTrTd(index,checkedvalue,text,num,tableCalcul){
    const trCal = document.createElement("tr");
    for(j=0;j<3;j++){
        if(j==0){
            const tdCal = document.createElement("td");
            const check = document.createElement("input");
            check.type = "checkbox";
            check.value = index;
            check.checked = checkedvalue;
            check.addEventListener("click",checkBoxEvent);
            
            tdCal.appendChild(check);
            tdCal.style.borderBottom = "1px solid #ffffff";
            tdCal.style.borderCollapse = "collapse";
            tdCal.style.padding = "5px";
            tdCal.style.width = "20px";
            trCal.appendChild(tdCal);
            
        }else if(j==1){
            const tdCal = document.createElement("td");
            tdCal.innerText = `${text}`;
            tdCal.style.borderBottom = "1px solid #ffffff";
            tdCal.style.borderCollapse = "collapse";
            tdCal.style.padding = "5px";
            trCal.appendChild(tdCal);
        }else if(j==2){
            const tdCal = document.createElement("td");
            tdCal.innerText = `${num}`;
            tdCal.style.borderBottom = "1px solid #ffffff";
            tdCal.style.borderCollapse = "collapse";
            tdCal.style.padding = "5px";
            trCal.appendChild(tdCal);
        }
    }
    tableCalcul.appendChild(trCal);
}
function delCheckCalcul(event){
    const divName = event.target.parentElement.parentElement.className;
    const tableCalcul = event.target.parentElement.previousSibling.previousSibling;
    let calculArray = saveCalcul(divName,true,0,2);
    tableCalcul.replaceChildren();

    if(calculArray!=null && calculArray.length !=0){
        for(i=0;i<calculArray.length;i++){
            let array  =calculArray[i];
            makeTrTd(i,array[0],array[1],array[2],tableCalcul);
        }
    }
}

function checkBoxEvent(event){
    const divName = event.target.parentElement.parentElement.parentElement.parentElement.className;
    const index = event.target.value;
    const check = event.target.checked;
    saveCalcul(divName,check,index,1);
}

function newInputCalcul(event){
    event.preventDefault();
    const divName = event.target.parentElement.className;
    const textInput = document.querySelector(`.${divName}`).firstChild.childNodes[0];
    const numInput = document.querySelector(`.${divName}`).firstChild.childNodes[1];

    const tableCalcul = event.target.nextSibling;

    let indexAndSave = saveCalcul(divName,textInput.value, numInput.value, 0);
    makeTrTd(indexAndSave,false,textInput.value,numInput.value,tableCalcul);

    devideTextAndNum(textInput.value,numInput.value,0);

    textInput.value = null;
    numInput.value = null;
}

function devideTextAndNum(text, num){
    let result  = text.split(/[^0-9\/\*\**\%\^\+\-\(\)\.]/g);
    let ss = "";
    result = ss.concat(result);
    result = result.split(/[\ ]/g);
    result = ss.concat(result);
    result = result.replace(/[,]/g,"");
    iresult = Array.from(result);
    console.log(result);
    console.log(iresult);
    console.log("-=================")
    
    let modify = result.split(/[\d\.]/g);
    let number = result.split(/[\/\*\**\%\^\+\-\(\)]/g);
    let imodify = [];
    let inumber = [];
    console.log(modify);
    for(i=0;i<modify.length;i++){
        if(modify[i]!=''&&modify[i]!=null){
            imodify.push(modify[i])
        }
        if(number[i]!='' &&number[i]!=null){
            inumber.push(number[i])
        }
    }
    modify = imodify;
    console.log(modify);
    number = inumber;
    let calcul = [];
    for(i=0;i<number.length;i++){
        calcul.push(Number(number[i]));
        if(modify[i]!=null){
            let MsplitStr = Array.from(modify[i]);
            for(j=0;j<MsplitStr.length;j++){
                calcul.push(MsplitStr[j]);
            }
        }
    }
    parenthesesCalcul(calcul);
}
//()가로 안 식 먼저 계산
//1.0index에 가까운 n번째 (기호를 만나면 -index에 가까운 n번째 기호를 찾아서 판단
//2. 가장 안 쪽 기호를 찾아서 먼저 계산
//3. 가로 계산 후 밖으로 나오면서 앞에 숫자가 있으면 '(안 숫자)'를 '*','안 숫자'로 변경. 가로는 제거
function parenthesesCalcul(array){
    let inDoor = [];// (:2번째 (:1번째 계산   
    let outDoor = [];//       ):1번째 계산 ):2번째
    for(i=0;i<array.length;i++){
        for(j=0;j<array[i].length;j++){
            if(array[i][j] == '('){
                inDoor.push([i,j]);
            }
        }
    }
    for(i=0;i<array.length;i++){
        for(j=0;j<array[i].length;j++){
            if(array[i][j] == ')'){
                outDoor.push([i,j]);
            }
        }
    }
    for(i=1;i>=-(inDoor.length);i--){
        //array[inDoor[i][0]]~array[outDoor[-i][0]]
        //while(outDoor[])
    }
    console.log(array);
    //console.log(inDoor);
    //console.log(outDoor);
}
//(:1-가장첫번째  (:2-두번째  (:3   ):1   ):2-마지막두번째  ):3-가장마지막


//계산식 계산 구현 - 
//해당 기호를 만나면
//1. n-1번째, n번째(기호), n+1번째를 가져와서 계산
//2. n-1번째, n+1번째 값을 가지고 n번째 기호에 맞게 끔 계산


//----------------------------------------
let divCalcul = [];
const in_stor_tap_array_calcul = localStorage.getItem("tap_array");
if(in_stor_tap_array_calcul != null){
    const parsed_tap2 = JSON.parse(in_stor_tap_array_calcul);
    divCalcul = parsed_tap2;
    divCalcul.forEach(skill_apply_calcul);
}