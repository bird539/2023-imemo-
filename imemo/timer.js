const timerForm = document.getElementById("timerForm");
const timerList = document.getElementById("timer-list");

const hourInput = document.getElementById("hourTimer");
const minuteInput = document.getElementById("minuteTimer");
const secondInput = document.getElementById("secondTimer");

const TIMER = "Timers";
let Timers = [];
function saveTimers() { //로컬스토리지에 저장
    localStorage.setItem(TIMER, JSON.stringify(Timers));
}



const STOPTIMER = "stopTimers"
let stopTimers = [];
function stopTimersSave() {
    localStorage.setItem(STOPTIMER, JSON.stringify(stopTimers));
}


function deletTimer(event) {//삭제버튼
    const deleteLiTarget = event.target.parentElement;
    const linkindex = parseInt(deleteLiTarget.id);

    stopTimers = stopTimers.filter(Timer => Timer !== stopTimers[linkindex]);
    stopTimersSave();
    Timers = Timers.filter(Timer => Timer !== Timers[linkindex]);//인덱스로 값 제거
    saveTimers();

    deleteLiTarget.remove();
    location.reload();
}

function checkRepeat(event) {
    const li = event.target.parentElement;
    const liId = li.id;
    const check = document.getElementById(liId);
    const check_child = check.childNodes[9].checked;
    const getData = JSON.parse(localStorage.getItem(TIMER));
    const linkindex = parseInt(li.id);

    switch (check_child) {
        case true:
            getData[linkindex] = {
                setTime: getData[linkindex].setTime,
                pastTime: getData[linkindex].pastTime,
                afterTime: getData[linkindex].afterTime,
                repeatCheck: "true",
            }
            Timers = getData;
            localStorage.setItem(TIMER, JSON.stringify(Timers));
            break;
        case false:
            getData[linkindex] = {
                setTime: getData[linkindex].setTime,
                pastTime: getData[linkindex].pastTime,
                afterTime: getData[linkindex].afterTime,
                repeatCheck: "false",
            }
            Timers = getData;
            localStorage.setItem(TIMER, JSON.stringify(Timers));
            break;
    }
    saveTimers();
}       


function reStartNow(event) {
    const li = event.target.parentElement;
    const liId = li.id;
    const stopTimeBtn = document.getElementById(`stopBtn_${liId}`);
    const playTimeBtn = document.getElementById(`playBtn_${liId}`);

    const getSet = document.getElementById(`timeSet_${liId}`);
    const StrSet = getSet.innerText;

    const linkindex = parseInt(liId);

    const getDataS = JSON.parse(localStorage.getItem(STOPTIMER));
    getDataS[linkindex] = {
        stopTimerID: 1,
        stopTime: "",
    }
    stopTimers = getDataS;
    localStorage.setItem(STOPTIMER, JSON.stringify(stopTimers));

    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const stopTimeNow = `${hours}:${minutes}:${seconds}`;


    const getData = JSON.parse(localStorage.getItem(TIMER));
    getData[linkindex] = {
        pastTime: stopTimeNow,
        setTime: StrSet,
    }
    Timers = getData;
    localStorage.setItem(TIMER, JSON.stringify(Timers));
    

    // btn1 숨기기 (display: none)
    if(stopTimeBtn.style.display !== 'none') {
        stopTimeBtn.style.display = 'inline';
        playTimeBtn.style.display = 'none';
    }
    // btn` 보이기 (display: block)
    else {
        stopTimeBtn.style.display = 'none';
        playTimeBtn.style.display = 'inline';
    }

    saveTimers();
    location.reload();
}



