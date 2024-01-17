let w = {
    type : 'div',
    className : 'winName',
    child_1 : winHead = {
        type : 'div', className : 'winClasss',
        table : table = { 
            type : 'table',
            tr1 : tr = {
                type : 'tr',
                
                td_plussBtn : td = {
                    type : 'td',
                    child_1 : btn1 = { type : 'button', innerText : ' + ', event : 'NextNextNextShowEvent:click'}
                },

                td_wTitle : td = {
                    type : 'td',
                    child_2 : btn2 = {
                        type : 'button',
                        innerText : 'winTitle',
                        style : 'all:unset',
                        event : 'NextShowEvent:dblclick'
                    },
                }

            }
        },
        

        child_3 : form1 = {
            type : 'form',
            style : 'display:none',
            child_33 : input_1 = {
                type : 'input',
            }
        },
        child_4 : headDiv = {
            type : 'div',
            style : 'display:none',
            child_4 : newWinTapBtn = {
                type : 'div',
                btn1 : wBtn = { type : 'button', innerText : '+ w'},
                btn2 : tapBtn = { type : 'button', innerText : '메모'},
                btn3 : tapBtn = { type : 'button', innerText : '계산'},
                btn4 : tapBtn = { type : 'button', innerText : '링크'},
                btn5 : tapBtn = { type : 'button', innerText : '달력'},
                btn6 : tapBtn = { type : 'button', innerText : '타임'},
                btn7 : tapBtn = { type : 'button', innerText : '그림'},
                btn8 : tapBtn = { type : 'button', innerText : '랜덤'},
            },
            child_5 : winEdit = {
                type : 'div',
                btn1 : winEditBtn = { type : 'button', innerText : 'w edit', event : 'NextShowEvent:click'},
                form1 : winEditForm = { type : 'form', style : 'display:none',
                    input1 : input = { type : 'input' },
                    input2 : input = { type : 'input' },
                    input3 : sub = { type : 'input', kind : 'submit', value : 'sub'},
                } 
            }
        }
    }
}

function NextNextNextShowEvent(event){
    let target = event.target.nextSibling.nextSibling.nextSibling;
    if(target.style.display != 'none'){
        target.style.display = 'none';
    }else{
        target.style.display = 'block';
    }
}

function NextShowEvent(event){
    let target = event.target.nextSibling;
    if(target.style.display != 'none'){
        target.style.display = 'none';
    }else{
        target.style.display = 'block';
    }
}

function makeEvent(ob, option){
    let option1 = option.split(':')[0];
    let clickOption = option.split(':')[1];
    if(option1 == 'NextShowEvent'){
        ob.addEventListener(`${clickOption}`, NextShowEvent);
        return ob;
    }else if(option1 == 'NextNextNextShowEvent'){
        ob.addEventListener(`${clickOption}`, NextNextNextShowEvent);
        return ob;
    }
}


function makeOb(ob){
    let newOb = document.createElement(ob);
    return newOb;
}
function makeAppend(parents, child){
    let dd = parents;
    let bb = child;
    dd.appendChild(bb);
    return dd;
}
function makeClassName(ob, name){
    ob.className = `${name}`;
    return ob;
}
function makeType(ob, kind){
    ob.type = kind;
    return ob;
}
function makeValue(ob, value){
    ob.value = value;
    return ob;
}
function makeInnerText(ob, text){
    ob.innerText = text;
    return ob;
}
function makeStyle(ob, option){
    let option2 = option.split(':')[0];
    let value = option.split(':')[1];
    if(option2 == 'with'){
        value = Number(value);
        ob.style.width = `${value}pt`;

    }else if(option2 == 'height'){
        value = Number(value);
        ob.style.height = `${value}pt`;

    }else if(option2 == 'display'){
        ob.style.display = value;
    }else if(option2 == 'background-color'){
        ob.style.backgroundColor = value;
    }else if(option2 == 'color'){
        ob.style.color = value;
    }else if(option2 == 'all'){
        ob.style.all = value;
    }
    return ob;
}

function makeHtml(ob){
    let newOb;
    let child;
    for(const key in ob){
        let keyy = `${key}`
        keyy = keyy.split('_')[0];
        const target = typeof ob[key];

        if(target =='object'){
            child = makeHtml(ob[key], 'child');
            newOb = makeAppend(newOb, child);

        }else if(target =='string' && keyy == 'type'){
            newOb = makeOb(ob[key]);
        }else if(target =='string' && keyy == 'kind'){
            newOb = makeType(newOb, ob[key])
        }else if(target =='string' && keyy == 'value'){
            newOb = makeValue(newOb, ob[key])
        }else if(target =='string' && keyy == 'event'){
            newOb = makeEvent(newOb, ob[key]);
        }else if(target =='string' && keyy == 'innerText'){
            newOb = makeInnerText(newOb, ob[key])
        }else if(target =='string' && keyy == 'style'){
            newOb = makeStyle(newOb, ob[key]);
        }else if(target == 'string' && keyy == 'className'){
            newOb = makeClassName(newOb, ob[key]);
        }
    }
    return newOb;
}

const main = document.querySelector('.main');

let aaaa = makeHtml(w);
main.appendChild(aaaa);

//html 객체 생성
//이벤트 부여
//부모 자식으로 넣어주기
//최종 하나로 리턴 후 .main에 추가
//div, div[div[button1, button2, ]]