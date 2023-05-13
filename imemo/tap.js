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
    const newDiv = document.createElement("div");
    newDiv.className = `w${win_num}_t${tap_array.length}_s${btn_num}`;
    tap_array.push(newDiv.className);
    const tap_button = document.createElement("button");
    tap_button.innerText = `tap${btn_num}`;
    tap_array_Stor();
    newDiv.appendChild(tap_button);
    window.appendChild(newDiv);
    
    //window_n 클래스 아래에 제목,form,tap선택 다음에 추가(버튼개수대로)
    const window2 = document.querySelector(`.window_${win_num}`);
    const newDiv2 = document.createElement("div");
    newDiv2.className = `sw${win_num}_t${tap_array.length}_s${btn_num}`;
    window2.appendChild(newDiv2);

    switch(btn_num){
        case "0":
            console.log(newDiv2.className);
            make_workMemo(win_num,newDiv2.className);
            break;
    }
}

//처음 로딩시 만들어주기
function first_make_tap_btn_pluse(txt){
    const window = document.querySelector(`.win_tap_${txt.charAt(1)}`);
    const newDiv = document.createElement("div");
    newDiv.className = `${txt}`;
    const tap_button = document.createElement("button");
    tap_button.innerText = `tap${txt.charAt(txt.length-1)}`;
    newDiv.appendChild(tap_button);
    window.appendChild(newDiv);

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
    tap_array.forEach(first_make_tap_btn_pluse)
}else{
    tap_array_Stor();
    tap_array.forEach(first_make_tap_btn_pluse);
}

//할일목록 리스트
function make_workMemo(n,txt){
    console.log(document.querySelector(`${txt}`));
    const window00 = document.querySelector(txt);

    const li = document.createElement("li");
    li.className = `w${n}_w${n}_memo${n}`;
    const span = document.createElement("span");
    span.id = `${n}`;
    span.innerText = "hello world!"
    
    const button = document.createElement("button");
    button.innerText = "X";
    //button.addEventListener("click",);

    const checkBtn = document.createElement("input");
    checkBtn.setAttribute("type","checkbox");
    //checkBtn.addEvent..

    li.appendChild(span);
    li.appendChild(checkBtn);
    window00.appendChild(li);
}