let W_showTap_array = [];
const W_tapShow_array = localStorage.getItem("tapShow_array");
if(W_tapShow_array != null){
    const W_parsed_tapShow_array = JSON.parse(M_tapShow_array);
    W_showTap_array = W_parsed_tapShow_array;
}

function skill_apply_word(txt){
    const div_wordName = `s${txt}`;
    if(div_wordName.charAt(div_wordName.length-1) == `3`){
        console.log("hello")
        const w_divWord = document.querySelector(`.${div_wordName}`);
        const ex = document.createElement("button");
        ex.innerText = "this is words"
        ex.style.display = "block";
        w_divWord.appendChild(ex);


        w_divWord.style.display = "none";
        if (W_showTap_array != null) {
            for (i = 0; i < W_showTap_array.length; i++) {
                if (`${W_showTap_array[i]}` == txt) {
                    w_divWord.style.display = "block";
                }
            }
        }
    }
}

let divWord = [];
const in_stor_tap_array_word = localStorage.getItem("tap_array");
if(in_stor_tap_array_word != null){
    const parsed_tap3 = JSON.parse(in_stor_tap_array_word);
    divWord = parsed_tap3;
    divWord.forEach(skill_apply_word);
}