const loginBtn = document.querySelector(".login-btn");
const emailElement = document.querySelector("#signInEmail");
const passwordElement = document.querySelector("#signInPassword");

window.onload = () => {
    typing();
    loginBtn.addEventListener('click', signInEmail);
}

function manage(email, password) {
    if (email.value !== '' && password.value !== '') {
        loginBtn.disabled = false;
    } else {
        loginBtn.disabled = true;
    }
}

function typing() {
    let inputs = [emailElement, passwordElement];
    inputs.forEach(function(el) {
        el.addEventListener("keyup", function() {
            manage(emailElement, passwordElement);
        });
    });
}

function signInEmail(e) {
    e.preventDefault();
    const email = emailElement.value;
    const password = passwordElement.value;

    firebase.auth().signInWithEmailAndPassword(email, password).then(function(response) {
        window.location = `feed.html?id=${response.user.uid}`;
    }).catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage)
    });
}