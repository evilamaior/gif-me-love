const firebaseConfig = {
    apiKey: "AIzaSyAZ_wqERdRltJzNKVlYaf-ZmNs4QvZO2UQ",
    authDomain: "gif-me-love-lab.firebaseapp.com",
    databaseURL: "https://gif-me-love-lab.firebaseio.com",
    projectId: "gif-me-love-lab",
    storageBucket: "gif-me-love-lab.appspot.com",
    messagingSenderId: "935826399926",
    appId: "1:935826399926:web:44089d17ca90c610"
};

const admin = require("firebase-admin");

const serviceAccount = require("gif-me-love-lab-firebase-adminsdk-0ltmi-da3f14fe15.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gif-me-love-lab.firebaseio.com"
});