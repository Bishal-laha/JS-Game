let keys = { ArrowUp : false, ArrowDown : false, ArrowLeft : false, ArrowRight : false};//key of arrows
const text = document.querySelector('.textShown');
const area = document.querySelector('.gameArea');
const score = document.querySelector('.score');


//if i click on pop up text the game will start
text.addEventListener('click',start);

let player = { speed : 5 , score:0}; //creating a player

//it is for collision
function isColide(a,b){
    aPos = a.getBoundingClientRect();//car position
    ePos = b.getBoundingClientRect();//enemy car position

    return !((aPos.top > ePos.bottom)||(aPos.bottom < ePos.top)||(aPos.right < ePos.left)||(aPos.left > ePos.right));//1.car top can't up than enemy bottom 2.car bottom can't down than enemy top 3.car right can't get into enemy left 4.if anyone is false it will return
}

//it is for moving all the lines
function moveLine(){
     lines = document.querySelectorAll('.line');
     lines.forEach(function(item){
        if(item.y >= 700){ //if all the lines end at the max screen
            item.y -= 750; //750px will be deducted and all the lines start from initial position
        }
        item.y += player.speed; //by adding small value to y position the line moves 
        item.style.top = item.y + 'px';
    })    
}

function endGame(){
    player.start = false;
    text.classList.remove('hide');// when i will collide text area will be shown
    text.innerHTML = "Game Over <br> Your Score is - " + player.score + "<br> Click Here To Restart The Game"; 
}

//it is for moving all the enemy cars
function moveEnemyCar(car){
    enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){

        if(isColide(car,item)){
            // console.log("BOOMMMM");
            endGame(); //function to end game
        }

       if(item.y >= 750){ //if all the cars end at the max screen
           item.y = -200; //diff between 3rd and 4th car
           item.style.left = Math.floor(Math.random()*200) + 'px'; //after touching mas screen all the cars will be at their initial random position so to change that again we are randomize the values
       }
       item.y += player.speed;//by adding small value to y position the car moves relative to lines 
       item.style.top = item.y + 'px';
   })    
}

//it checks if a player actually starts game and continue looping
function gamePlay(){
    let road = area.getBoundingClientRect();//details about road div
    if(player.start){
        moveLine();
        moveEnemyCar(car);
        //if specific arrow is pressed then at that position speed length will be added
        if(keys.ArrowUp && player.y > road.top + 164){player.y -= player.speed} // car + road conditions
        if(keys.ArrowDown && player.y < road.bottom - 64){player.y += player.speed}
        if(keys.ArrowLeft && player.x > 0){player.x -= player.speed}
        if(keys.ArrowRight && player.x < road.width - 65){player.x += player.speed}
        //key point to move car's position
        car.style.top = player.y + 'px';
        car.style.left = player.x + 'px';
        window.requestAnimationFrame(gamePlay); 
        score.innerText = 'Score : ' + player.score++;//changing score And showing it
    }

         
}

//it first add hide to pop up text and show up game area
//   second it check if player starts and req for starting game and play a loop
//   third a div of car will be generated continuously
function start(){
    // area.classList.remove('hide') -- it was first hidden so text only can be shown;
    text.classList.add('hide'); // when i will click text area will be hidden
    area.innerHTML = ""; // no need to hide area part as all cars,lines we are generating by ourselves after start of game and also after collision it is clearing everything so game is restarting 
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    //road line creation
    for(x=0;x<5;x++){
        let line = document.createElement('div');
        line.setAttribute('class','line');
        line.y = (x*150); //150 is for 100 line height and 50 is diff btw two lines
        line.style.top = line.y + 'px'; 
        area.appendChild(line);
    }
    
    //car div creation
    car = document.createElement('div');
    car.setAttribute('class','car');
    // car.innerText = 'I car';
    area.appendChild(car);
    player.x = car.offsetLeft;//knowing x position of car
    player.y = car.offsetTop; //knowing y position of car

    //enemy cars creation
    for(x=0;x<3;x++){;
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class','enemy');
        enemyCar.y = ((x+1)*300) * -1; //difference between diff cars
        enemyCar.style.top = enemyCar.y + 'px'; 
        enemyCar.style.left = Math.floor(Math.random()*300) + 'px'; //for random left position of cars
        enemyCar.style.backgroundColor = 'blue';
        area.appendChild(enemyCar);
    }
}   



document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

//if a key is pressed down then that specific key mentioned in keys object will be active
function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
    // console.log(e.key);
    // console.log(keys);
}
//if a key is pressed up then that specific key mentioned in keys object will be deactivated
function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
    // console.log(keys);
}