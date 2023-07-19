let L_showTap_array = [];
const L_tapShow_array = localStorage.getItem("tapShow_array");
if(L_tapShow_array != null){
    const L_parsed_tapShow_array = JSON.parse(M_tapShow_array);
    L_showTap_array = L_parsed_tapShow_array;
}

let tagPluseCheck_i = 0;
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
        const link_tag_select3 = document.createElement("select");
        link_tag_select1.className =  `tagLink${div_linkName}`;
        link_tag_select2.className =  `tagLink${div_linkName}`;
        link_tag_select3.className =  `tagLink${div_linkName}`;

        for(i=0;i<tag_array.length;i++){
            const link_option1 = document.createElement("option");
            const link_option2 = document.createElement("option");
            const link_option3 = document.createElement("option");
            link_option1.value = `${tag_array[i]}`;
            link_option2.value = i;
            link_option3.value = i;
            link_option1.innerText = `${tag_array[i]}`;
            link_option2.innerText = `${tag_array[i]}`;
            link_option3.innerText = `${tag_array[i]}`;
            link_tag_select1.appendChild(link_option1);
            link_tag_select2.appendChild(link_option2);
            link_tag_select3.appendChild(link_option3);
        }
        link_tag_select2.addEventListener("change",selectTagLineUpLink);
        
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

        link_tag_select_basic.addEventListener("change",selectLineUpLink);

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
            let tag_array = linkText_array[0].tag;
            makeLinkUl(linkText_array,link_ul,div_linkName,tag_array,0,0,"new");
        }
        w_divLink.appendChild(link_ul);

        const delSelect = document.createElement("select");
        let delOptionValue = ["delete only tag","Delete tags and their links","edit tag"];
        for(i=0;i<delOptionValue.length;i++){
            const delOption = document.createElement("option");
            delOption.value = i;
            delOption.innerText = `${delOptionValue[i]}`;
            delSelect.appendChild(delOption);
        }
        delSelect.addEventListener("change", editTagSelect1);
        const editTagInput = document.createElement("input");
        editTagInput.style.display = "none";
        const delTagBtn = document.createElement("button");
        delTagBtn.innerText = "del";
        delTagBtn.addEventListener("click",delTagBtnEvent);
        link_tag_select3.addEventListener("change", editTagSelect2);

        w_divLink.appendChild(delSelect);
        w_divLink.appendChild(link_tag_select3);
        w_divLink.appendChild(editTagInput);
        w_divLink.appendChild(delTagBtn);

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
function visitLink(event){
    const linkTargetForm = event.target.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;
    const targetIndex = linkTargetForm.childNodes[3].value;
    const divNameLink = event.target.parentElement.parentElement.className;

    let linkText_array;
    const get_link_stor = localStorage.getItem(divNameLink);
    const parsed_linkStor = JSON.parse(get_link_stor);
    if (parsed_linkStor!=null&& parsed_linkStor.length != 0) {
        linkText_array = parsed_linkStor;
    }
    let visitArg = linkText_array[0].visit;
    let visitArg2 = [...visitArg];
    let indexArg = [];
    let check = 0;
    let check2 = 0; 
    for(i=0;i<=visitArg.length;i++){
        if(visitArg[i] > 0){
            indexArg.push(visitArg[i]);
        }else if( visitArg[i] == 0){
            check2+=1;
            if(visitArg[i] == visitArg[targetIndex]){
                check+=1;
            }
        }
    }

    indexArg.sort();
    if(visitArg.length == check2){
        indexArg.push(1);
    }else if(check > 0){
        indexArg.push(indexArg[indexArg.length-1]+1);
    }
    
    if(check >0){//새로 추가시 전부변경
        if(visitArg[targetIndex] != 1){
            for(i=0;i<visitArg.length;i++){
                for(j=0;j<indexArg.length;j++){
                    if(indexArg[i]==visitArg[j]){
                        if(indexArg[i+1] > 0){
                            visitArg2[j] = indexArg[i+1];
                        }
                        if(indexArg[i] == indexArg.length){
                            visitArg2[j] = indexArg[i-1];
                        }
                    }
                }
            }
            visitArg2[targetIndex] = 1;
        }
    }else if((check == 0) && (visitArg.length != check2)){
        let tem = visitArg[targetIndex];//변경할 열까지만 변경
        for(i=0;i<tem;i++){
            for(j=0;j<indexArg.length;j++){
                if(indexArg[i]==visitArg[j]){
                    if(indexArg[i+1] > 0){
                        visitArg2[j] = indexArg[i+1];
                    }
                }
            }
        }
        visitArg2[targetIndex] = 1;
    }

    linkText_array[0].visit = visitArg2;
    localStorage.setItem(`${divNameLink}`, JSON.stringify(linkText_array));
}

