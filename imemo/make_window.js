const main = document.querySelector('.main');

function make_window(num){
    //윈도우 생성
    const newDiv = document.createElement("div");
    newDiv.className = `window_${num}`;

    //윈도우 이름 추가
    const window_name = document.createElement("h3");
    window_name.innerText = `win${num}`;
    window_name.className = `${num}_title`;
    newDiv.appendChild(window_name);

    //이름 입력, 수정 추가
    const name_form = document.createElement("form");
    name_form.className = `${num}_title_form`;

    const name_input = document.createElement("input");
    const name_input_btn = document.createElement("button");
    name_input_btn.innerText = "rewrite";
    name_input_btn.className = `rewrite_btn`;
    name_input.className = `${num}_rewrite_input`;

    name_form.appendChild(name_input);
    name_form.appendChild(name_input_btn);

    newDiv.appendChild(name_form);

    //윈도우 탭 클래스 생성
    const tap_class = document.createElement("div");
    tap_class.className = `win_tap_${num}`;
    newDiv.appendChild(tap_class);

    //윈도우를 메인에 생성
    main.appendChild(newDiv);

    //윈도우 추가 버튼 생성
    make_menu(num);
}
function make_menu(num){
    const window = document.querySelector(`.win_tap_${num}`);
    const newDiv = document.createElement("div");
    newDiv.className = `tep_menu`;

    const tap_button = document.createElement("button");
    tap_button.innerText = `PLS win`;
    newDiv.appendChild(tap_button);
    window.appendChild(newDiv);
}

function make_tap(win_num,num,name,skill){
    //윈도우 지정
    const window = document.querySelector(`.win_tap_${win_num}`);

    //탭 버튼 클래스 생성
    const newDiv = document.createElement("div");
    newDiv.className = `win${win_num}_tap${num}_${skill}`;

    //탭 버튼 클래스에 탭 버튼 추가
    const tap_button = document.createElement("button");
    tap_button.innerText = `${name}`;
    newDiv.appendChild(tap_button);

    //탭 버튼을 윈도우에 생성
    window.appendChild(newDiv);
}

function make_tep_skill(win_num,tap_num,skill_num){
    //윈도우 지정
    const window = document.querySelector(`.window_${win_num}`);

    //스킬창 클래스 생성
    const newDiv = document.createElement("div");
    newDiv.className = `win${win_num}_tap${tap_num}_skill${skill_num}`;

    //스킬창을 윈도우에 생성
    window.appendChild(newDiv);
}


let window_array = [0];

function window_array_store(){
    localStorage.setItem("win_array",JSON.stringify(window_array));
}

function pluse_window_event(event){
    window_array.push(window_array.length);
    window_array_store();
    make_window(window_array[window_array.length-1]);
    location.reload();
    //make_window();
}

const in_stor_win_array = localStorage.getItem("win_array");
if(in_stor_win_array !== null){
    const parsed_win_array = JSON.parse(in_stor_win_array);
    window_array = parsed_win_array;
    parsed_win_array.forEach(make_window);
} else {
    //로컬 스토리지 비웠을 때
    window_array_store();
    window_array.forEach(make_window);
}

const pluse_window = document.querySelectorAll(".tep_menu");
pluse_window.forEach(function (event){
    event.addEventListener("click",pluse_window_event);
});