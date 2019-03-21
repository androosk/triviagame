var ansVal = []
var game = false
var currentState = ""
var currentAnswers = []
var rightWrong = ""
var clickVal = 0
var i = -2
var loop = 10
var intervalId
var wrongTrack = ""
var wrongGuesses = 0
var rightGuesses = 0
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
var gameText = [
  "<div><p id='game-timer'></p></div>",
  "<div><p id='question-area' class='question-row'></p></div>",
  "<div class='answer-row'><p id='answer-one' class='answer_from_user'></p></div>",
  "<div class='answer-row'><p id='answer-two' class='answer_from_user'></p></div>",
  "<div class='answer-row'><p id='answer-three' class='answer_from_user'></p></div>",
  "<div class='answer-row'><p id='answer-four' class='answer_from_user'></p></div>"]

var gameKeys = Object.keys(questionsAnswers)

introSong.play()

// $(document).ready(function(){
//   $("#game-box").toggle
// })

$("#temp-box").click(function() {
  $("#temp-box").toggle()
  console.log("start-finish")
  fillGame()
})

function fillGame () {
  $("#game-box").addClass("game-area")
  for (var k=0; k < 6; k++) {
    $("#game-box").append(gameText[k])
  }
  addFunctionality()
  introSong.pause()
  introSong.currentTime = 0
  nextQuestion()
}

function addFunctionality () {
$('#answer-one, #answer-two, #answer-three, #answer-four').hover(function () {
  $(this).addClass('hover-box');
}, function () {
  $(this).removeClass('hover-box');
});

$('.answer_from_user').click(function(){
  var clickVal = $(this).attr('data-value')
  clearInterval(intervalId)
  if (ansVal[clickVal] === 0) {
    rightGuesses++
    currentState = "right"
    rightWrong = "You are correct!"
    $(this).addClass("right-answer-pick")
    rightAnswer.play()
    answerTime()
  }
  else {
    wrongTrack = this
    youWrong()
  }
})
}

function youWrong() {
  $(wrongTrack).addClass("wrong-answer-pick")
  clearInterval(intervalId)
  currentState = "wrong"
  rightWrong = "Sorry, that was incorrect."
  wrongGuesses++
  wrongAnswer.play()
  answerTime()
}

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

function nextQuestion() {
  i += 2
  if (i <= 18) {
    loop = 10
    ansVal = []
    clickVal = 0
    questionTimer()
    pickOrder()
    var t = gameKeys[i]
    var u = gameKeys[i+1]
    var currentQuestion = questionsAnswers[t]
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

function questionTimer() {
  clearInterval(intervalId)
  intervalId =setInterval(decrement, 1000)
}
function decrement() {
  loop--
  $("#game-timer").text("Seconds Remaining: " + loop)
  if (loop === 0) {
    clearInterval(intervalId)
    $("#game-timer").text("TIME'S UP")
    youWrong()

    }
  }

function answerTime() {
  $("#game-box").toggle()
  $("#win-loss").append("<img id='picture-picture' class='picture-box-more' src='assets/images/"+currentState+"answer"+i+".gif'>")
  $("#win-loss").append("<p id='answer-answer'>" + rightWrong + " The Current Answer is "+currentAnswers[0]+"</p>")
  setTimeout(function(){
    $('#picture-picture').remove(), $("#answer-answer").remove()}, 3000)
  setTimeout(function() {
    $("#game-box").toggle(), $(".answer_from_user").removeClass(currentState+"-answer-pick"), nextQuestion()}, 3000)
}
function gameOver() {
  console.log("game over")
  $("#game-box").toggle()
  $("#temp-box").toggle()
  // $("#answer-one").prev("#answer-one").attr("id","answerone")
  // $("#game-timer").text("GAME OVER")
  // $("#question-area").text("THANK YOU FOR PLAYING!")
  // $("#answer-one").text("CORRECT GUESSES: "+rightGuesses)
  // $("#answer-two").html("<br></br>")
  // $("#answer-three").text("INCORRECT GUESSES: "+wrongGuesses)
  // $("#answer-four").html("<br></br>")
  // $("#game-box").toggle()
  // $("#win-loss").append("<img id='picture-picture' class='picture-box-more' src='assets/images/"+currentState+"answer"+i+".gif'>")
  // $("#win-loss").append("<p id='answer-answer'>" + rightWrong + " The Current Answer is "+currentAnswers[0]+"</p>")
}
