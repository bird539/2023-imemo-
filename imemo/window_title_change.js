//title을 저장할 array
let title_array = [0,1,2,3,4,5,6,7,8,9];
const in_stor_win_array2 = localStorage.getItem("win_array");
const parsed_win_array2 = JSON.parse(in_stor_win_array2);

//title_array를 localStorage에 넣기-array 형태로 넣기위해 JSON사용
function title_iput_Stor(){
    localStorage.setItem("window_title",JSON.stringify(title_array));
}

//rewrite 클릭시 이벤트
function title_change(event){
    event.preventDefault();
    //btn의 부모 클래스(title_form) 번호로 수정할 타이틀 선택 
    const btn = event.target.parentElement.className;
    const btn_num = Number(btn.charAt(0))
    const title = document.getElementsByClassName(`${btn_num}_title`)[0];
    const input = document.getElementsByClassName(`${btn_num}_rewrite_input`)[0];
    
    //input박스를 보이고 안 보이게끔+이름 수정 가능케
    if(input.type == "hidden"){
        input.type = "none";
        input.value = title.innerHTML;
    }else{
        title.innerHTML = input.value;
        title_array[btn_num] = input.value;
        title_iput_Stor();
        const get_stor_title_array = JSON.parse(localStorage.getItem("window_title"));
        //stor의 index로 해당 위치에 저장
        const n = parseInt(btn.charAt(0));
        get_stor_title_array[n] = input.value;
        title_array = get_stor_title_array;

        input.value = null;
        input.type = "hidden";
    }
}


//들어왔을 때 stor에서 받아서 수정
let num1 = 0;
function change_window(name){
    if(name == null){
        name = "win_name"
    }
    const title = document.getElementsByClassName(`${num1}_title`)[0];
    const input = document.getElementsByClassName(`${num1}_rewrite_input`)[0];
    if(title != null){
        title.innerHTML = name;
        input.type = "hidden";
    }
    num1++;
}


//모든 rewrite_btn 에서 이벤트 리스너가 작동
const rewrite_btn = document.querySelectorAll(".rewrite_btn");
rewrite_btn.forEach(function (event) {
    event.addEventListener("click",title_change);
});

const in_stor_title_array = localStorage.getItem("window_title");
if(in_stor_title_array !== null){
    //["/a/","/b/"]->["a","b"]
    const parsed_title_array = JSON.parse(in_stor_title_array);
    for (i=0;i<parsed_title_array.length;i++){
        title_array[i] = parsed_title_array[i]
    }
    //change_window로 array각각 받아서 순서대로 변경
    parsed_title_array.forEach(change_window);
}
title_iput_Stor();
