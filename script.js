const Game = (function(doc){
    var isX = true;
    var isOver = false;
    var gridArray = [];
    var result = doc.querySelector(".result");
    var restartButton = doc.querySelector(".restart");
    var gridItems = [...doc.querySelectorAll(".grid-item")];
    var form = doc.querySelector(".form");
    var container = doc.querySelector(".container");
    var backButton = doc.querySelector(".back");
    var player1 = "";
    var player2 = "";
    var gameType = doc.querySelector(".game-type");
    var twoPlayer = doc.querySelector(".two-player"); 
    var ai = doc.querySelector(".ai"); 
    backButton.addEventListener("click", window.location.reload.bind(window.location));      
    const reset=()=>{
       gridItems.forEach((item)=>{
           item.textContent = "";
       });
       restartButton.style.display = "none";
       result.textContent = "";
       isX = true;
       isOver = false;       
    }
    
    const start = () => {
        container.style.display = "none";
        restartButton.addEventListener("click", reset);
        twoPlayer.addEventListener("click", ()=>{
           form.style.opacity = "1";
           form.reset();
           gameType.style.display = "none";
           form.addEventListener("submit", function(e){
               e.preventDefault();
               mode2();
           });
        })
         
        ai.addEventListener("click", ()=>{
            gameType.style.display = "none";
            form.style.display = "none";
            form.reset();
            container.style.display = "grid";
            result.style.display = "block";
            backButton.style.display = "inline-block";
            basicAI();
         })          
    }

    

    const updateGameboard = () => {
        gridArray = [...doc.querySelectorAll(".grid-item")].map((item)=>{
            return item.textContent;
        });
    }

    const emptyCells = ()=>{
       return gridItems.filter((item)=> item.textContent==="");          
    } 

    function basicAI(){
        console.log(gridItems);
        gridItems.forEach((item)=>{
            item.addEventListener("click", ()=>{
               if(isX && item.textContent === "" && !isOver){
                   item.textContent = "X";
                   isX = !isX;
                   if(!isX && emptyCells().length > 0 && !isOver){
                       let random = Math.floor(Math.random()*emptyCells().length);
                       let cell = emptyCells()[random];
                       cell.textContent = "O";
                       isX = !isX;
                   }
               }
               updateGameboard();
               if(checkWinner("X")){
                result.textContent = "Human Wins";
                isOver = true;
                restartButton.style.display = "block";
               }
               if(checkWinner("O")){
                result.textContent = "AI Wins";
                isOver = true;
                restartButton.style.display = "block";
               }
               if(isTie()){
                   result.textContent = "It's a tie";
                   isOver = true;
                   restartButton.style.display = "block";
               }
              
            })
        })
    }
    

    const mode2 = () => {
        container.style.display = "grid";
        backButton.style.display = "inline-block";
        result.style.display = "block";
        player1 = form.elements.player1.value;
        player2 = form.elements.player2.value;
        form.style.display = "none";
        form.reset();
        result.textContent = player1+"'s turn";
        gridItems.forEach((item)=>{
            item.addEventListener("click", () => {
               if(isOver || item.textContent!=="") return;
               if(isX){
                   item.textContent = "X";
                   isX = !isX;
                   result.textContent = player2 + "'s turn";
               }else{
                   item.textContent = "O";
                   isX = !isX;
                   result.textContent = player1 + "'s turn"
               }
               updateGameboard();
               if(checkWinner("X")){
                   result.textContent = player1 + " Wins";
                   isOver = true;
                   restartButton.style.display = "block";
               }
               if(checkWinner("O")){
                result.textContent = player2 + " Wins";
                isOver = true;
                restartButton.style.display = "block";
               }
               if(isTie()){
                result.textContent = "It's a Draw";
                isOver = true;
                restartButton.style.display = "block";
               }
            })
        })
    }

    const checkWinner = (ch) => { 
      const horizontal = [0,3,6].map(i=>[i,i+1,i+2]);
      const vertical = [0,1,2].map(i=>[i,i+3,i+6]);
      const diagonal = [[0,4,8],[2,4,6]];

      var allWins = [].concat(horizontal).concat(vertical).concat(diagonal);
      let res = allWins.some((indices)=>{
          return gridArray[indices[0]]==ch&&gridArray[indices[1]]===ch&&gridArray[indices[2]]==ch
      })
      return res;
    }
    const isTie = ()=>{
        return gridArray.every((item)=> {
            return item === "X" || item === "O";
        });
    }
    return {start};
 }(document));

Game.start();