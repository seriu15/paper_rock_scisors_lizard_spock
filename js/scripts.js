GameState = {
  NotStarted: "notStarted",
  Started: "started",
  Ended: "ended"
}

function Choice(objectName, objectClass, objectFont) {
  this.objectName = objectName;
  this.objectClass = objectClass;
  this.objectFont = objectFont;
}

var rock = new Choice("Kamień", "label-default", "rock");
var paper = new Choice("Papier", "label-danger", "paper");
var scissors = new Choice("Nożyce", "label-primary", "scissors");
var lizard = new Choice("Jaszczurka", "label-success", "lizard");
var spock = new Choice("Spock", "label-info", "spock");

var newGameElem = $('#js-newGameElement');
var pickElem = $('#js-playerPickElement');
var resultsElem = $('.js-resultsTableElement');
var newGameBtn = $('#js-newGameButton');
var computerPickElem = $('#js-computerPick');
var playerPickElem = $('#js-playerPick');
var playerResultElem = $('#js-playerResult');
var playerName = $('#js-playerName');
var playerChoiceView = $("#js-playerChoiceView");
var computerChoiceView = $('#js-computerChoiceView');
var playOnceMore = $("#js-onceMore");
var welcomeElement = $('#js-welcome');

newGameBtn.on('click', function() {
  player.name = $("#name").val();
  newGame();
});

// check which button player click and run function playerPick with his choice
$('button.choice').on('click', function() {
  playerPick($(this).data('choice'));
});

var gameState = GameState.NotStarted,  //started // ended
  player = {
      name: '',
      score: 0
  },
  computer = {
      score: 0
};

function setGameElements() {
  switch(gameState) {
   case GameState.Started:
        newGameElem.css('display', 'none');
        pickElem.css('display', 'block');
        resultsElem.css('display', 'block');
        playerChoiceView.css('display', 'block');
        computerChoiceView.css('display', 'block');
        playerResultElem.css('display', 'block');
        computerPickElem.text('Wybór komputera');
        playerPickElem.text('Wybór gracza');
        playerResultElem.text('Wynik').removeClass().addClass("text-center");;
        playerChoiceView.html('');
        computerChoiceView.html('');
        playOnceMore.css('display', 'none');
        welcomeElement.css('display', 'none');

      break;
    case GameState.Ended:
        newGameBtn.text('Jeszcze raz');
    case GameState.NotStarted:
    default:
        newGameElem.css('display', 'block');
        pickElem.css('display', 'none');
        resultsElem.css('display', 'none');
        playerChoiceView.css('display', 'none');
        computerChoiceView.css('display', 'none');
        $('#name').val('Gracz');
        playOnceMore.css('display', 'none');
        playerResultElem.css('display', 'none');
        welcomeElement.css('display', 'block');
  }
}

setGameElements();

function newGame() {
  if (player.name) {
    player.score = computer.score = 0;
    gameState = GameState.Started;
    setGameElements();

    playerName.text(player.name);
    setGamePoints();
  }
}

var x = Math.floor(Math.random()*5);

function getComputerPick() {
  var possiblePicks = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
  return possiblePicks[Math.floor(Math.random()*5)];
}

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.text('');
  var winnerIs = 'player';

  if (playerPick == computerPick) {
    winnerIs = 'noone'; // remis
  } else if (
    (computerPick == 'rock' && ((playerPick == 'scissors') || (playerPick == 'lizard'))) ||
    (computerPick == 'scissors' &&  ((playerPick == 'paper') || (playerPick == 'lizard'))) ||
    (computerPick == 'paper' &&  ((playerPick == 'rock') || (playerPick == 'spock'))) ||
    (computerPick == 'lizard' &&  ((playerPick == 'spock') || (playerPick == 'paper'))) ||
    (computerPick == 'spock' &&  ((playerPick == 'scissors') || (playerPick == 'rock')))) {

    winnerIs = 'computer';
  }

  if (winnerIs == 'player') {
    playerResultElem.text('Wygrana!').hide().fadeIn(2000);
    playerResultElem.removeClass().addClass("text-center result-success");
    player.score++;
  } else if (winnerIs == 'computer') {
    playerResultElem.text('Przegrana!').hide().fadeIn(2000);
    playerResultElem.removeClass().addClass("text-center result-danger");
    computer.score++;
  } else {
    playerResultElem.text('Remis!').hide().fadeIn(2000);
    playerResultElem.removeClass().addClass("text-center result-warning");
  }
  setGamePoints();
}

function choiceStringToObject(choiceString) {
    switch (choiceString) {
        case "rock":
            return rock;
        break;
        case "paper":
            return paper;
        break;
        case "scissors":
            return scissors;
        break;
        case "lizard":
            return lizard;
        break;
        case "spock":
            return spock;
        break;
    }
}

function playerPick(pickString) {
  var computerPick = choiceStringToObject(getComputerPick());
  var playerPick = choiceStringToObject(pickString);

  playerChoiceView.html("<div class='" + playerPick.objectClass + "'><span class='badge'><i class='fa fa-hand-" + playerPick.objectFont + "-o fa-5x' aria-hidden='true'></i></span></div>").hide().fadeIn(100, function() {
    playerPickElem.text(playerPick.objectName);
    computerChoiceView.html("<div class='" + computerPick.objectClass + "'><span class='badge'><i class='fa fa-hand-" + computerPick.objectFont + "-o fa-5x' aria-hidden='true'></i></span></div>").hide().fadeIn(1600, function() {
      computerPickElem.text(computerPick.objectName);
    });
  });

  $("#js-playerPickElement button").prop( "disabled", true );
  setTimeout(function() {
    $("#js-playerPickElement button").prop( "disabled", false );
  }, 2000); // ma byc 2000

  checkRoundWinner(playerPick.objectFont, computerPick.objectFont);
  checkWiner();
}

function setGamePoints() {
  $('#js-playerPoints').text(player.score).hide().fadeIn(2000);
  $('#js-computerPoints').text(computer.score).hide().fadeIn(2000);
}

// check if player or computer have 10 points
function checkWiner() {
  if (player.score == 2) {  // when player win (10)
    pickElem.css('display', 'none');
    onceMore("Wygrałeś");
  } else if (computer.score == 2) {  // when computer win (10)
    onceMore("Przegrałeś");
  }
}

function onceMore(text) {
  gameState = GameState.Ended;
  playOnceMore.css('display', 'block');
  setTimeout(function() {
    $('#myModal').modal('show');
  }, 3000);
  $('#js-gameWinner').text(text + " z wynikiem " + player.score + ":" + computer.score);
  $("#js-onceMoreButton").on('click', function() {
    playOnceMore.css('display', 'none');
    $('#myModal').modal('hide');
    newGame();
  });
  $('#js-cancelButton').on('click', function() {
    newGameElem.css('display', 'block');
  });
  setGamePoints();
}
