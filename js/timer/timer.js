// input time(hrs, mins) specified by user
//updates element with id="timer" with a countdown timer

function display_countdown_timer(hours,minutes){
    var time = (hours * 60 * 60 + minutes * 60) * 1000
    // Update the count down every 1 second
    var x = setInterval(function() {
        
        time = time - 1000;

        // Time calculations for hours, minutes and seconds
        var hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((time % (1000 * 60)) / 1000);

        // Display the result in the element with id="timer"
        document.getElementById("timer").innerHTML = hours + "h "
        + minutes + "m " + seconds + "s ";

        // If the count down is finished, update the element with id="timer"
        if (time < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "EXPIRED";
        }
    }, 1000);
}

//get time in miliseconds 
//do on session start and end:
function get_time(){
    var d = new Date();
    var time = d.getTime();
    console.log(d,time);
    return time
}

//add time in minutes to database after session ends
async function add_time(start, end, userId){
    var time = (end - start) / 60000 ;
        console.log(time);
    var ref = doc(db, "Users", userId);

    const docSnap = await getDoc(ref);
        
    var curr_time = docSnap.data().TotalTime;
        console.log(curr_time);
    time += curr_time;
        console.log(time);
    var data = {
        TotalTime: time
    }
    updateDoc(ref, data)
    .then(ref => {
        console.log("time updated");
    })
    .catch(error => {
        console.log(error);
    })
}

