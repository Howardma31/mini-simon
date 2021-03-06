// global constants
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence
const patternLength = 8; // how long the pattern is
const lifeCounter = 3; // number of lives

//Global Variables
var pattern = [];
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var audioPlaying = false;
var volume = 0.5;  //must be between 0.0 and 1.0
var guessCounter = 0;
var clueHoldTime = 1200; //how long to hold each clue's light/sound
var decreaseFactor = 0.8;
var mistakeCounter = 0;
var timeRemaining = 10;
var timer;
var t;

function startGame(){
  //initialize game variables
  pattern = [];
  progress = 0;
  mistakeCounter = 0;
  gamePlaying = true;
  populatePattern();
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
}

function stopGame(){
  gamePlaying = false
  clearInterval(timer);
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  resetLives();
  resetTimer();
}

function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit");
}
function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}

function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playAudio(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}

function playClueSequence(){
  guessCounter = 0;
  decreaseFactor = 0.80;
  clueHoldTime = 1200;
  timeRemaining = 10;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i = 0; i <= progress; i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue,delay,pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime; 
    delay += cluePauseTime;
    clueHoldTime = clueHoldTime * decreaseFactor;
    if(decreaseFactor < 1){
      decreaseFactor += 0.03;
    }
  }
  setTimeout(setTimer, delay - 500);
}

function loseGame(){
  stopGame();
  alert("Game Over. You lost.");
}
function winGame(){
  stopGame();
  alert("Game Over. You won!");
}

function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }
  
  if(btn == pattern[guessCounter]){
    //Guess was correct!
    if(guessCounter == progress){
      if(progress == pattern.length - 1){
        //GAME OVER: WIN!
        resetTimer();
        winGame();
      } else {
        //Pattern correct. Add next segment
        progress++;
        resetTimer();
        playClueSequence();
      }
    } else {
      //so far so good... check the next guess
      guessCounter++;
    } 
  } else {
    //Guess was incorrect
    mistakeCounter++;
    document.getElementById("life"+mistakeCounter).classList.add("lost");
    if(mistakeCounter >= lifeCounter){
      //GAME OVER: LOSE!
      resetTimer();
      setTimeout(loseGame, 100);
    }
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function populatePattern() {
  for(let i = 0; i < patternLength; i++) {
    pattern[i] = getRandomInt(1, 7);
  }
}

function resetLives() {
  for(let i = 1; i <= lifeCounter; i++) {
    document.getElementById("life"+i).classList.remove("lost");
  }
}

function setImageVisible(id, visible) {
    var img = document.getElementById(id);
    img.style.visibility = (visible ? 'visible' : 'hidden');
}

function playAudio(btn, len){
  startAudio(btn);
  setTimeout(function(){
    stopAudio(btn)
  },len)
}
function startAudio(btn) {
  if (!audioPlaying) {
    audioPlaying = true;
    document.getElementById("audio"+btn).play();
    setImageVisible("image"+btn, true);
  }
}
function stopAudio(btn) {
  document.getElementById("audio"+btn).pause();
  document.getElementById("audio"+btn).currentTime = 0;
  audioPlaying = false;
  setImageVisible("image"+btn, false);
}

function setTimer(){
  document.getElementById('timerDisplay').innerHTML = timeRemaining;
  if (timeRemaining == 0) {
    loseGame();
    clearInterval(timer);
  } else {
    timeRemaining--;
    t = setTimeout("setTimer()", 1000);
  }
}

function resetTimer() {
  // resets countdown
  clearTimeout(t);
  timeRemaining = 10;
  document.getElementById('timerDisplay').innerHTML = timeRemaining;
};

// Sound Synthesis Functions
const freqMap = {
  1: 270,
  2: 340,
  3: 410,
  4: 480,
  5: 540,
  6: 610,
}
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone(btn)
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
    setImageVisible("image"+btn, true);
  }
}
function stopTone(btn){
  g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
  tonePlaying = false
  setImageVisible("image"+btn, false);
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)