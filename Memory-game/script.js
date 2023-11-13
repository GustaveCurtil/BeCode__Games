const albumCovers = ['albums/Air - Talkie Walkie.jpg', 'albums/Alfa Mist - Antiphon.jpg', 'albums/Ali Farka Toure - Talking Timbuktu.jpg', 'albums/Amadou _ Miriam - Dimanche A Bamako.jpg', 'albums/Bach - The Goldberg Variations Glenn Gould.jpg', 'albums/BADBADNOTGOOD - bbng2.jpg', 'albums/Ballake Sissoko _ Baba Sissoko - Sissoko _ Sissoko.jpg', 'albums/Bendik Giske - Cracks.jpg', 'albums/Bohren _ Des Club Of Gore - Sunset Mission.jpg', 'albums/Brian Eno - Apollo.jpg', 'albums/Buena Cista Social CLub - Buena Cista Social Club.jpg', 'albums/Caterina Barbieri - Patterns Of Consciousness.jpg', 'albums/Cocteau Twins - Heaven or Las Vegas.jpg', 'albums/Connan Mockasin - Caramel.jpg', 'albums/D_Angelo and the Vanguard - Black Messiah.jpg', 'albums/Daft Punk - Random Acces Memories.jpg', 'albums/Darkside - Psychic.jpg', 'albums/Erykah Bady - Live.jpg', 'albums/Far Out Radio Systems - On Boolean Plains.jpg', 'albums/Frank Ocean - Blond.jpg', 'albums/Gabor Szabo - 1969.jpg', 'albums/Godspeed You! Black Emperor - Lift Your Skinny Fists Like Antennar to Heaven.jpg', 'albums/Hendrik Lasure - Het Wiel.jpg', 'albums/Hiatus Kayote - Choose Your Weapon.jpg', 'albums/Hiroshi Yoshimura - Green.jpg', 'albums/John Surman - Invisible Threads.jpg', 'albums/José James - No Beginning No End.jpg', 'albums/Loscil - First Narrows.jpg', 'albums/Luiz Bonfa - Solo in Rio 1959.jpg', 'albums/Mac DeMarco - Five Easy Hot Dogs.jpg', 'albums/Mac Miller - Circles.jpg', 'albums/Manu Chao - Clandestino.jpg', 'albums/Midori Takada - Through The Looking Glass.jpg', 'albums/Mild High Club - Timeline.jpg', 'albums/Moby - Wait For Me.jpg', 'albums/Mort Garson - Mother Earth_s Plantasia.jpg', 'albums/Norah Jones - Come Away With Me.jpg', 'albums/Nujabes - Modal Soul.jpg', 'albums/Okay Kaya - Watch This Liquid Pour Itself.jpg', 'albums/Pablo_s Eye - Spring Break.jpg', 'albums/Pauline Oleveros, Stuart Dempster _ Panaiotis - Deep Listening.jpg', 'albums/Ry Cooder _ Manuel Galbán - Mambo Sinuendo.jpg', 'albums/SCHNTZL - Catwalk.jpg', 'albums/SOPHIE - Oil Of Every Pearl_s Un-Insides.jpg', 'albums/Space Afrika - Honest Labour.jpg', 'albums/The Cranberries - Everybody else is doing it so why can_t we.jpg', 'albums/Tierra Whack - Whack World.jpg', 'albums/Upsammy - Zoom.jpg', 'albums/Wau Wau Collectif - Yaral Sa Doom.jpg', 'albums/XXYYXX - xxyyxx.jpg']

// 1.kies een moeilijkheid en druk op Spelen -> spel wordt gegenereerd.


// kies spel
// bij 'klick' op spelen, doe hetvolgende ->
// 1 shuffle albumCovers
// 1.gerereer de x (adh van moeilijkheid) eerste albums in een nieuwe array. 
// 2. doe dit maal 2
// 3. shuffle de nieuwe array
//     array.forEach(element => {
//         1. Maak voor elk album een tegel aan
//         2. Bepaal de breedte (in precentage) naargelang het aantal kaarten (simpele berekening) 
//     });

//check game type + display
let difficulties = {
    'easy': 8, 
    'medium': 18, 
    'hard': 32,
};

gameType = difficulties['easy'] //wegdoen?
let buttons = document.querySelectorAll(".difficulty button");

buttons.forEach(element => {
    element.addEventListener("click", (e) => {
        buttons.forEach(element => {
            element.style.backgroundColor = 'white'
            element.style.color = "black";
        });
        e.target.style.backgroundColor = 'var(--main-color)';
        e.target.style.color = 'white';
        gameType = difficulties[element.innerHTML.toLowerCase()];
})
});