//-----타이머 정지 추가
function stopTimerNow(event) {
    const li = event.target.parentElement;
    const liId = li.id;
    const stopTimeBtn = document.getElementById(`stopBtn_${liId}`);
    const playTimeBtn = document.getElementById(`playBtn_${liId}`);
    const stopTimeBtnID = `stopBtn_${liId}`;

    const linkindex = parseInt(liId);
    const stopTimeNow = moment();
    const getData = JSON.parse(localStorage.getItem(STOPTIMER));
    getData[linkindex] = {
        stopTimerID: stopTimeBtnID,
        stopTime: stopTimeNow,
    }
    stopTimers = getData;
    localStorage.setItem(STOPTIMER, JSON.stringify(stopTimers));
    
    // btn1 숨기기 (display: none)
    if(stopTimeBtn.style.display !== 'none') {
        stopTimeBtn.style.display = 'none';
        playTimeBtn.style.display = 'inline';
    }
    // btn` 보이기 (display: block)
    else {
        stopTimeBtn.style.display = 'inline';
        playTimeBtn.style.display = 'none';
    }

    stopTimersSave();
}

function playTimerNow(event) {
    const li = event.target.parentElement;
    const liId = li.id;
    const playTimeBtn = document.getElementById(`playBtn_${liId}`);
    const stopTimeBtn = document.getElementById(`stopBtn_${liId}`);
    const playTimeBtnID = `playBtn_${liId}`;

    const linkindex = parseInt(liId);

    const LstopTimers =  JSON.parse(localStorage.getItem(STOPTIMER));
    let stopT = moment(LstopTimers[linkindex].stopTime);
    let nowT = moment();

    const playTime_after = moment.duration(nowT.diff(stopT));
    console.log(`${playTime_after}`);
    console.log(`${nowT}`)
    console.log(`${nowT.add(playTime_after)}`)

    const getData = JSON.parse(localStorage.getItem(STOPTIMER));
    getData[linkindex] = {
        stopTimerID: playTimeBtnID,
        stopTime: playTime_after,
    }
    stopTimers = getData;
    localStorage.setItem(STOPTIMER, JSON.stringify(stopTimers));
    

    // btn1 숨기기 (display: none)
    if(playTimeBtn.style.display !== 'none') {
        stopTimeBtn.style.display = 'inline';
        playTimeBtn.style.display = 'none';
    }
    // btn` 보이기 (display: block)
    else {
        stopTimeBtn.style.display = 'none';
        playTimeBtn.style.display = 'inline';
    }

    stopTimersSave();
}


let LengthTimer_i = 0;
let Timer_child_i = 0;
let repeat_i = 0;
let updatTime_i = 0;
let stopTime_i = 0;
let playTime_i = 0;

function paintTimerList(newTimerOb) {
    const liTimer = document.createElement("li");

    const spanTimer = document.createElement("span");
    const aTimer = document.createElement("a");
    const aaTimer = document.createElement("a");
    const brTimer = document.createElement("br");
    const exSpanTimer = document.createElement("span");

    const playButton = document.createElement("button");
    const stopButton = document.createElement("button");
    const suspendButton = document.createElement("button");
    const deletTimerButton = document.createElement("button");

    deletTimerButton.addEventListener("click", deletTimer);
    stopButton.addEventListener("click", stopTimerNow);
    playButton.addEventListener("click", playTimerNow);
    suspendButton.addEventListener("click", reStartNow);

    liTimer.id = LengthTimer_i++;
    spanTimer.id = `timeSet_${Timer_child_i++}`;
    playButton.id = "play"
    aTimer.id = `pastSet_${repeat_i++}`;
    exSpanTimer.id = `updatTime_${updatTime_i++}`;
    stopButton.id = `stopBtn_${stopTime_i++}`;
    playButton.id = `playBtn_${playTime_i++}`;
    suspendButton.id = "reStartBtn";

    spanTimer.innerText = newTimerOb.setTime;
    aTimer.innerText = newTimerOb.pastTime;
    exSpanTimer.innerText = newTimerOb.setTime;

    playButton.innerText = "play";
    stopButton.innerText = "stop";
    suspendButton.innerText = "restart";
    deletTimerButton.innerText = "x"
    aaTimer.innerText = " | "


    liTimer.appendChild(spanTimer);

    liTimer.appendChild(aaTimer);
    liTimer.appendChild(exSpanTimer);
    liTimer.appendChild(playButton);
    liTimer.appendChild(stopButton);
    liTimer.appendChild(suspendButton);

    liTimer.appendChild(brTimer);
    liTimer.appendChild(aTimer);


    if (newTimerOb.setTime !== "00:00:00") {
        const repeatButton = document.createElement("INPUT");
        repeatButton.setAttribute("type", "checkbox");
        repeatButton.addEventListener("click", checkRepeat);
        const aaTimer = document.createElement("a");
        aaTimer.innerText = " repeat ";
        const aaaTimer = document.createElement("span");
        aaaTimer.innerText = "";
        repeatButton.id = `repeatCheck_${liTimer.id}`;
        aaaTimer.id = `repeatCount_${liTimer.id}`;
        liTimer.appendChild(aaTimer);
        liTimer.appendChild(repeatButton);
        liTimer.appendChild(aaaTimer);
    }else{
        const repeatButton = document.createElement("INPUT");
        repeatButton.setAttribute("type", "checkbox");
        repeatButton.addEventListener("click", checkRepeat);
        const aaTimer = document.createElement("a");
        aaTimer.innerText = "";
        const aaaTimer = document.createElement("span");
        aaaTimer.innerText = "";
        repeatButton.id = `repeatCheck_${liTimer.id}`;
        aaaTimer.id = `repeatCount_${liTimer.id}`;
        liTimer.appendChild(aaTimer);
        liTimer.appendChild(repeatButton);
        liTimer.appendChild(aaaTimer);
        repeatButton.style.display = 'none';
    }
    liTimer.appendChild(deletTimerButton);

    timerList.appendChild(liTimer);
}

