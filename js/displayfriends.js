import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserSessionPersistence} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
import { getFirestore, doc, setDoc, getDoc, onSnapshot, documentId, addDoc, updateDoc, arrayUnion,deleteField, query, collection, where} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
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


const vueapp = Vue.createApp({
    data() {
      return {
        friendsreq: []
      }
    },
    methods: {
        async getUserFromUID(result){
   
            const docRef = doc(db, "TotalUsers", "Users");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                var namesArr = [];
                var userArr = docSnap.data().users;
                for(var elem of result){
        
                    for (const [key, value] of Object.entries(userArr)) {
                       
                        if(`${value}` == elem){
                            namesArr.push(`${key}`);
                        }
                    }
                }

                return this.friendsreq = namesArr;
            } 
            else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            }

        }
    },


    created() { 
        var result = Array();
        onAuthStateChanged(auth, (user) => {
         
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
            
                const q = query(collection(db, "Users"), where(documentId(), "==", uid));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const friendsrequests = [];
                    querySnapshot.forEach((doc) => {
                        friendsrequests.push(doc.data().FriendRequests);
                        
                    }); 
                    
                    for(const v of friendsrequests){
                        for(const a of v){
                     
                            for (const [key, value] of Object.entries(a)) {
                                if(`${value}` == "false"){
                                  
                                    result.push(`${key}`)
                                   
                                }
                            }
                        }
                    }
           
                    this.getUserFromUID(result);
                   
          
                });
              // ...
        
            }
            
        });
          
    }
      
});
  const vm = vueapp.mount("#displayfriends");

  /*
created() { 
        var result = Array();
        onAuthStateChanged(auth, (user) => {
            console.log(result)
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log(uid)
                const q = query(collection(db, "Users"), where(documentId(), "==", uid));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const friendsrequests = [];
                    querySnapshot.forEach((doc) => {
                        friendsrequests.push(doc.data().FriendRequests);
                        
                    }); 
                    
                    for(const v of friendsrequests){
                        for(const a of v){
                           console.log(a)
                            for (const [key, value] of Object.entries(a)) {
                                if(`${value}` == "false"){
                                    console.log(`${key}`)
                                    result.push(`${key}`)
                                   
                                }
                            }
                        }
                    }
                    console.log(result)
                    this.friendsreq = result[0];
          
                });
              // ...
        
            }
            
        });
          
    }
  */