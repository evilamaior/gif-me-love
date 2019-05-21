const loginBtn = document.querySelector(".login-btn");
const ggglSignIn = document.querySelector("#signInBtnGggl");
const fbSignIn = document.querySelector("#signInBtnFb");
const emailElement = document.querySelector("#signInEmail");
const passwordElement = document.querySelector("#signInPassword");

window.onload = () => {
  typing();
  loginBtn.addEventListener('click', signInEmail);
  ggglSignIn.addEventListener('click', signInGoogle);
  fbSignIn.addEventListener('click', signInFacebook);
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
  inputs.forEach(function (el) {
    el.addEventListener("keyup", function () {
      manage(emailElement, passwordElement);
    });
  });
}

function signInEmail(e) {
  e.preventDefault();
  const email = emailElement.value;
  const password = passwordElement.value;

  firebase.auth().signInWithEmailAndPassword(email, password).then(function (response) {
    window.location = `feed.html?id=${response.user.uid}`;
  }).catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode, errorMessage)
    });
};

function signInGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopUp(provider)
    .then(function (response) {
      if (response.additionalUserInfo.isNewUser) {
        window.location = `create-profile.html?id=${response.user.uid}`;
      } else {
        window.location = `feed.html?id=${response.user.uid}`;
      }
    })
    .catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;

      alert(errorCode, errorMessage, email, credential);
    });
}

function signInFacebook() {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(function (response) {
      if (response.additionalUserInfo.isNewUser) {
        window.location = `create-profile.html?id=${response.user.uid}`;
      } else {
        window.location = `feed.html?id=${response.user.uid}`;
      }
    })
    .catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;

      alert(errorCode, errorMessage, email, credential);
    });
}