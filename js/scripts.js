GameState = {
  NotStarted: "notStarted",
  Started: "started",
  Ended: "ended"
}

var newGameElem = $('#js-newGameElement');
var pickElem = $('#js-playerPickElement');
var resultsElem = $('.js-resultsTableElement');
var newGameBtn = $('#js-newGameButton');
var computerPickElem = $('#js-computerPick');
var playerPickElem = $('#js-playerPick');
var computerResultElem = $('#js-computerResult');
var playerResultElem = $('#js-playerResult');
var playerName = $('#js-playerName');
var playerChoiceView = $("#js-playerChoiceView");
var computerChoiceView = $('#js-computerChoiceView');

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
        computerPickElem.text('Wybór komputera');
        playerPickElem.text('Wybór gracza');
        computerResultElem.text('Wynik komputera');
        playerResultElem.text('Wynik gracza');

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
        playerChoiceView.html('');
        computerChoiceView.html('');
        $('#name').val('Gracz');
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
  computerResultElem.text('');

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
    player.score++;
    console.log(player.score);
  } else if (winnerIs == 'computer') {
    computerResultElem.text('Wygrana!').hide().fadeIn(2000);
    computer.score++;
    console.log(computer.score);
  } else {
    playerResultElem.text('Remis!').hide().fadeIn(2000);
    computerResultElem.text('Remis!').hide().fadeIn(2000);
  }
  setGamePoints();
}

function playerPick(playerPick) {
  var computerPick = getComputerPick();

  playerPickElem.text(playerPick).hide().fadeIn(1000);
  computerPickElem.text(computerPick).hide().fadeIn(1500);
  //$( "span" ).text( "Not valid!" ).show().fadeOut( 1000 );
  playerChoiceView.html("<span class='badge '><i class='fa fa-hand-" + playerPick + "-o fa-5x' aria-hidden='true'></i></span>").hide().fadeIn(1000);
  computerChoiceView.html('<span class="badge "><i class="fa fa-hand-' + computerPick + '-o fa-5x" aria-hidden="true"></i></span>').hide().fadeIn(1500);

  $("#js-playerPickElement button").prop( "disabled", true );
  setTimeout(function() {
    $("#js-playerPickElement button").prop( "disabled", false );
  }, 2000);

  checkRoundWinner(playerPick, computerPick);
  checkWiner();
}

function setGamePoints() {
  $('#js-playerPoints').text(player.score).hide().fadeIn(2000);
  $('#js-computerPoints').text(computer.score).hide().fadeIn(2000);
}

// check if player or computer have 10 points
function checkWiner() {
  if (player.score == 10) {
    onceMore("Wygrałeś");
  } else if (computer.score == 10) {
    onceMore("Przegrałeś");
  }
}

function onceMore(text) {
  gameState = GameState.Ended;
  if (confirm(text) == true) {
    newGame();
  } else {
    alert("Moze innym razem !")
  }
  setGamePoints();
  setGameElements();
}

function onceMoore(text) {
  gameState = GameState.Ended;

}
