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
                repeatCheck: "true",
            }
            Timers = getData;
            localStorage.setItem(TIMER, JSON.stringify(Timers));
            break;
        case false:
            getData[linkindex] = {
                setTime: getData[linkindex].setTime,
                pastTime: getData[linkindex].pastTime,
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

    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const stopTimeNow = `${hours}:${minutes}:${seconds}`;


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

    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const stopTimeNow = `${hours}:${minutes}:${seconds}`;

    const LstopTimers =  JSON.parse(localStorage.getItem(STOPTIMER));
    const parStopTime_i = `${LstopTimers[linkindex].stopTime}`;

    let makeNumber = function timeNumber(event) { //익명함수 사용
        let event2 = event.split(":");
        const makenumber = event2 => event2.map(Number);
        const arrNumber = makenumber(event2);
        const SetTIME = arrNumber[0] * 3600 + arrNumber[1] * 60 + arrNumber[2];
        return SetTIME;
    }
    const satTime = makeNumber(parStopTime_i);
    const nowTime = makeNumber(stopTimeNow);
    const playTime_after = nowTime - satTime;

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

    const date = new Date();
    let S =date.getSeconds() ;
    let M = date.getMinutes();
    let H = date.getHours();

    let secG = (S + secC) % 60;
    let minG = (M + minC + Math.floor(S / 60)) % 60;
    let houG = (H + houC + Math.floor((M + minC + Math.floor(S / 60)) / 60)) % 24;

    const seconds = String(secG).padStart(2, "0");
    const minutes = String(minG).padStart(2, "0");
    const hours = String(houG).padStart(2, "0");
    const endTimer = `${hours}:${minutes}:${seconds}`;

    const newTimerOb = {
        setTime: newAllTimerValue,
        pastTime: endTimer,
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

            const getSet = document.getElementById(`timeSet_${i}`);
            const StrSet = getSet.innerText;

            function makeNumber(event) {
                let event2 = event.split(":");
                const makenumber = event2 => event2.map(Number);
                let arrNumber = makenumber(event2);
                return arrNumber;
                //const SetTIME = arrNumber[0] = hour, [1] = min, [2],s 
                }

            const getPast = document.getElementById(`pastSet_${i}`);
            const StrPast = getPast.innerText;

            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            const startTimer = `${hours}:${minutes}:${seconds}`;

            let satTime  =   makeNumber(StrSet);
            let endTime  =   makeNumber(StrPast);
            let nowTime  =   makeNumber(startTimer);

            const getChekRepeat = document.getElementById(`repeatCheck_${i}`);
            
            const getStopBtn = document.getElementById(`stopBtn_${i}`); ////////////////////////////////////
            const getPlayBtn = document.getElementById(`playBtn_${i}`);

            const LstopTimers = localStorage.getItem(STOPTIMER);
            const parseStops = JSON.parse(LstopTimers);

            const parStoID_i = `${parseStops[i].stopTimerID}`;
            
            
            //console.log(parStoID_i , getStopBtn.id)
            //console.log(parseStops[i].stopTimerID); ////////////////////////////////////

            let PLZero = function (event) {
                const make = String(event).padStart(2, "0");
                return make;
            }

            /*
            let makeNumber = function timeNumber(event) { //익명함수 사용
                let event2 = event.split(":");
                const makenumber = event2 => event2.map(Number);
                const arrNumber = makenumber(event2);
                const SetTIME = arrNumber[0] * 3600 + arrNumber[1] * 60 + arrNumber[2];
                return SetTIME;
            }
            */


            if ( (satTime[0] > 0 || satTime[1] > 0 || satTime[2] > 0) && getChekRepeat.checked === false && parStoID_i !== getStopBtn.id  && parStoID_i !== getPlayBtn.id) { //감소시간

                const Hours = endTime[0]-nowTime[0];
                const Minut = endTime[1]-nowTime[1];
                const Second = endTime[2]-nowTime[2];

                const declineTIME = `${Hours}:${Minut}:${Second}`;
                const update = document.querySelector(`#updatTime_${i}`);
                update.innerText = declineTIME;

                if(Hours==0 && Minut==0 && Second==0) {
                    const declineTIME = `END`;
                    const update = document.querySelector(`#updatTime_${i}`);
                    update.innerText = declineTIME;

                    const playTimeBtn = document.getElementById(`playBtn_${i}`);
                    const stopTimeBtn = document.getElementById(`stopBtn_${i}`);
                    if(stopTimeBtn.style.display !== 'none') {
                        stopTimeBtn.style.display = 'none';
                        playTimeBtn.style.display = 'none';
                    }
                    else {
                            stopTimeBtn.style.display = 'none';
                            playTimeBtn.style.display = 'none';
                    }

                }

            } else if ( (satTime[0] > 0 || satTime[1] > 0 || satTime[2] > 0) &&  getChekRepeat.checked === true && parStoID_i !== getStopBtn.id  && parStoID_i !== getPlayBtn.id) { //반복시간-----------
                const repeatCounts = document.querySelector(`#repeatCount_${i}`);
                const decline = (pastTime + satTime) - nowTime;
                const repeatCount = Math.floor(Math.abs(decline) / satTime + 1);

                if (decline > 0) {
                    repeatCounts.innerText = "0";
                } else if (decline <= 0) {
                    repeatCounts.innerText = `${repeatCount}`;
                }
                //console.log(decline,"본래의 카운트",repeatCount); 
                if (repeatCount === 1) {
                    /*
                    let decT = ; 
                    let nowDecline =
                    */
                    //const nowDecline = Math.floor(((repeatCount * satTime) + pastTime) - nowTime);

                    const Hours = PLZero(Math.floor(nowDecline / 3600));
                    const ChekMinut = Math.floor(nowDecline / 60);
                    const Minut = PLZero(ChekMinut % 60);
                    const Second = PLZero(nowDecline % 60);
                    const declineTIME = `${Hours}:${Minut}:${Second}`;
                    const update = document.querySelector(`#updatTime_${i}`);
                    update.innerText = declineTIME;

                    if (Second < 1) {
                        const repeatCount2 = Math.floor(Math.abs(decline) / satTime + 2);
                        //console.log("임의의 카운트",repeatCount2); 
                        const nowDecline = Math.floor(((repeatCount2 * satTime) + pastTime) - nowTime);

                        const Hours = PLZero(Math.floor(nowDecline / 3600));
                        const ChekMinut = Math.floor(nowDecline / 60);
                        const Minut = PLZero(ChekMinut % 60);
                        const Second = PLZero(nowDecline % 60);
                        const declineTIME = `${Hours}:${Minut}:${Second}`;
                        const update = document.querySelector(`#updatTime_${i}`);
                        update.innerText = declineTIME;
                    }

                } else if (repeatCount >= 2) {
                    const nowDecline = Math.floor(((repeatCount * satTime) + pastTime + satTime) - nowTime);
                    let PLZero = function (event) {
                        const make = String(event).padStart(2, "0");
                        return make;
                    }
                    const Hours = PLZero(Math.floor(nowDecline / 3600));
                    const ChekMinut = Math.floor(nowDecline / 60);
                    const Minut = PLZero(ChekMinut % 60);
                    const Second = PLZero(nowDecline % 60);

                    const declineTIME = `${Hours}:${Minut}:${Second}`;
                    const update = document.querySelector(`#updatTime_${i}`);
                    update.innerText = declineTIME;
                }

            } else if (satTime === 0 && parStoID_i !== getStopBtn.id && parStoID_i !== getPlayBtn.id) { //증가시간-----------
                const nowDecline = Math.floor(Math.abs(pastTime - nowTime));

                const Hours = PLZero(Math.floor(nowDecline / 3600));
                const ChekMinut = Math.floor(nowDecline / 60);
                const Minut = PLZero(ChekMinut % 60);
                const Second = PLZero(nowDecline % 60);
                const declineTIME = `${Hours}:${Minut}:${Second}`;
                const update = document.querySelector(`#updatTime_${i}`);
                update.innerText = declineTIME;


            } else if (parStoID_i === getStopBtn.id) {

                const stopTime = `${parseStops[i].stopTime}`;
                const stopTime_T = makeNumber(stopTime);
                const stop_now = Math.abs(stopTime_T - nowTime);

                const decline = Math.abs((pastTime + satTime + stop_now) - nowTime);

                const Hours = PLZero(Math.floor(decline / 3600));
                const ChekMinut = Math.floor(decline / 60);
                const Minut = PLZero(ChekMinut % 60);
                const Second = PLZero(decline % 60);

                const declineTIME = `${Hours}:${Minut}:${Second}`;
                const update = document.querySelector(`#updatTime_${i}`);
                update.innerText = declineTIME;

            }else if (parStoID_i === getPlayBtn.id && getChekRepeat.checked === false) {

                const stopTime = parseStops[i].stopTime;

                const decline = Math.abs((pastTime + satTime + stopTime) - nowTime);

                const Hours = PLZero(Math.floor(decline / 3600));
                const ChekMinut = Math.floor(decline / 60);
                const Minut = PLZero(ChekMinut % 60);
                const Second = PLZero(decline % 60);

                const declineTIME = `${Hours}:${Minut}:${Second}`;
                const update = document.querySelector(`#updatTime_${i}`);
                update.innerText = declineTIME;

            } else if (satTime > 0 && parStoID_i === getPlayBtn.id && getChekRepeat.checked === true && parStoID_i !== getStopBtn.id ) { //반복시간-----------
                const stopTime = parseStops[i].stopTime;
                const repeatCounts = document.querySelector(`#repeatCount_${i}`);
                const decline = (pastTime + satTime + stopTime) - nowTime;
                const repeatCount = Math.floor(Math.abs(decline) / satTime + 1);

                if (decline > 0) {
                    repeatCounts.innerText = "0";
                } else if (decline <= 0) {
                    repeatCounts.innerText = `${repeatCount}`;
                }
                //console.log(decline,"본래의 카운트",repeatCount); 
                if (repeatCount === 1) {
                    const nowDecline = Math.floor(((repeatCount * satTime) + pastTime + stopTime) - nowTime);

                    const Hours = PLZero(Math.floor(nowDecline / 3600));
                    const ChekMinut = Math.floor(nowDecline / 60);
                    const Minut = PLZero(ChekMinut % 60);
                    const Second = PLZero(nowDecline % 60);
                    const declineTIME = `${Hours}:${Minut}:${Second}`;
                    const update = document.querySelector(`#updatTime_${i}`);
                    update.innerText = declineTIME;

                    if (Second < 1) {
                        const repeatCount2 = Math.floor(Math.abs(decline) / satTime + 2);
                        //console.log("임의의 카운트",repeatCount2); 
                        const nowDecline = Math.floor(((repeatCount2 * satTime) + pastTime + stopTime) - nowTime);

                        const Hours = PLZero(Math.floor(nowDecline / 3600));
                        const ChekMinut = Math.floor(nowDecline / 60);
                        const Minut = PLZero(ChekMinut % 60);
                        const Second = PLZero(nowDecline % 60);
                        const declineTIME = `${Hours}:${Minut}:${Second}`;
                        const update = document.querySelector(`#updatTime_${i}`);
                        update.innerText = declineTIME;
                    }

                } else if (repeatCount >= 2) {
                    const nowDecline = Math.floor(((repeatCount * satTime) + pastTime + satTime + stopTime) - nowTime);
                    let PLZero = function (event) {
                        const make = String(event).padStart(2, "0");
                        return make;
                    }
                    const Hours = PLZero(Math.floor(nowDecline / 3600));
                    const ChekMinut = Math.floor(nowDecline / 60);
                    const Minut = PLZero(ChekMinut % 60);
                    const Second = PLZero(nowDecline % 60);

                    const declineTIME = `${Hours}:${Minut}:${Second}`;
                    const update = document.querySelector(`#updatTime_${i}`);
                    update.innerText = declineTIME;
                }

            }
        }
    } else {
        paintTimerList(newTimerOb);
    }

}
updateTimer();
setInterval(updateTimer, 1000);