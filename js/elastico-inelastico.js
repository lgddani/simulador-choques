document.getElementById('comenzarBtn').addEventListener('click', () => {
    // Obtener datos de entrada
    const masa1 = parseFloat(document.getElementById('masa1').value);
    const velocidad1 = parseFloat(document.getElementById('velocidad1').value);
    const masa2 = parseFloat(document.getElementById('masa2').value);
    const velocidad2 = parseFloat(document.getElementById('velocidad2').value);

    let simular = true; // Bandera para controlar si se debe iniciar la simulación

    // Validar campos vacíos
    if (isNaN(masa1) || isNaN(velocidad1) || isNaN(masa2) || isNaN(velocidad2)) {
        alert('Por favor, complete todos los campos obligatorios.');
        simular = false;
    }

    // Validar valores negativos
    if (masa1 <= 0 || masa2 <= 0) {
        alert('Las masas deben ser mayores a 0.');
        simular = false;
    }

    if (masa1 >20 || masa2 >20){
        alert('Las masas no pueden ser mayores a 20kg.');
        simular = false;
    }

    if (velocidad1 >5 || velocidad2 >5){
        alert('Las velocidades de los carritos no pueden ser mayores a 5m/s');
        simular = false;
    }

    if (velocidad1 <-5 || velocidad2 <-5){
        alert('Las velocidades de los carritos no pueden ser menores a -5m/s');
        simular = false;
    }

    // Validar velocidad inicial del carrito 1
    if (velocidad1 <= velocidad2) {
        alert('La velocidad inicial del carrito 1 debe ser mayor a la del carrito 2.');
        simular = false;
    }

    // Validar tipo de choque
    const tipoChoqueSeleccionado = document.querySelector('input[name="tipoChoque"]:checked');
    if (!tipoChoqueSeleccionado) {
        alert('Por favor, seleccione un tipo de choque (Elástico o Inelástico).');
        simular = false;
    }

    if (simular) {
        const elástico = tipoChoqueSeleccionado.nextSibling.textContent.includes("Elástico");

        // Variables para almacenar resultados
        let v1Final, v2Final;

        // Cálculos para choque elástico
        if (elástico) {
            v1Final = ((masa1 - masa2) / (masa1 + masa2)) * velocidad1 + ((2 * masa2) / (masa1 + masa2)) * velocidad2;
            v2Final = ((2 * masa1) / (masa1 + masa2)) * velocidad1 + ((masa2 - masa1) / (masa1 + masa2)) * velocidad2;
        } else {
            // Cálculos para choque inelástico
            const vFinalComún = (masa1 * velocidad1 + masa2 * velocidad2) / (masa1 + masa2);
            v1Final = v2Final = vFinalComún;
        }

        // Momentos antes del choque
        const momento1Antes = masa1 * velocidad1;
        const momento2Antes = masa2 * velocidad2;
        const momentoTotalAntes = momento1Antes + momento2Antes;

        // Momentos después del choque
        const momento1Después = masa1 * v1Final;
        const momento2Después = masa2 * v2Final;
        const momentoTotalDespués = momento1Después + momento2Después;

        // Energía cinética antes del choque
        const energia1Antes = 0.5 * masa1 * velocidad1 * velocidad1;
        const energia2Antes = 0.5 * masa2 * velocidad2 * velocidad2;
        const energiaTotalAntes = energia1Antes + energia2Antes;

        // Energía cinética después del choque
        const energia1Después = 0.5 * masa1 * v1Final * v1Final;
        const energia2Después = 0.5 * masa2 * v2Final * v2Final;
        const energiaTotalDespués = energia1Después + energia2Después;

        // Imprimir velocidades
        document.getElementById('velocidad-inicial-carrito1').textContent = velocidad1.toFixed(3);
        document.getElementById('velocidad-inicial-carrito2').textContent = velocidad2.toFixed(3);
        document.getElementById('velocidad-final-carrito1').textContent = v1Final.toFixed(3);
        document.getElementById('velocidad-final-carrito2').textContent = v2Final.toFixed(3);

        // Imprimir momentos
        document.getElementById('momento-antes-del-choque-carrito1').textContent = momento1Antes.toFixed(3);
        document.getElementById('momento-antes-del-choque-carrito2').textContent = momento2Antes.toFixed(3);
        document.getElementById('momento-antes-del-choque-total').textContent = momentoTotalAntes.toFixed(3);
        document.getElementById('momento-despues-del-choque-carrito1').textContent = momento1Después.toFixed(3);
        document.getElementById('momento-despues-del-choque-carrito2').textContent = momento2Después.toFixed(3);
        document.getElementById('momento-despues-del-choque-total').textContent = momentoTotalDespués.toFixed(3);

        // Imprimir energía cinética
        document.getElementById('energia-antes-del-choque-carrito1').textContent = energia1Antes.toFixed(3);
        document.getElementById('energia-antes-del-choque-carrito2').textContent = energia2Antes.toFixed(3);
        document.getElementById('energia-antes-del-choque-total').textContent = energiaTotalAntes.toFixed(3);
        document.getElementById('energia-despues-del-choque-carrito1').textContent = energia1Después.toFixed(3);
        document.getElementById('energia-despues-del-choque-carrito2').textContent = energia2Después.toFixed(3);
        document.getElementById('energia-despues-del-choque-total').textContent = energiaTotalDespués.toFixed(3);

        // Iniciar simulación solo si todas las validaciones son correctas
        iniciarSimulacion(v1Final, v2Final);

        // Deshabilitar el botón de "Comenzar"
        document.getElementById('comenzarBtn').disabled = true;
    }
});

