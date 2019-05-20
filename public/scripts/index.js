const gifBase = document.querySelector('.gifBase');
const dataBase = firebase.database();
const index = 0;

function getGifOnApi() {
    requestAPI.random
        .then(response => response.json())
        .then(response => gifsOnScreenAndDatabase(response.data));
}

function gifsOnScreenAndDatabase(data) {
    gifBase.innerHTML = gifOptions.image(data[index])
    index++;

    const image = document.querySelector('.image-gif')
    image.addEventListener('click', event => {
        dataBase.ref("favoriteGifs/").push({
            id: data.id,
            url: data.images.fixed_width_small.url,
        })
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    })
}