import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserSessionPersistence} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
import { getFirestore, doc, setDoc, getDoc, onSnapshot, documentId, addDoc, updateDoc, arrayRemove, arrayUnion,deleteField, query, collection, where} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
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
        friendsreq: [],
        interfriend: [],
        names: [],
        friendlist: [],
        currentuser: ""
      }
    },
    methods: {
        logout(){
            auth.signOut().then(() => {
                console.log("user signed out")
                window.location.replace("./login.html");
            })
        },
        displayFriends(){
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                  // User is signed in, see docs for a list of available properties
                  // https://firebase.google.com/docs/reference/js/firebase.User
                  const uid = user.uid;
                  var resultArr = Array();
                  var ref = doc(db, "Users",uid);   
                  const docSnap = await getDoc(ref);
                  if (docSnap.exists()) {
                    var username = docSnap.data().Username;
                    this.currentuser = username;
                    let interFriend = Array()
                    var friends = docSnap.data().FriendRequests                    ;
                    for(const [key, value] of Object.entries(friends)){               
                        for(const [friend, bool] of Object.entries(value)){
                            if(bool == true){
                                interFriend.push(friend);
                            }
                        }
                    }
                    const docref = doc(db, "TotalUsers", "Users");
                    const docSnap2 = await getDoc(docref);
                    if(docSnap2.exists()){
                        var nArr = [];
                        let userArr = docSnap2.data().users;
                        for(var elem of interFriend){
                            for (var vals of userArr) {
                                for(var[k,v] of Object.entries(vals)){
                                    if(v == elem){      
                                        nArr.push({"name": k, "profilepic": "images/profile pictures/pp" + Math.round((Math.random() * 5 + 1)) + ".jpg"});
                                    }
                                }
                            }
                        }
                        this.friendlist = nArr
                    }

                    //
                  } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                  }
                  

                  // ...
                } else {
                  // User is signed out
                  // ...
                }
              });
        }, 
        sendFriendRequest(){
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
                    if(`${key}` == getFriendUsername && `${key}` != this.currentuser){
                        friendUID = `${value}`;
                    }
                }
                }
                if(friendUID=="" ){
                alert("Invalid username");
                return;
                }
                console.log(friendUID);
                onAuthStateChanged(auth, async(user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                    const uid = user.uid;
                    console.log(uid);
                    var param = {
                    [uid]:false
                    }
                    console.log(friendUID)
                    var ref = doc(db, "Users",friendUID);
                    await updateDoc(ref, {
                    FriendRequests: arrayUnion(param)
                    }).then(()=>{
                    alert("friend request sent!")
                
                    })
                    .catch((error)=>{
                    alert("Unsuccessfuly")
                    })
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
            
             
        },
        async getUserFromUID(result){  
            const docRef = doc(db, "TotalUsers", "Users");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                var namesArr = [];
                var userArr = docSnap.data().users;
                for(var elem of result){
                    for (var vals of userArr) {
                        for(const[key, value] of Object.entries(vals)){
                            if(`${value}` == elem){      
                                let id = `${value}`
                                let inter = {
                                    [key]: id
                                }
                                namesArr.push(inter);
                            }
                        }
                    }
                }
              
                this.names = namesArr;
           
                let interArr = [];
                for(const[key,value] of Object.entries(namesArr)){
                    for(const[x,y] of Object.entries(value)){
                        interArr.push({"name": x, "profilepic": "images/profile pictures/pp" + Math.round((Math.random() * 5 + 1)) + ".jpg"})
                    }    
                }
                this.friendsreq = interArr;
                
            } 
            else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            }
        },
        async editdoc(docRef, friend,param){
            await updateDoc(docRef, {
                [friend]: param
            });
        },
        accept(name,index){
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                  // User is signed in, see docs for a list of available properties
                  // https://firebase.google.com/docs/reference/js/firebase.User
                  const uid = user.uid;
                  // ...
                
                  let friendname = this.names[index];
                  let frienduid = friendname[name];
                  let parameters = {[frienduid]: false};
                  let param2 = {[frienduid]: true};
                  let dref = doc(db,"Users", uid);
                  await updateDoc(dref,{
                    FriendRequests: arrayRemove(parameters),
                  }).then(async ()=>{
                    // alert("Done");
                    await updateDoc(dref,{
                        FriendRequests: arrayUnion(param2)
                    }).then(async ()=>{
                        // alert("done2")
                        console.log("FriendRequests retrieved");
                        let addtofriendparam ={[uid]: true}
                        let dref2 = doc(db,"Users",frienduid);
                        await updateDoc(dref2,{
                            FriendRequests: arrayUnion(addtofriendparam)
                        })
                        alert(`Added ${name} as friend!`)
                        this.displayFriends();
                    })
                  })
                } else {
                  // User is signed out
                  // ...
                }
              });
        },
        reject(name,index){
            onAuthStateChanged(auth, async(user)=>{
                if(user){
                    const uid = user.uid;
                    let friendname = this.names[index];
                    let frienduid = friendname[name];
                    let parameters = {[frienduid]: false};
                    let dref = doc(db,"Users", uid);
                    await updateDoc(dref,{
                        FriendRequests: arrayRemove(parameters),
                    })
                }
                else{

                }

            });
        }
    },
        
    created() { 
        this.displayFriends();
        var friends = []
        var result = []
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                const q = query(collection(db, "Users"), where(documentId(), "==", uid));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    querySnapshot.docChanges().forEach((change) => {
                        if(change.type === "added"){
                           
                            friends.push(change.doc.data().FriendRequests);
                          
                            for(const v of friends){
                                for(const a of v){
                                    for (const [key, value] of Object.entries(a)) {
                                        if(`${value}` == "false"){
                                            result.push(`${key}`)               
                                        }
                                    }
                                }
                            }   
                        }
                        this.getUserFromUID(result);
                        result = [];
                        // for(const[key,value] of Object.entries(inter)){
                        //     this.friendsreq.push(`${key}`)
                        // }   
                    }); 
                });
              // ...
            }
        });
    }
});
const vm = vueapp.mount("#displayfriends");


