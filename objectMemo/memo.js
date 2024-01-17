let memo = {
    num: 0,
    text: "",
    check: false,


    save: function () {

    },
    make: function () {

    },
    edit: function () {

    },
    copy: function () {

    }
}

let basicTap = {
    pk: null,
    tapSelect: true,

    withSize: 456,
    heightSize: 123,

    titel: 'tapTitel',
    bacGroundColor: 'black',
    buttonColor: 'blue',


    save: function () {

    },
    make: function () {

    },
    edit: function () {

    },
    copy: function () {

    }
}
//color
let Btitle = 'w0';
let Bshow = true;
let BhtmlBack = 'white';
let BwinBack = 'FEF896';
let BbtnBack = 'FEF896';
let BbtnHover = 'gray';
let BtitleBack = 'FEF896';
//font
let BwinFontSize = 1;
let BwinFontWeight = 100;
let BwinFontColor = 'black';
let BwinFontType = 'serif';
let BwinFontKind = 'normal';

let BtitleFontSize = 1;
let BtitleFontWeight = 100;
let BtitleFontColor = 'black';
let BtitleFontType = 'serif';
let BtitleFontKind = 'normal';
//line
let BlineRowColor = 'black';
let BlineRowWeight = 1;
let BlineColColor = 'black';
let BlineColWeight = 1;
//win size
let BwinWidth = 370;
let BwinHeight = null;

let Mwindow = {
    pk: null,
    title: 'w0',
    show: true,
    backColor: ['FEF896', 'FEF896', 'gray', 'FEF896'], ////윈 배경, 버튼 배경, 버튼 호버색, 타이틀 배경
    tapFont: [10, 'white', 'normal'],               //탭  폰트 사이즈, 색, 두께, 글꼴
    winTitleFont: [10, 'white', 'normal'],          //윈도 폰트 사이즈, 색, 두께, 글꼴
    line: [['B8D993', 1.5], ['ff8c82', 1.5]],             //본문 가로 라인[컬러, 두께], 본문 세로 라인[컬러, 두께],
    basicSize: [370, null],                         //win with, height
    tap: null,

    //winArray : { 0 : {title:'win0', backColor:['black','black','black'], text:['10pt','white',null,'h3'], tap:[null] }
    winArray: {
        0: copyReturn(),
        1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null
    },

    saveArray: [null, null, null, null, null, null, null, null, null, null],
    makeSaveArray: function (option, array) {
        if (option == true) {
            for (i = 0; i < 10; i++) {
                if (this.winArray[i] != null) {
                    let newArr = [
                        this.winArray[i].title,
                        this.winArray[i].show,
                        this.winArray[i].backColor,
                        this.winArray[i].tapFont,
                        this.winArray[i].winTitleFont,
                        this.winArray[i].line,
                        this.winArray[i].basicSize,
                        this.winArray[i].tap
                    ]
                    this.saveArray[i] = newArr;
                }
            }
            return this.saveArray;
        } else if (option == false) {
            for (i = 0; i < 10; i++) {
                if (array[i] != null) {
                    let copy = copyReturn();
                    let newArr = array[i];
                    this.winArray[i] = copy;

                    this.winArray[i].title = newArr[0];
                    this.winArray[i].show = newArr[1];
                    this.winArray[i].backColor = newArr[2];
                    this.winArray[i].tapFont = newArr[3];
                    this.winArray[i].winTitleFont = newArr[4];
                    this.winArray[i].line = newArr[5];
                    this.winArray[i].basicSize = newArr[6];
                    this.winArray[i].tap = newArr[7];
                }
            }
            return this.winArray;
        }
    },

    save: function (option) {
        if (option == 'new') {
            let getSave = localStorage.getItem('winArray');
            if (getSave == null) {
                let newWinArray = this.makeSaveArray(true, this.winArray);
                localStorage.setItem('winArray', JSON.stringify(newWinArray));
                return this.winArray;
            } else {
                getSave = JSON.parse(getSave);
                let newWinArray = this.makeSaveArray(false, getSave);
                this.winArray = newWinArray;
                return this.winArray;
            }
        } else if (option == 'plusNew') {
            let copy = copyReturn(this.winArray[0]);
            for (i = 0; i < 10; i++) {
                if (this.winArray[i] == null) {
                    copy.title = `w${i}`;
                    this.winArray[i] = copy;
                    let newWinArray = this.makeSaveArray(true, this.winArray);
                    localStorage.setItem('winArray', JSON.stringify(newWinArray));
                    return copy;
                }
            }

        }

    },

    make: function (option, winArray) {

    },
    edit: function () {

    },
    copy: function () {

    }
}