let saveStopTime_i = 0;
function handleTimerSubmit(event) { //저장 
    event.preventDefault();
    let secV = Number(secondInput.value);
    let minV = Number(minuteInput.value);
    let houV = Number(hourInput.value);

    let secC = secV % 60;
    let minC = (minV + Math.floor(secV/60)) % 60;
    let houC = (houV + Math.floor((minV + Math.floor(secV/60)) / 60)) % 24;

    const newHourValue = String(houC).padStart(2, "0");
    const newMinuteValue = String(minC).padStart(2, "0");
    const newSecondValue = String(secC).padStart(2, "0");
    const newAllTimerValue = `${newHourValue}:${newMinuteValue}:${newSecondValue}`;

    const pastTime = moment();
    const afterTime = moment().add(houC, 'hours').add(minC, 'minutes').add(secC, 'seconds');
    //console.log(pastTime);
    //console.log(`${afterTime}`);

    const newTimerOb = {
        setTime: newAllTimerValue,
        pastTime: pastTime,
        afterTime: afterTime,
        repeatCheck: "false",
    }

    Timers.push(newTimerOb);
    saveTimers();

    const newStopTimeOb = {
        stopTimerID: saveStopTime_i++,
        stopTime: "",
    }

    stopTimers.push(newStopTimeOb);
    stopTimersSave();

    paintTimerList(newTimerOb);
    hourInput.value = 00;
    minuteInput.value = 00;
    secondInput.value = 00;

}

timerForm.addEventListener("submit", handleTimerSubmit);

const saveStopTimers = localStorage.getItem(STOPTIMER);
const savedTimers = localStorage.getItem(TIMER);


if (savedTimers !== null) {
    const parsedTimers = JSON.parse(savedTimers);
    Timers = parsedTimers;
    parsedTimers.forEach(paintTimerList);
    parsedTimers.forEach(check_paintRepeat);
}

function check_paintRepeat() {
    const checkRepeatOB_2 = JSON.parse(localStorage.getItem(TIMER));
    for (let i = 0; i < Timers.length; i++) {    
        if (checkRepeatOB_2[i].repeatCheck === "true") {
            const get_Repeat = document.getElementById(`${i}`);
            const checkk = get_Repeat.childNodes[9];
            checkk.checked = true;
        }}
}

if (saveStopTimers !== null) {
    const parsedStops = JSON.parse(saveStopTimers);
    stopTimers = parsedStops;
}