document.getElementById('resetearBtn').addEventListener('click', () => {
    // Detener la simulación
    detenerSimulacion();

    // Reiniciar los resultados a cero, pero NO reiniciar los inputs
    const ids = [
        'velocidad-inicial-carrito1', 'velocidad-inicial-carrito2', 'velocidad-final-carrito1', 'velocidad-final-carrito2',
        'momento-antes-del-choque-carrito1', 'momento-antes-del-choque-carrito2', 'momento-antes-del-choque-total',
        'momento-despues-del-choque-carrito1', 'momento-despues-del-choque-carrito2', 'momento-despues-del-choque-total',
        'energia-antes-del-choque-carrito1', 'energia-antes-del-choque-carrito2', 'energia-antes-del-choque-total',
        'energia-despues-del-choque-carrito1', 'energia-despues-del-choque-carrito2', 'energia-despues-del-choque-total'
    ];

    ids.forEach(id => document.getElementById(id).textContent = '');

    // Habilitar el botón de "Comenzar" nuevamente
    document.getElementById('comenzarBtn').disabled = false;

    // Resetear la animación a sus posiciones iniciales
    resetearSimulacion();
});

const canvas = document.getElementById('simulador');
const ctx = canvas.getContext('2d');

let masa1, velocidad1, masa2, velocidad2, choqueElastico, ralentizado;
let x1, x2; // Posiciones iniciales de los carritos
const y = 100; // Posición vertical fija para ambos carritos
const anchoCarrito = 60;
const alturaCarrito = 50;
let velocidadBase = 1; // Ajuste de velocidad para la animación
let animationId; // Variable para almacenar el ID de la animación
let choque = false; // Bandera para controlar si ya ocurrió un choque

function actualizarDatos() {
    masa1 = parseFloat(document.getElementById('masa1').value);
    velocidad1 = parseFloat(document.getElementById('velocidad1').value);
    masa2 = parseFloat(document.getElementById('masa2').value);
    velocidad2 = parseFloat(document.getElementById('velocidad2').value);
    choqueElastico = document.querySelector('input[name="tipoChoque"]:checked').nextSibling.textContent.includes("Elástico");
    ralentizado = document.getElementById('cbx-46').checked;

    if (ralentizado) {
        velocidad1 = velocidad1 * 0.3;
        velocidad2 = velocidad2 * 0.3;
    }
}

function dibujarCarrito(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, anchoCarrito, alturaCarrito);

    ctx.fillStyle = 'white'; // Color de las ruedas
    const radioRueda = 10; // Radio de las ruedas
    const distanciaRuedas = 10; // Distancia desde el borde del carrito

    // Rueda izquierda
    ctx.beginPath();
    ctx.arc(x + distanciaRuedas, y + alturaCarrito, radioRueda, 0, 2 * Math.PI);
    ctx.fill();

    // Rueda derecha
    ctx.beginPath();
    ctx.arc(x + anchoCarrito - distanciaRuedas, y + alturaCarrito, radioRueda, 0, 2 * Math.PI);
    ctx.fill();
}

