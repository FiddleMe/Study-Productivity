
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserSessionPersistence} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
  import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
  import { getFirestore, doc, setDoc, getDoc, collection, addDoc, updateDoc, deleteDoc,deleteField } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
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
  const db = getFirestore();
  
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      alert("hi" + uid);
      // ...
    } else {
      // User is signed out
      // ...
    }
});

function login(){
    
    var email = document.getElementById("loginName").value;
    console.log(email);
    var password = document.getElementById("loginPassword").value;
    // console.log(email)
    // console.log(password)
    if(email != "" && password != ""){
      
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("logged in");
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            window.alert("Message: " + errorMessage);
        });
    }
    else{
      window.alert("Please fill up all fields!")
    }
    
  }
  document.getElementById("login").addEventListener("click", login);

  //add new document to database
  async function addDocument(param){
    var ref = collection(db, "test");
    const docRef = await addDoc(
      ref, param 
      /*{
        testing: "Test"
      }*/
    )
    .then(()=>{
      alert("data added successfully")
    })
    .catch((error)=>{
      alert("Unsuccessfuly")
    })
  }

  //update user data
  async function addUser(userId, param){
    var ref = doc(db, "Users", userId);
    const docRef = await setDoc(
      ref, param 
      /*{
        testing: "Test"
      }*/
    )
    .then(()=>{
      alert("data added successfully")
    })
    .catch((error)=>{
      alert("Unsuccessfuly")
    })
  }

  //sign up function
  function signup(){
    var friends = [];
    var email = document.getElementById("signupName").value;
    var password = document.getElementById("signupPassword").value;
    var username = document.getElementById("username").value;
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      console.log("signed up")
      const user = userCredential.user;
      var paramaters = {
        Username: username,
        Friends: friends,
        TotalTime: 0,
        PastScores: {}
      }
      addUser(user.uid, paramaters);
        // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }
  function logout(event){
    event.preventDefault();
    auth.signOut().then(() => {
       console.log("user signed out")
    })
  }

  document.getElementById("signup").addEventListener("click", signup);
  document.getElementById("test").addEventListener("click", addDocument);
  document.getElementById("logout").addEventListener("click", logout);
  
