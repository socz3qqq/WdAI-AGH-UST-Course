const addItem = document.getElementById("add");
const delItem = document.getElementById("delete");
const myList = document.getElementById("myList");
const count = document.getElementById("count");

addItem.addEventListener('click', add, false);
delItem.addEventListener('click', del, false);

function add(){
    let li = document.createElement('li');
    li.innerHTML = "Item" + (myList.childElementCount + 1);
    myList.appendChild(li)
}
function del(){
    if(myList.childElementCount > 0){
        console.log(myList.childNodes)
        myList.removeChild(myList.childNodes[0]);
    }
}
let liItem = document.querySelector('li');
liItem.addEventListener('click', showCount, false);

function showCount(){
    count.innerText = "Aktualny element: ";
}