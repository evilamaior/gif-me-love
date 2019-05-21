const gifBase = document.querySelector('.gifBase');
const dataBase = firebase.database();
let index = 0;

function getGifOnApi() {
  fetch('https://api.giphy.com/v1/gifs/trending?&api_key=xLzlu38r5osxj1ou6IA0hxMvrFVg3kad')
    .then(response => response.json())
    .then(response => printNTela(response.data))
}

function printNTela(data) {
  const url = data[index].images.original_still.url;
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
    getGifOnApi()
  }
  else {
    getGifOnApi()
  }
})

function sendGifsToFirebase(url) {
  dataBase.ref("favoriteGifs/").push({
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