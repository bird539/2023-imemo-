let L_showTap_array = [];
const L_tapShow_array = localStorage.getItem("tapShow_array");
if(L_tapShow_array != null){
    const L_parsed_tapShow_array = JSON.parse(M_tapShow_array);
    L_showTap_array = L_parsed_tapShow_array;
}

function skill_apply_link(txt){
    const div_linkName = `s${txt}`;
    if(div_linkName.charAt(div_linkName.length-1) == `1`){
        const w_divLink = document.querySelector(`.${div_linkName}`);
        //이름 입력폼, 링크 입력 폼
        //ul - li : 이름&링크 바로가기 버튼,url 복사, 삭제,  
        const link_form = document.createElement("form");
        const link_name_input = document.createElement("input");
        const link_url_input = document.createElement("input");
        link_url_input.type = "url";
        const link_submit = document.createElement("input");
        link_submit.type = "submit";
        link_submit.value = "sub";
        link_name_input.style.display = "block";
        link_url_input.setAttribute("required","url");

        link_form.addEventListener("submit",lingMemo_pluse);

        link_form.appendChild(link_name_input);
        link_form.appendChild(link_url_input);
        link_form.appendChild(link_submit);

        w_divLink.appendChild(link_form);

        const link_ul = document.createElement("ul");
        w_divLink.appendChild(link_ul);
        const link_store_array = localStorage.getItem(`.${div_linkName}`);
        if(link_store_array != null){
            conet = JSON.parse(M_tapShow_array);
        }


    }
}
function lingMemo_pluse(event){
    event.preventDefault();
    const link_name = event.target.childNodes[0].value;
    const link_url = event.target.childNodes[1].value;
    const link_ul = event.target.parentElement.childNodes[1];

    const li_name_link = document.createElement("a");
    li_name_link.innerText = link_name;
    li_name_link.href = link_url;
    li_name_link.style.display = "block";

    const copy_link = document.createElement("button");
    copy_link.innerText = "copy";
    const edit_btn_link = document.createElement("button");
    edit_btn_link.innerText = "edit";

    const edit_form_link = document.createElement("form");
    const edit_name_link = document.createElement("input");
    const edit_url_link = document.createElement("input");
    const edit_submit_link = document.createElement("input");
    edit_submit_link.type = "submit";
    edit_submit_link.value = "sub";
    edit_form_link.appendChild(edit_name_link);
    edit_form_link.appendChild(edit_url_link);
    edit_form_link.appendChild(edit_submit_link);
    edit_form_link.



    link_ul.appendChild(li_name_link);

    console.log(link_ul);
}

let div_name1 = [];
const in_stor_tap_array_link = localStorage.getItem("tap_array");
if(in_stor_tap_array_link != null){
    const parsed_tap1 = JSON.parse(in_stor_tap_array_link);
    div_name1 = parsed_tap1;
    div_name1.forEach(skill_apply_link);
}