let fontFamily = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-serif', 'ui-sans-serif', 'ui-monospace', 'ui-rounded', 'emoji', 'math', 'fangsong']
let fontStyle = ['normal', 'litalic', 'oblique'];
let fontWeight = ['100', '200', '300', '400_normal', '500', '600', '700_bold', '800', '900'];
let winEditPage = ['this window color', 'this window size & line', 'this window tap & title font', 'del window'];

//배경색 #FEF896, 가로선 #B8D993, 세로선 #FFDD8D
function copyReturn() { //윈도우 기본 객체
    let clone = {
        title: 'w0',
        show: true,
        backColor: ['FEF896', 'FEF896', 'gray', 'FEF896'], ////윈 배경, 버튼 배경, 버튼 호버색, 타이틀 배경
        tapFont: [10, 'white', 'normal'],               //탭  폰트 사이즈, 색, 두께, 글꼴
        winTitleFont: [10, 'white', 'normal'],          //윈도 폰트 사이즈, 색, 두께, 글꼴
        line: [['B8D993', 1], ['FFDD8D', 1]],             //본문 가로 라인[컬러, 두께], 본문 세로 라인[컬러, 두께],
        basicSize: [370, null],                         //win with, height
        tap: null                                       //tap [class,name] array
    }
    return clone;
}
const kj = document.createElement('button');
kj.style.button
//window table =======================
let w = {
    type: 'div', className: 'winName', style_4: `background-color:#${Mwindow.backColor[0]}`,
    child_1: winHead = {
        type: 'div', className: 'winClasss',
        table_winTitle: table = {
            type: 'table', style: 'borderCollapse:collapse', style_1: 'width:100%',

            tr_winTitle: tr = {
                type: 'tr',
                td_plussBtn: td = {
                    type: 'td', style_11: 'width:30px',
                    style_1: `borderBottom:${Mwindow.line[0][1]}px solid #${Mwindow.line[0][0]}`, style_2: `borderRight:${Mwindow.line[1][1]}px solid #${Mwindow.line[1][0]}`,
                    style: 'borderCollapse:collapse',
                    child_1: btn1 = {
                        type: 'button', innerText: ' + ', event: 'NextNextNextShowEvent:click', style_4: `background-color:#${Mwindow.backColor[1]}`,
                        className: `w0_btn:gray:#${Mwindow.backColor[1]}`, event_out: 'mouseoverEvent:mouseover', event_in: 'mouseoutEvent:mouseout',
                    },
                },
                td_title: td = {
                    type: 'td', style_11: 'width:100%',
                    style_1: `borderBottom:${Mwindow.line[0][1]}px solid #${Mwindow.line[0][0]}`,
                    //style_2:`borderRight:${Mwindow.line[1][1]}px solid #${Mwindow.line[1][0]}`,
                    style_2: 'borderRight:none',
                    style: 'borderCollapse:collapse',
                    child_2: btn2 = {
                        type: 'button',
                        style_width:'width:100%',
                        innerText: 'winTitle',
                        event: 'NextShowEvent2:dblclick',
                        style_4: `background-color:#${Mwindow.backColor[3]}`,
                        style_textAlign: 'textAlign:left',

                    },
                    child_3: form1 = {
                        type: 'form',
                        style: 'display:none',
                        child_33: input_1 = {
                            type: 'input',
                        }
                    },
                }
            }
        },


        child_4: headDiv = {
            type: 'div',
            style: 'display:none',
            child_4: newWinTapBtn = {
                type: 'table', style: 'borderCollapse:collapse', style_width: 'width:100%',
                //style_1: 'width:100%',
                tr: tr = {
                    type: 'tr',
                    td_editBtn: td = {
                        type: 'td', 
                        style_11: 'width:20px',
                        style_1: `borderBottom:${Mwindow.line[0][1]}px solid #${Mwindow.line[0][0]}`, style_2: `borderRight:${Mwindow.line[1][1]}px solid #${Mwindow.line[1][0]}`,
                        style: 'borderCollapse:collapse',
                        child_1: btn1 = {
                            type: 'button', innerText: 'e', event: 'NextNextNextShowEvent:click', style_4: `background-color:#${Mwindow.backColor[1]}`,
                            style_width: 'width:20px',
                            style_height:'height:20px',
                            className: `w0_btn:gray:#${Mwindow.backColor[1]}`, event_out: 'mouseoverEvent:mouseover', event_in: 'mouseoutEvent:mouseout',
                        },
                    },
                    td1: td = {
                        type: 'td', style_1: `borderBottom:${Mwindow.line[0][1]}px solid #${Mwindow.line[0][0]}`,
                        style: 'borderCollapse:collapse',
                        style_width: 'width:50px',
                        btn1: wBtn = {
                            type: 'button', innerText: '윈도', event: 'newWindow:click', style_4: `background-color:#${Mwindow.backColor[3]}`,
                            style_textAlign: 'textAlign:left',
                            style_width: 'width:100%',
                            style_height:'height:100%',
                            className: `w0_btn:gray:#${Mwindow.backColor[1]}`, event: 'mouseoverEvent:mouseover', event_1: 'mouseoutEvent:mouseout', event_2: 'selectBeforAfterBtn:click' 
                        },
                    },
                    td2: td = {
                        type: 'td', style_1: `borderBottom:${Mwindow.line[0][1]}px solid #${Mwindow.line[0][0]}`,
                        style: 'borderCollapse:collapse',
                        style_width: 'width:50px',
                        btn2: tapBtn = {
                            type: 'button', innerText: '메모', style_4: `background-color:#${Mwindow.backColor[3]}`,
                            style_textAlign: 'textAlign:left',
                            style_width: 'width:100%',
                            className: `w0_btn:gray:#${Mwindow.backColor[1]}`, event: 'mouseoverEvent:mouseover', event_1: 'mouseoutEvent:mouseout', event_2: 'selectBeforAfterBtn:click' 
                        },
                    },
                    td3: td = {
                        type: 'td', style_1: `borderBottom:${Mwindow.line[0][1]}px solid #${Mwindow.line[0][0]}`,
                        style: 'borderCollapse:collapse',
                        style_width: 'width:50px',
                        btn3: tapBtn = {
                            type: 'button', innerText: '계산', style_4: `background-color:#${Mwindow.backColor[3]}`,
                            style_textAlign: 'textAlign:left',
                            style_width: 'width:100%',
                            className: `w0_btn:gray:#${Mwindow.backColor[1]}`, event: 'mouseoverEvent:mouseover', event_1: 'mouseoutEvent:mouseout', event_2: 'selectBeforAfterBtn:click' 
                        },
                    },
                    td4: td = {
                        type: 'td', style_1: `borderBottom:${Mwindow.line[0][1]}px solid #${Mwindow.line[0][0]}`,
                        style: 'borderCollapse:collapse',
                        style_width: 'width:50px',
                        btn4: tapBtn = {
                            type: 'button', innerText: '링크', style_4: `background-color:#${Mwindow.backColor[3]}`,
                            style_textAlign: 'textAlign:left',
                            style_width: 'width:100%',
                            className: `w0_btn:gray:#${Mwindow.backColor[1]}`, event: 'mouseoverEvent:mouseover', event_1: 'mouseoutEvent:mouseout', event_2: 'selectBeforAfterBtn:click' 
                        },
                    },
                    td5: td = {
                        type: 'td', style_1: `borderBottom:${Mwindow.line[0][1]}px solid #${Mwindow.line[0][0]}`,
                        style: 'borderCollapse:collapse',
                        style_width: 'width:50px',
                        btn5: tapBtn = {
                            type: 'button', innerText: '달력', style_4: `background-color:#${Mwindow.backColor[3]}`,
                            style_textAlign: 'textAlign:left',
                            style_width: 'width:100%',
                            className: `w0_btn:gray:#${Mwindow.backColor[1]}`, event: 'mouseoverEvent:mouseover', event_1: 'mouseoutEvent:mouseout', event_2: 'selectBeforAfterBtn:click' 
                        },
                    },
                    td6: td = {
                        type: 'td', style_1: `borderBottom:${Mwindow.line[0][1]}px solid #${Mwindow.line[0][0]}`,
                        style: 'borderCollapse:collapse',
                        style_width: 'width:50px',
                        btn6: tapBtn = {
                            type: 'button', innerText: '타임', style_4: `background-color:#${Mwindow.backColor[3]}`,
                            style_width: 'width:100%',
                            style_textAlign: 'textAlign:left',
                            className: `w0_btn:gray:#${Mwindow.backColor[1]}`, event: 'mouseoverEvent:mouseover', event_1: 'mouseoutEvent:mouseout', event_2: 'selectBeforAfterBtn:click' 
                        },
                    },
                    td7: td = {
                        type: 'td', style_1: `borderBottom:${Mwindow.line[0][1]}px solid #${Mwindow.line[0][0]}`,
                        style: 'borderCollapse:collapse',
                        style_width: 'width:50px',
                        btn7: tapBtn = {
                            type: 'button', innerText: '그림', style_4: `background-color:#${Mwindow.backColor[3]}`,
                            style_width: 'width:100%',
                            style_textAlign: 'textAlign:left',
                            className: `w0_btn:gray:#${Mwindow.backColor[1]}`, event: 'mouseoverEvent:mouseover', event_1: 'mouseoutEvent:mouseout', event_2: 'selectBeforAfterBtn:click' 
                        },
                    },
                    td8: td = {
                        type: 'td', style_1: `borderBottom:${Mwindow.line[0][1]}px solid #${Mwindow.line[0][0]}`,
                        style: 'borderCollapse:collapse',
                        style_width: 'width:50px',
                        btn8: tapBtn = {
                            type: 'button', innerText: '랜덤', style_4: `background-color:#${Mwindow.backColor[3]}`,
                            style_width: 'width:100%',
                            style_textAlign: 'textAlign:left',
                            className: `w0_btn:gray:#${Mwindow.backColor[1]}`, event: 'mouseoverEvent:mouseover', event_1: 'mouseoutEvent:mouseout', event_2: 'selectBeforAfterBtn:click' 
                        },
                    },
                    td9: td = {
                        type: 'td', style_1: `borderBottom:${Mwindow.line[0][1]}px solid #${Mwindow.line[0][0]}`,
                        style: 'borderCollapse:collapse',
                        //style_width: 'width:40px',
                    },
                },
            },
            child_5: winEdit = {
                type: 'table', style: 'display:none',
                style_row: `borderBottom:${Mwindow.line[0][1]}px solid #${Mwindow.line[0][0]}`,

                winEditDiv: backColor = {
                    type: 'tr',
                    tr1: tr = {
                        type: 'tr',
                        td1: td = {
                            type: 'td', //style_width:'width:6.3%',
                            //style_row: `borderBottom:${Mwindow.line[0][1]}px solid #${Mwindow.line[0][0]}`, 
                            style_col: `borderRight:${Mwindow.line[1][1]}px solid #${Mwindow.line[1][0]}`,
                            beforeBtn: button = { type: 'button', innerText: '<', style_2: 'border:0', style_4: `background-color:#${Mwindow.backColor[1]}`, className: `w0_btn:gray:#${Mwindow.backColor[1]}`, event: 'mouseoverEvent:mouseover', event_1: 'mouseoutEvent:mouseout', event_2: 'selectBeforAfterBtn:click' },

                        },
                        td2: td = {
                            type: 'td',
                            style_padding: 'padding:0 0 0 3px',

                            menuSelect: select = returnSelectOb(winEditPage, { style_2: 'border:0', style_3: 'appearance:none', style_4: 'padding:0px 5px', event: 'selectAndNextObShow:change', style_back: `background-color:#${Mwindow.backColor[1]}`, className: `w0_btn:gray:#${Mwindow.backColor[1]}`, event_out: 'mouseoverEvent:mouseover', event_in: 'mouseoutEvent:mouseout',  }),
                            nextBtn: button = { type: 'button', innerText: ' > ', style_2: 'border:0', style_3: 'width:30px', style_4: `background-color:#${Mwindow.backColor[1]}`, className: `w0_btn:gray:#${Mwindow.backColor[1]}`, event: 'mouseoverEvent:mouseover', event_1: 'mouseoutEvent:mouseout', event_2: 'selectBeforAfterBtn:click' },
                        },
                    },
                    tr2: tr = {
                        type: 'tr',
                        td1: td = {
                            type: 'td',
                            type: 'td',
                            style_col: `borderRight:${Mwindow.line[1][1]}px solid #${Mwindow.line[1][0]}`,
                        },
                        td2: td = {
                            type: 'td',
                            style_padding: 'padding:0 0 0 8px',
                            style_width: 'width:100%',

                            formDiv: div = {
                                type: 'div',
                                form1: backColor = {
                                    type: 'form', style: 'display:block',

                                    pre1: winBackColor = { type: 'pre', innerText: 'background color : ', style: 'display:inline-block' },
                                    input1: input = { type: 'input', kind: 'color', style: 'display:inline-block' },

                                    br1: br = { type: 'span', innerText: '\n' },
                                    pre2: winBackColor = { type: 'pre', innerText: 'button color : ', style: 'display:inline-block' },
                                    input2: input = { type: 'input', kind: 'color' },

                                    br11: br = { type: 'span', innerText: '\n' },
                                    pre22: winBackColor = { type: 'pre', innerText: 'button hover color : ', style: 'display:inline-block' },
                                    input22: input = { type: 'input', kind: 'color' },

                                    br2: br = { type: 'span', innerText: '\n' },
                                    pre3: winBackColor = { type: 'pre', innerText: 'title background color : ', style: 'display:inline-block' },
                                    input3: input = { type: 'input', kind: 'color' },


                                    br4: br = { type: 'span', innerText: '\n' },
                                    pre4: winBackColor = { type: 'pre', innerText: 'basic color : ', style: 'display:inline-block' },
                                    basicColor1: select = {
                                        type: 'select',
                                        option1: op = { type: 'option', innerText: 'right mode' },
                                        option2: op = { type: 'option', innerText: 'dark mode' },
                                        option3: op = { type: 'option', innerText: 'other window color' },
                                    },
                                    basicColor2: select = {
                                        type: 'select',
                                        option1: op = { type: 'option', innerText: 'yellow memo' },
                                        option2: op = { type: 'option', innerText: 'blue memo' },
                                    },
                                    basicColor3: select = {
                                        type: 'select',
                                        option1: op = { type: 'option', innerText: 'w0' },
                                        option2: op = { type: 'option', innerText: 'w1' },
                                    },

                                    br3: br = { type: 'span', innerText: '\n' },
                                    sub1: sub = { type: 'input', kind: 'submit', value: 'save option' },
                                },
                                form2: sizeAndLine = {
                                    type: 'form', style: 'display:none',
                                    pre1: winBackColor = { type: 'pre', innerText: 'basic width size : ', style: 'display:inline-block' },
                                    input1: width = { type: 'input', kind: 'number' },
                                    br1: br = { type: 'span', innerText: '\n' },

                                    pre2: winBackColor = { type: 'pre', innerText: 'basic height size : ', style: 'display:inline-block' },
                                    input2: width = { type: 'input', kind: 'number' },
                                    br2: br = { type: 'span', innerText: '\n' },

                                    pre3: winBackColor = { type: 'pre', innerText: 'basic width Line color & Thickness : ', style: 'display:inline-block' },
                                    input3: width = { type: 'input', kind: 'color' },
                                    input4: width = { type: 'input', kind: 'number' },
                                    br3: br = { type: 'span', innerText: '\n' },

                                    pre4: winBackColor = { type: 'pre', innerText: 'basic height color & Thickness : ', style: 'display:inline-block' },
                                    input5: width = { type: 'input', kind: 'color' },
                                    input6: width = { type: 'input', kind: 'number' },
                                    br4: br = { type: 'span', innerText: '\n' },

                                    sub1: sub = { type: 'input', kind: 'submit', value: 'save option' },
                                },
                                form3: textSize = {
                                    type: 'form', style: 'display:none',

                                    pre1: tapText = { type: 'pre', innerText: 'title text size & weight : ', style: 'display:inline-block' },
                                    input1: size = { type: 'input', kind: 'number' },
                                    input11: weight = returnSelectOb(fontWeight),
                                    br1: br = { type: 'span', innerText: '\n' },

                                    pre2: tapText = { type: 'pre', innerText: 'title font type & kind : ', style: 'display:inline-block' },
                                    select2: family = returnSelectOb(fontFamily),
                                    select22: style = returnSelectOb(fontWeight),
                                    br2: br = { type: 'span', innerText: '\n' },

                                    pre3: titleText = { type: 'pre', innerText: 'basic text size & weight : ', style: 'display:inline-block' },
                                    input3: size = { type: 'input', kind: 'number' },
                                    input33: weight = returnSelectOb(fontWeight),
                                    br3: br = { type: 'span', innerText: '\n' },

                                    pre4: titleText = { type: 'pre', innerText: 'basic font type & kind : ', style: 'display:inline-block' },
                                    select4: family = returnSelectOb(fontFamily),
                                    select44: style = returnSelectOb(fontStyle),
                                    br4: br = { type: 'span', innerText: '\n' },

                                    sub1: sub = { type: 'input', kind: 'submit', value: 'save option' },

                                },
                                form4: delWin = {
                                    type: 'form', style: 'display:none',
                                    pre1: tapText = { type: 'pre', innerText: 'del this window', style: 'display:inline-block' },
                                    br4: br = { type: 'span', innerText: '\n' },
                                    sub1: sub = { type: 'input', kind: 'submit', value: 'del this window' },
                                }
                            }

                        },
                    }
                }
            }
        }
    }
}

