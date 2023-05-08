//title을 저장할 array
let title_array = [];

//title_array를 localStorage에 넣기-array 형태로 넣기위해 JSON사용
function title_iput_Stor(){
    localStorage.setItem("window_title",JSON.stringify(title_array));
}

//rewrite 클릭시 이벤트
function title_change(event){
    event.preventDefault();
    //btn의 부모 클래스(title_form) 번호로 수정할 타이틀 선택 
    const btn = event.target.parentElement.className;
    const title = document.getElementsByClassName(`${btn.charAt(0)}_title`)[0];
    const input = document.getElementsByClassName(`${btn.charAt(0)}_rewrite_input`)[0];
    
    //input박스를 보이고 안 보이게끔+이름 수정 가능케
    if(input.type == "hidden"){
        input.type = "none";
        input.value = title.innerHTML;
    }else{
        const get_stor_title_array = JSON.parse(localStorage.getItem("window_title"));
        title.innerHTML = input.value;
        title_array.push(input.value);
        //stor의 index로 해당 위치에 저장
        const n = parseInt(btn.charAt(0));
        get_stor_title_array[n] = input.value;
        title_array = get_stor_title_array;
        title_iput_Stor();

        input.value = null;
        input.type = "hidden";
    }
}


//들어왔을 때 stor에서 받아서 수정
let num = 0;
function change_window(name){
    const title = document.getElementsByClassName(`${num}_title`)[0];
    const input = document.getElementsByClassName(`${num}_rewrite_input`)[0];
    title.innerHTML = name;
    input.type = "hidden";
    num++;
}


//모든 rewrite_btn 에서 이벤트 리스너가 작동
const rewrite_btn = document.getElementsByClassName(`rewrite_btn`)[0];
rewrite_btn.addEventListener("click",title_change);

const in_stor_title_array = localStorage.getItem("window_title");
if(in_stor_title_array !== null){
    //["/a/","/b/"]->["a","b"]
    const parsed_title_array = JSON.parse(in_stor_title_array);
    title_array = parsed_title_array;
    //change_window로 array각각 받아서 순서대로 변경
    parsed_title_array.forEach(change_window);
}