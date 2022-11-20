const startButton = document.getElementById("startCounter");
const stopButton = document.getElementById("stopCounter");
const incrementButton = document.getElementById("test");
const counter = document.querySelector("h1");
let count = 0;

startButton.addEventListener("click", turnOn);
stopButton.addEventListener("click", turnOff);

function turnOn(){
    incrementButton.addEventListener("click", increment);
}
function turnOff(){
    incrementButton.removeEventListener("click", increment);
    count = 0;
}
function increment(){
    count += 1;
    counter.innerText = `COUNTER: ${count}`;
}