//-------------------------------------------------------------------------------------------------
function updateTimer() {
    if (Timers !== null) {
        for (let i = 0; i < Timers.length; i++) {
            const getChekRepeat = document.getElementById(`repeatCheck_${i}`);
            const getStopBtn = document.getElementById(`stopBtn_${i}`); 
            const getPlayBtn = document.getElementById(`playBtn_${i}`);

            let L_Timers = JSON.parse(window.localStorage.getItem('Timers'));
            let L_stopTimers = JSON.parse(window.localStorage.getItem('stopTimers'));
            let pastT = moment(L_Timers[i].pastTime);
            let afterT = moment(L_Timers[i].afterTime);
            let set_S = L_Timers[i].setTime
            let nowT = moment();
            let stopID = L_stopTimers[i].stopTimerID;
            let stopT = L_stopTimers[i].stopTime;

            let D = moment.duration(afterT.diff(nowT));
            let H = D.hours();
            let M = D.minutes();
            let S = D.seconds();
            let declineTIME = `${H}:${M}:${S}`;
            let update = document.querySelector(`#updatTime_${i}`);
            let repeatCount = document.querySelector(`#repeatCount_${i}`);

            if ( (set_S != '00:00:00') && getChekRepeat.checked === false && stopID !== getStopBtn.id  && stopID !== getPlayBtn.id) { //감소시간
                update.innerText = declineTIME;
                if(H==0 && M==0 && S <= 0) {
                    update.innerText = `END`;
                    const playTimeBtn = document.getElementById(`playBtn_${i}`);
                    const stopTimeBtn = document.getElementById(`stopBtn_${i}`);
                    if(stopTimeBtn.style.display !== 'none') {
                        stopTimeBtn.style.display = 'none';
                        playTimeBtn.style.display = 'none';
                    } else {
                            stopTimeBtn.style.display = 'none';
                            playTimeBtn.style.display = 'none';
                    }
                }

            } else if ( set_S != '00:00:00' &&  getChekRepeat.checked === true && stopID !== getStopBtn.id  && stopID !== getPlayBtn.id) { 
                let SET_R = parseInt(moment.duration(afterT.diff(pastT)).asSeconds());
                let R = parseInt(moment.duration(nowT.diff(pastT)).asSeconds()/SET_R);//Same1
                let A_P = afterT.add(SET_R*R, 'seconds');
                let A_T = moment.duration(A_P.diff(nowT));
                let declineTIME_R = `${A_T.hours()}:${A_T.minutes()}:${A_T.seconds()}`;
                update.innerText = declineTIME_R
                repeatCount.innerText = `${R}`;

            } else if (set_S === '00:00:00' && stopID !== getStopBtn.id && stopID !== getPlayBtn.id) { 
                let now_D = moment.duration(nowT.diff(pastT))//Same1
                let declineTIME_R = `${now_D.hours()}:${now_D.minutes()}:${now_D.seconds()}`;
                update.innerText = declineTIME_R;

            } else if (stopID === getStopBtn.id) {
                let S_N = moment.duration(nowT.diff(stopT));
                let s_D = pastT.add(S_N) ;
                if (set_S != '00:00:00') {
                    let s_D = pastT.add(S_N).add(set_S);
                }
                let S_NN = moment.duration(nowT.diff(s_D));
                let declineTIME_R = `${S_NN.hours()}:${S_NN.minutes()}:${S_NN.seconds()}`;
                update.innerText = declineTIME_R;

            } else if (stopID === getPlayBtn.id) {
                let S_N = moment.duration(nowT.diff(pastT));
                let s_DD =  pastT.add(S_N);
                let s_DDD = pastT.add(stopT); //과거시간+정지기간+(현재~과거)기간 - 현재시간
                if (set_S != '00:00:00') {
                    let s_DD = pastT.add(stopT).add(S_N).add(set_S);
                }
                let NN = moment.duration(nowT.diff(s_DDD)); //
                let declineTIME_R = `${s_DDD.hours()}:${s_DDD.minutes()}:${s_DDD.seconds()}`;
                //let declineTIME_R = `${s_D.hours()}:${s_D.minutes()}:${s_D.seconds()}`;
                update.innerText = declineTIME_R;
                console.log(`${s_DD}`);
                //console.log(`${NN}`);
                
            }
        }

    } else {
        paintTimerList(newTimerOb);
    }

}
updateTimer();
setInterval(updateTimer, 1000);