
//date = "day/month/year"
//score = int minutes


//change Date() object into string"day/month/year"

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
    var data = []
    for (var day of past7Days){
        //display days
        console.log(day)
        
        if (day in past_scores){
            //display scores if available
            data.push({"name":day, "study":past_scores[day]});
        }
        else{
            console.log(`data unavailble on ${day}`)
        }
        
    }
    console.log(data)
    return data;
}

//TESTS

//display_stats(test_data);

//add_score(100, localStorage.getItem("uid"));

