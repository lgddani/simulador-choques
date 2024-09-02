const questions = [
    // Ejemplo de preguntas, reemplaza con tus propias preguntas
    { question: "¿Qué es una colisión elástica?", 
        options: [
        "Es un tipo de colisión en la que no hay pérdida de energía cinética total en el sistema.", 
        "Es la energía que posee un objeto debido a su movimiento.", 
        "Es el producto de la masa de un objeto y su velocidad.", 
        "Es una medida de la elasticidad de una colisión entre dos cuerpos."], 
        answer: 0 },

    { question: "¿Qué tipo de colisión es un choque entre dos bolas de billar?", 
        options: [
        "Colisión elástica.", 
        "Colisión inelástica.", 
        "Colisión plástica.", 
        "Colisión explosiva."], 
        answer: 0 },

    { question: "¿Cuál de los siguientes ejemplos ilustra una colisión elástica?", 
        options: [
        "Dos coches chocando y deformándose.", 
        "Una pelota de tenis rebotando contra el suelo.", 
        "Dos bolas de arcilla chocando y fusionándose.", 
        "Una bala perforando una hoja de papel."], 
        answer: 1 },

    { question: "¿Qué ocurre con la energía cinética en una colisión INELÁSTICA?", 
        options: [
        "Se conserva.", 
        "Se convierte en calor y sonido.", 
        "Se duplica.", 
        "Se convierte en energía potencial."], 
        answer: 1 },

    { question: "En una colisión elástica en 1D, si el objeto A tiene una masa mayor que el objeto B, ¿qué sucede con las velocidades relativas después del choque?", 
        options: [
        "La velocidad relativa de A con respecto a B antes del choque es igual a la velocidad relativa después del choque.", 
        "La velocidad relativa de A con respecto a B después del choque es mayor que antes del choque.", 
        "La velocidad relativa de A con respecto a B después del choque es menor que antes del choque.", 
        "La velocidad relativa de A con respecto a B después del choque es aleatoria."], 
        answer: 0 },
    
    { question: "¿Qué propiedad se conserva en todas las colisiones, ya sean elásticas o inelásticas?", 
        options: [
        "La energía cinética total.", 
        "La velocidad total.", 
        "La aceleración total.", 
        "El momento lineal total."], 
        answer: 3 },

    { question: "En una colisión elástica entre dos esferas de igual masa, ¿qué sucede con las velocidades de las esferas después del choque?", 
        options: [
        "Se detienen por completo.", 
        "Una de las esferas se detiene mientras la otra continúa con la suma de las velocidades.", 
        "Intercambian sus velocidades.", 
        "Ambas continúan con la mitad de sus velocidades iniciales."], 
        answer: 2 },

    { question: "Si un objeto en movimiento choca elásticamente con otro objeto en reposo de igual masa, ¿qué ocurre con el objeto en reposo?", 
        options: [
        "Permanece en reposo.", 
        "Se mueve con la velocidad del primer objeto.", 
        "Se mueve al doble de la velocidad del primer objeto.", 
        "Se mueve a la mitad de la velocidad del primer objeto."], 
        answer: 1 },

    { question: "En una colisión elástica en 1D, si dos cuerpos con masas distintas chocan, ¿cómo se comporta el cuerpo con mayor masa después del choque?", 
        options: [
        "Continúa en la misma dirección con una velocidad mayor.", 
        "Se detiene por completo.", 
        "Rebota en dirección opuesta con una velocidad menor.", 
        "Continúa en la misma dirección con una velocidad menor."], 
        answer: 3 },

    { question: "¿Cuál es la fórmula del coeficiente de restitución?", 
        options: [
        "<img src='../img/op1.jpeg' alt='Coeficiente' style='width: 100px'>",
        "<img src='../img/op2.jpeg' alt='Coeficiente' style='width: 100px'>",
        "<img src='../img/op3.jpeg' alt='Coeficiente' style='width: 100px'>",
        "<img src='../img/op4.jpeg' alt='Coeficiente' style='width: 100px'>"],
        answer: 3 }

];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const totalQuestions = questions.length;
const timeLimit = 10 * 60 * 1000; // 10 minutos en milisegundos

function startTest() {
    const studentName = document.getElementById('student-name').value.trim();
    
    // Expresión regular para permitir solo letras y sílabas en español, incluidas tildes y ñ
    const namePattern = /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/;

    // Validar que el nombre tenga al menos 5 caracteres y solo contenga caracteres permitidos
    if (studentName.length < 5) {
        alert('El nombre debe tener al menos 5 caracteres.');
        return;
    }
    if (!namePattern.test(studentName)) {
        alert('El nombre solo debe contener letras, tildes y ñ.');
        return;
    }
    
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('test-screen').style.display = 'block';
    loadQuestion();
    startTimer();
}


function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById('question').innerText = questionData.question;
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    questionData.options.forEach((option, index) => {
        const optionHtml = `<label><input type="radio" name="option" value="${index}"> ${option}</label>`;
        optionsDiv.innerHTML += optionHtml;
    });
    document.getElementById('next-button').style.display = currentQuestionIndex < totalQuestions - 1 ? 'block' : 'none';
    document.getElementById('finish-button').style.display = currentQuestionIndex === totalQuestions - 1 ? 'block' : 'none';
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const answer = parseInt(selectedOption.value);
        if (answer === questions[currentQuestionIndex].answer) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < totalQuestions) {
            loadQuestion();
        } else {
            finishTest();
        }
    } else {
        alert('Por favor, selecciona una opción.');
    }
}

function finishTest() {
    clearInterval(timer);
    document.getElementById('test-screen').style.display = 'none';
    document.getElementById('results-screen').style.display = 'block';
    document.getElementById('result-text').innerText = `Nombre: ${document.getElementById('student-name').value}\nPuntaje: ${score+1} de ${totalQuestions}`;
}

function restartTest() {
    document.getElementById('results-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    clearInterval(timer);
    document.getElementById('time').innerText = '10:00';
}

function startTimer() {
    let timeRemaining = timeLimit;
    const timerElement = document.getElementById('time');
    timer = setInterval(() => {
        timeRemaining -= 1000;
        const minutes = Math.floor(timeRemaining / 60000);
        const seconds = ((timeRemaining % 60000) / 1000).toFixed(0);
        timerElement.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            finishTest();
        }
    }, 1000);
}


