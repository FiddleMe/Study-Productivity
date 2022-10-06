
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  
  const firebaseConfig = {
    apiKey: "AIzaSyAgq38ay3TXdY5Ily5pobcCAXxGNe7A-wQ",
    authDomain: "wad-project-f3ec0.firebaseapp.com",
    projectId: "wad-project-f3ec0",
    storageBucket: "wad-project-f3ec0.appspot.com",
    messagingSenderId: "220264558494",
    appId: "1:220264558494:web:475684e268fa655215308f",
    measurementId: "G-1H6J376K8X"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();
  
  function login(){
    var email = document.getElementById("loginName").value;
    var password = document.getElementById("loginPassword").value;
    // console.log(email)
    // console.log(password)
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("logged in")
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
  }

  function signup(){
    var email = document.getElementById("signupName").value;
    var password = document.getElementById("signupPassword").value;
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      console.log("signed up")
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }
  