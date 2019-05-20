const signUpBtn = document.querySelector(".register-btn");
const fbBtn = document.querySelector(".fb");
const gglBtn = document.querySelector(".gggl");
const email = document.querySelector("#signUpEmail");
const password = document.querySelector("#signUpPassword");

window.onload = () => {
  typing();
  signUpBtn.addEventListener('click', () => {
    signUp();
  });
  ggglBtn.addEventListener('click', () => {
    signUpGoogle();
  });
  fbBtn.addEventListener('click', () => {
    signUpFacebook();
  });
}

function manage(email, password) {
  if (email.value !== '' && password.value !== '') {
    signUpBtn.disabled = false;
  } else {
    signUpBtn.disabled = true;
  }
}

function typing() {
  let inputs = [email,password];
  inputs.forEach(function (el) {
    el.addEventListener("keyup", function() {
      manage(email, password);
    });    
  });
}

function signUp(e) {
  e.preventDefault();
  createUser(email, password);
}

function createUser(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (response) {
      const userId = response.user.uid;
      createProfile(userId);
    })
    .catch(function (error) {
      handleErrors(error)
    });
}

function signUpGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  signInWithPopup(provider);
}


function signUpFacebook() {
  const provider = new firebase.auth.FacebookAuthProvider();
  signInWithPopup(provider);
}

function signInWithPopup(provider) {
  firebase.auth().signInWithPopup(provider).then(function(response) {
    const token = response.credential.accessToken;
    const userId = response.user;
    createProfile(userId);
  }).catch(function(error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = error.credential;
    alert(errorCode, errorMessage, email, credential);
  });
}

function handleErrors(error) {
  const errorMessage = error.message;
  alert(errorMessage);
}

function createProfile(userId) {
  window.location = `create-profile.html?id=${response.user.uid}`;
}