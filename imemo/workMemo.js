let div_name = [];
let memoText_array =[];

//열렸던 창인지 확인 위한 자료불러오기
let M_showTap_array = [];
const M_tapShow_array = localStorage.getItem("tapShow_array");
if (M_tapShow_array !== null){
    const M_parsed_tapShow_array = JSON.parse(M_tapShow_array);
    M_showTap_array = M_parsed_tapShow_array;
}

//처음 로딩시 skill 번호를 확인하고 그에 맞는 스킬을 부여
let i =0;
function skill_apply(txt){
    const div_name = `s${txt}`;
    if(div_name.charAt(txt.length)=="0"){
        const w_div = document.querySelector(`.${div_name}`);

        const get_stor_memoText_array_tapHendle = localStorage.getItem(`${div_name}`);
        const parsed_memoText = JSON.parse(get_stor_memoText_array_tapHendle);
        if(get_stor_memoText_array_tapHendle !== null){
            for(i=0;i<parsed_memoText.length;i++){
                if(parsed_memoText[i].text != ''  && parsed_memoText[i] != null){
                    memoText_array.push(parsed_memoText[i]);
                }
            }
        }

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
        if(get_stor_memoText_array_tapHendle !== null){
            for (i=0;i<memoText_array.length;i++){
                const li = document.createElement("li");
                const text_span = document.createElement("span");
                text_span.innerText = `${memoText_array[i].text}`;
                text_span.className =  `${i}`;
                text_span.style.display = "inline-block";
                
                const check_btn = document.createElement("input");
                check_btn.type = "checkbox";
                check_btn.className = "memo_checkbox";
                check_btn.style.display = "inline";
                check_btn.addEventListener("click", checkbox_work); 
                if(`${memoText_array[i].checked}` == "true"){
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
                edit_label.addEventListener("click",workMemo_checkbox_work);
                edit_label.appendChild(edit_btn);
                edit_input.className = `${i}`;
                edit_input.value = `${memoText_array[i].text}`;
                edit_input.style.display = "none";
                edit_form.addEventListener("submit",edit_memo_form);
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
                del_btn.addEventListener("click",deleteMemo);
                
                const div_combine = document.createElement("div");
                div_combine.appendChild(edit_form);
                div_combine.appendChild(del_btn);

                li.appendChild(div_combine);
                list_ul.prepend(li);
            }
        }
        memo_array_Stor(div_name);
        memoText_array = [];

        //만약 버튼이 체크 되어 있음 보여지게끔 해줌
        //-txt주소 페이지 열람 array저장하고 여기에 적용하게끔 나중에 기능 넣을 것

        w_div.style.display = "none";
        if(M_showTap_array != null){
            for(i=0;i<M_showTap_array.length;i++){
                if(`${M_showTap_array[i]}`==txt){
                    w_div.style.display = "block";
                }
            }
        }

        w_div.appendChild(memo_form);
        w_div.appendChild(list_ul);
    }
}
function deleteMemo(event){
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

    if(parsed_memoText !== null){
        memoText_array = parsed_memoText;
    }
    memoText_array[Number(del_memo_target.className)] = memoSaveValue;
    memo_array_Stor(tap.className);
    memoText_array = [];
    hide_memo_target.style.display = "none";

}

//처음 로딩시 skill창을 만들어 주는 곳
const in_stor_tap_array_tapHendle = localStorage.getItem("tap_array");
if (in_stor_tap_array_tapHendle !== null){
    const parsed_tap_array = JSON.parse(in_stor_tap_array);
    for(i=0;i<parsed_tap_array.length;i++){
        div_name[i] = parsed_tap_array[i];
    }
    div_name.forEach(skill_apply);
}


//======================================메모 저장
function memo_array_Stor(memo_divClassName){
    localStorage.setItem(`${memo_divClassName}`,JSON.stringify(memoText_array));
}
//메모 입력 받고 해당 아래 리스트에 추가.
function workMemo_inputValu_inList(event){
    event.preventDefault();
    let parent = event.target.parentElement.className;

    const text = document.querySelector(`.${parent}`).firstChild.firstChild;
    const ul = document.querySelector(`.${parent}`).childNodes[1];
    const li = document.createElement("li");
    const memoSaveValue = {
        text: text.value,
        checked: "false",
    }

    const get_stor_memoText_array_tapHendle = localStorage.getItem(`${parent}`);
    const parsed_memoText = JSON.parse(get_stor_memoText_array_tapHendle);
    if(parsed_memoText !== null){
        memoText_array = parsed_memoText;
    }

    const check_btn = document.createElement("input");
    check_btn.type = "checkbox";
    check_btn.className = "memo_checkbox";
    check_btn.addEventListener("click", checkbox_work); 
    li.appendChild(check_btn);

    const text_span = document.createElement("span");
    text_span.innerText = text.value;
    text_span.className =  `0`;
    if(parsed_memoText !== null){
        text_span.className =  `${memoText_array.length}`;
    }
    li.appendChild(text_span);

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
    edit_label.addEventListener("click",workMemo_checkbox_work);
    edit_label.appendChild(edit_btn);
    edit_input.className = `${i}`;
    edit_input.value = `${text.value}`;
    edit_input.style.display = "none";
    edit_form.addEventListener("submit",edit_memo_form);
    edit_submit.style.display = "none";
    edit_form.appendChild(edit_input);
    edit_form.appendChild(edit_submit);
    edit_form.appendChild(edit_label);

    //삭제버튼 구현
    const del_btn = document.createElement("button");
    del_btn.innerText = "del";
    del_btn.className = "memo_delete_btn";
    del_btn.style.display = "inline-block";
    del_btn.addEventListener("click",deleteMemo);

    const div_combine = document.createElement("div");
    div_combine.appendChild(edit_form);
    div_combine.appendChild(del_btn);

    li.appendChild(div_combine);

    memoText_array.push(memoSaveValue);
    memo_array_Stor(parent);
    memoText_array = [];
    text.value = "";

    ul.prepend(li);
}
//이벤트 부여
const workMemo_input = document.querySelectorAll(".workMemo_form");
workMemo_input.forEach(function (event){
    event.addEventListener("submit",workMemo_inputValu_inList);
});

//체크박스 체크 이벤트
function checkbox_work(event){
    let parent = event.target.parentElement.parentElement.parentElement.className;
    const target_text = event.target.parentElement.childNodes[1];

    const get_stor_memoText_array_tapHendle = localStorage.getItem(`${parent}`);
    const parsed_memoText = JSON.parse(get_stor_memoText_array_tapHendle);

    let memoSaveValue = {
        text: target_text.innerText,
        checked: "true",
    }
    switch (event.target.checked){
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

    if(parsed_memoText !== null){
        memoText_array = parsed_memoText;
    }
    memoText_array[Number(target_text.className)] = memoSaveValue;
    memo_array_Stor(parent);
    memoText_array = [];
}

function workMemo_checkbox_work(event){

    const input = event.target.parentElement.childNodes[1];
    const submit = event.target.parentElement.childNodes[0];
    if (input.style.display == "inline-block"){
        input.style.display = "none";
        submit.style.display = "none";
    } else {
        submit.style.display = "inline-block";
        input.style.display = "inline-block";
    }
}

function edit_memo_form(event){
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

    if(parsed_memoText !== null){
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