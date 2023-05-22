let showTap_array = [];//마지막에 연 탭 저장배열->win길이 만큼만 공간할당

function tapShow_array_Stor(){
    localStorage.setItem(`tapShow_array`,JSON.stringify(showTap_array));
}
//열었던 창을 저장하고, 처음 불러올 때 열에 저장시키기
const in_stor_win_array_tapHendle_two = localStorage.getItem("win_array");
if (in_stor_win_array_tapHendle_two !== null){
    const parsed_winNum_two = JSON.parse(in_stor_win_array_tapHendle_two);
    showTap_array.length = parsed_winNum_two.length;
}
const in_stor_tapShow_array = localStorage.getItem("tapShow_array");
if(in_stor_tapShow_array !== null){
    const parsed_tapShow_array = JSON.parse(in_stor_tapShow_array);
    for(i=0;i<showTap_array.length;i++){
        showTap_array[i] = parsed_tapShow_array[i];
    }
    tapShow_array_Stor();
}

function pluse_tap_btn(event){
    event.preventDefault();
    const btn_parent = event.target.parentElement.parentElement.parentElement.className;
    const win_num = btn_parent.charAt(btn_parent.length - 1);

    const btn_text = event.target.innerText;
    const btn_num = btn_text.charAt(btn_text.length - 1);

    make_tap_btn_pluse(win_num, btn_num);
}

const pluse_tap = document.querySelectorAll(".skill_pls");
pluse_tap.forEach(function (event){
    event.addEventListener("click",pluse_tap_btn);
});

const in_stor_win_array_tapHendle2 = localStorage.getItem("win_array");
const parsed_winNum2 = JSON.parse(in_stor_win_array_tapHendle2);
showTap_array.length2 = parsed_winNum2.length;

function make_tap_btn_pluse(win_num, btn_num){
    const window = document.querySelector(`.win_tap_${win_num}`);
    const w_tap_all = document.querySelector(`.w${win_num}`);
    const class_name = `w${win_num}_t${tap_array.length}_s${btn_num}`
    
    tap_array.push(class_name);

    const tap_name = document.createElement("label");
    tap_name.htmlFor = class_name;
    tap_name.innerText = `tap${btn_num}`;

    const tap_button = document.createElement("input");
    tap_button.name = `tap${win_num}`;
    tap_button.type = 'radio';
    tap_button.value = class_name;
    tap_button.id = class_name;
    tap_button.checked = "checked";

    tap_array_Stor();
    w_tap_all.appendChild(tap_name);
    w_tap_all.appendChild(tap_button);
    window.appendChild(w_tap_all);
    
    //window_n 클래스 아래에 제목,form,tap선택 다음에 추가(버튼개수대로)
    //const window2 = document.querySelector(`.window_${win_num}`);
    const newDiv2 = document.createElement("div");
    newDiv2.className = `sw${win_num}_t${tap_array.length}_s${btn_num}`;
    window.appendChild(newDiv2);
    //선택에 맞게끔 div안에 스킬창 추가
    //메모장
    location.reload();
}

//처음 로딩시 만들어주기
function first_make_tap_btn_pluse(txt){
    const w_tap_all = document.querySelector(`.w${txt.charAt(1)}`);
    const tap_name = document.createElement("label");
    tap_name.htmlFor = `${txt}`;
    tap_name.innerText = `tap${txt.charAt(txt.length-1)}`;

    const tap_button = document.createElement("input");
    tap_button.name = `tap${txt.charAt(1)}`;
    tap_button.type = 'radio';
    tap_button.value = `${txt}`;
    tap_button.id = `${txt}`;

    const window2 = document.querySelector(`.window_${txt.charAt(1)}`);
    const newDiv2 = document.createElement("div");
    newDiv2.className = `s${txt}`;

    // 라디오 버튼을 미리 클릭시키는 부분 - 임시로 마지막 값만 클릭

    for(i=0;i<showTap_array.length;i++){
        if(txt == showTap_array[i]){
            tap_button.checked = "checked";
            newDiv2.style.display = "block";
        }
    }

    
    w_tap_all.appendChild(tap_name);
    w_tap_all.appendChild(tap_button);
    window2.appendChild(newDiv2);
}

let tap_array =['w0_t0_s0'];

function tap_array_Stor(){
    localStorage.setItem("tap_array",JSON.stringify(tap_array));
}

const in_stor_tap_array = localStorage.getItem("tap_array");
if(in_stor_tap_array !== null){
    const parsed_tap_array = JSON.parse(in_stor_tap_array);
    for(i=0;i<parsed_tap_array.length;i++){
        tap_array[i] = parsed_tap_array[i]
    }
    tap_array.forEach(first_make_tap_btn_pluse);
}else{
    tap_array_Stor();
    tap_array.forEach(first_make_tap_btn_pluse);
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

    //해당 윈도우[i]에 이 탭 번호를 집어 넣어야 함
    let lastTapOpen = `${select_value}`;

    showTap_array[Number(select_value.charAt(1))] = lastTapOpen;
    tapShow_array_Stor();
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



