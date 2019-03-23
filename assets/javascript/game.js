var ansVal = []
var currentState = ""
var currentQuestion = []
var currentAnswers = []
var correctAnswer = ""
var incorrectAnswer = ""
var clickVal = 0
var i = -2
var loop = 10
var intervalId
var wrongGuesses = 0
var rightGuesses = 0
var unAnswered = 0
var rightAnswer = new Audio("assets/sounds/goodie_goodie.mp3")
var wrongAnswer = new Audio("assets/sounds/bazinga.mp3")
var introSong = new Audio("assets/sounds/intro.mp3")
var questionsAnswers = {
  question1 : "What was Howard's age when his father left him with his mother?",
  answer1 : ["11","10","12","13"],
  question2 : "Which of Leonard's girlfriends has Sheldon found tolerable?",
  answer2 : ["Stephanie", "Leslie", "Priya", "Penny"],
  question3 : "What is the city Sheldon decided to move to after they are robbed?",
  answer3 : ["Bozeman, Montana", "Enid, Oklahoma", "Olympia, Washington", "Austin, Texas"],
  question4 : "In which episode does Sheldon first meet with Amy Farrah Fowler?",
  answer4 : ["The Lunar Excitation", "The Staircase Implementation", "The Peanut Reaction", "The Irish Pub Excitation"],
  question5 : "In the 'Grasshopper Experiment' episode, who does Sheldon say Raj's date resembles?",
  answer5 : ["Panchali", "Mowgli", "Panari", "Sumagli"],
  question6 : "Howard Walowitz has a PhD from which University?",
  answer6 : ["Howard doesn't have a PhD", "MIT", "Princeton", "Caltech"],
  question7 : "In which field of study does Leonard's Father work?",
  answer7 : ["Anthropology", "Archaeology", "Biology", "Neuroscience"],
  question8 : "What gift does Bernadette give to Howard after she gets her new Job?",
  answer8 : ["Rolex Watch", "Tesla Model S", "Working Lightsaber", "Boston Dynamics Robot"],
  question9 : "Where is Penny originally from?",
  answer9 : ["Omaha, Nebraska", "East Overshoe, Iowa", "Missoula, Montana", "Duluth, Minnesota"],
  question10 : "What is the name of the smart phone app developed by the group?",
  answer10 : ["Lenwolopalli", "Project Nodlehs", "Project Shoe", "Koothraleonhow"],
}
//Set up var of keys for calling questions and answers out of object
var gameKeys = Object.keys(questionsAnswers)
//Hide game play area div and bring up "Click Here to Start" text and play theme song
$(document).ready(function(){
  $("#game-box").toggle()
  $("#win-loss").toggle()
  introSong.play()
})
//After player clicks to start, hide start-finish div and bring up game play area div
$("#temp-box").click(function() {
  $("#start-finish").toggle()
  $("#temp-box").toggle()
  $("#game-box").toggle()
  startGame()
})
//Stop theme music if it's playing and start questions
function startGame () {
  introSong.pause()
  introSong.currentTime = 0
  nextQuestion()
}
//Hover function for question divs
$('#answer-one, #answer-two, #answer-three, #answer-four').hover(function () {
  $(this).addClass('hover-box');
}, function () {
  $(this).removeClass('hover-box');
});
//Click function for player to choose question
$('.answer_from_user').click(function(){
  var clickVal = $(this).attr('data-value') //Grab data attribute from selected div
  clearInterval(intervalId) //Stop question timer
  //Check validity of selected answer. All correct answers are at position 0 in the answer array.
  //Evaluate if clicked value ansVal[clickVal] equals zero. If it does, the answer clicked is correct.
  //Load the correct answer variables and run answerTime function
  if (ansVal[clickVal] === 0) {
    rightGuesses++
    currentState = "right"
    correctAnswer = " is correct!"
    incorrectAnswer = ""
    $(this).addClass("right-answer-pick")
    rightAnswer.play()
    answerTime()
  }
  //If ansVal[clickVal] is not equal to zero, the answer is incorrect. Run youWrong function
  else {
    // wrongTrack = this
    youWrong()
  }
})
  //Stop the timer. Play the incorrect answer audio. Determine whether a wrong answer was chosen or player ran out of time.
  //Load the appropriate variables and run answerTime function
