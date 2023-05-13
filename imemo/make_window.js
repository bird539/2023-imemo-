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
    make_tap_pluse(num);
    make_menu(num);
}
function make_menu(num){
    const window = document.querySelector(`.win_tap_${num}`);
    const newDiv = document.createElement("div");
    newDiv.className = `tap_menu`;

    const tap_button = document.createElement("button");
    tap_button.innerText = `PLS win`;
    newDiv.appendChild(tap_button);
    window.appendChild(newDiv);
}

function make_tap_pluse(num){
    const window = document.querySelector(`.win_tap_${num}`);
    const newDiv = document.createElement("div");
    newDiv.className = `tap_PLS`;

    //ul로 숨겨진 목록
    const tapSelectDiv = document.createElement("div");
    tapSelectDiv.className = `tapPls${num}`;
    const newUl = document.createElement("ul");

    //li안 선택 스킬 버튼
    let skill_array = [0,1,2,3,4,5,6,7,8,9];
    skill_array.forEach(function(n) {
        const newLi = document.createElement("li");
        const newLiBtn = document.createElement("button");
        newLiBtn.innerText = `s${n}`;
        newLiBtn.className = `skill_pls`
        newLi.appendChild(newLiBtn);
        newUl.appendChild(newLi);
        newUl.style.display = 'none';
        tapSelectDiv.appendChild(newUl);
    });

    const tap_button = document.createElement("button");
    tap_button.innerText = `tap++`;    
    newDiv.appendChild(tap_button);
    newDiv.appendChild(tapSelectDiv);//ul추가

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

//윈도우 추가 이벤트
function pluse_window_event(event){
    window_array.push(window_array.length);
    window_array_store();
    make_window(window_array[window_array.length-1]);
    location.reload();
    //make_window();
}

//새로고침 시 저장물 보존
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

//스킬 선택 메뉴 숨기고 보이기
function hied_show_tapSelect(event){
    const win_num = event.target.parentElement.parentElement.className;
    const num = win_num.charAt(win_num.length-1);
    const tapPls = document.querySelector(`.tapPls${num}`);
    if(tapPls!=null){
        if(tapPls.firstChild.style.display == 'none'){
            tapPls.firstChild.style.display = 'block';
        }else if(tapPls.firstChild.style.display == 'block'){
            tapPls.firstChild.style.display = 'none';
        }
    }


}
const tapPluse_btn_q = document.querySelectorAll(".tap_PLS button");
tapPluse_btn_q.forEach(function (event){
    event.addEventListener("click",hied_show_tapSelect);
});



const pluse_window = document.querySelectorAll(".tap_menu");
pluse_window.forEach(function (event){
    event.addEventListener("click",pluse_window_event);
});