var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'),
     pickPaper = document.getElementById('js-playerPick_paper'),
     pickScissors = document.getElementById('js-playerPick_scissors'),
     pickLizard = document.getElementById('js-playerPick_lizard'),
     pickSpock = document.getElementById('js-playerPick_spock');

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });
pickLizard.addEventListener('click', function() {playerPick('lizard') });
pickSpock.addEventListener('click', function() {playerPick('spock')} );


var gameState = 'notStarted',  //started // ended
  player = {
      name: '',
      score: 0
  },
  computer = {
      score: 0
};

var newGameBtn = document.getElementById('js-newGameButton'),
    newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
        computerPickElem.innerText = 'Wybór komputera';
        playerPickElem.innerText = 'Wybór gracza';
        computerResultElem.innerText = 'Wynik komputera';
        playerResultElem.innerText = 'Wynik gracza';

      break;
    case 'ended':
        newGameBtn.innerText = 'Jeszcze raz';
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}

setGameElements();

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
  player.name = prompt('Graczu, wpisz swoje imię', 'Gracz');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    setGamePoints(); // ta funkcja jeszcze nie powstała
  }

}

var x = Math.floor(Math.random()*5);

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    return possiblePicks[Math.floor(Math.random()*5)];
}




function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'rock' &&  playerPick == 'lizard') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'scissors' &&  playerPick == 'lizard') ||
        (computerPick == 'paper' &&  playerPick == 'rock') ||
        (computerPick == 'paper' &&  playerPick == 'spock') ||
        (computerPick == 'lizard' &&  playerPick == 'spock') ||
        (computerPick == 'lizard' &&  playerPick == 'paper') ||
        (computerPick == 'spock' &&  playerPick == 'scissors') ||
        (computerPick == 'spock' &&  playerPick == 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Wygrana!";
        player.score++;
        playerPointsElem.innerHTML = player.score;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Wygrana!";
        computer.score++;
        computerPointsElem.innerHTML = computer.score;
    } else {
      playerResultElem.innerHTML = "Remis!";
      computerResultElem.innerHTML = "Remis!";
    }

}

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
    checkWiner();
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

// check if player or computer have 10 points
function checkWiner() {
  var text;
  if (player.score == 10) {
    text = "Wygrałeś";
    onceMore(text);
  } else if (computer.score == 10) {
    text = "Przegrałeś";
    onceMore(text);
  }
}


function onceMore(text) {
    gameState = 'ended';
    if (confirm(text) == true) {
        newGame();
    } else {
        alert("Moze innym razem !")
    }
    setGameElements();

}
