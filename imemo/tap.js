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
    tap_button.checked = "checked"


    tap_array_Stor();
    w_tap_all.appendChild(tap_name);
    w_tap_all.appendChild(tap_button);
    window.appendChild(w_tap_all);
    
    //window_n 클래스 아래에 제목,form,tap선택 다음에 추가(버튼개수대로)
    const window2 = document.querySelector(`.window_${win_num}`);
    const newDiv2 = document.createElement("div");
    newDiv2.className = `sw${win_num}_t${tap_array.length}_s${btn_num}`;

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

    w_tap_all.appendChild(tap_name);
    w_tap_all.appendChild(tap_button);

    const window2 = document.querySelector(`.window_${txt.charAt(1)}`);
    const newDiv2 = document.createElement("div");
    newDiv2.className = `s${txt}`;
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