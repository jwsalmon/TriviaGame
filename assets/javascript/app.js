var time = 30;
var intervalId, delayTimesUp, delayRestart,delayFailure,delaySuccess;
var qestionArray;
var questionNumber=0;
var numCorrect,numUnAnswered,numWrong;
var questionOne = {
    question: "Which beatle died in 1980",
    answerOne: "John",
    answerTwo: "Paul",
    answerThree: "George",
    answerFour: "Ringo",
    answerGif: "assets/images/johnLenon.gif",
    rightAns:"a"
};
var questionTwo = {
    question: "Who sung Henry VIII",
    answerOne: "Beatles",
    answerTwo: "Paul Revere and the Raiders",
    answerThree: "Four Seasons",
    answerFour: "Kiss",
    answerGif:"assets/images/paulrevereandtheraiders.gif",
    rightAns:"b"  
};
var questionThree = {question:"Who sung Rock and Roll all Night",
                 answerOne:"Dave Matthews Band",
                 answerTwo:"Kiss",
                 answerThree:"AC/DC",
                 answerFour:"Bob Dylan",
                 answerGif:"assets/images/Kiss.gif",
                 rightAns:"a"     
};
var questionFour={question:"which singer comes from Minnesota",
                 answerOne:"Gene Simmons",
                 answerTwo:"Paul McCartney",
                 answerThree:"Paul Revere",
                 answerFour:"Bob Dylan", 
                 answerGif:"assets/images/bobdylan.gif",
                 rightAns:"d"                     
};
var questionFive={question:"which band has a song with the lyrics 'I am the egg man'",
                 answerOne:"Kiss",
                 answerTwo:"Beatles",
                 answerThree:"Rolling Stones",
                 answerFour:"The Who",
                 answerGif: "assets/images/beatles.gif",
                 rightAns:"b"     
};
var questionSix={question:"who sings 'Crash Into Me'",
                 answerOne:"Kiss",
                 answerTwo:"Beatles",
                 answerThree:"Rolling Stones",
                 answerFour:"Dave Matthews Band",
                 answerGif:"assets/images/davematthewsband.gif",
                 rightAns:"d"  
};
var questionSeven={question:"who's lead singer is know for his Lips",
                 answerOne:"Kiss",
                 answerTwo:"Beatles",
                 answerThree:"Rolling Stones",
                 answerFour:"Areosmith",
                 answerGif:"assets/images/rollingstones.gif" ,
                 rightAns:"c" 
};
var questionEight={question:"who are the Boy from Jersey",
                 answerOne:"Commodores",
                 answerTwo:"Beatles",
                 answerThree:"The Supremes",
                 answerFour:"Four Seasons",
                 answerGif:"assets/images/fourseasons.gif",
                 rightAns:"d"
};
var Questions = [questionOne,questionTwo,questionThree,questionFour,questionFive,questionSix,questionSeven,questionEight];
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
 function endQuiz(){
    $("#timesUp").hide();
    $("#correct").hide();
    $("#failure").hide();
    $("#quiz").hide();
    $("#numCorrect").text("Number of Questions Correct: " + numCorrect);
    $("#numWrong").text("Number of Questions Wrong: " + numWrong);
    $("#numUnAnswered").text("Number of Questions not Answered: " + numUnAnswered);
    $("#QuizDone").show();
    
 } 
function setQuestion() {
    if (questionNumber !== qestionArray.length ){
        $("#question").text(qestionArray[questionNumber].question);
        $("#ans1").text(questionArray[questionNumber].answerOne);
        $("#ans2").text(questionArray[questionNumber].answerTwo);
        $("#ans3").text(questionArray[questionNumber].answerThree);
        $("#ans4").text(questionArray[questionNumber].answerFour);
        $("#question").attr("data-rgtAns", questionArray[questionNumber].rightAns);
        $("#question").attr("data-gif", questionArray[questionNumber].answerGif);
        questionNumber++;
    }
    else{
        clearTimeout(delayRestart);
        clearInterval(intervalId); 
        clearTimeout(delayFailure);
        clearTimeout(delaySuccess);
        endQuiz();
    }
}
function checkAnswer() {

}
function run() {
    $("#timesUp").hide();
    $("#correct").hide();
    $("#failure").hide();
    clearTimeout(delayRestart);
    clearInterval(intervalId);
    intervalId = setInterval(count, 1000);

}
function count() {

    //  TODO: increment time by 1, remember we cant use "this" here.
    time--;
    //  TODO: Get the current time, pass that into the stopwatch.timeConverter function,
    //        and save the result in a variable.
    var currentTime = timeConverter(time);

    //  TODO: Use the variable you just created to show the converted time in the "display" div.
    $("#timer").text(currentTime);
    if (time === 0) {

        stop();
        timesUp();

    }
}
function stop() {

    clearInterval(intervalId);
}
function timesUp() {
    numUnAnswered++;
    delayTimesUp = setTimeout(function () {
        $("#timesUp").show();
        $("#quiz").hide();
        clearTimeout(delayTimesUp);
    }, 3000);

    delayRestart = setTimeout(function () {
        $("#timesUp").hide();
        $("#quiz").show();
        time = 30;
        run();
        clearTimeout(delayRestart);
    }, 15000);
}
function failure() {
    numWrong++;
    delayFailure = setTimeout(function () {
        $("#failure").show();
        $("#quiz").hide();
        clearTimeout(delayFailure);
    }, 3000);

    delayRestart = setTimeout(function () {
        $("#failure").hide();
        $("#quiz").show();
        time = 30;
        run();
        clearTimeout(delayRestart);
    }, 15000);
}
function success() {
    numCorrect++;
    delaySuccess = setTimeout(function () {
        $("#correct").show();
        $("#quiz").hide();
        clearTimeout(delaySuccess);
    }, 3000);

    delayRestart = setTimeout(function () {
        $("#correct").hide();
        $("#quiz").show();
        time = 30;
        run();
        clearTimeout(delayRestart);
    }, 15000);
}

$(document).ready(function () {
    $(".answerBtn").on("click", checkAnswer);
    qestionArray = shuffle(Questions);
});

function timeConverter(t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes === 0) {
        minutes = "00";
    }

    else if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
}

run();