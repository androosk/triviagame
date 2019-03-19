var questNum = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
var ansVal = []
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
var gameKeys = Object.keys(questionsAnswers)


var i = 0

gameCore()

function gameCore () {
var t = gameKeys[questNum[i]]
var u = gameKeys[questNum[i]+1]
var currentQuestion = questionsAnswers[t]
var currentAnswers = questionsAnswers[u]



pickOrder()



function pickOrder() {
  for (z=0; z < 4; z++) {
    var num = Math.floor(Math.random() * 4)
      if (ansVal.includes(num) === false) {
        ansVal.push(num)
      }
      else {
        z--
      }
  }
}

//TODO Remove jump from hover functions
$("#answer-one").hover(function() {
  $("#answer-one").addClass("hover-box", "hover-p")
})
$("#answer-one").mouseleave(function() {
  $("#answer-one").removeClass("hover-box")
})
$("#answer-two").hover(function() {
  $("#answer-two").addClass("hover-box")
})
$("#answer-two").mouseleave(function() {
  $("#answer-two").removeClass("hover-box")
})
$("#answer-three").hover(function() {
  $("#answer-three").addClass("hover-box")
})
$("#answer-three").mouseleave(function() {
  $("#answer-three").removeClass("hover-box")
})
$("#answer-four").hover(function() {
  $("#answer-four").addClass("hover-box")
})
$("#answer-four").mouseleave(function() {
  $("#answer-four").removeClass("hover-box")
})

$("#answer-one").click(function() {
  $("#answer-one").removeClass("hover-box")
  i++
  //TODO Temporarily remove hoverabililty from other boxes
  if (ansVal[0] === 0) {
    $("#answer-one").addClass("right-answer-pick")
  }
  else {
    $("#answer-one").addClass("wrong-answer-pick")
  }
})
$("#answer-two").click(function() {
  $("#answer-two").removeClass("hover-box")
  i++
  //TODO Temporarily remove hoverabililty from other boxes
  if (ansVal[1] === 0) {
    $("#answer-two").addClass("right-answer-pick")
  }
  else {
    $("#answer-two").addClass("wrong-answer-pick")
  }
})
$("#answer-three").click(function() {
  $("#answer-three").removeClass("hover-box")
  i++
  //TODO Temporarily remove hoverabililty from other boxes
  if (ansVal[2] === 0) {
    $("#answer-three").addClass("right-answer-pick")
  }
  else {
    $("#answer-three").addClass("wrong-answer-pick")
  }
})
$("#answer-four").click(function() {
  $("#answer-four").removeClass("hover-box")
  i++
  //TODO Temporarily remove hoverabililty from other boxes
  if (ansVal[3] === 0) {
    $("#answer-four").addClass("right-answer-pick")
  }
  else {
    $("#answer-four").addClass("wrong-answer-pick")
  }
})

$("#game-timer").append("<p>Stupid timer</p>")
$("#question-area").append("<p>"+currentQuestion+"</p>")
$("#answer-one").append("<p>"+currentAnswers[ansVal[0]]+"</p>")
$("#answer-two").append("<p>"+currentAnswers[ansVal[1]]+"</p>")
$("#answer-three").append("<p>"+currentAnswers[ansVal[2]]+"</p>")
$("#answer-four").append("<p>"+currentAnswers[ansVal[3]]+"</p>")


}

// if (i < 10) {
//   gameCore()
// }
