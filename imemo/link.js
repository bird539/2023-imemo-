let L_showTap_array = [];
const L_tapShow_array = localStorage.getItem("tapShow_array");
if(L_tapShow_array != null){
    const L_parsed_tapShow_array = JSON.parse(M_tapShow_array);
    L_showTap_array = L_parsed_tapShow_array;
}


function skill_apply_link(txt){
    const div_linkName = `s${txt}`;
    if(div_linkName.charAt(div_linkName.length-1) == `1`){
        //tag 목록 값 기본 추가
        let linkText_array = [];
        let tag_array = [];
        const get_link_stor = localStorage.getItem(div_linkName);
        const parsed_linkStor = JSON.parse(get_link_stor);

        if( parsed_linkStor !=null && parsed_linkStor.length != 0){
            linkText_array = parsed_linkStor;
            tag_array = linkText_array[0].tag;
            localStorage.setItem(`${div_linkName}`, JSON.stringify(linkText_array));
        }else{
            tag_array = ["none"];
        }
        //link_obj = [link_name,link_url,visit,tag_array.length-1];tag_array

        const w_divLink = document.querySelector(`.${div_linkName}`);
        //이름 입력폼, 링크 입력 폼
        //ul - li : 이름&링크 바로가기 버튼,url 복사, 삭제, 
        const link_tag_form = document.createElement("form");
        const link_tag_pluse = document.createElement("input");
        const link_tag_select1 = document.createElement("select");
        const link_tag_select2 = document.createElement("select");
        //link_tag_select.addEventListener("change", event);

        for(i=0;i<tag_array.length;i++){
            const link_option1 = document.createElement("option");
            const link_option2 = document.createElement("option");
            link_option1.value = `${tag_array[i]}`;
            link_option2.value = `${tag_array[i]}`;
            link_option1.innerText = `${tag_array[i]}`;
            link_option2.innerText = `${tag_array[i]}`;
            link_tag_select1.appendChild(link_option1);
            link_tag_select2.appendChild(link_option2);
        }
        
        const link_tag_select_basic = document.createElement("select");
        let link_option_basic = ["new", "old", "visit"];
        for(i=0;i<link_option_basic.length;i++){
            const link_optionB = document.createElement("option");
            link_optionB.value = `${link_option_basic[i]}`;
            link_optionB.innerText = `${link_option_basic[i]}`;
            link_tag_select_basic.appendChild(link_optionB);
        }
        link_tag_form.addEventListener("submit",linkTagPluseInput);
        link_tag_form.appendChild(link_tag_pluse);
        link_tag_form.appendChild(link_tag_select1);
        w_divLink.appendChild(link_tag_form);

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

        w_divLink.appendChild(link_tag_select_basic);
        w_divLink.appendChild(link_tag_select2);

        const link_ul = document.createElement("ul");
        if(parsed_linkStor != null){
            //link_obj = [link_name,link_url,visit,tag_array.length-1];tag_array
            for(i=0;i<linkText_array.length;i++){
                const li_name_link = document.createElement("a");
                let link_name = linkText_array[i].obj[0];
                li_name_link.innerText =link_name;
                let lint_url = linkText_array[i].obj[1];
                li_name_link.href =lint_url;
                li_name_link.style.display = "block";

                let tag_array = linkText_array[0].tag;
                const link_tag_select1 = document.createElement("select");
                link_tag_select1.className = `tagLink${div_linkName}`;
                for(j=0;j<tag_array.length;j++){
                    const link_option1 = document.createElement("option");
                    link_option1.value = j;
                    link_option1.innerText = `#${tag_array[j]}`;
                    if(tag_array[j] == "none"){
                        link_option1.innerText = `    `;
                    }
                    link_tag_select1.appendChild(link_option1);
                }
                link_tag_select1.selectedIndex = linkText_array[i].obj[3];
                link_tag_select1.addEventListener("change", tagSelectLink);

                //const tag_link = document.createElement("div");
                let tagText = linkText_array[0].tag[linkText_array[i].obj[3]];
                //tag_link.innerText = `#${tagText} `;
                //if(tagText == "none"){
                //    tag_link.style.display = "none";
                //}else{
                //    tag_link.style.display = "inline";
                //}                
                const copy_link = document.createElement("button");
                copy_link.innerText = "copy";
                copy_link.addEventListener("click",copyMemLink);
                const edit_btn_link = document.createElement("button");
                edit_btn_link.innerText = "edit";
                edit_btn_link.addEventListener("click",hied_show_linkEdit);
            
                const del_btn_link = document.createElement("button");
                del_btn_link.innerText = "del";
            
                const edit_form_link = document.createElement("form");
                const edit_name_link = document.createElement("input");
                edit_name_link.value = link_name;
                const link_tag_input = document.createElement("input");
                if(tagText != "none"){
                    link_tag_input.value = tagText;
                }
                const edit_url_link = document.createElement("input");
                edit_url_link.value = lint_url;
                const edit_hiden_link = document.createElement("input");
                edit_hiden_link.type = "hiden"
                edit_hiden_link.value = i;
                edit_hiden_link.style.display = "none";
                const edit_submit_link = document.createElement("input");
                edit_submit_link.type = "submit";
                edit_submit_link.value = "sub";
                edit_form_link.appendChild(edit_name_link);
                edit_form_link.appendChild(link_tag_input);
                edit_form_link.appendChild(edit_url_link);
                edit_form_link.appendChild(edit_hiden_link);
                edit_form_link.appendChild(edit_submit_link);
                edit_form_link.style.display = "none";
                edit_form_link.addEventListener("submit",linkEdit);
            
                link_ul.appendChild(li_name_link);
                link_ul.appendChild(link_tag_select1);
                link_ul.appendChild(copy_link);
                link_ul.appendChild(del_btn_link);
                link_ul.appendChild(edit_btn_link);
                link_ul.appendChild(edit_form_link);
            }
        }
        w_divLink.appendChild(link_ul);

        //열었던 창인지 확인 후 블록
        w_divLink.style.display = "none";
        if (L_showTap_array != null) {
            for (i = 0; i < L_showTap_array.length; i++) {
                if (`${L_showTap_array[i]}` == txt) {
                    w_divLink.style.display = "block";
                }
            }
        }
    }
}
//-----------------------처음 링크메모 만들기
function tagSelectLink(event){
    const tagOptionValue = event.target.value;
    const divNameLink = event.target.parentElement.parentElement.className;
    const indexLink = event.target.nextSibling.nextSibling.nextSibling.nextSibling.childNodes[3].value;

    let linkText_array;
    const get_link_stor = localStorage.getItem(divNameLink);
    const parsed_linkStor = JSON.parse(get_link_stor);
    if (parsed_linkStor!=null&& parsed_linkStor.length != 0) {
        linkText_array = parsed_linkStor;
    }
    linkText_array[indexLink].obj[3] = tagOptionValue;
    const tagOptionSelect = event.target;
    tagOptionSelect.selectedIndex = tagOptionValue;

    localStorage.setItem(`${divNameLink}`, JSON.stringify(linkText_array));
}