//shuffle the albums + make array depending on gameType and double it
const playButton = document.querySelector(".play button");
let gameAlbums = []

let score = 0
let everySecond

playButton.addEventListener("click", (e)=>{
    const displayScore = document.querySelector(".score div")
    displayScore.innerHTML=0
    score = 0
    startGame()
})

//spel begint
function startGame() {
    shuffleArray(albumCovers);
    makeGameAlbums(gameType)
    shuffleArray(gameAlbums)
    createCards();
    turnCard();
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//maak aantal kaarten aan naargelang de moeilijkheidsgraad (input zijn aantal kaarten)
function makeGameAlbums(cards) {
    gameAlbums=[]
    for (let i = 0; i < cards; i++) {
        gameAlbums.push(albumCovers[i])
        gameAlbums.push(albumCovers[i])
    }
    return gameAlbums
}

//maak de tegels aan
function createCards() {
    const frame = document.querySelector(".frame");
    let gridNumber = Math.sqrt(gameAlbums.length);
    frame.style.gridTemplateColumns = "1fr ".repeat(gridNumber);
    frame.style.gridTemplateRows = "1fr ".repeat(gridNumber);
    frame.innerHTML="";
    gameAlbums.forEach(element => {

        const card = document.createElement("div");
        card.className = "card";

        const albumCover = document.createElement("img");
        albumCover.src = element;

        const backside = document.createElement("div");
        backside.className = "backside";
        backside.style.display= "block";

        card.appendChild(albumCover);
        card.appendChild(backside);

        frame.appendChild(card); 
    });
}

//klicking on backside makes card turn over.
function turnCard() {
    score = 0
    console.log(everySecond)
    clearInterval(everySecond)
    const frame = document.querySelector(".frame");
    frame.addEventListener("click", (e) =>{
        if (secondCard===0 && hasFlippedCard && score==0) {
            score=0
            everySecond = setInterval(adjustScore , 1000)
            console.log(everySecond)
        } if (foundCards.length==card.length) {
            clearInterval(everySecond)
        }
    })
    const displayScore = document.querySelector(".score div")

    function adjustScore() {
        score+= 1
        displayScore.innerHTML=score;
    };

    let hasFlippedCard = false;
    let card = document.querySelectorAll(".card");
    let foundCards = []
    let firstCard = 0
    let secondCard = 0

     

    card.forEach(element => {
        let cardAlbum = element.children[0]
        let cardBack = element.children[1]
        element.addEventListener("click", (e)=> {    
            if (cardBack.style.display == 'block' && hasFlippedCard==false) {
                firstCard = [cardAlbum, cardBack]
                removePreviousCards(card)
                foundCards.forEach(found => {
                    found[0].style.display = "block"
                    found[1].style.display = "none"
                });
                hasFlippedCard = true;
                cardAlbum.style.display = "block"
                cardBack.style.display = "none"
            } if (cardBack.style.display == 'block' && hasFlippedCard==true) {
                secondCard = [cardAlbum, cardBack]
                hasFlippedCard=false;
                score += 5;
                displayScore.innerHTML=score;
                cardAlbum.style.display = "block"
                cardBack.style.display = "none";
                if (secondCard[0].src===firstCard[0].src) {
                    foundCards.push(firstCard, secondCard)
                }  
                if (foundCards.length==card.length) {
                    clearInterval(everySecond)
                    console.log("you won")
                    highscoreChecker(score, gameType)
                }
            }   
        });
    })
}


function removePreviousCards(weg) {
    weg.forEach(element => {     
        let cardAlbum = element.children[0]
        let cardBack = element.children[1]
        cardAlbum.style.display = "none"
        cardBack.style.display = "block"
        
    });
}


//highscore displayen beneden
let highscore = {
    'easy': 1000, 
    'medium': 1000, 
    'hard': 1000,
};

function highscoreChecker(score, gametype) { 
    if (gameAlbums.length==16 && highscore['easy']>score) {
        highscore['easy']=score
        document.querySelector('.easy-score').innerHTML=highscore['easy']
    } 
    if (gameAlbums.length==36 && highscore['medium']>score) {
        highscore['medium']=score
        document.querySelector('.medium-score').innerHTML=highscore['medium']
    }
    if (gameAlbums.length==64 && highscore['hard']>score) {
        highscore['hard']=score
        document.querySelector('.hard-score').innerHTML=highscore['hard']
    }
}

//highscores opslaan