function makeLinkUl(linkText_array,link_ul,div_linkName,tag_array,check,index,selectOption){
    for(i=0;i<linkText_array.length;i++){
        if(linkText_array[i].obj != null){
        const li_name_link = document.createElement("a");
        let link_name = linkText_array[i].obj[0];
        li_name_link.innerText =link_name;
        let lint_url = linkText_array[i].obj[1];
        li_name_link.href =lint_url;
        li_name_link.style.display = "block";
        li_name_link.addEventListener("click", visitLink);

        const link_tag_select1 = document.createElement("select");
        link_tag_select1.className = `tagLink${div_linkName}`;
        for(j=0;j<tag_array.length;j++){
            const link_option1 = document.createElement("option");
            link_option1.value = j;
            link_option1.innerText = `#${tag_array[j]}`;
            if(tag_array[j] == "none"){
                link_option1.innerText = `     `;
            }
            link_tag_select1.appendChild(link_option1);
        }
        link_tag_select1.selectedIndex = linkText_array[i].obj[3];
        link_tag_select1.addEventListener("change", tagSelectLink);

        const copy_link = document.createElement("button");
        copy_link.innerText = "copy";
        copy_link.addEventListener("click",copyMemLink);
        const edit_btn_link = document.createElement("button");
        edit_btn_link.innerText = "edit";
        edit_btn_link.addEventListener("click",hied_show_linkEdit);
    
        const del_btn_link = document.createElement("button");
        del_btn_link.innerText = "del";
        del_btn_link.addEventListener("click", delBtnEvent);
    
        const edit_form_link = document.createElement("form");
        const edit_name_link = document.createElement("input");
        edit_name_link.value = link_name;

        const edit_url_link = document.createElement("input");
        edit_url_link.value = lint_url;
        const edit_hiden_link = document.createElement("input");
        edit_hiden_link.type = "hiden"
        edit_hiden_link.value = i;
        if(check == -1){
            edit_hiden_link.value = index;
        }
        if(selectOption === "visit" && linkText_array[0] != undefined){
            edit_btn_link.value = linkText_array[0].index[i];
        }
        edit_hiden_link.style.display = "none";
        const edit_submit_link = document.createElement("input");
        edit_submit_link.type = "submit";
        edit_submit_link.value = "sub";
        edit_form_link.appendChild(edit_name_link);
        edit_form_link.appendChild(edit_url_link);
        edit_form_link.appendChild(edit_hiden_link);
        edit_form_link.appendChild(edit_submit_link);
        edit_form_link.style.display = "none";
        edit_form_link.addEventListener("submit",linkEdit);
        if(selectOption === "old" || selectOption === "visit"){
            link_ul.appendChild(li_name_link);
            link_ul.appendChild(link_tag_select1);
            link_ul.appendChild(copy_link);
            link_ul.appendChild(del_btn_link);
            link_ul.appendChild(edit_btn_link);
            link_ul.appendChild(edit_form_link);
        }else if(selectOption === "new"){
            link_ul.prepend(edit_form_link);
            link_ul.prepend(edit_btn_link);
            link_ul.prepend(del_btn_link);
            link_ul.prepend(copy_link);
            link_ul.prepend(link_tag_select1);
            link_ul.prepend(li_name_link);
        }
        }
    }
}
function selectTagLineUpLink(event){
    const tagOptionValue = event.target.value;
    const divNameLink = event.target.parentElement.className;
    const ul = event.target.nextSibling;
    const basicOptionValue = event.target.previousSibling.value;
    ul.replaceChildren();

    let linkText_array;
    const get_link_stor = localStorage.getItem(divNameLink);
    const parsed_linkStor = JSON.parse(get_link_stor);
    if (parsed_linkStor!=null&& parsed_linkStor.length != 0) {
        linkText_array = parsed_linkStor;
    }

    let selectTagLink = selectArray(linkText_array,tagOptionValue,basicOptionValue);

    makeLinkUl(selectTagLink,ul,divNameLink,linkText_array[0].tag,0,0,basicOptionValue);
}

