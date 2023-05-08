const main = document.querySelector('.main');

//모듈화 해서 파일끼리 연결하기


let n = 0;
let name1 = "이름";

make_window(n,name1);

//make_tap(win_num,num,name,skill)
make_tap(0,1,"tapName1","todo");
make_tap(0,2,"tapName2","calender");
make_tap(0,0,"tapMenu","menu");

//make_tep_skill(win_num,tap_num,skill_num)
make_tep_skill(0,0,0);

function make_window(num,name){
    //윈도우 생성
    const newDiv = document.createElement("div");
    newDiv.className = `window_${num}`;

    //윈도우 이름 추가
    const window_name = document.createElement("h3");
    window_name.innerText = `${name}`;
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

    //

    //윈도우를 메인에 생성
    main.appendChild(newDiv);
}

function make_tap(win_num,num,name,skill){
    //윈도우 지정
    const window = document.querySelector(`.win_tap_${win_num}`);

    //탭 버튼 클래스 생성
    const newDiv = document.createElement("div");
    newDiv.className = `${win_num}_tap_${num}_${skill}`;

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
    newDiv.className = `${win_num}_tap_${tap_num}_skill_${skill_num}`;

    //스킬창을 윈도우에 생성
    window.appendChild(newDiv);
}