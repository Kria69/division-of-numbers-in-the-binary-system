const inputs = document.querySelectorAll('.input input[type="text"]');
inputs.forEach(input => {
    input.addEventListener('input', function() {
        handleInputChange(this, document.querySelectorAll(`.${this.id}`));
        calculateAndDisplayResult();
    });
});

// Функция для обработки события ввода числа
function handleInputChange(input, outputs) {
    outputs.forEach(output => {
        if (output.classList.contains("hex")) {
            output.textContent = input.value.toUpperCase(); // Вывод в 16-ричной системе
        } else if (output.classList.contains("bin")) {
            const decimalValue = parseInt(input.value, 16); // Преобразуем введенное значение из 16-ричной в десятичную
            output.textContent = decimalValue.toString(2); // Вывод в 2-ичной системе
        }
    });
}

// Функция для сложения двух чисел в двоичной системе
function addBinary(bin1, bin2) {
    const num1 = parseInt(bin1, 2);
    const num2 = parseInt(bin2, 2);
    const sum = num1 + num2;
    return sum.toString(2);
}

// Функция для вычисления и отображения результата сложения
function calculateAndDisplayResult() {
    const firstNumHex = document.getElementById('firstNum').value;
    const secondNumHex = document.getElementById('secondNum').value;
    const firstNumBinary = (parseInt(firstNumHex, 16)).toString(2);
    const secondNumBinary = (parseInt(secondNumHex, 16)).toString(2);
    const sumBinary = addBinary(firstNumBinary, secondNumBinary);
    const sumHex = parseInt(sumBinary, 2).toString(16).toUpperCase();
    document.querySelector('.output_text').textContent = sumHex;
}
