
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserSessionPersistence} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
  import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
  import { getFirestore, doc, arrayUnion, setDoc, getDoc, collection, addDoc, updateDoc, deleteDoc,deleteField } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
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
      console.log(uid)
      localStorage.setItem("uid",uid);
      document.getElementById("footer").style.display = "none";
      document.getElementById("logoutlist").style.display ="block"
      document.getElementById("homebtn").style.display ="block"
      document.getElementById("loginpage").style.display = ""
      document.getElementById("loginbutton").style.display = "none" 
      document.getElementById("addfriendbtn").style.display = ""
      document.getElementById("addsessionbtn").style.display = ""
      document.getElementById("addleaderboardbtn").style.display = ""
      document.getElementById("auth").style.display = ""
      document.getElementsByClassName("container")[0].style.display = "flex" 
      // var btn = document.getElementById("loginbutton");
      // btn.setAttribute("onClick", "");
      // btn.setAttribute("id","logout")
      // btn.innerText = "Logout"
      // console.log(btn)
      // 
      // document.querySelector("#loginpage").style.display = "none  ";
      
      // ...
    } else {
      // User is signed out
      // ...
      
      
      // var btn = document.getElementById("loginbutton");
      // btn.setAttribute("onClick", "displaygetStarted()");
      // btn.setAttribute("id","loginbutton")
      // btn.innerText = "Login"
      // console.log(btn)
      

      
    }
});

function login(){
    
    var email = document.getElementById("email").value;
    
    var password = document.getElementById("password").value;
    // console.log(email)
    // console.log(password)
    if(email != "" && password != ""){
      
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("logged in");
     
            
            Swal.fire({
              title: 'Logged in!',
              text: 'Welcome to LofiStudy!',
              color: '#fff',
              confirmButtonColor: '#228B22',
              icon: 'success',
           
          })
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Swal.fire({
              icon: 'error',
              confirmButtonColor: '#DC143C',
              title: 'Oops...',
              color: '#fff',
              text: 'Something went wrong. Error:' + errorMessage,
            })
        });
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        confirmButtonColor: '#DC143C',
        color: '#fff',
        text: 'Please fill up all fields',
      })
    }
    
  }
  document.getElementById("logout").addEventListener("click", logout);
  // console.log(document.getElementById("signupbtn"));
  document.getElementById("signupbtn").addEventListener("click", signup);
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

      return true
    })
    .catch((error)=>{
      return false

      
      console.log("data added successfully");
    })
    .catch((error)=>{

      console.log("data added unsuccessfully");

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

      return true
    })
    .catch((error)=>{
      return false

 
      console.log("data added successfully");
    })
    .catch((error)=>{

      console.log("data added unsuccessfully");

    })
  }

  async function addTotalUsers(param){
    var ref = doc(db, "TotalUsers", "Users");
    const updates = await updateDoc(ref, {
      users: arrayUnion(param)
    })
    .then(()=>{

      return true
    
    })
    .catch((error)=>{
      return false
    
    })
  }

  //sign up function
  function signup(){
    var friends = [];
    var email = document.getElementById("signupemail").value;
    var password = document.getElementById("signupPassword").value;
    var confirm = document.getElementById("confirm").value;
    var username = document.getElementById("username").value;
    console.log(email)
    console.log(password)
    console.log(confirm)
    console.log(username)
    if(confirm != password){

      Swal.fire({
        title: 'Error!',
        text: 'Passwords do not match. Please try again!',
        confirmButtonColor: '#DC143C',
        color: '#fff',
        icon: 'error',
     
    })
    }
    else if(email == "" || password == "" || confirm == "" || username == ""){
      Swal.fire({
        title: 'Error!',
        text: 'Please fill up all fields!',
        confirmButtonColor: '#DC143C',
        color: '#fff',
        icon: 'error',
     
      })
    }
    else{
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
     
        const user = userCredential.user;
        var paramaters = {
          Username: username,
          FriendRequests: friends,
          TotalTime: 0,
          PastScores: {},
          Extension: ""
        }
        var paramTotal = {
          [username]:user.uid
        }
        addUser(user.uid, paramaters);
          // ...
        addTotalUsers(paramTotal);
        
          Swal.fire({
            title: 'Sign up successful!',
            text: 'Welcome to LofiStudy!',
            color: '#fff',
            confirmButtonColor: '#228B22',
            icon: 'success',
            
        })
        document.getElementById("signuppage").style.display = "none"
        
    
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        var errormsg = "Error: " + errorMessage
        Swal.fire({
          title: 'Oops something went wrong!',
          text: errormsg,
          confirmButtonColor: '#DC143C',
          color: '#fff',
          icon: 'error',
       
      })
      
        // ..
      });
    }
  }
  function logout(event){
    event.preventDefault();
    auth.signOut().then(() => {
       console.log("user signed out")
       document.getElementById("footer").style.display = "block";
       document.getElementById("logoutlist").style.display ="none"
       document.getElementsByClassName("session")[0].style.display = "none"
       document.getElementsByClassName("container")[0].style.display = "none" 
       document.getElementById("loginbutton").style.display = ""
       document.getElementById("addfriendbtn").style.display = "none"
        document.getElementById("addsessionbtn").style.display = "none"
        document.getElementById("addleaderboardbtn").style.display = "none"
        document.getElementById("auth").style.display = "none"
    })
  }
 

  
