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
        tableCalcul.style.width = "370px";
        
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
    }else if(newOrDel == 3){
        let change = calculArray[num];
        change = text;
        calculArray[num] = change;
        localStorage.setItem(divName, JSON.stringify(calculArray));
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
            
        }else if(j>0){
            const tdCal = document.createElement("td");
            const tdTxtSpan = document.createElement("span");
            tdTxtSpan.innerText = `${text}`;
            tdTxtSpan.className = "text";
            if(j==2){
                tdTxtSpan.innerText = `${num}`;
                tdTxtSpan.className = "value";
            }
            trCal.addEventListener("dblclick",editTextOrValue);

            tdCal.style.borderBottom = "1px solid #ffffff";
            tdCal.style.borderCollapse = "collapse";
            tdCal.style.padding = "5px";
            
            const textEditForm = document.createElement("form");
            const textEditSub = document.createElement("button");
            textEditSub.innerText = "sub";
            textEditSub.type = "submit";
            const textEditInput = document.createElement("input");
            textEditInput.value = `${text}`;
            if(j==2){
                textEditInput.value = `${num}`;
            }
            textEditForm.addEventListener("submit",editFormSubmit);
            textEditForm.appendChild(textEditInput);
            textEditForm.appendChild(textEditSub);
            textEditForm.style.display="none";
            
            tdCal.appendChild(tdTxtSpan);
            tdCal.appendChild(textEditForm);
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

    let final = seperateCalculUi(textInput.value, numInput.value);
    let indexAndSave = saveCalcul(divName,final[0], final[1], 0);
    makeTrTd(indexAndSave,false,final[0],final[1],tableCalcul);
    textInput.value = null;
    numInput.value = null;
}
function seperateCalculUi(textInput, numInput,edit){
    let textCheck = devideTextAndNumAndCalcul(textInput);
    let valueCheck = devideTextAndNumAndCalcul(numInput);
    //["string","1+2",3];

    for(i=0;i<3;i++){
        if(textCheck[i]==''){
            textCheck[i] = null;
        }
        if(valueCheck[i]==''){
            valueCheck[i] = null;
        }
    }
    let finalText;
    let finalCalcul;
    let finalValue;

    if(valueCheck[0]!=null){
        finalText=valueCheck[0];
    }
    if(textCheck[0]!=null){
        finalText=textCheck[0];
    }
    if(textCheck[1]!=null){
        finalCalcul=textCheck[1];
    }
    if(valueCheck[1]!=null){
        finalCalcul=valueCheck[1];
    }
    if(valueCheck[2]==null && textCheck[2] !=null){
        finalValue=textCheck[2];
    }else{
        finalValue=valueCheck[2];
    }
    if(finalCalcul!=null && finalText !=null){
        finalText = `${finalText}\n${finalCalcul}`;
    }else if(finalCalcul!=null && finalText ==null){
        finalText = `${finalCalcul}`;
    }
    if(edit==0){
        if(textCheck[0]!=null && textCheck[1] !=null){
            finalText = `${textCheck[0]}\n${textCheck[1]}`;
            finalValue = textCheck[2];
        }else if(textCheck[1] ==null){
            finalText = `${textCheck[0]}`;
        }else if(textCheck[0]==null && textCheck[1] !=null){
            finalText = `${textCheck[1]}`;
            finalValue = textCheck[2];
        }
    }if(edit==1){
        if(textCheck[0]!=null && textCheck[1] !=null){
            finalText = `${textCheck[0]}\n${textCheck[1]}`;
            finalValue = valueCheck[2];
        }else if(textCheck[1] ==null){
            finalText = `${textCheck[0]}`;
            finalValue = valueCheck[2];
        }else if(textCheck[0]==null && textCheck[1] !=null){
            finalText = `${textCheck[1]}`;
            finalValue = valueCheck[2];
        }
    }
    let final = [finalText, finalValue];
    return final;
}

function devideTextAndNumAndCalcul(text){
    let result  = text.split(/[^0-9\/\*\**\%\^\+\-\(\)\.]/g);
    let ss = "";
    result = ss.concat(result);
    result = result.split(/[\ ]/g);
    result = ss.concat(result);
    result = result.replace(/[,]/g,"");
    let sum = new Function(`return ${result}`)();

    let textTitle  = text.split(/[0-9\/\*\**\%\^\+\-\(\)\.\t\n]/g);
    let s2 = "";
    textTitle = s2.concat(textTitle);
    textTitle = textTitle.replace(/[,]/g,"");

    let retrunValue = [textTitle,result,sum];
    return retrunValue;
}

function editTextOrValue(event){
    const target = event.target;
    if(target.tagName == "SPAN"){
        const targetIn = event.target;
        const showInput = event.target.nextSibling;

        if(targetIn.style.display != "none"){
            targetIn.style.display = "none";
            showInput.style.display = "inline-block";
        }else{
            targetIn.style.display = "inline-block";
            showInput.style.display = "none";
        }
    }else if(target.tagName == "TD"){
        const targetIn = event.target.childNodes[0];
        const showInput = event.target.childNodes[1];

        if(targetIn.style.display != "none"){
            targetIn.style.display = "none";
            showInput.style.display = "inline-block";
        }else{
            targetIn.style.display = "inline-block";
            showInput.style.display = "none";
        }
    }
}
function editFormSubmit(event){
    event.preventDefault();
    const targetFormValue = event.target.childNodes[0].value;
    const targetForm = event.target;
    const targetText = event.target.previousSibling;
    const targetCheck = event.target.parentElement.parentElement.childNodes[0].childNodes[0];
    const divName = event.target.parentElement.parentElement.parentElement.parentElement.className;
    let editArray = [];
    if(targetText.className == "value"){
        const text = event.target.parentElement.parentElement.childNodes[1].childNodes[0];
        let final = seperateCalculUi(text.innerText,targetFormValue,1);
        editArray = [targetCheck.checked, final[0], final[1]];
        targetText.innerText = final[1];
        text.innerText = `${final[0]}`;
    }else if(targetText.className == "text"){
        const value = event.target.parentElement.parentElement.childNodes[2].childNodes[0];
        let final = seperateCalculUi(targetFormValue,value.innerText,0);
        editArray = [targetCheck.checked, final[0], final[1]];
        targetText.innerText = final[0];
        if(final[1]!=null){
            value.innerText = `${final[1]}`;
        }
    }
    
    saveCalcul(divName,editArray, targetCheck.value,3);

    targetForm.style.display = "none";
    targetText.style.display = "inline-block";
    
}


//----------------------------------------
let divCalcul = [];
const in_stor_tap_array_calcul = localStorage.getItem("tap_array");
if(in_stor_tap_array_calcul != null){
    const parsed_tap2 = JSON.parse(in_stor_tap_array_calcul);
    divCalcul = parsed_tap2;
    divCalcul.forEach(skill_apply_calcul);
}