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

    const memu_show_btn = document.createElement("button");
    memu_show_btn.innerText = "menu";
    memu_show_btn.style.display = "block";
    memu_show_btn.addEventListener("click",menu_show);
    newDiv.appendChild(memu_show_btn);

    let newMenu = make_menu(num);
    newDiv.appendChild(newMenu);

    //tap버튼들 모음 form
    const w_tap_all = document.createElement("form");
    w_tap_all.className = `w${num}`;
    newDiv.appendChild(w_tap_all);
}
//MENU----------------
function make_menu(num){
    const newDiv = document.createElement("div");
    newDiv.className = `win_menu`;
    newDiv.style.display = "none";

    const title_menu = document.createElement("h4");
    title_menu.innerText = "MENU";
    newDiv.appendChild(title_menu);

    const ex_winPLS_btn = document.createElement("h5");
    ex_winPLS_btn.innerText = "윈도우 추가 하기 (0~9까지가능(최대 개수 10개))";
    newDiv.appendChild(ex_winPLS_btn);

    const winPLS_button = document.createElement("button");
    winPLS_button.innerText = `PLS win`;
    winPLS_button.addEventListener("click",pluse_window_event);
    newDiv.appendChild(winPLS_button);

    const ex_changeTap_btn = document.createElement("h5");
    ex_changeTap_btn.innerText = "탭 이름, 순서 변경";
    newDiv.appendChild(ex_changeTap_btn);

    const ex_delTap_btn = document.createElement("h5");
    ex_delTap_btn.innerText = "탭 삭제하기";
    newDiv.appendChild(ex_delTap_btn);

    
    const form_tapSelect = document.createElement("form");
    form_tapSelect.className = `del_tapSelect_win${num}`;
    
    const in_stor_tap_array = localStorage.getItem("tap_array");
    let tap_array = [];
    if(in_stor_tap_array !== null){
        const parsed_tap_array = JSON.parse(in_stor_tap_array);
        tap_array = parsed_tap_array;
        const select_tap = document.createElement("select");
        select_tap.className = `tapSelectDel_w${num}`;
        for(i=0;i<tap_array.length;i++){
            if(`${tap_array[i].charAt(1)}`==`${num}`){
                const tap_option = document.createElement("option");
                tap_option.innerText = tap_array[i];
                select_tap.appendChild(tap_option);
            }
        }
        form_tapSelect.appendChild(select_tap);
        const tap_del_btn = document.createElement("input");
        tap_del_btn.type = "submit";
        tap_del_btn.value = "tap del";
        tap_del_btn.addEventListener("click",selectTapDel);
        form_tapSelect.appendChild(tap_del_btn);    
    }
    newDiv.appendChild(form_tapSelect);

    const ex_delWin_btn = document.createElement("h5");
    //const win_title = win.childNodes[0].innerText;
    ex_delWin_btn.innerText = `현재 윈도우(${num}번) 삭제하기`;
    newDiv.appendChild(ex_delWin_btn);
    const show_winDel_btn = document.createElement("button");
    show_winDel_btn.innerText = "del now window";
    show_winDel_btn.addEventListener("click",hied_show);
    newDiv.appendChild(show_winDel_btn);

    const div_warning_winDel = document.createElement("div");
    div_warning_winDel.style.display = "none";

    const span_waining_windel = document.createElement("span");
    span_waining_windel.innerText = `정말로 현재 윈도우(${num}번)을 삭제하시겠습니까?\n해당 윈도우 속 탭 저장물도 모두 함께 삭제됩니다.`;
    div_warning_winDel.appendChild(span_waining_windel);

    const btn_yes_winDel = document.createElement("button");
    btn_yes_winDel.innerText = "YES";
    btn_yes_winDel.addEventListener("click",nowWinDel);
    div_warning_winDel.appendChild(btn_yes_winDel);

    const btn_no_winDel = document.createElement("button");
    btn_no_winDel.innerText = "NO";
    div_warning_winDel.appendChild(btn_no_winDel);

    newDiv.appendChild(div_warning_winDel);

    newDiv.style.border = "1px solid white";

    return newDiv;
}
//----------------MENU
//메뉴 속 버튼들 함수----------------
function selectTapDel(event){
    //event.preventDefault();
    const tapName = event.target.previousSibling.value;

    const in_stor_tap_array = localStorage.getItem("tap_array");
    let tap_array = [];
    let tap_array_new = [];
    if(in_stor_tap_array !== null){
        const parsed_tap_array = JSON.parse(in_stor_tap_array);
        tap_array = parsed_tap_array;
        for(i=0;i<tap_array.length;i++){
            if(tap_array[i]==tapName){
                window.localStorage.removeItem(tapName);
            }else if(tap_array[i]!=tapName){
                tap_array_new.push(tap_array[i]);
            }
        }
        localStorage.setItem(`tap_array`,JSON.stringify(tap_array_new));
    }
}

