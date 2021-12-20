// Initialize game pattern
var gamePattern = [];

// Initialize user pattern
var userClickedPattern = [];

// Initialize the colors that can be selected
const buttonColors = ["red", "blue", "green", "yellow"];


// Create a function that generates a random number to pull a random color and then pushes the random color to gamePattern
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  // Simulate button click
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  // Play sound of color
  playSound(randomChosenColor);

  // Update level of game
  level++;
  $("#level-title").text("Level " + level)

}

// Create an event trigger that captures when a click on a button is registered if the game is started

$(".btn").click(function(event) {
  if (gameStart === true) {
    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);

    playSound(userChosenColor);

    animatePress(userChosenColor);
  }
})

// Create a function to be able to play a sound whenever a new sequence or user click is added
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}

// Create a function that fades a button when it is clicked
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100)
}

// Create game start variables
var gameStart = false;
var level = 0;

// Initialize the game
$(document).keypress(function() {
  if (gameStart === false) {
    $("#level-title").text("Level " + level);
    gameStart = true;
    nextSequence();
  }
})

// Play the game
function checkAnswer(currentLevel) {
  // Check if user click is equal to the game pattern at time of index
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // Check if user has gone through the entire sequence
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      // Reset user pattern for new round
      userClickedPattern = [];
    }
  } else {
    // initialize and play sound of game ending
    var gameOverSound = new Audio("sounds/wrong.mp3");
    gameOverSound.play();
    // Activate game over screen
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    $("h1").text("Game Over; Press Any Key to Continue");
    // On keypress, restart game
    $(document).on("keypress", startOver());
  }
}

// Create a function to reset gameplay variables to game start condition
function startOver() {
  gameStart = false;
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
}
