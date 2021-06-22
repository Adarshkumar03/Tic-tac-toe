
const Game = (function(doc){
    var isX = true;
    var isOver = false;
    var gridArray = [];
    var result = doc.querySelector(".result");
    var restartButton = doc.querySelector(".button");
    var gridItems;
    var submitButton = doc.querySelector(".submit");
    var form = doc.querySelector(".form");
    var container = doc.querySelector(".container");
    var player1 = "";
    var player2 = "";

    const reset=()=>{
       gridItems.forEach((item)=>{
           item.textContent = "";
       });
       restartButton.style.display = "none";
       result.textContent = player1 + "'s turn";
       isX = true;
       isOver = false;       
    }
    
    const start = () => {
        gridItems = document.querySelectorAll(".grid-item");
        gridItems.forEach(item => {
            item.addEventListener("click", ()=>{
             if(item.textContent!==""||isOver) return;
              input(item); 
            });
        });
        restartButton.addEventListener("click", reset);
        submitButton.addEventListener("click", setGameBoard);         
    }

    const setGameBoard = () => {
        player1 = form.elements.player1.value;
        player2 = form.elements.player2.value;
       form.remove();
       container.style.display = "grid";
       result.style.display="block";
       result.textContent = player1+"'s turn";
    }

    const updateGameboard = () => {
        gridArray = Array.from(doc.querySelectorAll(".grid-item")).map((item)=>{
            return item.textContent;
        });
    }
    const input = (item) => { 
     if(isX){
         result.textContent = player2 + "'s turn";
         item.textContent = "X";
         isX = !isX;}
      else{
         result.textContent = player1 + "'s turn"; 
         item.textContent = "O";
         isX = !isX;
      }
      updateGameboard();        
      if(checkWinner(item.textContent)){
          isOver = true;
          if(item.textContent === "X"){
              result.textContent=player1 + " Wins";
          }else{
            result.textContent=player2 + " Wins";
          }
          restartButton.style.display = "block";
          return;
      }else if(gridArray.every(item=>item!=="")){
         isOver = true;
         result.textContent += "Game Drawn";
         restartButton.style.display = "block";
      }
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
    return {start};
 }(document));

 Game.start();

