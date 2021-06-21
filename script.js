
const Game = (function(doc){
    var isX = true;
    var isOver = false;
    var gridArray = [];
    var result = doc.querySelector(".result h2");
    const start = () => {
        const gridItems = document.querySelectorAll(".grid-item");
        gridItems.forEach(item => {
            item.addEventListener("click", ()=>{
             if(item.textContent!==""||isOver) return;
              input(item); 
            });
        });         
    }

    const populateArray = () => {
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
      populateArray();
      console.log(gridArray);        
      if(checkWinner(item.textContent)){
          isOver = true;
          return;
      }else if(gridArray.every(item=>item!=="")){
         isOver = true;
         result.textContent += "Draw";
      }
    }
    
    const checkWinner = (ch) => { 
     if((gridArray[0]===ch&&gridArray[1]===ch&&gridArray[2]===ch)
     ||(gridArray[3]===ch&&gridArray[4]===ch&&gridArray[5]===ch)
     ||(gridArray[6]===ch&&gridArray[7]===ch&&gridArray[8]===ch)
         ||(gridArray[0]===ch&&gridArray[3]===ch&&gridArray[6]===ch)
         ||(gridArray[1]===ch&&gridArray[4]===ch&&gridArray[7]===ch)
         ||(gridArray[2]===ch&&gridArray[5]===ch&&gridArray[8]===ch)
         ||(gridArray[0]===ch&&gridArray[4]===ch&&gridArray[8]===ch)
         ||(gridArray[2]===ch&&gridArray[4]===ch&&gridArray[6]===ch) 
       ){
            result.textContent+= ch +" Won";
            return true;
     }
     return false; 
    }
    return {start};
 }(document));

 Game.start();

