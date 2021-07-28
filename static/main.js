document.addEventListener('DOMContentLoaded', ()=>{

    //cards
    const cardArray = [
        {
            name: "fries",
            img: 'static/images/fries.png'
        },

        {
            name: "cheeseburger",
            img: "static/images/cheeseburger.png"
        },

        {
            name: "hotdog",
            img: "static/images/hotdog.png"
        },

        {
            name: "ice-cream",
            img: "static/images/ice-cream.png"
        },


        {
            name: "milshake",
            img: "static/images/milkshake.png"
        },

        {
          name: "pizza",
          img: "static/images/pizza.png"  
        },

           {
            name: "fries",
            img: 'static/images/fries.png'
        },

        {
            name: "cheeseburger",
            img: "static/images/cheeseburger.png"
        },

        {
            name: "hotdog",
            img: "static/images/hotdog.png"
        },

        {
            name: "ice-cream",
            img: "static/images/ice-cream.png"
        },


        {
            name: "milshake",
            img: "static/images/milkshake.png"
        },

        {
          name: "pizza",
          img: "static/images/pizza.png"  
        },
        
    ]
    
    //randomizer
    cardArray.sort(() => 0.5 - Math.random())

    const board = document.querySelector(".board");
    const resetButton = document.querySelector(".resetGame");
    const enterButton = document.querySelector(".enter");
    const content = document.querySelector(".content")
    const login = document.querySelector(".login")
    const firstPlayerResult = document.querySelector(".firstPlayerResult")
    const secondPlayerResult = document.querySelector(".secondPlayerResult")
    const showPlayerLabel = document.querySelector(".showPlayerLabel");


    //help variables
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let firstPlayerScore = 0;
    let secondPlayerScore = 0;
    let firstPlayer;
    let secondPlayer;
    let currentPlayer

    resetButton.addEventListener('click', resetGame)

    //create board
    async function createBoard(){
        for(let i =0; i< cardArray.length; i++){
            const card = document.createElement('img')
            card.setAttribute('src', 'static/images/blank.png')
            card.setAttribute('data-id', i);
            card.addEventListener('click',flipCard);
            await sleep(100);
            board.appendChild(card);
        }
    }
 
    //check for matches
    function checkForMatch(){
        let cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        //double click
        if(optionOneId == optionTwoId) {
            cards[optionOneId].setAttribute('src', 'static/images/blank.png')
            cards[optionTwoId].setAttribute('src', 'static/images/blank.png')
            alert('You have clicked the same image!')

            changePlayer();
        }

        //couple founded
        else if(cardsChosen[0] === cardsChosen[1]){

            playerScore();

            cards[optionOneId].setAttribute('src','static/images/white.png');
            cards[optionTwoId].setAttribute('src','static/images/white.png');
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        }else{
            cards[optionOneId].setAttribute('src' , 'static/images/blank.png')
            cards[optionTwoId].setAttribute('src' , 'static/images/blank.png')

            changePlayer();       
        }

        cardsChosen = [];
        cardsChosenId = [];

        GameOver();     
    }

    //flip card
    function flipCard(){
        let cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        if(cardsChosen.length ===2){
            setTimeout(checkForMatch, 500);
        }
    }

    function resetGame(){
        cardsChosen = [];
        cardsChosenId = [];
        cardsWon = [];
        firstPlayerScore = 0;
        secondPlayerScore = 0;
        firstPlayerResult.innerHTML = firstPlayer + ':' + firstPlayerScore;
        secondPlayerResult.innerHTML = secondPlayer + ':' + secondPlayerScore;
        
        let elem = document.querySelector(".board");
        
        let first = elem.firstElementChild;

        while (first) {
            first.remove();
            first = elem.firstElementChild;
        }
        cardArray.sort(() => 0.5 - Math.random())

        createBoard();
    }

    function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }

    //start game
    enterButton.addEventListener('click', ()=>{
        content.style.visibility = 'visible';
        //login.style.visibility = 'hidden';
        firstPlayer  = document.querySelector(".FirstPlayer").value
        secondPlayer  = document.querySelector(".SecondPlayer").value;
        if(firstPlayer === "" ||secondPlayer === ""){
            alert("Enter your name");
        }else{
        firstPlayer = firstPlayer.charAt(0).toUpperCase() + firstPlayer.slice(1);
        firstPlayerResult.innerHTML =firstPlayer + ':' + firstPlayerScore;
        showPlayerLabel.innerHTML = "Current player : " + firstPlayer;       
        secondPlayer = secondPlayer.charAt(0).toUpperCase() + secondPlayer.slice(1);
        secondPlayerResult.innerHTML =secondPlayer + ':' + secondPlayerScore;
        currentPlayer = firstPlayer;
        login.remove();
        createBoard();
        }
    })


    //next player turn
    function changePlayer(){
        if(currentPlayer === firstPlayer){
            currentPlayer = secondPlayer;
            showPlayerLabel.innerHTML = "current player : " + currentPlayer;
        }else{
            currentPlayer = firstPlayer;
            showPlayerLabel.innerHTML = "Current player : " + currentPlayer;
            }
    }

    //change score
    function playerScore(){
        if(currentPlayer === firstPlayer){
            firstPlayerScore += 1;
            firstPlayerResult.innerHTML =firstPlayer + ':' + firstPlayerScore
        }else{
            secondPlayerScore +=1;
            secondPlayerResult.innerHTML = secondPlayer + ':' + secondPlayerScore
        } 
    }

    //game completed
    function GameOver(){
        if(cardsWon.length === cardArray.length/2){
            if(firstPlayerScore === secondPlayerScore){
                showPlayerLabel.textContent = "Remis"
            }else if(firstPlayerScore > secondPlayerScore){
                showPlayerLabel.textContent = "Congratulation " + firstPlayer + "!!!"
            }else{
                showPlayerLabel.textContent = "Congratulation " + secondPlayer + "!!!"
            }       
        }
    }
   
})