let div_name = [];
let memoText_array = [];

//열렸던 창인지 확인 위한 자료불러오기
let M_showTap_array = [];
const M_tapShow_array = localStorage.getItem("tapShow_array");
if (M_tapShow_array !== null) {
    const M_parsed_tapShow_array = JSON.parse(M_tapShow_array);
    M_showTap_array = M_parsed_tapShow_array;
}

//처음 로딩시 skill 번호를 확인하고 그에 맞는 스킬을 부여
let i = 0;
function skill_apply(txt) {
    const div_name = `s${txt}`;
    if (div_name.charAt(div_name.length-1) == "0") {
        const w_div = document.querySelector(`.${div_name}`);

        const get_stor_memoText_array_tapHendle = localStorage.getItem(`${div_name}`);
        const parsed_memoText = JSON.parse(get_stor_memoText_array_tapHendle);
        if (get_stor_memoText_array_tapHendle !== null) {
            memoText_array = parsed_memoText;
            let tem_array = [];//첵딜올 용 - txt, 첵 값이 ""인 경우 배열제외
            for(i=0;i<memoText_array.length;i++){
                if(memoText_array[i].txt != "" && memoText_array[i].checked != ""){
                    tem_array.push(memoText_array[i]);
                }
            }
            memoText_array = tem_array;
        }
        //memoText_array = parsed_memoText;
        //console.log(memoText_array);
        const memo_form = document.createElement("form");
        const memo_input = document.createElement("input");
        memo_input.className = "workMemo";
        memo_form.className = `workMemo_form`;
        memo_form.appendChild(memo_input);
        //새로고침 방지 input
        const memo_input_notthing = document.createElement("input");
        memo_input_notthing.type = "submit";
        memo_input_notthing.value = "sub";
        //memo_input_notthing.style.display = "none";
        memo_form.appendChild(memo_input_notthing);
        const list_ul = document.createElement("ul");
        memo_array_Stor(div_name);

        //만약 버튼이 체크 되어 있음 보여지게끔 해줌
        //-txt주소 페이지 열람 array저장하고 여기에 적용하게끔 나중에 기능 넣을 것
        w_div.style.display = "none";
        if (M_showTap_array != null) {
            for (i = 0; i < M_showTap_array.length; i++) {
                if (`${M_showTap_array[i]}` == txt) {
                    w_div.style.display = "block";
                }
            }
        }
        const del_checks_btn = document.createElement("button");
        del_checks_btn.className = "del_check_memo";
        del_checks_btn.innerText = "del checks";
        del_checks_btn.addEventListener("click", delete_checks_memo);
        
        const del_all_btn = document.createElement("button");
        del_all_btn.className = "del_all_memo";
        del_all_btn.innerText = "yes";
        del_all_btn.addEventListener("click", delete_all_memo);

        const delAll_no = document.createElement("button");
        delAll_no.innerText = "no";//div다시 가리기
        delAll_no.addEventListener("click",hied_show_tapSelect2);
        const delAll_info = document.createElement("span");
        delAll_info.innerText = "Are you sure you want to delete all notes?";
        delAll_info.style.display = "block";

        const div_delAll = document.createElement("div");
        div_delAll.className = `delAll_${div_name}`;
        const btn_chek_delAll = document.createElement("button");
        btn_chek_delAll.innerText = "ALL del";
        btn_chek_delAll.addEventListener("click",hied_show_tapSelect);
        div_delAll.appendChild(delAll_info);
        div_delAll.appendChild(del_all_btn);
        div_delAll.appendChild(delAll_no);
        div_delAll.style.display = "none";
        
        //select option - 순서 정렬 변경 가능
        const select_option = document.createElement("select");
        select_option.className = "memo_select_option";
        select_option.addEventListener("change", selectOption_select);
        let option_list = ["new", "old", "number", "date"];
        for (i = 0; i < option_list.length; i++) {
            const sel_option = document.createElement("option");
            sel_option.value = `${option_list[i]}`;
            sel_option.innerText = `${option_list[i]}`;
            select_option.appendChild(sel_option);
        }
        let jjj=0;
        if(memoText_array.length >= 1){
            const haveSelecte = 'select' in memoText_array[0];
            if(haveSelecte==true){
                jjj= memoText_array[0].select;
                select_option.selectedIndex = jjj;
            }
        }//https://hianna.tistory.com/420 - 빈 값 확인방법
        selecOption_makeLi(memoText_array,jjj,get_stor_memoText_array_tapHendle,list_ul);

        //전체복사 
        const copy_all_memo_btn = document.createElement("button");
        copy_all_memo_btn.innerText = "copy all";
        copy_all_memo_btn.addEventListener("click", copyMemo_All);
        const del_list_div = document.createElement("div");
        
        del_list_div.appendChild(del_checks_btn);
        del_list_div.appendChild(btn_chek_delAll);
        del_list_div.appendChild(div_delAll);

        del_list_div.appendChild(copy_all_memo_btn);
        del_list_div.style.display = "inline-block";

        w_div.appendChild(memo_form);
        w_div.appendChild(select_option);
        w_div.appendChild(list_ul);
        w_div.appendChild(del_list_div);
        
        memoText_array = [];
    }
}
//==============================(위)시작시 추가
//첵딜올 보여주기
function hied_show_tapSelect(event){
    const win_num = event.target.parentElement.parentElement.className;
    const num = `${win_num}`;
    const delChecks_btn = document.querySelector(`.delAll_${num}`);
    if(delChecks_btn!=null){
        if(delChecks_btn.style.display == 'none'){
            delChecks_btn.style.display = 'block';
        }else if(delChecks_btn.style.display == 'block'){
            delChecks_btn.style.display = 'none';
        }
    }
}
function hied_show_tapSelect2(event){
    const win_num = event.target.parentElement.parentElement.parentElement.className;
    const num = `${win_num}`;
    const delChecks_btn = document.querySelector(`.delAll_${num}`);
    if(delChecks_btn!=null){
        if(delChecks_btn.style.display == 'none'){
            delChecks_btn.style.display = 'block';
        }else if(delChecks_btn.style.display == 'block'){
            delChecks_btn.style.display = 'none';
        }
    }
}

