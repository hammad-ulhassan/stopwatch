const startBtn = document.getElementById('start')
const pauseBtn = document.getElementById('pause')
const splitBtn = document.getElementById('split')
const resetBtn = document.getElementById('reset')
const splits = document.getElementById('time-list');

const t1 = document.getElementById('t1');
const t2 = document.getElementById('t2');

var mainInterval = null;
var startedTime = null;
var pausedTime = null;
var pausedDuration = null;

var currentLapTime = null;
var currentTime = null;
var timeElapsedMain = null;

var splitCounter = 0;

pauseBtn.hidden = true;
splitBtn.hidden = true;

function split(){
    splitCounter++;
    let timeParted = getTimeParts(new Date(timeElapsedMain));
     splits.appendChild(
        article(
            timeText(timeParted.hours, timeParted.minutes, timeParted.seconds, timeParted.milliseconds)
            )
        );
}

Number.prototype['padStart']= function(length=2, string="0"){
    return this.toString().padStart(length, string);
}

const article = (time, incident='Pause')=>{
    const article = document.createElement("article");
    let h3num = document.createElement("h3");
    let h3time = document.createElement("h3");
    let h3incident = document.createElement("h3");
    h3num.innerText = `#${splitCounter}`
    h3time.innerText = time;
    h3incident.innerText = incident;
    article.appendChild(h3num)
    article.appendChild(h3time)
    article.appendChild(h3incident)
    article.className="time-row";
    return article;
}

function start(){
    startBtn.hidden = true;
    splitBtn.hidden = false;
    pauseBtn.hidden = false;

    if(mainInterval == null){
        startedTime = new Date();
    }

    if(pausedTime != null){
        pausedDuration += (new Date()-pausedTime)
    }

    mainInterval = setInterval(handleClock, 10);
}

function handleClock(){
    currentTime = new Date();
    timeElapsedMain = new Date(currentTime - startedTime - pausedDuration);
    let timeParted = getTimeParts(timeElapsedMain);
    let mainMilliseconds = ~~(timeParted.milliseconds/100);
    let subMilliseconds = timeParted.milliseconds%100;

   clockView({...timeParted, ms1: mainMilliseconds, ms2: subMilliseconds});
}

const getTimeParts = (time)=>({hours: time.getUTCHours(), minutes: time.getUTCMinutes(), seconds: time.getUTCSeconds(), milliseconds: time.getUTCMilliseconds()});

const timeText = (h,m,s,ms)=> `${h.padStart()}:${m.padStart()}:${s.padStart()}.${ms.padStart(3,"0")}`

function clockView({hours, minutes, seconds, ms1, ms2}){
   t1.innerText = `${hours.padStart()}:${minutes.padStart()}:${seconds.padStart()}.${ms1}`
   t2.innerText = `${ms2.padStart()}`;
}

function pause(){
    pausedTime = new Date();
    clearInterval(mainInterval);
    pauseBtn.hidden = true;
    startBtn.hidden = false;
}

function reset(){
    clearInterval(mainInterval);
    mainInterval = null;
    startedTime = null;
    pausedTime = null;
    pausedDuration = null;
    currentTime = null;
    splitCounter = 0;

    splits.replaceChildren();


    clockView({hours: 0, minutes: 0, seconds: 0, ms1: 0, ms2: 0});

    splitBtn.hidden = true;
    pauseBtn.hidden = true;
    startBtn.hidden = false;
}





