// input time(hrs, mins) specified by user
//updates element with id="timer" with a countdown timer
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
var x;
document.getElementById("session").addEventListener("click",session)
document.getElementById("save").addEventListener("click",displayTime)
document.getElementById("editsession").addEventListener("click",startSession)
async function startSession(){

        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
  const uid = localStorage.getItem("uid");
  var ref = doc(db, "Users",uid);   
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    console.log(docSnap.data())
    var extensionId = docSnap.data().Extension;
    if (extensionId != ""){
      console.log(extensionId)
      chrome.runtime.sendMessage(extensionId, 'showOptions');
    } 
    else{
      location.replace("install.html")
    }
    
    
    
    //
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
              

   
  }
function session(){
    document.getElementsByClassName("session")[0].style.display = "block";
    document.getElementById("timerNav").style.display = "none"
}
function displayTime(){
    // document.getElementsByClassName("session")[0].style.display = "none";
    display_countdown_timer(document.getElementById('hours').value, document.getElementById('minutes').value)
}

// function endTime(){
//     clearInterval(x);
//     isDone = true
//     document.getElementById("timer").innerHTML = "Start Again?";
//     document.getElementById("progressBar").innerHTML = ''
//     document.getElementById('input1').style.display = 'block'
//     document.getElementById('input2').style.display = 'block'
// }
// function endTime(){
//     clearInterval(x);
//     document.getElementById("timer").innerHTML = "Start Again?";
//     document.getElementById('save').style.display = ''
//     document.getElementById('end').style.display = 'none'
//     document.getElementById('bar').style.display = 'none'
    // document.getElementById("progressBar").innerHTML = 'none'
    // document.getElementById('input1').style.display = ''
    // document.getElementById('input2').style.display = ''
    // isDone = true
    // document.getElementById("timer").innerHTML = "Start Again?";
    // document.getElementById("progressBar").innerHTML = ''
    // document.getElementById('input1').style.display = ''
    // document.getElementById('input2').style.display = ''
// }
function endTime(){
    clearInterval(x);
    document.getElementsByClassName("session")[0].style.display = "block";
    document.getElementById("timer").innerHTML = "Start Again?";
    document.getElementById('save').style.display = ''
    document.getElementById('end').style.display = 'none'
    document.getElementById('bar').style.display = 'none'
    document.getElementById("timerNav").style.display = 'none'
    // document.getElementById("progressBar").innerHTML = 'none'
    document.getElementById('input1').style.display = ''
    document.getElementById('input2').style.display = ''
    document.getElementById("timerNav").innerHTML = ''
    // isDone = true
    // document.getElementById("timer").innerHTML = "Start Again?";
    // document.getElementById("progressBar").innerHTML = ''
    // document.getElementById('input1').style.display = ''
    // document.getElementById('input2').style.display = ''
}

