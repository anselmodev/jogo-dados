/*Desenvolvido por Anselmo Lima - Projeto Faculdade*/
// ---------- VARIABLES ----------
let scores = null,
    pointslimit = 0,
    rounds = 0,
    pointsType = null,
    players = {
        p1: {
            name: null,
            currentPoints: 0,
            launched: false
        },
        p2: {
            name: null,
            currentPoints: 0,
            launched: false
        }
    },
    currentSideDice1 = '',
    currentSideDice2 = '',
    player1Dice = 0,
    player2Dice = 0,
    playersHistoric = [],
    endGame = false;


// ---------- ELEMENTS HTML ----------
const SUBTITLE = document.getElementById('subtitle');
const PLAYER1_NAME = document.getElementById('p1Name');
const PLAYER2_NAME = document.getElementById('p2Name');
const POINTS_TYPE = document.getElementById('pointsType');
const POINTS_LIMIT = document.getElementById('pointsLimit');

const BTN_SCORES = document.getElementById('showScores');
const BTN_START_GAME = document.getElementById('startGame');
const BTN_EXIT_SCORES = document.getElementById('backToGame');
const BTN_PL1_LAUNCH = document.getElementById('player1Launch');
const BTN_PL2_LAUNCH = document.getElementById('player2Launch');
const BTN_RESTART_GAME = document.getElementById('restartGame');
const BTN_END_GAME = document.getElementById('endGame');

// SHOW REGISTER BOX
showBoxes('register', true);

// ---------- LOCAL STORAGE SCORES ----------
function getScores() {
    const scoresNow = localStorage.getItem('scores');
    return JSON.parse(scoresNow);
}

function setScores(player1, player2) {
    const mountScores = JSON.stringify({
        p1: {
            rounds: player1.rounds,
            points: player1.points
        },
        p2: {
            rounds: player2.rounds,
            points: player2.points
        },
    });
    localStorage.setItem('scores', mountScores);
}


// ---------- HELPERS ----------
// lock buttons
function lockBtn(id, status) {
    document.getElementById(id).disabled = status;
}

// Show / hide boxes
function showBoxes(id, show) {
    if (!!show) {
        document.getElementById(id).classList.add('show-box');

    } else {
        document.getElementById(id).classList.remove('show-box');
    }
}

// Show points numbers on box
function showPointsBox() {
    document.getElementById('player1Points').innerText = players.p1.currentPoints;
    document.getElementById('player2Points').innerText = players.p2.currentPoints;
}

// update player points
function updatePoints(player) {
    // not winner
    if (!player) {

        setTimeout(function () {
            alert('Empate! Jogem novamente.');
        }, 800)

    } else if (pointsType === 'inc') {

        player === 1 ? players.p1.currentPoints++ : players.p2.currentPoints++;

    } else if (pointsType === 'dec') {

        player === 1 ? players.p1.currentPoints-- : players.p2.currentPoints--;

    }

    // show points updated
    showPointsBox();

    // check winner game
    const GET_WINNER = setPlayerWinner();

    if (GET_WINNER !== 0) {
        setTimeout(function () {
            const WINNER_NAME = GET_WINNER === 1 ? players.p1.name : players.p2.name;
            alert('Jogador(a) ' + WINNER_NAME + ' venceu!');

            // lock game
            lockBtn('player1Launch', true);
            lockBtn('player2Launch', true);
            endGame = true;

        }, 1000);
    }

    // enable launch buttons and reset round
    if (!endGame) {
        lockBtn('player1Launch');
        lockBtn('player2Launch');

        resetRound();
    }

}

// Update historic
function updateHistoric() {
    playersHistoric.unshift('Rodada 1: Anselmo ganhou de 5 a 3.')
}

// ---------- REGISTER PLAYERS ----------
function registerPlayers(player1Name, player2Name) {
    if (player1Name.length < 3 || player2Name.length < 3) {
        alert("É obrigatório o registro dos jogadores! \n\n (Mínimo de 3 caracteres)")
    } else {
        players.p1.name = player1Name;
        players.p2.name = player2Name;
    }
}


