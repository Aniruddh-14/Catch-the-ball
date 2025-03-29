  const canvas = document.getElementById("gameCanvas");
        const context = canvas.getContext("2d");

        let basket = { x: 175, y: 450, width: 60, height: 12 };
      
        let ball = { x: Math.random() * 380, y: 0, radius: 12, dy: 3 };
        
        let score = 0;

      
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft" && basket.x > 0) {
                basket.x -= 20;
            } else if (event.key === "ArrowRight" && basket.x < canvas.width - basket.width) {
                basket.x += 20;
            }
        });

        function drawBasket() {
            context.fillStyle = "blue";
            context.fillRect(basket.x, basket.y, basket.width, basket.height);
        }

        function drawBall() {
            context.beginPath();
            context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            context.fillStyle = "red";
            context.fill();
            context.closePath();
        }

        function updateGame() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawBasket();
            drawBall();

         
            ball.y += ball.dy;
    
            if (
                ball.y + ball.radius >= basket.y &&
                ball.x >= basket.x &&
                ball.x <= basket.x + basket.width
            ) {
                score++;
                resetBall();
            } else if (ball.y > canvas.height) {
                alert(`Game Over! Your Score: ${score}`);
                location.reload();
            }
        }

        function resetBall() {
            ball.x = Math.random() * (canvas.width - ball.radius * 2) + ball.radius;
            ball.y = 0;
        }

        function gameLoop() {
            updateGame();
            requestAnimationFrame(gameLoop);
        }

        gameLoop();