function nowWinDel(event){
    const win = event.target.parentElement.parentElement.parentElement.className;
    const winNum = Number(win.charAt(win.length-1));
    const in_stor_win_array = localStorage.getItem("win_array");
    const in_stor_tap_array = localStorage.getItem("tap_array");
    const in_stor_tapShow_array = localStorage.getItem("tapShow_array");
    const in_stor_title_array = localStorage.getItem("window_title");

    let del_showTap = [];
    if(in_stor_tap_array !== null){
        const parsed_tap_array = JSON.parse(in_stor_tap_array);
        let tap_array = parsed_tap_array;
        let new_tap_array = [];
        for(i=0;i<tap_array.length;i++){
            const tapNum = Number(tap_array[i].charAt(1));
            console.log(tapNum,winNum);
            if(tapNum!=winNum){
                new_tap_array.push(tap_array[i]);
            }else if(tapNum==winNum){
                del_showTap.push(tap_array[i]);
                window.localStorage.removeItem(`s${tap_array[i]}`);
            }
        }
        localStorage.setItem(`tap_array`,JSON.stringify(new_tap_array));
    }
    if(in_stor_tapShow_array !== null){
        const parsed_tap_array = JSON.parse(in_stor_tapShow_array);
        let tapShow_array = parsed_tap_array;
        let newShowTap_array = [];
        for(i=0;i<tapShow_array.length;i++){
            for(j=0;j<del_showTap.length;j++){
                if(tapShow_array[i] == del_showTap[j]){
                    tapShow_array[i] = -1;
                }
            }
        }
        for(i=0;i<tapShow_array.length;i++){
            if(tapShow_array[i]!=-1){
                newShowTap_array.push(tapShow_array[i]);
            }
        }
        localStorage.setItem(`tapShow_array`,JSON.stringify(newShowTap_array));
    }
    
    if(in_stor_win_array !== null){
        const parsed_win_array = JSON.parse(in_stor_win_array);
        let window_array = parsed_win_array;

        const parsed_win_title = JSON.parse(in_stor_title_array);
        let win_title_array = parsed_win_title;
        //let new_win_title_array = [];

        let new_win_array = [];
        for(i=0;i<window_array.length;i++){
            console.log("win[i]:",window_array[i],"winN:",winNum)
            if(window_array[i]!=winNum){
                new_win_array.push(window_array[i]);
            }else{
                win_title_array[i] = i;
            }
        }
        localStorage.setItem(`win_array`,JSON.stringify(new_win_array));
        localStorage.setItem(`window_title`,JSON.stringify(win_title_array));
    }
    location.reload();
}

function hied_show(event){
    const show_hide_target = event.target.nextSibling;
    if(show_hide_target!=null){
        if(show_hide_target.style.display == 'none'){
            show_hide_target.style.display = 'block';
        }else if(show_hide_target.style.display == 'block'){
            show_hide_target.style.display = 'none';
        }
    }
}
//----------------메뉴 속 버튼들 함수

function menu_show(event){
    const div_menu = event.target.parentElement.childNodes[4];
    if(div_menu!=null){
        if(div_menu.style.display == 'none'){
            div_menu.style.display = 'block';
        }else if(div_menu.style.display == 'block'){
            div_menu.style.display = 'none';
        }
    }
}

function make_tap_pluse(num){
    const window = document.querySelector(`.win_tap_${num}`);
    const newDiv = document.createElement("div");
    newDiv.className = `tap_PLS`;

    //ul로 숨겨진 목록
    const tapSelectDiv = document.createElement("div");
    tapSelectDiv.className = `tapPls${num}`;
    const newUl = document.createElement("ul");
    newUl.style.listStyle = "none";

    //li안 선택 스킬 버튼
    let skill_array = [0,1,2,3,4,5,6,7,8,9];
    skill_array.forEach(function(n) {
        const newLi = document.createElement("li");
        const newLiBtn = document.createElement("button");
        newLiBtn.innerText = `${n}`;
        newLiBtn.className = `skill_pls`;
        newLi.appendChild(newLiBtn);
        newUl.appendChild(newLi);
        newLi.style.float = "left";
        newUl.style.display = 'none';
        tapSelectDiv.appendChild(newUl);
    });

    const tap_button = document.createElement("button");
    tap_button.innerText = `tap++`;
    newDiv.appendChild(tap_button);
    newDiv.appendChild(tapSelectDiv);//ul추가
    newDiv.addEventListener("click",hied_show_tapSelect);

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

//윈도우 추가 이벤트
function pluse_window_event(event){
    let limit_num = [0,1,2,3,4,5,6,7,8,9];
    let new_can_winNum = [];
    for(i=0;i<window_array.length;i++){
        for(j=0;j<limit_num.length;j++){
            if(window_array[i]==limit_num[j]){
                limit_num[j] = -1;
            }
        }
    }
    for(i=0;i<limit_num.length;i++){
        if(limit_num[i] != -1){
            window_array.push(limit_num[i]);
            break;
        }
    }
    window_array_store();
    make_window(window_array[new_can_winNum[0]]);
    location.reload();
}

//스킬 선택 메뉴 숨기고 보이기
function hied_show_tapSelect(event){
    const win_num = event.target.parentElement.parentElement.className;
    const num = win_num.charAt(win_num.length-1);
    const tapPls = document.querySelector(`.tapPls${num}`);
    if(tapPls!=null){
        if(tapPls.firstChild.style.display == 'none'){
            tapPls.firstChild.style.display = 'inline-block';
        }else if(tapPls.firstChild.style.display == 'inline-block'){
            tapPls.firstChild.style.display = 'none';
        }
    }
}