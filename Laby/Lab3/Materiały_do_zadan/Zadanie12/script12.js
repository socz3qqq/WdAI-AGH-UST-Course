// game variables
const gameArea = document.getElementById("game-area");
const score = document.getElementById("score");
const health = document.getElementById("health");
const inGameNick = document.getElementById("nick");
const crosshair = document.querySelector("#crosshair");
const startButton = document.getElementById("start-game");
const menu = document.getElementById("game-menu");
const scores = document.querySelectorAll(".score");
const regNick = /^[a-zA-Z0-9]{4,20}$/;
let myScore;
let lives = 3;
let currentScore = 0;
let zombieList = [];
let zombieID = 0;
let gameLoop;
const bgStep = 200;
const bgSize = 2000;

function moveCrosshair(event){
    crosshair.style.left = (event.pageX-35) + "px";
    crosshair.style.top = (event.pageY-35) + "px";
}

function createZombie(){
    zombieID += 1;
    let zombie = document.createElement("div");
    let size = getRndInteger(2, 4.5)/2;
    let positionY = getRndInteger(55, 75);
    let currentPosition = -10;
    let bgPosition = 0;
    let speed = getRndInteger(1,5)*10;
    zombie.classList.add("zombie");
    zombie.setAttribute("id", zombieID);
    zombie.style.transform = "scale(" + size +")";
    zombie.style.right = currentPosition + "vw";
    zombie.style.top = positionY + "vh";
    zombie.addEventListener("click", killZombie);
    
    gameArea.appendChild(zombie);

    zombieList[zombieID] = setInterval(() => {
        if(lives <= 0){
            zombie.remove();
            clearInterval(zombieList[zombie.id]);
        }          
        (currentPosition < 100) ? currentPosition += 1 : zombiePass(zombie);
        bgPosition = (bgPosition+bgStep) % bgSize;
        zombie.style.right = currentPosition + "vw";
        zombie.style.backgroundPositionX = bgPosition + "px";
    }, speed);
}
// score handling
function killZombie(event){
    event.stopPropagation();
    currentScore += 12;
    updateScore();
    clearInterval(zombieList[this.id]);
    this.remove();

}

function miss(){
    currentScore -= 6;
    updateScore();
}

function zombiePass(zombie){
    currentScore -= 6;
    lives -= 1;
    updateScore();
    updateLives();
    clearInterval(zombieList[zombie.id]);
    zombie.remove();
    if(lives <= 0){
        endGame();
    }
}
// utilities
function comapreFunction(a, b){
    return b.points - a.points;
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function updateScore(){
    score.innerText = "score: " + currentScore;
}

function updateLives(){
    health.innerText = "lives: " + lives;
}

// game handlers
function startGame(){
    let nickname = document.getElementById("nickname").value;
    if(!regNick.test(nickname)) return;

    inGameNick.innerText = nickname;
    gameArea.style.cursor = "none";
    menu.style.transform = "translateY(-150vh)";
    crosshair.style.display = "block";
    lives = 3;
    updateLives();
    currentScore = 0;
    updateScore();
    zombieID = 0;
    window.addEventListener("mousemove", moveCrosshair);
    gameArea.addEventListener("click", miss);
    gameLoop = setInterval(() => {
        createZombie();
    }, getRndInteger(200, 800));
}

function endGame(){
    clearInterval(gameLoop);
    window.removeEventListener("mousemove", moveCrosshair);
    gameArea.removeEventListener("click", miss);
    updateHighscores();
    gameArea.style.cursor = "normal";
    menu.style.transform = "translateY(0)";
    crosshair.style.display = "none";
}

function run(){
    startButton.addEventListener("click", startGame);
}
// handle highscores
async function getHighscores(){
    let data = await fetch("https://jsonblob.com/api/jsonBlob/1043956437113651200");
    data =  await data.json();
    return data;
}
async function updateHighscores(){
    let bestPlays = await getHighscores();
    let date = new Date();
    let nickname = document.getElementById("nickname").value;
    document.getElementById("score-title").innerText = "Best scores: "
    myScore = {
        nickname:  nickname,
        points: currentScore.toString(),
        date: date.toDateString()
    };
    bestPlays.highscores.push(myScore);
    bestPlays.highscores.sort(comapreFunction);
    while(bestPlays.highscores.length > 7){
        bestPlays.highscores.pop();
    }
    for (let i = 0; i < bestPlays.highscores.length; i++) {
        scores[i].innerText = i+1 + ". score: " + bestPlays.highscores[i].points +
        ",  nick: " + bestPlays.highscores[i].nickname + 
        ",   date: " + bestPlays.highscores[i].date;      
    }
    let sendData = JSON.stringify(bestPlays); 
    const response = await fetch("https://jsonblob.com/api/jsonBlob/1043956437113651200", {
        method: 'PUT', 
        mode: 'cors', 
        cache: 'no-cache', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: sendData
      });
    await response.json();
}
// start game
run();