const gifBase = document.querySelector('.gifBase');
const dataBase = firebase.firestore();

window.onload = () => {
    requestAPI.random
        .then(response => response.json())
        .then(response => {
            const { data } = response;
            gifBase.innerHTML = gifOptions.image(data)

            const image = document.querySelector('.image-gif')
            image.addEventListener('click', event => {
                dataBase.collection("favorite").add({
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