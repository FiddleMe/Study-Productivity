import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserSessionPersistence} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
import { getFirestore, doc, setDoc, getDoc, onSnapshot, addDoc, updateDoc, arrayUnion,deleteField } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
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
const auth = getAuth();
const db = getFirestore();

//getfrienduser from uid
document.getElementById("send").addEventListener("click",sendFriendRequest);


//send friend request: call friend username input field id = frienduser 
function sendFriendRequest(){
  var getFriendUsername = document.getElementById("frienduser").value;
  const docRef = doc(db, "TotalUsers", "Users");
  const docSnap =  getDoc(docRef).then((docSnap)=>{
    if (docSnap.exists()) {
      var friendUID = ""
      let friendarr = docSnap.data();
      const friends = friendarr.users;
      console.log(friends);
      for (var valu of friends){
        for (const [key, value] of Object.entries(valu)) {           
          if(`${key}` == getFriendUsername){
              friendUID = `${value}`;
          }
      }
      }

      if(friendUID==null){
        alert("Invalid username");
        return;
      }
      console.log(friendUID);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(uid);
          var param = {
            [uid]:false
          }
          
          console.log(friendUID)
          updateData(friendUID,param);
          // ...

        } 
        //onauthstatechange else
        else {
          // User is signed out
          // ...
          }
      });
      
    } 
    //if docsnap else 
    else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  })   
}
async function updateData(useruid, param){
  var ref = doc(db, "Users",useruid);
  const updates = await updateDoc(ref, {
    FriendRequests: arrayUnion(param)
  })
  .then(()=>{
    alert("friend request sent!")
  })
  .catch((error)=>{
    alert("Unsuccessfuly")
  })
}
document.getElementById("logout").addEventListener("click", logout)
function logout(event){
  event.preventDefault();
  auth.signOut().then(() => {
      console.log("user signed out")
      window.location.replace("./login.html");
  })
}

//display friend requests
