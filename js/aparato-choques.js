const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function startSimulation() {
    let height = document.getElementById('height').value; // en cm

    // Validar altura
    if (height < 50 || height > 100) {
        alert("La altura debe ser entre 50 y 100 centímetros");
        return; // Detener ejecución si la altura es inválida
    }

    height = height / 100; // convertir a metros

    // Obtener tipo de bola seleccionado
    const material = document.getElementById('material').value;

    // Establecer parámetros específicos según el tipo de bola
    let energyLoss;
    let ballColor;
    switch (material) {
        case 'steel':
            energyLoss = 0.85;  // Bola de Acero (Plomo)
            ballColor = "gray";
            break;
        case 'tennis':
            energyLoss = 0.69;  // Bola de Tenis
            ballColor = "green";
            break;
        case 'rubber':
            energyLoss = 0.73;  // Bola de Goma
            ballColor = "red";
            break;
        case 'golf':
            energyLoss = 0.79;  // Bola de Goma
            ballColor = "white";
            break;
        case 'espuma':
            energyLoss = 0.13;  // Bola de Goma
            ballColor = "yellow";
            break;
        default:
            energyLoss = 0.7;  // Valor por defecto
            ballColor = "blue"; // Color por defecto
    }

    // Verificar si el checkbox de ralentizado está marcado
    const isSlowMotion = document.getElementById('cbx-46').checked;

    // Simulación del rebote
    simulateBouncing(height, energyLoss, ballColor, isSlowMotion);
}

function simulateBouncing(H0, energyLoss, ballColor, isSlowMotion) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const ball = {
        x: canvas.width / 2,
        y: canvas.height - (H0 * canvas.height), // Ajuste en la altura inicial
        radius: 20,
        vy: 0,  // velocidad inicial
        color: ballColor,  // Establecer el color de la bola
    };

    const g = 0.98;  // gravedad simulada
    let bounceCount = 0; // contador de rebotes
    const maxBounces = 10; // número máximo de rebotes
    const frameRate = isSlowMotion ? 30 : 0; // Cambiar la tasa de actualización según la opción de ralentizado

    // Array para almacenar las alturas de los rebotes
    let heights = [H0];

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color; // Usar el color de la bola
        ctx.fill();
        ctx.closePath();

        // Simular gravedad
        ball.vy += g;

        // Si la bola toca el suelo, rebota
        if (ball.y + ball.radius >= canvas.height) {
            ball.y = canvas.height - ball.radius; // Asegurarse que la bola no pase del suelo
            ball.vy *= -energyLoss;  // invertir la velocidad y aplicar pérdida de energía
            bounceCount++; // incrementar contador de rebotes

            // Calcular la nueva altura de rebote utilizando el factor de energía
            let newHeight = heights[heights.length - 1] * energyLoss**2;

            heights.push(newHeight);

            // Si se alcanzó el número máximo de rebotes, detener la animación y calcular coeficientes
            if (bounceCount >= maxBounces) {
                calculateAndDisplayCoefficients(heights);
                return; // detener la animación
            }
        }

        // Actualizar la posición de la bola
        ball.y += ball.vy;

        setTimeout(() => requestAnimationFrame(draw), 1000 / frameRate); // Ajustar el tiempo entre frames
    }

    draw();
}

function calculateAndDisplayCoefficients(heights) {
    // Cálculo de los coeficientes de restitución para los rebotes
    const coefficients = heights.slice(1).map((h, i) => Math.sqrt(h / heights[i]));

    // Imprimir resultados en la tabla
    document.getElementById('Ho').textContent = heights[0].toFixed(2);
    document.getElementById('h1').textContent = heights[1] ? heights[1].toFixed(2) : 'N/A';
    document.getElementById('e1').textContent = coefficients[0] ? coefficients[0].toFixed(2) : 'N/A';

    document.getElementById('H1').textContent = heights[1] ? heights[1].toFixed(2) : 'N/A';
    document.getElementById('h2').textContent = heights[2] ? heights[2].toFixed(2) : 'N/A';
    document.getElementById('e2').textContent = coefficients[1] ? coefficients[1].toFixed(2) : 'N/A';

    document.getElementById('H2').textContent = heights[2] ? heights[2].toFixed(2) : 'N/A';
    document.getElementById('h3').textContent = heights[3] ? heights[3].toFixed(2) : 'N/A';
    document.getElementById('e3').textContent = coefficients[2] ? coefficients[2].toFixed(2) : 'N/A';
}
