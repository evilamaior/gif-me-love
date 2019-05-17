const gifBase = document.querySelector('.gifBase');

window.onload = () => {
    requestAPI.random
    .then(response => response.json())
    .then(response => {
        const { data } = response;
        gifBase.innerHTML = gifOptions.image(data)
    })
}