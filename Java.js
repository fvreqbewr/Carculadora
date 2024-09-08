let display = document.getElementById('display'); // Se selecciona el display donde se mostrarán las operaciones y resultados.
let currentInput = '';  // Almacena el valor que se está ingresando actualmente.
let operator = '';      // Almacena el operador actual.
let previousInput = ''; // Almacena el valor previo antes de realizar una operación.

function insertDigit(digit) {
    currentInput += digit;  // Agrega el dígito al input actual.
    updateDisplay();        // Actualiza el display para mostrar el nuevo valor.
}

function insertOperator(op) {
    // Si hay un número previo y se está ingresando un nuevo operador
    if (currentInput === '' && previousInput !== '') {
        operator = op;  // Se actualiza el operador.
    } else if (currentInput !== '') {
        // Si ya hay un número previo, se realiza el cálculo y luego se cambia el operador
        if (previousInput !== '') {
            calculate();
        }
        operator = op;
        previousInput = currentInput;  // Guarda el número actual como el previo.
        currentInput = '';             // Resetea el input actual para ingresar un nuevo número.
    }
}

function insertDot() {
    if (!currentInput.includes('.')) {
        currentInput += '.';  // Agrega un punto decimal si no existe ya.
        updateDisplay();
    }
}

function clearDisplay() {
    // Resetea todas las variables para limpiar la calculadora.
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay();
}

function deleteDigit() {
    currentInput = currentInput.slice(0, -1);  // Borra el último dígito ingresado.
    updateDisplay();
}

function calculate() {
    let result;
    let prev = parseFloat(previousInput);  // Convierte el input previo a número.
    let curr = parseFloat(currentInput);   // Convierte el input actual a número.

    if (isNaN(prev) || isNaN(curr)) return;  // Si alguno de los valores no es válido, no se hace nada.

    // Se realiza la operación matemática dependiendo del operador.
    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = curr !== 0 ? prev / curr : 'Error';  // Validación para evitar división por cero.
            break;
        case '%':
            result = prev % curr;
            break;
        default:
            return;
    }

    currentInput = result.toString();  // Convierte el resultado a cadena para mostrarlo.
    operator = '';                     // Resetea el operador.
    previousInput = '';                // Resetea el número previo.
    updateDisplay();
}

function updateDisplay() {
    // Actualiza el display con el valor actual, o muestra '0' si está vacío.
    display.textContent = currentInput || '0';
}