// ---------- POINTS TYPE ----------
function setPointsType() {
    if (!type || type === '0') {
        alert('Defina o tipo de pontos para os jogadores!')
    } else if (type === '1') {
        pointsType = 1
    } else if (type === '2') {
        pointsType = 2
    }
}


// ---------- POINTS TO PLAYERS ----------
function setPointsWinnerPlayer(points) {
    if (!points || points !== 0) {
        alert('Defina a quantidade de pontos para os jogadores!');
    } else {
        pointslimit = points;
        players.p1.currentPoints = points;
        players.p2.currentPoints = points;
    }
}


// ---------- ROUNDS ----------
function setRounds(roundNumber) {
    rounds++;
}

function resetRound(end) {
    // reset last dice and launched
    players.p1.launched = false;
    players.p2.launched = false;
    player1Dice = pointsType === 'dec' ? pointslimit : 0;
    player2Dice = pointsType === 'dec' ? pointslimit : 0;
    endGame = false;

    // reset dice
    if (!!end) {
        const actualPoints = pointsType === 'dec' ? pointslimit : 0;

        if (currentSideDice1 || currentSideDice2) {
            document.getElementById('dice1').classList.remove(currentSideDice1);
            document.getElementById('dice2').classList.remove(currentSideDice2);

            currentSideDice1 = '';
            currentSideDice2 = '';
        }

        // reset points
        players.p1.currentPoints = actualPoints;
        players.p2.currentPoints = actualPoints;

        // show points player
        document.getElementById('player1Points').innerText = actualPoints;
        document.getElementById('player2Points').innerText = actualPoints;

        // enabled buttons
        lockBtn('player1Launch');
        lockBtn('player2Launch');
    }

}


// ---------- COMPARE RESULTS ----------
function compareDiceWinner() {
    if (player1Dice > player2Dice) {
        return 1;
    } else if (player2Dice > player1Dice) {
        return 2
    } else {
        return 0;
    }
}

function calcResults() {
    if (!!players.p1.launched && !!players.p2.launched) {
        const WINNER = compareDiceWinner();

        if (WINNER === 0) {
            updatePoints();
            return false;
        }

        // remove points from loser
        if (pointsType === 'dec') {
            WINNER === 1 ? updatePoints(2) : updatePoints(1);
        }

        // add points to winner
        else if (pointsType === 'inc') {
            WINNER === 1 ? updatePoints(1) : updatePoints(2);
        }

    }
}


// ---------- NEW GAME ----------
function setNewGame() {
    scores = null;
    pointslimit = 0;
    rounds = 0;
    pointsType = null;
    players.p1.name = null;
    players.p2.name = null;
    players.p1.currentPoints = 0;
    players.p2.currentPoints = 0;
}


// ---------- RANDOM NUMBER AND REGISTER DICE ----------
function randNumber() {
    return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
}

function registerLastDice(number, randomNumber) {
    const DICE = document.getElementById('dice' + number);
    let showDiceFace = 'show-' + randomNumber;

    if (number === 1) {
        if (currentSideDice1) {
            DICE.classList.remove(currentSideDice1);
            currentSideDice1 = '';
        }

        setTimeout(function () {
            DICE.classList.add(showDiceFace);
            currentSideDice1 = showDiceFace;
            players.p1.launched = true;
            player1Dice = randomNumber;

            // check winner
            calcResults();
        }, 35);
    } else {
        if (currentSideDice2) {
            DICE.classList.remove(currentSideDice2);
            currentSideDice2 = '';
        }

        setTimeout(function () {
            DICE.classList.add(showDiceFace);
            currentSideDice2 = showDiceFace;
            players.p2.launched = true;
            player2Dice = randomNumber;

            // check winner
            calcResults();
        }, 35);
    }

}

function raffledNumberOnDice(number) {
    const GET_RANDOM_NUMBER = randNumber();

    console.log('Número sorteado do dado ' + number + ': ', GET_RANDOM_NUMBER);

    registerLastDice(number, GET_RANDOM_NUMBER);
}