function selectLineUpLink(event){
    const basicOptionValue = event.target.value;
    const divNameLink = event.target.parentElement.className;
    const ul = event.target.nextSibling.nextSibling;
    const tagOptionValue = event.target.nextSibling.value;
    ul.replaceChildren();

    let linkText_array;
    const get_link_stor = localStorage.getItem(divNameLink);
    const parsed_linkStor = JSON.parse(get_link_stor);
    if (parsed_linkStor!=null&& parsed_linkStor.length != 0) {
        linkText_array = parsed_linkStor;
    }
    let selectTagLink = selectArray(linkText_array,tagOptionValue,basicOptionValue);

    makeLinkUl(selectTagLink,ul,divNameLink,linkText_array[0].tag,0,0,basicOptionValue);
}
function selectArray(linkText_array,tagOptionValue,basicOptionValue){
    let visit = linkText_array[0].visit;
    let selectTagLink = [];
    let originIndex = [];
    let visitIndex = [];
    let originIndexM = [];
    for(i=0;i<linkText_array.length;i++){
        if(linkText_array[i].obj != null){
            originIndexM.push(i);
            if(linkText_array[i].obj[3] == tagOptionValue){
                selectTagLink.push(linkText_array[i]);
                originIndex.push(i);
                visitIndex.push(visit[i]);
            }
        }
    }
    if(tagOptionValue == 0){
        selectTagLink = linkText_array;
        originIndex = originIndexM;
        visitIndex = visit;
    }
    
    if(basicOptionValue === "visit"){
        let selectTagLink2 = [...selectTagLink];
        let originIndex2 = [...originIndex]
        let noSwap;
        for( i=0; i<visitIndex.length; i++){
            if(visitIndex[i] === 0){
                selectTagLink2.splice(i, 1);
                originIndex2.splice(i, 1);
                visitIndex.splice(i, 1);
                i--;
            }
        }
        for( j=visitIndex.length; j>0; j--){
            noSwap = true;
            for(i =0; i < j-1; i++){
                if(visitIndex[i] > visitIndex[i+1] ){
                    let tem = visitIndex[i];
                    let tem1 = selectTagLink2[i];
                    let tem2 = originIndex2[i];
                    visitIndex[i] = visitIndex[i+1];
                    selectTagLink2[i] = selectTagLink2[i+1];
                    originIndex2[i] = originIndex2[i+1];
                    visitIndex[i+1] = tem;
                    selectTagLink2[i+1] = tem1;
                    originIndex2[i+1] = tem2;
                    noSwap = false;
                }
            }
            if(noSwap)break;
        }
        if(selectTagLink2[0] != null && selectTagLink2[0].obj != null){
            console.log("dd")
            let b = selectTagLink2[0].obj;
            selectTagLink2[0] = {
                obj : b,
                index : originIndex2
            }
        }else{
            selectTagLink2[0] = {
                index : originIndex2
            }
        }
        selectTagLink = selectTagLink2; 
    }
    return selectTagLink;
}

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
    const url_link = event.target.childNodes[1].value;
    const index_link = Number(event.target.childNodes[2].value);
    const divLinkName = event.target.parentElement.parentElement.className;

    const name_form = event.target;

    const get_link_stor = localStorage.getItem(divLinkName);
    const parsed_linkStor = JSON.parse(get_link_stor);
    let linkArray;
    let tagArray;
    let visitArray;
    let newObj;
    if(parsed_linkStor != null){
        linkArray = parsed_linkStor;
        tagArray = linkArray[0].tag;
        visitArray = linkArray[0].visit;

        newObj = linkArray[index_link].obj;
        newObj[0] = name_link;
        newObj[1] = url_link;

        linkArray[index_link] = {
            obj : newObj
        }
        if(index_link == 0){
            linkArray[index_link] = {
                obj : newObj,
                tag : tagArray,
                visit : visitArray
            }
        }
        localStorage.setItem(`${divLinkName}`, JSON.stringify(linkArray));
        const targetName = event.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling;
        targetName.innerText = name_link;
        targetName.href = url_link;
    }else{
        return;
    }
    name_form.style.display = "none";
}