//select-option 관련 입력받을시 리스트 순서 변경
function selectOption_select(event) {
    const select_option = event.target.value;
    const ul = event.target.parentElement.childNodes[2];
    ul.replaceChildren();
    const tap = event.target.parentElement;

    const get_stor_memoText_array_tapHendle = localStorage.getItem(tap.className);
    const parsed_memoText = JSON.parse(get_stor_memoText_array_tapHendle);
    if (parsed_memoText !== null) {
        memoText_array = parsed_memoText;
    }
    memoText_array[0] = {
        text:memoText_array[0].text,
        checked:memoText_array[0].checked,
        select:0
    }
    let select_num = 0;
    if(select_option == "new"){
        memoText_array[0].select = 0;
    }else if(select_option == "old"){
        memoText_array[0].select = 1;
    }else if(select_option == "number"){
        memoText_array[0].select = 2;
    }else if(select_option == "date"){
        memoText_array[0].select = 3;
    }
    select_num = memoText_array[0].select;
    selecOption_makeLi(memoText_array, select_num,get_stor_memoText_array_tapHendle,ul);
    memo_array_Stor(tap.className);
    memoText_array = [];
}
//========================================================

//복사버튼
function copyMemo(event) {
    const del_memo_target = event.target.parentElement.parentElement.childNodes[1];
    window.navigator.clipboard.writeText(del_memo_target.innerText);
}
function copyMemo_All(event) {
    const tap = event.target.parentElement.parentElement;
    const select_memo = document.querySelectorAll(`.${tap.className} span`);
    const select_memo_li = document.querySelectorAll(`.${tap.className} li`);
    let allMemoCopy = "";

    for (i = 0; i < select_memo.length; i++) {
        if (select_memo_li[i].style.display != "none") {
            allMemoCopy = allMemoCopy.concat(select_memo[i].innerText, "\n");
        }
    }
    window.navigator.clipboard.writeText(allMemoCopy);
}

function deleteMemo(event) {
    //삭제시 ""로 저장 및 none으로 숨기고, 후에 새로고침 시 ""는 없앤 배열을 저장하기
    const del_memo_target = event.target.parentElement.parentElement.childNodes[1];
    const hide_memo_target = event.target.parentElement.parentElement;
    const tap = event.target.parentElement.parentElement.parentElement.parentElement;
    const get_stor_memoText_array_tapHendle = localStorage.getItem(tap.className);
    const parsed_memoText = JSON.parse(get_stor_memoText_array_tapHendle);
    let memoSaveValue = {
        text: "",
        checked: ""
    };

    if (parsed_memoText !== null) {
        memoText_array = parsed_memoText;
    }
    memoText_array[Number(del_memo_target.className)] = memoSaveValue;
    memo_array_Stor(tap.className);
    memoText_array = [];
    hide_memo_target.style.display = "none";
}

