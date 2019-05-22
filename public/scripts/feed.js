const gifBase = document.querySelector('.gifBase');
const dataBase = firebase.database();
const USER_ID = window.location.search.match(/\?id=(.*)/)[1];
let index = 0;

function getGifOnApi() {
  fetch('https://api.giphy.com/v1/gifs/trending?&api_key=xLzlu38r5osxj1ou6IA0hxMvrFVg3kad')
    .then(response => response.json())
    .then(response => printTela(response.data))
}

function printTela(data) {
  const url = data[index].images.downsized_large.url;
  gifBase.innerHTML = template(url);
  index++;
}

function template(url) {
  return `<img
      class="image-gif"
      src="${url}"
    />`
}

const hammer = new Hammer(gifBase);
hammer.on('swipe', function (event) {
  
  if (event.deltaX > 0) {
    sendGifsToFirebase(event.target.src);
    incrementIndex();
    getGifOnApi();
  }
  else {
    getGifOnApi();
  }
})

function modal() {
  $("#demo01").animatedModal();
  $(".modal-content").addClass("show");
  $('#demo01').click();
}

let gifCounter = 0;
function incrementIndex() {
  // pensar em um loop pra manter isso aqui seguindo com numeros aleatorios no segundo?
  gifCounter ++;
  if (gifCounter >= 5){
    modal();
    gifCounter = 0;
  }
}


function sendGifsToFirebase(url) {
  dataBase.ref(`${USER_ID}/favoriteGifs/`).push({
    url
  })
    .then(function () {
      console.log("Document successfully written!");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
}


getGifOnApi();