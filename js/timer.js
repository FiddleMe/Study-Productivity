// input time(hrs, mins) specified by user
//updates element with id="timer" with a countdown timer

function display_countdown_timer(hours,minutes){
    var time = (hours * 60 * 60 + minutes * 60) * 1000
    var original_time = time
    var halftime = false
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
        if (time == original_time/2){
            var halftime = true
            alert("Halftime")
        }
    }, 1000);
}