function youWrong() {
  clearInterval(intervalId)
  currentState = "wrong"
  wrongAnswer.play()
  correctAnswer = ""
  if (loop === 0) {
    incorrectAnswer = "You ran out of time. The correct answer is "
    answerTime()
    unAnswered++
  }
  else {
    incorrectAnswer = "Sorry, that was incorrect. The correct answer is "
    answerTime()
    wrongGuesses++
  }
}
//Pick a random order for the answers to populate the game field
function pickOrder() {
  for (var z=0; z < 4; z++) {
    var num = Math.floor(Math.random() * 4)
    if (ansVal.includes(num) === false) {
      ansVal.push(num)
    }
    else {
      z--
    }
  }
}
//Evaluate if the game is over. If it is not, start the question timer over, choose the order of answers for this question
//and populate the question and answer divs.
//If the game is over, run the gameOver function
function nextQuestion() {
  i += 2
  if (i <= 18) {
    loop = 20
    ansVal = []
    clickVal = 0
    questionTimer()
    pickOrder()
    var t = gameKeys[i]
    var u = gameKeys[i+1]
    currentQuestion = questionsAnswers[t]
    currentAnswers = questionsAnswers[u]
    $("#game-timer").text("Seconds Remaining: " + loop)
    $("#question-area").text(currentQuestion)
    $("#answer-one").text(currentAnswers[ansVal[0]]).attr("data-value", "0")
    $("#answer-two").text(currentAnswers[ansVal[1]]).attr("data-value", "1")
    $("#answer-three").text(currentAnswers[ansVal[2]]).attr("data-value", "2")
    $("#answer-four").text(currentAnswers[ansVal[3]]).attr("data-value", "3")
  }
  else {
    gameOver()
  }
}
//Question timer function
function questionTimer() {
  clearInterval(intervalId)
  intervalId =setInterval(decrement, 1000)
}
function decrement() {
  loop--
  $("#game-timer").text("Seconds Remaining: " + loop)
  if (loop === 0) {
    clearInterval(intervalId)
    youWrong()
    }
  }
//After validity of player answer is determined, hide the game play area and show
//the appropriate image and text based on answer validity
function answerTime() {
  $("#game-box").toggle()
  $("#win-loss").toggle()
  $("#win-loss").append("<img id='picture-picture' src='assets/images/"+currentState+"answer"+i+".gif'>")
  $("#win-loss").append("<p id='answer-answer'>" + incorrectAnswer + currentAnswers[0] + correctAnswer + "</p>")
  setTimeout(function(){
    $('#picture-picture').remove(), $("#answer-answer").remove(), $("#answer-answer2").remove()}, 5000)
  setTimeout(function() {
    $("#game-box").toggle(), $(".answer_from_user").removeClass(currentState+"-answer-pick"), $("#win-loss").toggle(), nextQuestion()}, 5000)
}
//Hide the game play div
//Show the click here to play button
//Show the previous game statistics
//Reset statistics from previous game
//Play game music
//Wait for click to start a new game
function gameOver() {
  $("#game-box").toggle()
  $("#temp-box").toggle()
  $("#start-finish").toggle()
  $("#startfinish1").text("GAME OVER")
  $("#startfinish2").text("THANK YOU FOR PLAYING!")
  $("#startfinish3").text("CORRECT GUESSES: "+rightGuesses)
  $("#startfinish4").text("INCORRECT GUESSES: "+wrongGuesses)
  $("#startfinish5").text("UNANSWERED QUESTIONS: "+unAnswered)
  i = -2
  rightGuesses = 0
  wrongGuesses = 0
  unAnswered = 0
  introSong.play()
}
