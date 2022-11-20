const addButton = document.getElementById("add");
const delButton = document.getElementById("delete");
const myList = document.getElementById("myList");
const count = document.getElementById("count");
let listElements = document.querySelectorAll("ul li")

addButton.addEventListener('click', addElementToList, false);
delButton.addEventListener('click', delElementFromList, false);

function addElementToList(){
    let li = document.createElement('li');
    li.appendChild(document.createTextNode("Item" + (myList.childElementCount + 1)));
    li.addEventListener("click", showCount);
    myList.appendChild(li);
    console.log(myList.childElementCount);
}
function delElementFromList(){
    if(myList.childElementCount > 0){
        myList.removeChild(myList.children[0]);
    }
}
function showCount(li){
    count.innerText = "Aktualny element: " ;
}