function dibujarResorte(x, y, comprimido = false) {
    ctx.strokeStyle = 'white'; // Color del resorte
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + anchoCarrito, y + alturaCarrito / 2);

    const factorCompresion = comprimido ? 2.5 : 5; // Modifica este valor para ajustar la compresión
    for (let i = 0; i < 7; i++) {
        ctx.lineTo(x + anchoCarrito + i * factorCompresion, y + alturaCarrito / 2 + (i % 2 === 0 ? -5 : 5));
    }
    ctx.stroke();
}

function dibujarGancho(x, y, lado) {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 4;
    ctx.beginPath();
    if (lado === 'derecha') {
        // Gancho en el lado derecho del carrito 1
        ctx.arc(x + anchoCarrito, y + alturaCarrito / 2, 10, -Math.PI / 2, Math.PI / 2, false); // Parte superior del gancho
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + anchoCarrito + 10, y + alturaCarrito / 2); // Línea vertical
        ctx.lineTo(x + anchoCarrito + 10, y + alturaCarrito / 2 + 20);
        ctx.stroke();
    } else if (lado === 'izquierda') {
        // Gancho en el lado izquierdo del carrito 2
        ctx.arc(x, y + alturaCarrito / 2, 10, Math.PI / 2, -Math.PI / 2, true); // Parte superior del gancho
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x - 10, y + alturaCarrito / 2); // Línea vertical
        ctx.lineTo(x - 10, y + alturaCarrito / 2 + 20);
        ctx.stroke();
    }
}

function comprobarChoque(v1Final, v2Final) {
    if (!choque && x1 + anchoCarrito >= x2) {
        // Choque detectado
        choque = true;

        // Actualizar velocidades finales
        velocidad1 = v1Final;
        velocidad2 = v2Final;

        ralentizado = document.getElementById('cbx-46').checked;

        if (ralentizado) {
            velocidadBase = 0.3;
        }

        // Reiniciar las posiciones para continuar con la animación post-choque
        x1 += velocidad1 * velocidadBase;
        x2 += velocidad2 * velocidadBase;
    }
}

function moverCarritos(v1Final, v2Final) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

    // Dibujar la "calle"
    ctx.fillStyle = 'green';
    ctx.fillRect(0, y + alturaCarrito, canvas.width, 10);

    // Determinar el tipo de choque
    const esChoqueElastico = choqueElastico;

    // Dibujar carritos en sus nuevas posiciones
    dibujarCarrito(x1, y, 'red'); // Carrito 1 (rojo)
    dibujarCarrito(x2, y, 'blue'); // Carrito 2 (azul)

    if (esChoqueElastico) {
        dibujarResorte(x1, y, choque); // Comprimir resorte si ocurrió el choque
    } else {
        dibujarGancho(x1, y, 'derecha'); // Gancho en el carrito 1
        dibujarGancho(x2, y, 'izquierda'); // Gancho en el carrito 2
    }

    if (!choque) {
        x1 += velocidad1 * velocidadBase;
        x2 += velocidad2 * velocidadBase;
    } else {
        x1 += v1Final * velocidadBase;
        x2 += v2Final * velocidadBase;
    }

    comprobarChoque(v1Final, v2Final); // Verificar si ocurre un choque

    // Continuar la animación si no han salido del canvas
    if (x1 < canvas.width && x2 < canvas.width) {
        animationId = requestAnimationFrame(() => moverCarritos(v1Final, v2Final));
    }
}

function iniciarSimulacion(v1Final, v2Final) {
    actualizarDatos();
    x1 = 0; // Posición inicial del carrito 1
    x2 = canvas.width / 2; // Posición inicial del carrito 2
    choque = false; // Reiniciar la bandera de choque
    velocidadBase = 1; // Resetear velocidad base

    moverCarritos(v1Final, v2Final); // Iniciar la animación
}

function detenerSimulacion() {
    cancelAnimationFrame(animationId); // Detener la animación
}

function resetearSimulacion() {
    detenerSimulacion();
    x1 = 0;
    x2 = canvas.width / 2;
    choque = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    dibujarCarrito(x1, y, 'red'); // Carrito 1 (rojo)
    dibujarCarrito(x2, y, 'blue'); // Carrito 2 (azul)

    // Dibujar la "calle"
    ctx.fillStyle = 'green';
    ctx.fillRect(0, y + alturaCarrito, canvas.width, 10);
}


