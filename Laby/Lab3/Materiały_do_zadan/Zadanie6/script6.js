const list = document.getElementById("entry-list");
let listElements = document.querySelectorAll(".remove-button");
let regPhone = /^[+]\d{3}[1-9][0-9]{8}$|^\d{3}[1-9][0-9]{8}$|^[1-9][0-9]{8}/
const regName = /^[A-Z][a-z]+ [A-Z][a-z]+$|^[A-Z][a-z]+ [A-Z][a-z]+[-][A-Z][a-z]+$/
document.getElementById("add-button").addEventListener("click", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let tel = document.getElementById("tel").value;
    tel = tel.split(" ").join("");
    tel = tel.split("-").join("");

    if (name === "" || tel === "") {
        alert("Wszystkie pola są wymagane");
        return;
    }

    if (!regName.test(name)) {
        alert("Podano błędne imię i/lub nazwisko.");
        return;
    }
  
    if (!regPhone.test(tel)) {
        alert("Podano błędny numer telefonu.");
        return;
    }
    console.log(tel.length)
    tel = beutifyNumber(tel);

    let listEntry = document.createElement("li");    
    listEntry.innerHTML =
        `<div class="entry-content"> \n
        <span class="name"> ${name} </span> \n
        <br> \n
        <span class="tel"> ${tel} </span> \n
        </div><button class="remove-button"><i class="fa-regular fa-trash-can"></i></button>`;

    list.appendChild(listEntry);
    listEntry.querySelector(".remove-button").addEventListener("click", remove);

    document.getElementById("name").value = "";
    document.getElementById("tel").value = "";
});

function beutifyNumber(num){
    if (num.length == 9){
        return num.slice(0, 3) + " " + num.slice(3, 6) + " " + num.slice(6, 9);
    }
    else if (num.length == 13){
        return num[0] + num.slice(1, 4) + " " + num.slice(4, 7) + " " + num.slice(7, 10) + " " + num.slice(10, 13);
    }
    else if(num.length == 12){
        return num.slice(0, 3) + " " + num.slice(3, 6) + " " + num.slice(6, 9) + " " + num.slice(9, 12);
    }
    else return num;
}

function remove(event) {
    this.closest("li").remove();
}

listElements.forEach(item => {
    item.addEventListener("click", remove);
});