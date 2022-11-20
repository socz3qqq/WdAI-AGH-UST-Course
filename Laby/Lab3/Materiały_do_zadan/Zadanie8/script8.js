const password = document.getElementById("password");
const passwdConfirm = document.getElementById("password-confirm")
const minChars = document.getElementById("characters");
const specialChars = document.getElementById("special-characters");
const capitalLetter = document.getElementById("capital-letter");
const digit = document.getElementById("digit");
const regSpecialCharacter = /[^\w\s]/;
// const regSpecialCharacter = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const eye1 = document.getElementById("eye1");
const eye2 = document.getElementById("eye2");
const regCapital = /[A-Z]/;
const regDigit = /[0-9]/;

eye1.addEventListener("click", togglePasswordVisibility);
eye2.addEventListener("click", toggleConfirmVisibility);


password.addEventListener("input", checkPassword);
passwdConfirm.addEventListener("keypress", function(event){
    if(event.key == "Enter") passwordsEqual();
})


function checkPassword(){
    let passwd = password.value;
    if(passwd.length >= 8) minChars.classList = "fa-solid fa-circle-check";
    else minChars.classList = "fa-sharp fa-solid fa-circle-xmark";

    if(regSpecialCharacter.test(passwd)) 
        specialChars.classList = "fa-solid fa-circle-check";
    else specialChars.classList = "fa-sharp fa-solid fa-circle-xmark";

    if(regCapital.test(passwd)) 
        capitalLetter.classList = "fa-solid fa-circle-check";
    else capitalLetter.classList = "fa-sharp fa-solid fa-circle-xmark";

    if(regDigit.test(passwd)) 
        digit.classList = "fa-solid fa-circle-check";
    else digit.classList = "fa-sharp fa-solid fa-circle-xmark";
};

function passwordsEqual(){
    let secondPassword = document.getElementById("password-confirm").value;
    let passwd = document.getElementById("password").value;
    if(passwd != secondPassword){
        alert("Hasła nie są zgodne!");
    }
    else{
        alert("Poprawnie ustawiono hasło :D")
    }
}

function togglePasswordVisibility(){
    if (password.type == "text") {
        password.type = "password";
        eye1.classList = "fa-regular fa-eye"
    }
    else {
        password.type = "text";
        eye1.classList = "fa-regular fa-eye-slash";
    }
}

function toggleConfirmVisibility(){
    if (passwdConfirm.type == "text") {
        passwdConfirm.type = "password";
        eye2.classList = "fa-regular fa-eye"
    }
    else {
        passwdConfirm.type = "text";
        eye2.classList = "fa-regular fa-eye-slash";
    }
}