/**
function makeMemoUl_list(index,text,checked) {
    const li = document.createElement("li");
    const text_span = document.createElement("span");
    text_span.innerText = `${text}`;
    text_span.className = `${index}`;
    text_span.style.display = "inline-block";

    const check_btn = document.createElement("input");
    check_btn.type = "checkbox";
    check_btn.className = "memo_checkbox";
    check_btn.style.display = "inline";
    check_btn.addEventListener("click", checkbox_work);
    if (`${checked}` == "true") {
        check_btn.checked = "true";
        text_span.style.textDecoration = "line-through";
    }
    li.appendChild(check_btn);
    li.appendChild(text_span);

    //수정 form과 submit, checkbox 추가
    const edit_label = document.createElement("label");
    const edit_btn = document.createElement("checkbox");
    const edit_form = document.createElement("form");
    const edit_input = document.createElement("input");
    const edit_submit = document.createElement("input");
    edit_submit.type = "submit";
    edit_submit.vlaue = "sub";

    edit_form.className = "workMomo_edit";
    edit_label.innerText = "edit";
    edit_btn.style.display = "none";
    edit_btn.className = `memo_edit_checbox`;
    edit_label.addEventListener("click", workMemo_checkbox_work);
    edit_label.appendChild(edit_btn);
    edit_input.className = `${index}`;
    edit_input.value = `${text}`;
    edit_input.style.display = "none";
    edit_form.addEventListener("submit", edit_memo_form);
    edit_submit.style.display = "none";
    edit_form.appendChild(edit_input);
    edit_form.appendChild(edit_submit);
    edit_form.appendChild(edit_label);
    edit_form.style.display = "inline-block";
    //삭제버튼 구현
    const del_btn = document.createElement("button");
    del_btn.innerText = "del";
    del_btn.className = "memo_delete_btn";
    del_btn.style.display = "inline-block";
    del_btn.addEventListener("click", deleteMemo);

    //복사버튼 구현
    const copy_btn = document.createElement("button");
    copy_btn.innerText = "copy";
    copy_btn.style.display = "inline-block";
    copy_btn.addEventListener("click", copyMemo);

    const div_combine = document.createElement("div");
    div_combine.appendChild(edit_form);
    div_combine.appendChild(del_btn);
    div_combine.appendChild(copy_btn);

    li.appendChild(div_combine);
    return li;
}
*/


/*
const check_btn = document.createElement("input");
    check_btn.type = "checkbox";
    check_btn.className = "memo_checkbox";
    check_btn.addEventListener("click", checkbox_work);
    li.appendChild(check_btn);

    const text_span = document.createElement("span");
    text_span.innerText = text.value;
    text_span.className = `0`;
    if (parsed_memoText !== null) {
        text_span.className = `${memoText_array.length}`;
    }
    li.appendChild(text_span);

    const edit_label = document.createElement("label");
    const edit_btn = document.createElement("checkbox");
    const edit_form = document.createElement("form");
    const edit_input = document.createElement("input");
    const edit_submit = document.createElement("input");
    edit_submit.type = "submit";
    edit_submit.vlaue = "sub";

    edit_form.className = "workMomo_edit";
    edit_label.innerText = "edit";
    edit_btn.style.display = "none";
    edit_btn.className = `memo_edit_checbox`;
    edit_label.addEventListener("click", workMemo_checkbox_work);
    edit_label.appendChild(edit_btn);
    edit_input.className = `${i}`;
    edit_input.value = `${text.value}`;
    edit_input.style.display = "none";
    edit_form.addEventListener("submit", edit_memo_form);
    edit_submit.style.display = "none";
    edit_form.appendChild(edit_input);
    edit_form.appendChild(edit_submit);
    edit_form.appendChild(edit_label);
    edit_form.style.display = "inline-block";

    //삭제버튼 구현
    const del_btn = document.createElement("button");
    del_btn.innerText = "del";
    del_btn.className = "memo_delete_btn";
    del_btn.style.display = "inline-block";
    del_btn.addEventListener("click", deleteMemo);

    //복사버튼 구현
    const copy_btn = document.createElement("button");
    copy_btn.innerText = "copy";
    copy_btn.style.display = "inline-block";
    copy_btn.addEventListener("click", copyMemo);

    const div_combine = document.createElement("div");
    div_combine.appendChild(edit_form);
    div_combine.appendChild(del_btn);
    div_combine.appendChild(copy_btn);

    li.appendChild(div_combine);

    memoText_array.push(memoSaveValue);
    memo_array_Stor(parent);
    memoText_array = [];
    text.value = "";
*/