function linkEdit(event){
    event.preventDefault();
    const name_link = event.target.childNodes[0].value;
    const tag_link = event.target.childNodes[1].value;
    const url_link = event.target.childNodes[2].value;
    const index_link = Number(event.target.childNodes[3].value);
    const divName_link = event.target.parentElement.parentElement.className;
    saveLink(divName_link,name_link,url_link,tag_link,index_link);

    const name_Link = event.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling;
    name_Link.innerText = name_link;
    name_Link.href = url_link;
    const tag_Link = event.target.previousSibling.previousSibling.previousSibling.previousSibling;
    tag_Link.innerText = `#${tag_link} `;
    if(tag_link == "" || tag_link == "none"){
        tag_Link.style.display = "none";
    }else{
        tag_Link.style.display = "inline";
    }
    const name_form = event.target;
    name_form.style.display = "none";
}

function isStringValue(val){
    return !!val?.trim();
}
function linkTagPluseInput(event){
    event.preventDefault();
    const divName_link = event.target.parentElement.className;
    const link_tag = event.target.childNodes[0].value;
    let linkText_array = [];
    let tag_array = [];
    let link_obj;
    const get_link_stor = localStorage.getItem(divName_link);
    const parsed_linkStor = JSON.parse(get_link_stor);
    if (parsed_linkStor!=null&& parsed_linkStor.length != 0) {
        linkText_array = parsed_linkStor;
        tag_array = linkText_array[0].tag;
        link_obj = linkText_array[0].obj;
    }else {
        tag_array = ["none"];
    }
    let tag_index = -1;

    if(isStringValue(link_tag)==false){
        tag_index = 0;
    }
    if(isStringValue(link_tag)==true){
        for(i=0;i<tag_array.length;i++){
            if(tag_array[i]==link_tag){
                tag_index = i;
            }
        }
    }
    let tagSelecPLS_check = 0;
    if(tag_index == -1){
        tag_array.push(link_tag);
        tag_index = tag_array.length-1;
        tagSelecPLS_check = -1;
    }
    let linkObj = {
        obj : link_obj,
        tag : tag_array
    }
    linkText_array[0] = linkObj;
    localStorage.setItem(`${divName_link}`, JSON.stringify(linkText_array));
    const selec_link = event.target.childNodes[1];

    const link_option1 = document.createElement("option");    
    link_option1.value = `${link_tag}`;
    link_option1.innerText = `${link_tag}`;
    selec_link.appendChild(link_option1);

    const div_linkName = event.target.parentElement.className;
    let tagSelect_inLi = document.querySelectorAll(`.tagLink${div_linkName}`);
    if(tagSelecPLS_check == -1){
        for(i=0;i<tagSelect_inLi.length;i++){
            const link_optionB = document.createElement("option");
            link_optionB.value = `${tag_index}`;
            link_optionB.innerText = `#${link_tag}`;
            tagSelect_inLi[i].appendChild(link_optionB);
        }
    }
}