function isStringValue(val){
    return !!val?.trim();
}

function linkTagPluseInput(event){
    event.preventDefault();
    const divName_link = event.target.parentElement.className;
    const link_tag = event.target.childNodes[0].value;
    linkTagPluse(divName_link, link_tag, 0);
    const tagValue = document.querySelector(`.${divName_link}`).childNodes[0].childNodes[0]; 
    tagValue.value = null;
}
function linkTagPluse(divName_link, link_tag, check){
    let linkText_array = [];
    let tag_array = [];
    let link_obj;
    let visit_array;
    const get_link_stor = localStorage.getItem(divName_link);
    const parsed_linkStor = JSON.parse(get_link_stor);
    if (parsed_linkStor!=null&& parsed_linkStor.length != 0) {
        linkText_array = parsed_linkStor;
        tag_array = linkText_array[0].tag;
        link_obj = linkText_array[0].obj;
        visit_array = linkText_array[0].visit;
    }else {
        tag_array = ["none"];
    }
    let tag_index = -1;

    if(isStringValue(link_tag)==false){
        tag_index = 0;
    }
    if(isStringValue(link_tag)==true){
        for(i=0;i<tag_array.length;i++){
            if(tag_array[i]===link_tag){
                tag_index = i;
                break;
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
        tag : tag_array,
        visit : visit_array
    }
    linkText_array[0] = linkObj;
    localStorage.setItem(`${divName_link}`, JSON.stringify(linkText_array));

    let tagSelect_inLi = document.querySelectorAll(`.tagLink${divName_link}`);
    if(check == -2){
        tagSelecPLS_check = -1;
    }
    if(tagSelecPLS_check == -1){
            for(i=0;i<tagSelect_inLi.length;i++){
                const link_optionB = document.createElement("option");
                link_optionB.value = `${tag_index}`;
                link_optionB.innerText = `#${link_tag}`;
                tagSelect_inLi[i].appendChild(link_optionB);
            }
    }
}

function checkTagIndex(link_tag, tag_array){ //-1이면 newTag 아니면 기존 태그
    let tag_index = -1;
    if(isStringValue(link_tag) == true){
        for(i=0;i<tag_array.length;i++){
            if(tag_array[i]===link_tag){
                tag_index = i;
            }
        }
    }
    return tag_index;
}

function saveLink(divName_link,link_name,link_url,link_tag,index_link){
    let linkText_array = [];
    let tag_array = [];
    let visit_array = [];
    const get_link_stor = localStorage.getItem(divName_link);
    const parsed_linkStor = JSON.parse(get_link_stor);
    if (parsed_linkStor!=null&& parsed_linkStor.length != 0) {
        linkText_array = parsed_linkStor;
        tag_array = linkText_array[0].tag;
        visit_array = linkText_array[0].visit;
    }else {
        tag_array = ["none"];
    }
    let tag_index = checkTagIndex(link_tag, tag_array);

    if(tag_index == -1){
        tag_array.push(link_tag);
        tag_index = tag_array.length-1;
        tagPluseCheck_i = -2;
    }
    visit_array.push(0);
    let link_obj = [link_name,link_url,0,tag_index];
    let linkObj = {
        obj : link_obj
    }
    if (parsed_linkStor == null){
        linkObj = {
            obj : link_obj,
            tag : tag_array,
            visit : visit_array
        }
    }
    if(index_link == -1){
        linkText_array.push(linkObj);
    }else if(index_link == 0){
        linkObj = {
            obj : link_obj,
            tag : tag_array,
            visit : visit_array
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
    const divLinkName = event.target.parentElement.className;


    let link_tag = event.target.parentElement.childNodes[0].childNodes[1].value;
    const link_tag_input = event.target.parentElement.childNodes[0].childNodes[0].value;
    if(link_tag_input != ""){
        link_tag = link_tag_input;
    }

    const link_url = event.target.childNodes[1].value;
    const link_ul = event.target.parentElement.childNodes[4];
    if(isStringValue(link_name)==false){
        link_name = `${link_url.split('/')[2]}`;
    }

    const divName_link = event.target.parentElement.className;
    
    saveLink(divName_link,link_name,link_url,link_tag,-1);

    const get_link_stor = localStorage.getItem(divLinkName);
    const parsed_linkStor = JSON.parse(get_link_stor);
    let linkArray = [parsed_linkStor[parsed_linkStor.length-1]];
    makeLinkUl(linkArray,link_ul,divLinkName,parsed_linkStor[0].tag,-1,parsed_linkStor.length-1,"new");
    linkTagPluse(divName_link, link_tag, tagPluseCheck_i);
    
    const nameValue = document.querySelector(`.${divLinkName}`).firstChild.firstChild;
    const tagValue = document.querySelector(`.${divLinkName}`).childNodes[1].childNodes[0]; 
    const urlValue = document.querySelector(`.${divLinkName}`).childNodes[1].childNodes[1]; 

    tagPluseCheck_i = 0;
    nameValue.value = null;
    tagValue.value =  null;
    urlValue.value = null;
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
    const ling_target = event.target.previousSibling.previousSibling.href;
    window.navigator.clipboard.writeText(ling_target);
}

//del 버튼  - 각각
function delBtnEvent(event){
    const divLinkName = event.target.parentElement.parentElement.className;
    const targetIndex = event.target.nextSibling.nextSibling.childNodes[3].value;
    const ul = event.target.parentElement;
    const selectOption = event.target.parentElement.parentElement.childNodes[2].value;
    
    const get_link_stor = localStorage.getItem(divLinkName);
    const parsed_linkStor = JSON.parse(get_link_stor);
    let linkArray = parsed_linkStor;
    let tagArray = linkArray[0].tag;
    if(targetIndex == 0){
        let obj = {
            tag : linkArray[0].tag,
            visit : linkArray[0].visit
        }
        linkArray[0] = obj;
    }else{
        linkArray.splice(targetIndex,1);
    }
    
    ul.replaceChildren(); //자식노드 삭제
    localStorage.setItem(`${divLinkName}`, JSON.stringify(linkArray));

    makeLinkUl(linkArray,ul,divLinkName,tagArray,0,0,selectOption);
}

function delTagBtnEvent(event){
    const divLinkName = event.target.parentElement.className;
    const get_link_stor = localStorage.getItem(divLinkName);
    const targetTagValue = event.target.previousSibling.previousSibling.value;
    const targetTag = Number(targetTagValue);
    const onlyOrAll = event.target.previousSibling.previousSibling.previousSibling.value;
    const selectOption = event.target.parentElement.childNodes[2].value;
    const ul = event.target.previousSibling.previousSibling.previousSibling.previousSibling;

    const parsed_linkStor = JSON.parse(get_link_stor);
    let linkArray;
    let tagArray;
    let visitArray;
    if(targetTag == 0){
        return;
    }
    
    if(parsed_linkStor != null){
        linkArray = parsed_linkStor;
        tagArray = linkArray[0].tag;
        visitArray = linkArray[0].visit;
    }
    let newLinkArray = [];
    if(onlyOrAll == 1){
        for(i=0;i<linkArray.length;i++){
            if(linkArray[i].obj != null && linkArray[i].obj[3] != `${targetTag}`){
                newLinkArray.push(linkArray[i]);
            }
        }
        tagArray.splice(targetTag, 1);
        let newObj = newLinkArray[0].obj; 
        newLinkArray[0] = {
            obj:newObj,
            tag:tagArray,
            visit:visitArray
        }
    }else if(onlyOrAll == 0){
        for(i=0;i<linkArray.length;i++){
            if(linkArray[i].obj != null && linkArray[i].obj[3] == `${targetTag}`){
                linkArray[i].obj[3] = 0;
            }
        }
        tagArray.splice(targetTag, 1);
        if(linkArray[0].obj != null){
            let newObj = linkArray[0].obj; 
            linkArray[0] = {
                obj:newObj,
                tag:tagArray,
                visit:visitArray
            }
        }else{
            linkArray[0] = {
                tag:tagArray,
                visit:visitArray
            }
        }
        newLinkArray = linkArray;
    }else if(onlyOrAll == 2){
        const editTagTxt = event.target.previousSibling.value;
        tagArray[targetTag] = editTagTxt;
        newLinkArray = linkArray;
        let newObj = newLinkArray[0].obj; 
        newLinkArray[0] = {
            obj:newObj,
            tag:tagArray,
            visit:visitArray
        }
    }

    ul.replaceChildren(); //자식노드 삭제
    localStorage.setItem(`${divLinkName}`, JSON.stringify(newLinkArray));
    let tagSelect_inLi = document.querySelectorAll(`.tagLink${divLinkName}`);

    for(i=0;i<tagSelect_inLi.length;i++){
        tagSelect_inLi[i].replaceChildren();
        for(j=0;j<tagArray.length;j++){
            const link_option1 = document.createElement("option");
            link_option1.value = j;
            link_option1.innerText = `#${tagArray[j]}`;
            if(tagArray[j] == "none"){
                link_option1.innerText = `     `;
            }
            if(i == 0 || i==1 || i == tagSelect_inLi.length-1){
                link_option1.innerText = `none`;
            }
            tagSelect_inLi[i].appendChild(link_option1);
        }
    }

    makeLinkUl(newLinkArray,ul,divLinkName,tagArray,0,0,selectOption);
    if(onlyOrAll == 2){
        const editTagTxt = event.target.previousSibling;
        const Btn = event.target;
        editTagTxt.style.display = "none";
        Btn.innerText = "del";
    }
}

function editTagSelect1(event){
    const selectOption = event.target.value;
    const tagInput = event.target.nextSibling.nextSibling;
    const Btn = event.target.nextSibling.nextSibling.nextSibling;
    if(selectOption == 2){
        tagInput.style.display = "inline";
        Btn.innerText = "sub";
    }else{
        tagInput.style.display = "none";
        Btn.innerText = "del";
    }
}
function editTagSelect2(event){
    const selectTag = event.target.childNodes[event.target.value].innerText;
    const tagInput = event.target.nextSibling;
    tagInput.value = selectTag;
    if(event.target.value == 0){
        tagInput.value = "*this tag can't edit";
    }
}


let div_name1 = [];
const in_stor_tap_array_link = localStorage.getItem("tap_array");
if(in_stor_tap_array_link != null){
    const parsed_tap1 = JSON.parse(in_stor_tap_array_link);
    div_name1 = parsed_tap1;
    div_name1.forEach(skill_apply_link);
}