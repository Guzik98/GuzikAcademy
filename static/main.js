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
    const resultDisplay = document.querySelector(".result");
    const resetButton = document.querySelector(".resetGame");
    const buttonCreate = document.querySelector(".createBoard")
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let score = 0;

    //show card before gmae to do

    // time out afther the click to do

    //reset game

    //new game


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
        if(optionOneId == optionTwoId) {
            cards[optionOneId].setAttribute('src', 'static/images/blank.png')
            cards[optionTwoId].setAttribute('src', 'static/images/blank.png')
            alert('You have clicked the same image!')
        }

        else if(cardsChosen[0] === cardsChosen[1]){
            score += 1;
            resultDisplay.innerHTML= score;
            cards[optionOneId].setAttribute('src','static/images/white.png');
            cards[optionTwoId].setAttribute('src','static/images/white.png');
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        }else{
            cards[optionOneId].setAttribute('src' , 'static/images/blank.png')
            cards[optionTwoId].setAttribute('src' , 'static/images/blank.png')
        }
        cardsChosen = [];
        cardsChosenId = [];

        if(cardsWon.length === cardArray.length/2){
            resultDisplay.textContent = "you have won"
        }
    }

    //flip card
    function flipCard(){
        let cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        if(cardsChosen.length ===2){
            sleep(50000)
            setTimeout(checkForMatch, 500);
        }
    }


    function resetGame(){
        cardsChosen = [];
        cardsChosenId = [];
        cardsWon = [];
        score = 0;

        let elem = document.querySelector(".board");
        
        var first = elem.firstElementChild;

        while (first) {
            first.remove();
            first = elem.firstElementChild;
        }
        cardArray.sort(() => 0.5 - Math.random())
        
        createBoard();

    }

    resetButton.addEventListener('click', resetGame)

    function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }

    createBoard();

})