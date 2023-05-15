let div_name = [];

function skill_apply(txt){
    const div_name = `s${txt}`;
    if(div_name.charAt(txt.length)=="0"){
        const w_div = document.querySelector(`.${div_name}`);

        const memo_form = document.createElement("form");
        const memo_input = document.createElement("input");
        memo_form.className = `m_${div_name}`;
        memo_form.appendChild(memo_input);

        const list_ul = document.createElement("ul");
        const list_li = document.createElement("li");
        list_li.innerText = "hello world!";
        list_ul.appendChild(list_li);
        w_div.style.display = "none";
        w_div.appendChild(memo_form);
        w_div.appendChild(list_ul);
    }
}

const in_stor_tap_array_tapHendle = localStorage.getItem("tap_array");
if (in_stor_tap_array_tapHendle !== null){
    const parsed_tap_array = JSON.parse(in_stor_tap_array);
    for(i=0;i<parsed_tap_array.length;i++){
        div_name[i] = parsed_tap_array[i];
    }
    div_name.forEach(skill_apply);
}

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

let tapBtn_array = [];
const in_stor_win_array_tapHendle = localStorage.getItem("win_array");
if (in_stor_win_array_tapHendle !== null){
    const parsed_winNum = JSON.parse(in_stor_win_array_tapHendle);
    for(i=0;i<parsed_winNum.length;i++){
        tapBtn_array[i] = `w${parsed_winNum[i]}`;
    }
    tapBtn_array.forEach(hide_none_or1);
}

