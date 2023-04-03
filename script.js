const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const stopButton = document.getElementById("stop");
const startButton = document.getElementById("start");
const result = document.getElementById("result");

const gameContainer = document.querySelector(".game-container");
const controls = document.querySelector(".controls-container");

let cards;
let interval;
let firstCard = false;
let secondCard = false;

const items = [
    { name: "0" , image: "smile.png"},
    { name: "1" , image: "angry.png"},
    { name: "2" , image: "expressionless.png"},
    { name: "3" , image: "laugh.png"},
    { name: "4" , image: "love.png"},
    { name: "5" , image: "melting.png"},
    { name: "6" , image: "santa.png"},
    { name: "7" , image: "grine.png"},
    { name: "8" , image: "zipper.png"},
    { name: "9" , image: "zany.png"},
    
    
  ];

  
let seconds = 0,minutes = 0;
let movesCount = 0,winCount = 0;

const timeGenerator = () => {
    seconds+=1;
    if(seconds>=60)
    {
        seconds=0;
        minutes+=1;
    }
     secondsValue = (seconds < 10) ? `0${seconds}` : seconds;
     minutesValue = minutes < 10 ? `0${minutes}` : minutes;
timeValue.innerHTML=`<span>TIME : </span>${minutesValue}:${secondsValue}`;
};

const movesCounter = () => {
    movesCount+=1;
    moves.innerHTML=`<span>MOVES : </span>${movesCount}`;
};

const randomGenerator =() => {
    tempArray = [...items];
    const cardValues=[];
    

    for(let i=0;i<8;i++){
    const randomIndex=Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex,1);
     }
     return cardValues;
};

const matrixGenerator = (cardValues) => {
    gameContainer.innerHTML='';
    cardValues=[...cardValues,...cardValues];
    cardValues.sort(() => Math.random()-0.5);
    for(let i=0;i<16;i++)
    {
        gameContainer.innerHTML += `
        <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
        </div>
     `;
     
    }




cards=document.querySelectorAll(".card-container");
cards.forEach((card) => {
    card.addEventListener("click",() => {
        if (!card.classList.contains("matched")&& !card.classList.contains("flipped")) {
            
            card.classList.add("flipped");
            
            if (!firstCard) {
              
              firstCard = card;
              
              firstCardValue = card.getAttribute("data-card-value");
            } else {
             
              movesCounter();
              
              secondCard = card;
              let secondCardValue = card.getAttribute("data-card-value");
              if (firstCardValue == secondCardValue) {
                
                firstCard.classList.add("matched");
                secondCard.classList.add("matched");
                
                firstCard = false;
                
                winCount += 1;
                
                if (winCount == Math.floor(cardValues.length / 2)) {
                    
                    let delay = setTimeout(() => {
                        result.innerHTML = `<h2>You Won</h2>
                <h4>Moves: ${movesCount}</h4>`;
                  stopGame();
                      }, 800);

                  
                }
              } else {
                
                let [tempFirst, tempSecond] = [firstCard, secondCard];
                firstCard = false;
                secondCard = false;
                let delay = setTimeout(() => {
                  tempFirst.classList.remove("flipped");
                  tempSecond.classList.remove("flipped");
                }, 600);
              }
            }
          }
    })
})
};

startButton.addEventListener("click",() => {
    
    startButton.classList.add("hide");
    controls.classList.add("hide");
    stopButton.classList.remove("hide");
    initializer();

});

const  initializer = () => {
    seconds=0;
    minutes=0;
    movesCount=0;
    winCount=0;
    
    result.innerHTML="";

    interval=setInterval(timeGenerator,1000);
    moves.innerHTML=`<span>MOVES : </span>${movesCount}`;

    let cardValues=randomGenerator();
    matrixGenerator(cardValues);
    console.log(cardValues);
};

stopButton.addEventListener("click", stopGame = () => {
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    controls.classList.remove("hide");
    clearInterval(interval);
    

});