let stone = document.querySelector('.button-wrapper button:nth-child(1)');
let paper = document.querySelector('.button-wrapper button:nth-child(2)');
let scissors = document.querySelector('.button-wrapper button:nth-child(3)');
let attack = document.querySelector('.attack-button');

const options = ['🗿', '📃', '✂️']
let displayPlayer = document.querySelector(".display-you")
let displayRobot = document.querySelector(".display-robot")
let weaponPlayer = "";
let scorePlayer = 0;
let scoreRobot = 0;

let displayScorePlayer = document.querySelector("#score-you")
let displayScoreRobot = document.querySelector("#score-robot")

displayScorePlayer.innerHTML = scorePlayer;
displayScoreRobot.innerHTML = scoreRobot;


stone.addEventListener('click', function() {
    weaponPlayer = "🗿";
    displayPlayer.innerHTML = weaponPlayer;
    displayRobot.innerHTML = "😴";
});

paper.addEventListener('click', function() {
    weaponPlayer = "📃";
    displayPlayer.innerHTML = weaponPlayer;
    displayRobot.innerHTML = "😴";
});

scissors.addEventListener('click', function() {
    weaponPlayer = "✂️";
    displayPlayer.innerHTML = weaponPlayer;
    displayRobot.innerHTML = "😴";
});

attack.addEventListener('click', function() {
    if (weaponPlayer=="") {
        message.innerHTML="Choose your weapon"
    } else {
    fight();
}
});

function fight() {
    let weaponRobot = options[Math.floor(Math.random() * 3)]
    displayRobot.innerHTML = weaponRobot;
    if (weaponPlayer=="🗿" && weaponRobot=="✂️" || weaponPlayer=="📃" && weaponRobot=="🗿" || weaponPlayer=="✂️" && weaponRobot=="📃") {
        youWin() 
    } else if (weaponPlayer == weaponRobot) {
        draw()
    } else{
        youLose()
    }
}

let message = document.querySelector("p")

function youWin() {
    scorePlayer+=1
    displayScorePlayer.innerHTML = scorePlayer;
    message.innerHTML="You win!"
}

function draw() {
    message.innerHTML="It's a draw"
}

function youLose() {
    scoreRobot+=1
    displayScoreRobot.innerHTML = scoreRobot;
    message.innerHTML="Robot wins..."
}


