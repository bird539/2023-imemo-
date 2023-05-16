let div_name = [];

//처음 로딩시 skill 번호를 확인하고 그에 맞는 스킬을 부여
let i =0;
function skill_apply(txt){
    const div_name = `s${txt}`;
    if(div_name.charAt(txt.length)=="0"){
        const w_div = document.querySelector(`.${div_name}`);

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
        for(i=0;i<10;i++){
            const list_li = document.createElement("li");
            list_li.innerText = "hello world!";
            list_ul.appendChild(list_li);
        }

        //만약 버튼이 체크 되어 있음 보여지게끔 해줌
        w_div.style.display = "none";
        const tap_button = document.querySelector(`input[name="tap${txt.charAt(1)}"]`);
        if(tap_button.checked == true){
            w_div.style.display = "block";
        }

        w_div.appendChild(memo_form);
        w_div.appendChild(list_ul);
    }
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

//버튼 선택시 스킬창 div가 보일지 안 보일지 선택하는 곳
function hide_none_or1(txt){
    const tapBtn = document.querySelectorAll(`.${txt} input`);
    tapBtn.forEach(function (event){
        event.addEventListener("click", show_tap);
    });
}
function show_tap(event){
    const select_value = event.target.value;
    const select_tap = document.querySelector(`.s${select_value}`);
    const tapBtn = document.querySelectorAll(`.w${select_value.charAt(1)} input`);
    for(i=0;i< tapBtn.length; i++){
        const select_tap2 = document.querySelector(`.s${tapBtn[i].value}`);
        //console.log(select_tap2);
        if(select_tap2!=null){
            select_tap2.style.display = "none";
        }
    }
    select_tap.style.display = "block";
}

//저장된 곳에서 정보 가져온 정보로 div가 보일지 안 보일지 addEventListner주는 곳
let tapBtn_array = [];
const in_stor_win_array_tapHendle = localStorage.getItem("win_array");
if (in_stor_win_array_tapHendle !== null){
    const parsed_winNum = JSON.parse(in_stor_win_array_tapHendle);
    for(i=0;i<parsed_winNum.length;i++){
        tapBtn_array[i] = `w${parsed_winNum[i]}`;
    }
    tapBtn_array.forEach(hide_none_or1);
}
//======================================메모 저장
let memoText_array =['w0_t0_s0'];

function tap_array_Stor(memo_divClassName){
    localStorage.setItem(`${memo_divClassName}`,JSON.stringify(tap_array));
}
//메모 입력 받고 해당 아래 리스트에 추가.
function workMemo_inputValu_inList(event){
    event.preventDefault();
    let parent = event.target.parentElement.className;
    let text = document.querySelector(`.${parent}`).firstChild.firstChild.value;
    
}
const workMemo_input = document.querySelectorAll(".workMemo_form");
workMemo_input.forEach(function (event){
    event.addEventListener("submit",workMemo_inputValu_inList);
});