// ---------- PLAY DICES AND ANIMATIONS (animação - jogar dados e mostrar num. sorteado) ----------
function diceAnimation(diceNumber) {
    const DICE_LAUNCH = document.getElementById('dice' + diceNumber);

    DICE_LAUNCH.classList.add('dice-launch');

    setTimeout(function () {
        DICE_LAUNCH.classList.remove('dice-launch');

        // set raffled number on dice
        raffledNumberOnDice(diceNumber);
    }, 2000);
}

function playDice(player) {

    if (player === 1) {
        diceAnimation(1);
    } else if (player === 2) {
        diceAnimation(2);
    }
}


// ---------- PLAYER WINNER ----------
function setPlayerWinner() {
    if (pointsType === 'inc' && players.p1.currentPoints === pointslimit) {
        return 1;
    } else if (pointsType === 'inc' && players.p2.currentPoints === pointslimit) {
        return 2;
    } else if (pointsType === 'dec' && players.p1.currentPoints === 0) {
        return 2;
    } else if (pointsType === 'dec' && players.p2.currentPoints === 0) {
        return 1;
    } else {
        return 0;
    }
}


// ---------- PLAYER WINNER TO SCORE ----------
function setPlayerWinnerScore(player) {
    if (player === 1) {

    } else if (player === 2) {

    }
}


// ---------- BUTTONS ACTIONS GAME ----------
POINTS_TYPE.addEventListener('change', function () {
    pointsType = this.value;
});

BTN_START_GAME.addEventListener('click', function () {
    const p1Name = PLAYER1_NAME.value;
    const p2Name = PLAYER2_NAME.value;
    const ptType = POINTS_TYPE.value;
    const ptLimit = Number(POINTS_LIMIT.value);

    if (p1Name.length < 3 || p2Name.length < 3) {

        alert('É obrigatório o nome dos jogadores! Mínimo de 3 caracteres.');

    } else if (ptType === 'none' || ptLimit <= 1) {
        alert('É obrigatório definir o Tipo de Pontuação e Limite de Pontos de pelo menos (2)!');
    } else {

        players.p1.name = p1Name;
        players.p2.name = p2Name;
        pointslimit = Number(ptLimit);

        if (POINTS_TYPE.value === 'dec') {
            players.p1.currentPoints = POINTS_LIMIT.value;
            players.p2.currentPoints = POINTS_LIMIT.value;
        }

        // go to box game
        showBoxes('register');
        showBoxes('game', true);

        // Set players name
        document.getElementById('playe1Name').innerText = p1Name;
        document.getElementById('playe2Name').innerText = p2Name;

        // Set players points
        if (ptType === 'dec') {
            document.getElementById('player1Points').innerText = ptLimit;
            document.getElementById('player2Points').innerText = ptLimit;
        }
    }
});

BTN_SCORES.addEventListener('click', function () {
    showBoxes('register');
    showBoxes('scores', true);
});

BTN_EXIT_SCORES.addEventListener('click', function () {
    showBoxes('scores');
    showBoxes('register', true);
});

BTN_PL1_LAUNCH.addEventListener('click', function () {
    lockBtn('player1Launch', true);
    playDice(1);
});

BTN_PL2_LAUNCH.addEventListener('click', function () {
    lockBtn('player2Launch', true);
    playDice(2);
});

BTN_RESTART_GAME.addEventListener('click', function () {
    const QUESTION = confirm(
        'Deseja Reiniciar o Jogo? A partida atual será perdida.'
    );

    // Check winner and reset game
    if (!!QUESTION) {
        resetRound(true);
    }
});

BTN_END_GAME.addEventListener('click', function () {
    const QUESTION = confirm(
        'Deseja Realmente Finalizar o Jogo?'
    );

    // Check winner and reset game
    if (!!QUESTION) {
        resetRound(true);

        // clean form
        PLAYER1_NAME.value = '';
        PLAYER2_NAME.value = '';
        POINTS_TYPE.value = 'none';
        POINTS_LIMIT.value = 10;

        // clean data
        players.p1.name = null;
        players.p2.name = null;
        pointslimit = 0;
        players.p1.currentPoints = 0;
        players.p2.currentPoints = 0;

        // clean players name
        document.getElementById('playe1Name').innerText = '';
        document.getElementById('playe2Name').innerText = '';

        // go to box register
        showBoxes('game');
        showBoxes('register', true);
    }

});

