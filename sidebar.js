let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
let home = document.querySelector(".home-section");
const n5cb = document.getElementById('n5Checkbox');
const n4cb = document.getElementById('n4Checkbox');
const n3cb = document.getElementById('n3Checkbox');
const n2cb = document.getElementById('n2Checkbox');
const n1cb = document.getElementById('n1Checkbox');

closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function(optional)
});

searchBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});

home.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
  sidebar.classList.remove("open");
  menuBtnChange(); //calling the function(optional)
});


// following are the code to change sidebar button(optional)
function menuBtnChange() {
 if(sidebar.classList.contains("open")){
   closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
 }else {
   closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
 }
}

// document.getElementById("n5Checkbox").checked = true;
