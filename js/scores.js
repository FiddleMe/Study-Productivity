//Map past_scores = {date: score, date:score, ...}


//date = "day/month/year"
//score = int minutes

//change Date() object into string"day/month/year"
function formatDate(date){
    var formatted_date = date.getDate().toString()+"/"+date.getMonth().toString()+"/"+date.getFullYear().toString();
    return formatted_date;
}

//On session end, update score:

function update_past_scores(score,past_scores) {
    //Date object containing the current date and time.
    var today = formatDate(new Date());

    if (past_scores.has(today)){
        //If date already present, add score to present score
        past_scores.set(today, past_scores.get(today) + score)
        console.log(past_scores);
        }
    
    else {
        //Else add new entry to past scores
        past_scores.set(today, score);
        console.log(past_scores);
    }

    //TODO:
    // update database with new past_scores

}


function display_stats(past_scores){
    const past7Days = [...Array(7).keys()].map(index => {
        const date = new Date();
        date.setDate(date.getDate() - (index + 1));
        var formatted_date = formatDate(date);
        return formatted_date;
        });
    for (day of past7Days){
        //display days
        console.log(day)
        if (past_scores.has(day)){
            //display scores if available
            console.log(past_scores.get(day));
        }
        else{
            console.log(0);
        }

    }
}

//TESTS
var test_data = new Map([
    ["16/9/2022", 500],
    ["15/9/2022", 300],
    ["2/9/2022", 300],
    ["5/9/2022", 300],
    ["17/9/2022", 200]
  ]);
display_stats(test_data);
update_past_scores(2401, test_data);  