//style:'fontSize:1em', style_2:'border:0', style_3:'appearance:none',
function returnSelectOb(array, option) {
    let select = { type: 'select' };
    if (option != null) {
        for (const key in option) {
            select[key] = option[key];
        }
    }
    for (i = 0; i < array.length; i++) {
        let op = { type: 'option', innerText: array[i] };
        select[`op${i}`] = op;
    }
    return select;
}

//pluss function =======================
function newWindow(event) {
    let newWin = Mwindow.save('plusNew');
    w.className = newWin.title;

    w.child_1.table_winTitle.tr_winTitle.td_title.child_2.innerText = newWin.title;
    let aaaa = makeHtml(w);
    main.appendChild(aaaa);
}

function NextNextNextShowEvent(event) {
    let target = event.target.parentNode.parentNode.parentNode.nextSibling;

    if (target.style.display != 'none') {
        target.style.display = 'none';
    } else {
        target.style.display = 'block';
    }
}

function selectAndNextObShow(event) {
    let index = event.target.selectedIndex;
    let nextOb = event.target.nextSibling.nextSibling;
    for (i = 0; i < nextOb.childNodes.length; i++) {
        nextOb.childNodes[i].style.display = 'none';
    }
    nextOb.childNodes[index].style.display = 'block';
}
function selectBeforAfterBtn(event) {
    let target = event.target;
    let select; let nextOb; let newIndex;
    if (target.innerText == '<') {
        select = event.target.parentNode.nextSibling.childNodes[0];
        nextOb = event.target.parentNode.parentNode.nextSibling.childNodes[1].childNodes[0];
        newIndex = select.selectedIndex - 1;
        if (newIndex < 1) { newIndex = select.childNodes.length - 1; }
        select.selectedIndex = newIndex;
    } else if (target.innerText == '>') {
        select = event.target.previousSibling;
        nextOb = event.target.parentNode.parentNode.nextSibling.childNodes[1].childNodes[0];
        newIndex = select.selectedIndex + 1;
        if (newIndex > select.childNodes.length - 1) { newIndex = 1; }
        select.selectedIndex = newIndex;
    }
    for (i = 0; i < nextOb.childNodes.length; i++) {
        nextOb.childNodes[i].style.display = 'none';
    }
    nextOb.childNodes[newIndex].style.display = 'block';
}