//첵 딜 올
function delete_checks_memo(event) {
    const tap = event.target.parentElement.parentElement;
    const get_stor_memoText_array_tapHendle = localStorage.getItem(tap.className);
    const parsed_memoText = JSON.parse(get_stor_memoText_array_tapHendle);
    let memoSaveValue = {
        text: "",
        checked: ""
    };
    if (parsed_memoText !== null) {
        memoText_array = parsed_memoText;
    }
    const select_memo = document.querySelectorAll(`.${tap.className} li`);
    let tem_num_array = [];
    for (i = 0; i < memoText_array.length; i++) { 
        if (memoText_array[i].checked == "true") {
            memoText_array[i] = memoSaveValue;
            tem_num_array.push(i);
        }
    }
    for(i=0;i<tem_num_array.length;i++){
        for(j=0;j<select_memo.length;j++){
            if(select_memo[j].childNodes[1].className == `${tem_num_array[i]}`){
                select_memo[j].style.display = "none";
            }
        }
    }
    memo_array_Stor(tap.className);
    memoText_array = [];
}

function delete_all_memo(event) {
    const tap = event.target.parentElement.parentElement.parentElement;
    const select_memo = document.querySelectorAll(`.${tap.className} li`);
    for (i = 0; i < select_memo.length; i++) {
        select_memo[i].style.display = "none";
    }
    memoText_array = [];
    memo_array_Stor(tap.className);
}

//처음 로딩시 skill창을 만들어 주는 곳
const in_stor_tap_array_tapHendle = localStorage.getItem("tap_array");
if (in_stor_tap_array_tapHendle !== null) {
    const parsed_tap_array = JSON.parse(in_stor_tap_array);
    div_name = parsed_tap_array;
    if(div_name !=null){
        div_name.forEach(skill_apply);
    }else{
        skill_apply("w0_t0_s0");
    }

}
//======================================메모 저장
function memo_array_Stor(memo_divClassName) {
    localStorage.setItem(`${memo_divClassName}`, JSON.stringify(memoText_array));
}
//메모 입력 받고 해당 아래 리스트에 추가.
function workMemo_inputValu_inList(event) {
    event.preventDefault();
    let parent = event.target.parentElement.className;
    const text = document.querySelector(`.${parent}`).firstChild.firstChild;
    const ul = document.querySelector(`.${parent}`).childNodes[2];
    const memoSaveValue = {
        text: text.value,
        checked: "false",
    }
    const get_stor_memoText_array_tapHendle = localStorage.getItem(`${parent}`);
    const parsed_memoText = JSON.parse(get_stor_memoText_array_tapHendle);
    if (parsed_memoText !== null) {
        memoText_array = parsed_memoText;
    }
    const li = makeMemoUl_list(memoText_array.length,memoSaveValue.text,memoSaveValue.checked);
    ul.prepend(li);
    memoText_array.push(memoSaveValue);
    memo_array_Stor(parent);
    memoText_array = [];
    text.value = "";
}
//이벤트 부여
const workMemo_input = document.querySelectorAll(".workMemo_form");
workMemo_input.forEach(function (event) {
    event.addEventListener("submit", workMemo_inputValu_inList);
});

//체크박스 체크 이벤트
function checkbox_work(event) {
    let parent = event.target.parentElement.parentElement.parentElement.className;
    const target_text = event.target.parentElement.childNodes[1];

    const get_stor_memoText_array_tapHendle = localStorage.getItem(`${parent}`);
    const parsed_memoText = JSON.parse(get_stor_memoText_array_tapHendle);

    let memoSaveValue = {
        text: target_text.innerText,
        checked: "true",
    }
    switch (event.target.checked) {
        case true:
            memoSaveValue = {
                text: target_text.innerText,
                checked: "true",
            }
            target_text.style.textDecoration = "line-through";
            event.target.checked = true;
            break;
        case false:
            memoSaveValue = {
                text: target_text.innerText,
                checked: "false",
            }
            target_text.style.textDecoration = "none";
            event.target.checked = false;
            break;
    }
    if (parsed_memoText !== null) {
        memoText_array = parsed_memoText;
    }
    memoText_array[Number(target_text.className)] = memoSaveValue;
    memo_array_Stor(parent);
    memoText_array = [];
}

