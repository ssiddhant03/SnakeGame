// Game Constants & Variables
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let velocity = {x:0, y:0};
let speed = prompt("Write a level from 1 to 50");
while(speed>50 || speed<1){
    speed=prompt("Not a valid level...Write a level between 1 and 50")
}
let score = 0;
let lastPaintTime = 0;
snakeArr = [
    {x:17, y:17}
]
food = {x:10, y:10}; 

// Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    for(let i=1; i<snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >18 || snake[0].x<1 || snake[0].y >18 || snake[0].y<1){
        return true;
    }
}

function gameEngine(){
    // Updating the Snake array & Food
    levelBox.innerHTML="Level: "+speed;
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        velocity = {x:0, y:0};
        alert("Game Over. Press enter to play again");
        // speed = prompt("Write a level from 1 to 30");
        snakeArr = [{x:13, y:15}];
        musicSound.play();
        score = 0;
    }
    // At the moment of eating food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score+=1;
        // if(score%10==0)speed++;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: "+hiscoreval;
        }
        scoreBox.innerHTML="Score: "+score;
        snakeArr.unshift({x:snakeArr[0].x+velocity.x, y:snakeArr[0].y+velocity.y});
        let a=1;
        let b=17;
        food = {x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())}
    }
    // Moving the snake
    for (let i = snakeArr.length -2; i>=0; i--) {
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x += velocity.x;
    snakeArr[0].y += velocity.y;

    // Display the snake and Food
    board.innerHTML = "";
    // Display the snake
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    
    // Display the food
    snakeArr.forEach((e,index)=>{
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
    });
}


// Main logic starts here
let hiscore = localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: "+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    if(score==0)velocity = {x:0, y:0} //Start the game
    moveSound.play();
    if (e.key === "ArrowUp") {
        console.log("ArrowUp");
        if(velocity.y == 1){
            velocity.x = 0;
            velocity.y = 1;
        }else{
            velocity.x = 0;
            velocity.y = -1;
        }
    } else if (e.key === "ArrowDown") {
        console.log("ArrowDown");
        if(velocity.y == -1){
            velocity.x = 0;
            velocity.y = -1;
        }else{
            velocity.x = 0;
            velocity.y = 1;
        }
    } else if (e.key === "ArrowLeft") {
        console.log("ArrowLeft");
        if(velocity.x == 1){
            velocity.x = 1;
            velocity.y = 0;
        }else{
            velocity.x = -1;
            velocity.y = 0;
        }
    } else if (e.key === "ArrowRight") {
        console.log("ArrowRight");
        if(velocity.x == -1){
            velocity.x = -1;
            velocity.y = 0;
        }else{
            velocity.x = 1;
            velocity.y = 0;
        }
    }    
})
btn.addEventListener('click', function(e){
    speed=prompt("Write a level from 1 to 50");
    while(speed>50 || speed<1){
        speed=prompt("Not a valid level...Write a level between 1 and 50")
    }
})