function NextShowEvent(event) {
    let target = event.target.parentNode.parentNode.parentNode.nextSibling;
    if (target.style.display != 'none') {
        target.style.display = 'none';
    } else {
        target.style.display = 'block';
    }
}
function NextShowEvent2(event) {
    let target = event.target.nextSibling;
    if (target.style.display != 'none') {
        target.style.display = 'none';
    } else {
        target.style.display = 'block';
    }
}

function mouseoverEvent(event) {
    const target = event.target;
    let className = target.className;
    let color = className.split(':')[1];
    target.style.backgroundColor = `${color}`;
}
function mouseoutEvent(event) {
    const target = event.target;
    let className = target.className;
    let color = className.split(':')[2];
    target.style.backgroundColor = `${color}`;
}
//make html function =======================
function makeEvent(ob, option) {
    let option1 = option.split(':')[0];
    let clickOption = option.split(':')[1];
    if (option1 == 'NextShowEvent') {
        ob.addEventListener(`${clickOption}`, NextShowEvent);
        return ob;
    } else if (option1 == 'NextShowEvent2') {
        ob.addEventListener(`${clickOption}`, NextShowEvent2);
        return ob;
    } else if (option1 == 'NextNextNextShowEvent') {
        ob.addEventListener(`${clickOption}`, NextNextNextShowEvent);
        return ob;
    } else if (option1 == 'newWindow') {
        ob.addEventListener(`${clickOption}`, newWindow);
        return ob;
    } else if (option1 == 'mouseoverEvent') {
        ob.addEventListener(`${clickOption}`, mouseoverEvent);
        return ob;
    } else if (option1 == 'mouseoutEvent') {
        ob.addEventListener(`${clickOption}`, mouseoutEvent);
        return ob;
    } else if (option1 == 'selectAndNextObShow') {
        ob.addEventListener(`${clickOption}`, selectAndNextObShow);
        return ob;
    } else if (option1 == 'selectBeforAfterBtn') {
        ob.addEventListener(`${clickOption}`, selectBeforAfterBtn);
        return ob;
    }
}

