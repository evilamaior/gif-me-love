const gifBase = document.querySelector('.gifBase');
const dataBase = firebase.database();
// let index = 0;

function getGifOnApi() {
    requestAPI.random
        .then(response => response.json())
        .then(response => {
            const { data } = response;
            gifBase.innerHTML = gifOptions.image(data)
            // index++;

            const image = document.querySelector('.image-gif')
            image.addEventListener('swipe', event => {
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
        })
}

const hammer = new Hammer(gifBase);
hammer.on('swipe', function (ev) {
    getGifOnApi();
})

getGifOnApi();