function workMemo_checkbox_work(event) {
    const input = event.target.parentElement.childNodes[1];
    const submit = event.target.parentElement.childNodes[0];
    if (input.style.display == "inline-block") {
        input.style.display = "none";
        submit.style.display = "none";
    } else {
        submit.style.display = "inline-block";
        input.style.display = "inline-block";
    }
}
//메모수정
function edit_memo_form(event) {
    event.preventDefault();
    const input_text = event.target.childNodes[0];
    const parent = event.target.parentElement.parentElement.parentElement.parentElement.className;
    const check_btn = event.target.parentElement.childNodes[0].checked;

    const get_stor_memoText_array_tapHendle = localStorage.getItem(`${parent}`);
    const parsed_memoText = JSON.parse(get_stor_memoText_array_tapHendle);

    let memoSaveValue = {
        text: input_text.value,
        checked: check_btn,
    }

    if (parsed_memoText !== null) {
        memoText_array = parsed_memoText;
    }
    memoText_array[Number(input_text.className)] = memoSaveValue;
    memo_array_Stor(parent);
    memoText_array = [];

    const html_text = event.target.parentElement.parentElement.childNodes[1];
    html_text.innerText = input_text.value;

    const input_sub_btn = event.target.childNodes[1];
    input_sub_btn.style.display = "none";
    input_text.style.display = "none";
}

//=====================================
//윈도우에 li만드는 함수
function makeMemoUl_list(index,text,checked) {
    const li = document.createElement("li");
    const text_span = document.createElement("span");
    text_span.innerText = `${text}`;
    text_span.className = `${index}`;
    text_span.style.display = "inline-block";

    const check_btn = document.createElement("input");
    check_btn.type = "checkbox";
    check_btn.className = "memo_checkbox";
    check_btn.style.display = "inline";
    check_btn.addEventListener("click", checkbox_work);
    if (`${checked}` == "true") {
        check_btn.checked = "true";
        text_span.style.textDecoration = "line-through";
    }
    li.appendChild(check_btn);
    li.appendChild(text_span);

    //수정 form과 submit, checkbox 추가
    const edit_label = document.createElement("label");
    const edit_btn = document.createElement("checkbox");
    const edit_form = document.createElement("form");
    const edit_input = document.createElement("input");
    const edit_submit = document.createElement("input");
    edit_submit.type = "submit";
    edit_submit.vlaue = "sub";

    edit_form.className = "workMomo_edit";
    edit_label.innerText = "edit";
    edit_btn.style.display = "none";
    edit_btn.className = `memo_edit_checbox`;
    edit_label.addEventListener("click", workMemo_checkbox_work);
    edit_label.appendChild(edit_btn);
    edit_input.className = `${index}`;
    edit_input.value = `${text}`;
    edit_input.style.display = "none";
    edit_form.addEventListener("submit", edit_memo_form);
    edit_submit.style.display = "none";
    edit_form.appendChild(edit_input);
    edit_form.appendChild(edit_submit);
    edit_form.appendChild(edit_label);
    edit_form.style.display = "inline-block";
    //삭제버튼 구현
    const del_btn = document.createElement("button");
    del_btn.innerText = "del";
    del_btn.className = "memo_delete_btn";
    del_btn.style.display = "inline-block";
    del_btn.addEventListener("click", deleteMemo);

    //복사버튼 구현
    const copy_btn = document.createElement("button");
    copy_btn.innerText = "copy";
    copy_btn.style.display = "inline-block";
    copy_btn.addEventListener("click", copyMemo);

    const div_combine = document.createElement("div");
    div_combine.appendChild(edit_form);
    div_combine.appendChild(del_btn);
    div_combine.appendChild(copy_btn);

    li.appendChild(div_combine);
    if(text == "" && checked==""){
        li.style.display= "none";
    }
    return li;
}