function saveLink(divName_link,link_name,link_url,link_tag,index_link){
    let linkText_array = [];
    let tag_array = [];
    const get_link_stor = localStorage.getItem(divName_link);
    const parsed_linkStor = JSON.parse(get_link_stor);
    if (parsed_linkStor!=null&& parsed_linkStor.length != 0) {
        linkText_array = parsed_linkStor;
        tag_array = linkText_array[0].tag;
    }else {
        tag_array = ["none"];
    }
    let tag_index = -1;
    if(link_tag != ""){
        for(i=0;i<link_tag.length;i++){
            if(tag_array[i]==link_tag){
                tag_index = i;
            }
        }
    }
    if(tag_index == -1){
        tag_array.push(link_tag);
        tag_index = tag_array.length-1;
    }
    let link_obj = [link_name,link_url,0,tag_index];
    let linkObj = {
        obj : link_obj,
    }
    if (parsed_linkStor == null){
        linkObj = {
            obj : link_obj,
            tag : tag_array
        }
    }
    if(index_link == -1){
        linkText_array.push(linkObj);
    }else if(index_link == 0){
        linkObj = {
            obj : link_obj,
            tag : tag_array
        }
        linkText_array[index_link] = linkObj;
    }else{
        linkText_array[index_link] = linkObj;
    }
    localStorage.setItem(`${divName_link}`, JSON.stringify(linkText_array));
}

function lingMemo_pluse(event){
    event.preventDefault();
    let link_name = event.target.childNodes[0].value;

    let link_tag = event.target.parentElement.childNodes[0].childNodes[1].value;
    const link_tag_input = event.target.parentElement.childNodes[0].childNodes[0].value;
    if(link_tag_input != ""){
        link_tag = link_tag_input;
    }
    
    const link_url = event.target.childNodes[1].value;
    const link_ul = event.target.parentElement.childNodes[4];
    if(link_name == ""){
        link_name = `${link_url.split('/')[2]}`;
    }

    const li_name_link = document.createElement("a");
    li_name_link.innerText = link_name;
    li_name_link.href = link_url;
    li_name_link.style.display = "block";

    const copy_link = document.createElement("button");
    copy_link.innerText = "copy";
    copy_link.addEventListener("click",copyMemLink);
    const edit_btn_link = document.createElement("button");
    edit_btn_link.innerText = "edit";
    edit_btn_link.addEventListener("click",hied_show_linkEdit);

    const del_btn_link = document.createElement("button");
    del_btn_link.innerText = "del";

    const edit_form_link = document.createElement("form");
    const edit_name_link = document.createElement("input");
    const edit_url_link = document.createElement("input");
    const edit_submit_link = document.createElement("input");
    edit_submit_link.type = "submit";
    edit_submit_link.value = "sub";
    edit_form_link.appendChild(edit_name_link);
    edit_form_link.appendChild(edit_url_link);
    edit_form_link.appendChild(edit_submit_link);
    edit_form_link.style.display = "none";

    link_ul.appendChild(li_name_link);
    link_ul.appendChild(copy_link);
    link_ul.appendChild(del_btn_link);
    link_ul.appendChild(edit_btn_link);
    link_ul.appendChild(edit_form_link);

    const divName_link = event.target.parentElement.className;

    saveLink(divName_link,link_name,link_url,link_tag,-1);
}

function hied_show_linkEdit(event){
    const show_hide_target = event.target.nextSibling;
    if(show_hide_target!=null){
        if(show_hide_target.style.display == 'none'){
            show_hide_target.style.display = 'block';
        }else if(show_hide_target.style.display == 'block'){
            show_hide_target.style.display = 'none';
        }
    }
}
function copyMemLink(event) {
    const ling_target = event.target.previousSibling.href;
    window.navigator.clipboard.writeText(ling_target);
}


let div_name1 = [];
const in_stor_tap_array_link = localStorage.getItem("tap_array");
if(in_stor_tap_array_link != null){
    const parsed_tap1 = JSON.parse(in_stor_tap_array_link);
    div_name1 = parsed_tap1;
    div_name1.forEach(skill_apply_link);
}