function display_countdown_timer(hours,minutes){
    // endTime()
    var time = (hours * 60 * 60 + minutes * 60) * 1000
    var initialTime = time
    // Update the count down every 1 second
    var original_time = time
    var isHalf =  false
    var isDone = false
    // const buttonAct = document.getElementById('save')

    if (document.getElementById('hours').value == '' && document.getElementById('minutes').value == ''){
        document.getElementById("timer").innerHTML = 'Enter your session duration to start'
        return
    }


    if (isNaN(document.getElementById('hours').value) || isNaN(document.getElementById('minutes').value)){
        document.getElementById("timer").innerHTML = 'Please enter a valid duration to start'
        return
    }
    document.getElementsByClassName("session")[0].style.display = "none";
    document.getElementById('input1').style.display = 'none'
    document.getElementById('input2').style.display = 'none'
    document.getElementById('save').style.display = 'none'

    document.getElementById('end').style.display = ''
    document.getElementById('bar').style.display = ''
    // console.log( document.getElementById('input1').style.display)
    // document.getElementById('input2').innerHTML = ''
    // buttonAct.removeEventListener('click', displayTime)
    // buttonAct.addEventListener('click', endTime())


    document.getElementById("timerNav").style.display = 'block'

    x = setInterval(function() {
        
        let progresswidth =  time / initialTime * 100
        // console.log(progresswidth)
        
        // Time calculations for hours, minutes and seconds
        var hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((time % (1000 * 60)) / 1000);

        // Display the result in the element with id="timer"
        document.getElementById("timer").innerHTML = ''
        document.getElementById("timer").innerHTML = `Time left: ` + hours + "h " + minutes + "m " + seconds + "s ";
   
        document.getElementById("timerNav").innerHTML = ''
        
        document.getElementById("timerNav").innerHTML = `Time left: ` + hours + "h " + minutes + "m " + seconds + "s ";

        // console.log(document.getElementById('progressBar').innerHTML)

        document.getElementById('progressBar').innerHTML = `<div class="progress">
        <div class="progress-bar" role="progressbar" style='width: ${progresswidth}%' aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
      </div>`

        
        
        

        // If the count down is finished, update the element with id="timer"
        if (time < 0) {
            // clearInterval(x);
            isDone = true
            // document.getElementById("timer").innerHTML = "Start Again?";
            // document.getElementById('save').style.display = ''
            // document.getElementById('end').style.display = 'none'
            // document.getElementById('bar').style.display = 'none'
            // // document.getElementById("progressBar").innerHTML = 'none'
            // document.getElementById('input1').style.display = ''
            // document.getElementById('input2').style.display = ''
            endTime()

            // document.getElementById('input1').innerHTML = `<span class="input-group-text" id="basic-addon1">Hours</span>
            // <input type="text" class="form-control" id="hours" name="hours" value="" aria-label="Username" aria-describedby="basic-addon1">`
            // document.getElementById('input2').innerHTML = `<span class="input-group-text" id="basic-addon1">Minutes</span>
            // <input type="text" class="form-control" id="minutes" name="minutes" value="" aria-label="Username" aria-describedby="basic-addon1">`
        }
        
        else if (time == original_time/2){
            isHalf = true
        }

        if(!isHalf && !isDone){
            document.getElementById('gif_now').src = "gifs/gif2.gif"
        }
        else if (isHalf && !isDone){
            document.getElementById('gif_now').style.display = "none"
            document.getElementById("gif2").style.display = ""
    
            isHalf = false
        }

        else if(isDone && !isHalf){
            
            document.getElementById("gif2").style.display = "none"
            document.getElementById("gif3").style.display = ""
            console.log( document.getElementById('gif_now'))
            Swal.fire({
                title: 'Yay!',
                text: 'Congratulations! You have completed your session!',
                color: '#fff',
                confirmButtonColor: '#228B22',
                icon: 'success',
                
            })
            setTimeout(()=>{
                document.getElementById("gif3").style.display = "none"
                document.getElementById('gif_now').src = "gifs/gif1.gif"
                document.getElementById("gif_now").style.display = ""
            },3000)

            
            //add scores to databse using original time
            function formatDate(date){
              var formatted_date = date.getDate().toString()+"/"+(date.getMonth()+1).toString()+"/"+date.getFullYear().toString();
              return formatted_date;
            }
            async function add_score(score, userId){
              //update TotalScore from db
              var ref = doc(db, "Users", userId);
          
              const docSnap = await getDoc(ref);
                  
              var curr_score = docSnap.data().TotalTime;
                  console.log(curr_score);
              curr_score += score;
                  console.log("Total time")
                  console.log(curr_score);
              var data = {
                  TotalTime: curr_score
              }
              updateDoc(ref, data)
              .then(ref => {
                  console.log("Total time updated");
              })
              .catch(error => {
                  console.log(error);
              })
              
              //update PastScores from db
              
              var past_scores = docSnap.data().PastScores;
              
              var today = formatDate(new Date());
              console.log("Past Scores")
              if (today in past_scores){
                  //If date already present, add score to present score
                  past_scores[today] = past_scores[today] + score
                  console.log(past_scores);
                  }
              
              else {
                  //Else add new entry to past scores
                  past_scores[today] = score;
                  console.log(past_scores);
              }
          
              var data = {
                  PastScores: past_scores
              }
              updateDoc(ref, data)
              .then(ref => {
                  console.log("past scores updated");
          
              })
              .catch(error => {
                  console.log(error);
              })
          
          };
          add_score(original_time/60000, localStorage.getItem("uid")); //add scores to databse using original time
          
            
        }

        time = time - 1000;
    }, 1000);
}