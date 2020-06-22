// ---------- VARIABLES ----------
let scores = null,
    pointslimit = 0,
    rounds = 0,
    pointsType = null,
    players = {
        p1: {
            name: null,
            currentPoints: 0
        },
        p2: {
            name: null,
            currentPoints: 0
        }
    };
// ---------- ELEMENTS HTML ----------
const SUBTITLE = document.getElementById('subtitle');
const PLAYER1_NAME = document.getElementById('p1Name');
const PLAYER2_NAME = document.getElementById('p2Name');
const POINTS_TYPE = document.getElementById('pointsType');
const POINTS_NUMBER = document.getElementById('pointsNumber');

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
function setPointsPlayers(points) {
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

// ---------- PLAY DICES (jogar dados) ----------
function playDices(player) {
    if (player === 1) {

    } else if (player === 2) {

    }
}

// ---------- PLAYER WINNER ----------
function setPlayerWinner(player) {
    if (player === 1) {

    } else if (player === 2) {

    }
}