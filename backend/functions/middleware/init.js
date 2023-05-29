const { initializeApp } = require('firebase/app');
const firebaseConfig = {
    apiKey: "AIzaSyDDXrKq_hXaNrVt_UkrMT-vCUV_lwfHWwQ",
    authDomain: "chat-3d05a.firebaseapp.com",
    projectId: "chat-3d05a",
    storageBucket: "chat-3d05a.appspot.com",
    messagingSenderId: "107900260953",
    appId: "1:107900260953:web:de4fe982496f6392f91748",
    measurementId: "G-B667GCCCHF",
    databaseURL: "https://chat-3d05a-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);

module.exports = {app};