function selecOption_makeLi(memoText_array, select_option,get_stor_memoText_array_tapHendle,ul){
    let first_write = [];
    let second_write = [];
    let newMemo_array = [];
    if (select_option == 2) { //넘버로 순서변경
        for (j = 0; j < memoText_array.length; j++) {
            let cutText = memoText_array[j].text;
            if (cutText.length > 3) {
                cutText = memoText_array[j].text.substr(0, 3);
            }
            const textNum = `${cutText}`.match(/\d+/g);

            if (textNum != null && isNaN(textNum) == false) {
                let k = {
                    number: Number(textNum),
                    index: j
                }
                first_write.push(k);
            } else {
                second_write.push(j);
            }
        }
        let i = 0;
        first_write.sort(function (a, b) {
            if (a.number < b.number) return -1;
            if (a.number > b.number) return 1;
            if (a.number == b.number) return 0;
        });
        for (i = 0; i < first_write.length; i++) {
            newMemo_array.push(first_write[i].index);
        }
        newMemo_array = newMemo_array.concat(second_write);
    } else if (select_option == 0) {//최신것 부터 순서변경
        for (i = memoText_array.length - 1; i >= 0; i--) {
            newMemo_array.push(i);
        }
    } else if (select_option == 1) { //오래된것 부터 순서변경
        for (i = 0; i < memoText_array.length; i++) {
            newMemo_array.push(i);
        }
    } else if (select_option == 3) { //시간 날짜 부터 순서변경
        //텍스트 배열 안 특정 텍스트, 숫자 있는지 확인 - 
        let second_write2 = [];
        let second_write22 = [];
        let second_write3 = [];
        let else_write = [];
        for (j = 0; j < memoText_array.length; j++) {
            let number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            let k_time = ["시", "분", "초"];
            let k_month = ["년", "달", "월",];
            let k_day = ["주", "일", "날", "모레"];
            let k_tiemNum = ["한", "두", "세", "네", "다섯", "여섯", "일곱", "여덜"];
            let k_next = ["다음"];
            let k_tomorow = ['내일'];
            let check_num = 0;
            let check_ktime = 0;
            let check_month = 0;
            let check_day = 0;
            let check_knum = 0;
            let check_next = 0;
            let check_tomorow = 0;
            for (i = 0; i < number.length; i++) {
                if (memoText_array[j].text.includes(number[i]) == true) {
                    check_num += 1;
                }
            }
            for (i = 0; i < k_time.length; i++) {
                if (memoText_array[j].text.includes(k_time[i]) == true) {
                    check_ktime += 1;
                }
            }
            for (i = 0; i < k_month.length; i++) {
                if (memoText_array[j].text.includes(k_month[i]) == true) {
                    check_month += 1;
                }
            }
            for (i = 0; i < k_tiemNum.length; i++) {
                if (memoText_array[j].text.includes(k_tiemNum[i]) == true) {
                    check_knum += 1;
                }
            }
            for (i = 0; i < k_day.length; i++) {
                if (memoText_array[j].text.includes(k_day[i]) == true) {
                    check_day += 1;
                }
            }
            if (memoText_array[j].text.includes(k_next[0]) == true) {
                check_next += 1;
            }
            if (memoText_array[j].text.includes(k_tomorow[0]) == true) {
                check_tomorow += 1;
            }
            if ((check_knum >= 1 || 1 && check_num >= 1) && check_ktime >=1 && check_next == 0 && check_month == 0 && check_day == 0&& check_tomorow ==0) {
                //한 시, 1 시
                first_write.push(j);
            } else if (check_tomorow>=1 && (check_month == 0 && check_num == 0 && check_next ==0) ) {
                //내일
                second_write22.push(j);
            } else if ( memoText_array[j].text.includes(k_day[3])==true || k_day >=1 && ((check_ktime >= 1 || check_next >=1 )  >= 1 && (check_month == 0 && check_num == 0) && check_tomorow == 0) ) {
                //모레 다음 주
                second_write2.push(j);
            } else if ( check_tomorow ==0 && (check_knum >= 1 || check_ktime >= 1 || check_num >= 1) && (check_day >= 1 || check_month >= 1)) {
                //10일 1월 2월 2년 다음 달 한 시
                second_write3.push(j);
            } else if(check_day==0) {
                else_write.push(j);
            }
        }
        newMemo_array = newMemo_array.concat(first_write);
        newMemo_array = newMemo_array.concat(second_write22);
        newMemo_array = newMemo_array.concat(second_write2);
        newMemo_array = newMemo_array.concat(second_write3);
        newMemo_array = newMemo_array.concat(else_write);
    }
    //순서변경한 array를 ul에 추가
    let a = 0;
    if (get_stor_memoText_array_tapHendle !== null) {
        for (i = 0; i < newMemo_array.length; i++) {
            a = newMemo_array[i];
            const li = makeMemoUl_list(a,memoText_array[a].text,memoText_array[a].checked);
            ul.appendChild(li);
        }
    }
}