const database = firebase.database();
const signUpBtn = document.querySelector(".register-btn");
const emailInput = document.querySelector("#signUpEmail");
const passwordInput = document.querySelector("#signUpPassword");


window.onload = () => {
    typing();
    signUpBtn.addEventListener('click', signUp);
}

function manage(email, password) {
    if (email.value !== '' && password.value !== '') {
        signUpBtn.disabled = false;
    } else {
        signUpBtn.disabled = true;
    }
}

function typing() {
    let inputs = [emailInput, passwordInput];
    inputs.forEach(function(el) {
        el.addEventListener("keyup", function() {
            manage(emailInput, passwordInput);
        });
    });
}

function signUp(e) {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    createUser(email, password);
}

function createUser(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(response) {
            const userId = response.user.uid;
            database.ref('users/' + userId).set({
                email: email
            });
            createProfile(userId);
        })
        .catch(function(error) {
            handleErrors(error)
        });
}

function handleErrors(error) {
    const errorMessage = error.message;
    alert(errorMessage);
}

function createProfile(userId) {
    window.location = `create-profile.html?id=${userId}`;
}