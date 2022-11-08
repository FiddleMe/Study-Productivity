// input time(hrs, mins) specified by user
//updates element with id="timer" with a countdown timer

var x;

function displayTime(){
    display_countdown_timer(document.getElementById('hours').value, document.getElementById('minutes').value)
}

function endTime(){
    clearInterval(x);
    document.getElementById("timer").innerHTML = "Start Again?";
    document.getElementById('save').style.display = ''
    document.getElementById('end').style.display = 'none'
    document.getElementById('bar').style.display = 'none'
    // document.getElementById("progressBar").innerHTML = 'none'
    document.getElementById('input1').style.display = ''
    document.getElementById('input2').style.display = ''
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

    document.getElementById('input1').style.display = 'none'
    document.getElementById('input2').style.display = 'none'
    document.getElementById('save').style.display = 'none'

    document.getElementById('end').style.display = ''
    document.getElementById('bar').style.display = ''
    // console.log( document.getElementById('input1').style.display)
    // document.getElementById('input2').innerHTML = ''
    // buttonAct.removeEventListener('click', displayTime)
    // buttonAct.addEventListener('click', endTime())


    

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
            document.getElementById('gif_now').innerHTML = '<img src="gifs/gif2.gif" id="gif_now" style="margin-top: 7px; height:50px; width: 150px">'
        }
        else if (isHalf && !isDone){
            document.getElementById('gif_now').innerHTML = '<img src="gifs/gif3.gif" id="gif_now" style="margin-top: 7px; height:50px; width: 150px">'
            alert("You're halfway there! Keep Going!")
            isHalf = false
        }

        else if(isDone && !isHalf){
            document.getElementById('gif_now').innerHTML = '<img src="gifs/gif4.gif" id="gif_now" style="margin-top: 7px; height:50px; width: 150px">'
            alert("Congratulations! You have completed your session!")
            
        }

        time = time - 1000;
    }, 1000);
}