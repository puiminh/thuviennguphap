function removeAccents(str) {
  return str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

const charactersList = document.querySelector('.cards');
const searchBar = document.getElementById('sidesearchBar');
let cardNP = document.querySelectorAll('.card');
let levelPicker = [];
let hpCharacters = [];
let searchString = "";
let something;


function checkLevel(data) {
  var length = levelPicker.length;
  if (length == 0) return true;
  for (var i = 0; i < length; i++) {
    if (data.includes(levelPicker[i])) return true;
  }
  return false;
}

function seachN(searchString) {
  const filteredCharacters = hpCharacters.filter((character) => {
    return (
      (removeAccents(character.ten.toLowerCase()).includes(removeAccents(searchString)) ||
        removeAccents(character.nghia.toLowerCase()).includes(removeAccents(searchString)) ||
        removeAccents(character.cachdung.toLowerCase()).includes(removeAccents(searchString))) &&
      checkLevel(removeAccents(character.trinhdo.toLowerCase()))
    );
  });

  // Đưa ra mảng này
  displayCharacters(filteredCharacters);
  console.log(filteredCharacters);
}

// searchBar searching event
searchBar.addEventListener('keyup', (e) => {
  if (e.key=='Enter'){
  searchString = e.target.value.toLowerCase();
  console.log(searchString);
  console.log(e);
  // Duyệt và đưa ra mảng obj mới có chứa searchString
  
    seachN(searchString)
  
  console.log(e);
  document.querySelector(".sidebar").classList.remove("open");
  }
});



const loadCharacters = () => {
  webData = webData.replaceAll("\n");
  webData = webData.replaceAll("\r");
  webData = webData.replaceAll("undefinedundefined", "<br>");
  hpCharacters = JSON.parse(webData);
    
  displayCharacters(hpCharacters);

};

const displayCharacters = (characters) => {
  //Tạo biến htmlString để chứa các thẻ tạo ra từ mảng obj truyền vào (characters)
  const htmlString = characters.map((character) => {
      return `
            <div class="card ${'n'+character.id}">
        <div class="card-content">
          <div class="card-top ${character.trinhdo.toLowerCase()}-level">
            <div class="card-title-box">
              <h3 class="card-title">${character.ten}</h3>
            </div>
            <div class="card-language">
              <img
                src="img/${character.trinhdo.toLowerCase()}.jpg"
                alt=""
                class="card-language-avatar"
              />
              <div class="card-language-info">
                <div class="card-language-top">
                  <ion-icon name="language-outline"></ion-icon>
                  <h4 class="card-language-name">${character.nghia}
                </div>
                <div class="card-language-game">
                  <ion-icon name="chatbubbles-outline"></ion-icon>
                  <span>Dùng trong văn ${character.dungodau}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card-bottom">
            <div class="card-use ${character.trinhdo.toLowerCase()}-box">
              <span>Cách dùng</span>
            </div>
            <div class="card-content">${character.cachdung}.</div>
          </div>
          <div class="card-bottom">
            <div class="card-use ${character.trinhdo.toLowerCase()}-box">
              <span>Ví dụ</span>
            </div>
            <div class="card-content">
              <span class="example-1">${character.vidu1}</span>
              ${character.nghiavd1}
              </div>
          </div>
        </div>
      </div>
        `;
    })
    .join('');
  charactersList.innerHTML = htmlString;
  cardNP = document.querySelectorAll('.card');
  for (var i = 0; i < cardNP.length; i++) {
    cardNP[i].addEventListener("click", function (e) {
      var cardSelect = this.classList[1].match(/\d/g).join("");

      console.log(cardSelect);
      this.classList.toggle("card-big");
      var cardNotSelect = document.querySelectorAll(`.card:not(.${this.classList[1]})`);
      for (var i=0; i<cardNotSelect.length; i++){
        cardNotSelect[i].classList.toggle("card-hidden");
      }
      
      this.innerHTML =
        `<div class="card-content">
      <div class="card-top ${hpCharacters[cardSelect-1].trinhdo.toLowerCase()}-level">
        <div class="card-title-box">
          <h3 class="card-title">${hpCharacters[cardSelect-1].ten}</h3>
        </div>
        <div class="card-language">
          <img
            src="img/${hpCharacters[cardSelect-1].trinhdo.toLowerCase()}.jpg"
            alt=""
            class="card-language-avatar"
          />
          <div class="card-language-info">
            <div class="card-language-top">
              <ion-icon name="language-outline"></ion-icon>
              <h4 class="card-language-name">${hpCharacters[cardSelect-1].nghia}
            </div>
            <div class="card-language-game">
              <ion-icon name="chatbubbles-outline"></ion-icon>
              <span>Dùng trong văn ${hpCharacters[cardSelect-1].dungodau}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="card-bottom">
        <div class="card-use ${hpCharacters[cardSelect-1].trinhdo.toLowerCase()}-box">
          <span>Cách dùng</span>
        </div>
        <div class="card-content">${hpCharacters[cardSelect-1].cachdung}.</div>
      </div>
      <div class="card-bottom">
        <div class="card-use ${hpCharacters[cardSelect-1].trinhdo.toLowerCase()}-box">
          <span>Cấu trúc</span>
        </div>
        <div class="card-content">${hpCharacters[cardSelect-1].cautruc}.</div>
      </div>
      <div class="card-bottom">
        <div class="card-use ${hpCharacters[cardSelect-1].trinhdo.toLowerCase()}-box">
          <span>Ví dụ 1</span>
        </div>
        <div class="card-content">
          <span class="example-1">${hpCharacters[cardSelect-1].vidu1}</span>
          ${hpCharacters[cardSelect-1].nghiavd1}
          </div>
      </div>
      <div class="card-bottom">
        <div class="card-use ${hpCharacters[cardSelect-1].trinhdo.toLowerCase()}-box">
          <span>Ví dụ 2</span>
        </div>
        <div class="card-content">
          <span class="example-1">${hpCharacters[cardSelect-1].vidu2}</span>
          ${hpCharacters[cardSelect-1].nghiavd2}
          </div>
      </div>
    </div>`


    });
  }
};

loadCharacters();
for (var i = 0; i <= 4; i++) {
  document.querySelectorAll(".checkBox")[i].addEventListener("click", function (e) {
    console.log(this.name);
    if (this.checked == true) {
      levelPicker.push(this.name);
      seachN(searchString);
    }
    if (this.checked == false) {
      levelPicker = levelPicker.filter(item => item !== this.name);
      seachN(searchString);
    }
  });
}
// cardNP = document.querySelectorAll('.card'); 
// for (var i = 0; i <= cardNP.length; i++) {
//   cardNP[i].addEventListener("click", function(e) {
//     console.log(this);
//     this.classList.add();
// });
// }