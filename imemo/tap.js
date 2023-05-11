function pluse_tap_btn(event){
    event.preventDefault();
    const btn_parent = event.target.parentElement.parentElement.className;
    const win_tap_class = document.getElementsByClassName(`${btn_parent}`);
    const win_num = btn_parent.charAt(btn_parent.length - 1);
    make_tap_btn_pluse(win_num);
}

const pluse_tap = document.querySelectorAll(".tap_PLS");
pluse_tap.forEach(function (event){
    event.addEventListener("click",pluse_tap_btn);
});

function make_tap_btn_pluse(num){
    const window = document.querySelector(`.win_tap_${num}`);
    const newDiv = document.createElement("div");
    newDiv.className = `tap${num}`;

    const tap_button = document.createElement("button");
    tap_button.innerText = `tap${num}`;
    newDiv.appendChild(tap_button);
    window.appendChild(newDiv);
}