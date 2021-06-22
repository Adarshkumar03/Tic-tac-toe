
const Game = (function(doc){
    var isX = true;
    var isOver = false;
    var gridArray = [];
    var result = doc.querySelector(".result h2");
    var restartButton = doc.querySelector(".button");
    var gridItems;

    const reset=()=>{
       gridItems.forEach((item)=>{
           item.textContent = "";
       });
       restartButton.style.display = "none";
       result.textContent = "Result:";
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
    }

    const updateGameboard = () => {
        gridArray = Array.from(doc.querySelectorAll(".grid-item")).map((item)=>{
            return item.textContent;
        });
    }
    const input = (item) => { 
     if(isX){
         item.textContent = "X";
         isX = !isX;}
      else{
         item.textContent = "O";
         isX = !isX;
      }
      updateGameboard();        
      if(checkWinner(item.textContent)){
          isOver = true;
          result.textContent +=item.textContent + " Won";
          restartButton.style.display = "block";
          return;
      }else if(gridArray.every(item=>item!=="")){
         isOver = true;
         result.textContent += "Draw";
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

