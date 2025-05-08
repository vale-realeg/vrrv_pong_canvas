const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

function Rect(x,y,width,height,color){
    return{x,y,width,height,color};
}

const player1 = Rect(0,(canvas.height -100) / 2, 20, 100, 'white'); //Primer jugador, rectamgulo blanco
const player2 = Rect(canvas.width -20, (canvas.height -100) / 2,20,100,'white'); //Segundo jugador
const ball = Rect(canvas.width / 2 - 10, canvas.height / 2 - 10, 20,20, 'white'); //Se crea la pelotita
ball.velocityX = 4;
ball.velocityY = 4;

//Funcion para crear un rectangulo de un color cualquiera
function drawRect(rect){
    context.fillStyle = rect.color;
    context.fillRect(rect.x,rect.y,rect.width,rect.height);
}

function draw(){
    context.clearRect(0,0,canvas.width,canvas.height);
    drawRect(player1); //Se dibuja el jugador 1
    drawRect(player2); //Se dibuja el jugador 2
    drawRect(ball); //Se dibuja la pelota 
}

function update(){
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    //Rebote de la pelota
    if(ball.y <= 0 || (ball.y + ball.height) >= canvas.height){
        //Se reduce la velocidad
        ball.velocityY *= -1;
    }

    //Rebote de la pelota en cada jugador
    if( ((ball.x <= player1.x + player1.width) && (ball.y + ball.height > player1.y) && (player1.y + player1.height)) || 
    ((ball.x + ball.width >= player2.x) && (ball.y + ball.height > player2.y) && (ball.y <player2.y + player2.height))
    ){
        //Velocidad se reduce
        ball.velocityX *= -1;
    }

    if(ball.x < 0 || ball.x > canvas.width){
        ball.x = canvas.width/ 2 -10;
        ball.y = canvas.height/ 2 -10;
        ball.velocityX *= -1;
        ball.velocityY *= Math.random() > 0.5 ? 1 : -1;
    }
}

window.addEventListener('keydown', (event)=>{
    const key = event.key;
    if(key === 'ArrowUp' && player2.y > 0 ) player2.y -= 10;
    if(key === 'ArrowDown' && player2.y + player2.height < canvas.height) player2.y += 10;
    if(key== 'w' && player1.y > 0 ) player1.y -= 10;
    if(key === 's' && player1.y + player1.height < canvas.height) player1.y += 10;
});

function gameLoop(){
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

//Iniciar el juego
gameLoop();