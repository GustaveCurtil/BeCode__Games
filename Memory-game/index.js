import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, set, onValue} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyDyKJyYJ45A59J5entA0XfBe-UWHD9Q0cU",
    authDomain: "memory-game-f886a.firebaseapp.com",
    databaseURL: "https://memory-game-f886a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "memory-game-f886a",
    storageBucket: "memory-game-f886a.appspot.com",
    messagingSenderId: "398039645605",
    appId: "1:398039645605:web:5bdfd9f6816d2e6db6bc4c",
    measurementId: "G-5Z81ZV6DSC"
};

const app = initializeApp(firebaseConfig)

function writeData(time, userId, score, difficulty){
    const db = getDatabase();
    const highscoreData = ref(db, time);

    set(highscoreData, {
        name: userId,
        highscore: score, 
        difficulty: difficulty
    })
}

const db =getDatabase()
const shoppingList = ref(db)

onValue(shoppingList, function(snapshot) {
    let dataHighscores = Object.values(snapshot.val())
    let easyScores = []
    let mediumScores = []
    let hardScores = []

    dataHighscores.forEach(data => {
        if (data.difficulty=="easy" && !easyScores.includes(data)) {
            easyScores.push(data)
        } if (data.difficulty=="medium" && !mediumScores.includes(data)) {
            mediumScores.push(data)
        } if (data.difficulty=="hard" && !hardScores.includes(data)) {
            hardScores.push(data)
        }
    });
    
    let titelEasy = document.querySelector(".highscore-easy")
    let titelMedium = document.querySelector(".highscore-medium")
    let titelHard = document.querySelector(".highscore-hard")
    
    titelEasy.innerHTML = "<p>easy</p>"
    titelMedium.innerHTML = "<p>medium</p>"
    titelHard.innerHTML = "<p>hard</p>"

    let lowToHigh = (array) => {
        return array.sort((a,b) => {
            return a.highscore - b.highscore;
        })
    }

   

    lowToHigh(easyScores).forEach(score => {
        let titel = document.querySelector(".highscore-easy")
        let displayName = document.createElement("div");
        let displayScore = document.createElement("div");
        displayName.className = "highscore-name";
        displayScore.className = "highscore-score";
        displayName.textContent = score.name;
        displayScore.textContent = score.highscore;
        titel.appendChild(displayName, titel.nextSibling);
        titel.appendChild(displayScore, titel.nextSibling);
    });

    lowToHigh(mediumScores).forEach(score => {
        let titel = document.querySelector(".highscore-medium")
        let displayName = document.createElement("div");
        let displayScore = document.createElement("div");
        displayName.className = "highscore-name";
        displayScore.className = "highscore-score";
        displayName.textContent = score.name;
        displayScore.textContent = score.highscore;
        titel.appendChild(displayName, titel.nextSibling);
        titel.appendChild(displayScore, titel.nextSibling);
    });

    lowToHigh(hardScores).forEach(score => {
        let titel = document.querySelector(".highscore-hard")
        let displayName = document.createElement("div");
        let displayScore = document.createElement("div");
        displayName.className = "highscore-name";
        displayScore.className = "highscore-score";
        displayName.textContent = score.name;
        displayScore.textContent = score.highscore;
        titel.appendChild(displayName, titel.nextSibling);
        titel.appendChild(displayScore, titel.nextSibling);
    });
})



let buttonEasy = document.querySelector("#save-easy")
let buttonMedium = document.querySelector("#save-medium")
let buttonHard = document.querySelector("#save-hard")
let playerName = document.querySelector("input")

buttonEasy.addEventListener("click", function() {addDataToHighscores('easy')});
buttonEasy.addEventListener("touch", function() {addDataToHighscores('easy')});

buttonMedium.addEventListener("click", function() {addDataToHighscores('medium')});
buttonMedium.addEventListener("touchstart", function() {addDataToHighscores('medium')});

buttonHard.addEventListener("click", function() {addDataToHighscores('hard')});
buttonHard.addEventListener("touchstart", function() {addDataToHighscores('hard')});

function addDataToHighscores(difficulty) {
    if (playerName.value.length!==0 && highscore[difficulty]<999) {
        const now = new Date()
        writeData(difficulty + " - " + highscore[difficulty] + " - " + playerName.value, playerName.value, highscore[difficulty], difficulty)
        highscore[difficulty]=1000;
    }
}