function makeOb(ob) {
    let newOb = document.createElement(ob);
    return newOb;
}
function makeAppend(parents, child) {
    let dd = parents;
    let bb = child;
    dd.appendChild(bb);
    return dd;
}
function makeClassName(ob, name) {
    ob.className = `${name}`;
    return ob;
}
function makeType(ob, kind) {
    ob.type = kind;
    return ob;
}
function makeValue(ob, value) {
    ob.value = value;
    return ob;
}
function makeInnerText(ob, text) {
    ob.innerText = text;
    return ob;
}
function makeStyle(ob, option) {
    let option2 = option.split(':')[0];
    let value = option.split(':')[1];
    if (option2 == 'width') {
        //value = Number(value);
        ob.style.width = value;

    } else if (option2 == 'height') {
        ob.style.height = value;
    } else if (option2 == 'display') {
        ob.style.display = value;
    } else if (option2 == 'background-color') {
        ob.style.backgroundColor = value;
    } else if (option2 == 'color') {
        ob.style.color = value;
    } else if (option2 == 'all') {
        ob.style.all = value;
    } else if (option2 == 'float') {
        ob.style.float = value;
    } else if (option2 == 'fontSize') {
        ob.style.fontSize = value;
    } else if (option2 == 'border') {
        ob.style.border = value;
    } else if (option2 == 'appearance') {
        ob.style.appearance = value;
    } else if (option2 == 'padding') {
        ob.style.padding = value;
    } else if (option2 == 'borderBottom') {
        ob.style.borderBottom = value;
    } else if (option2 == 'borderLeft') {
        ob.style.borderLeft = value;
    } else if (option2 == 'borderRight') {
        ob.style.borderRight = value;
    } else if (option2 == 'borderCollapse') {
        ob.style.borderCollapse = value;
    } else if (option2 == 'textAlign') {
        ob.style.textAlign = value;
    }
    return ob;
}
//main make html =======================
function makeHtml(ob) {
    let newOb;
    let child;
    for (const key in ob) {
        let keyy = `${key}`
        keyy = keyy.split('_')[0];
        const target = typeof ob[key];

        if (target == 'object') {
            child = makeHtml(ob[key], 'child');
            newOb = makeAppend(newOb, child);

        } else if (target == 'string' && keyy == 'type') {
            newOb = makeOb(ob[key]);
        } else if (target == 'string' && keyy == 'kind') {
            newOb = makeType(newOb, ob[key])
        } else if (target == 'string' && keyy == 'value') {
            newOb = makeValue(newOb, ob[key])
        } else if (target == 'string' && keyy == 'event') {
            newOb = makeEvent(newOb, ob[key]);
        } else if (target == 'string' && keyy == 'innerText') {
            newOb = makeInnerText(newOb, ob[key])
        } else if (target == 'string' && keyy == 'style') {
            newOb = makeStyle(newOb, ob[key]);
        } else if (target == 'string' && keyy == 'className') {
            newOb = makeClassName(newOb, ob[key]);
        }
    }
    return newOb;
}
//main make =======================


const main = document.querySelector('.main');


let array2 = Mwindow.save('new');

for (let i = 0; i < 10; i++) {
    if (array2[i] != null) {
        w.className = `w${i}`
        w.child_1.table_winTitle.tr_winTitle.td_title.child_2.innerText = array2[i].title;
        let aaaa = makeHtml(w);
        main.appendChild(aaaa);
    }

}