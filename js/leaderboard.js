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

function formatDate(date){
var formatted_date = date.getDate().toString()+"/"+date.getMonth().toString()+"/"+date.getFullYear().toString();
return formatted_date;
}


//get time in miliseconds 
//do on session start and end:
function get_time(){
    var d = new Date();
    var time = d.getTime();
    console.log(d,time);
    return time;
}
//     var score = (end - start) / 60000 ;
//         console.log(score);
//On session end, update score, whereby score = time spent in session (minutes):

//update score to database after session ends


async function display_stats(uid){

    var ref = doc(db, "Users", uid);
    const docSnap = await getDoc(ref);
    var past_scores = docSnap.data().PastScores;

    const past7Days = [...Array(7).keys()].map(index => {
        const date = new Date();
        date.setDate(date.getDate() - (index + 1));
        var formatted_date = formatDate(date);
        return formatted_date;
        });
    
        //data for past 7 days
    var dates = [];
    var time = [];

    for (var day of past7Days.reverse()){
        //display days
        console.log(day)
        
        if (day in past_scores){
            //display scores if available
            dates.push(day);
            time.push(past_scores[day]);
        }
        else{
            dates.push(day);
            time.push(0);
            console.log(`data unavailble on ${day}`)
        }

    }

    //setting up past 7 days chart
    var data_things = {
        labels: dates,
        datasets: [{
        label: 'Time spent being productive',
        // pink color
        backgroundColor: 'rgb(255,148,224)',
        borderColor: 'rgb(255,148,224)',
        // take in input of array
        data: time,
    
        }]
    };
    var config = {
        type: 'bar',
        data: data_things,
        options: {
            
        }
    };
    var myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

    // Data for friend's scores
    var names = [];
    var totaltimes = [];
    if (docSnap.exists()) {
        var namesArr = [];
        var friends = docSnap.data().FriendRequests;
        // var names = []
        // var totaltimes = []
        for (var friend of friends){
            console.log(Object.values(friend)[0]);
            if (Object.values(friend)[0] == true){
                var ref = doc(db, "Users", Object.keys(friend)[0]);
                const docSnap = await getDoc(ref);
                names.push(docSnap.data().Username);
                totaltimes.push(docSnap.data().TotalTime);
            };
        }
                

    }
    
    var data_things2 = {
        labels: names,
        datasets: [{
        label: 'Friend\'s Scores',
        // pink color
        backgroundColor: 'rgb(255,148,224)',
        borderColor: 'rgb(255,148,224)',
        // take in input of array
        data: totaltimes,
        }]
    };
    var config2 = {
        type: 'bar',
        data: data_things2,
        options: {
            
        }
    };
    var myChart2 = new Chart(
        document.getElementById('myChart2'),
        config2
    );  


    var friends_scores = []
    for (var n in names){
        friends_scores.push({"name":names[n],"time":totaltimes[n]})
    }
    friends_scores.sort(function(a, b) {
        var keyA = new Date(a.time),
            keyB = new Date(b.time);
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
        });
    console.log(friends_scores);
    
    //data for table highscores
    var counter = 1
    for (var n in friends_scores){
        var tr_element = document.createElement("tr");

        var td_rank = document.createElement("td");
        const rank = document.createTextNode(counter);
        td_rank.appendChild(rank);
        tr_element.appendChild(td_rank);

        var td_name = document.createElement("td");
        const name = document.createTextNode(friends_scores[n].name);
        td_name.appendChild(name);
        tr_element.appendChild(td_name);

        var td_time = document.createElement("td");
        const time = document.createTextNode(friends_scores[n].time);
        td_time.appendChild(time);
        tr_element.appendChild(td_time);

        document.getElementById("table_data").appendChild(tr_element);

        counter ++;
    }
    //average
    const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
    console.log(time);
    document.getElementById("average_time").innerText = parseInt(average(time))+"min";
}
display_stats(localStorage.getItem("uid"));
