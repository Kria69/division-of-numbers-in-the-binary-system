const inputs = document.querySelectorAll('.input input[type="text"]');
inputs.forEach(input => {
    input.addEventListener('input', function() {
        handleInputChange(this, document.querySelectorAll(`.${this.id}`));
    });
});

// Обработка события ввода чисел
function handleInputChange(input, outputs) {
    outputs.forEach(output => {
        if (output.classList.contains("hex")) {
            output.textContent = input.value.toUpperCase(); // Вывод в 16-ричной системе
        } else if (output.classList.contains("bin")) {
            const decimalValue = parseInt(input.value, 16);
            const binaryValue = decimalValue.toString(2);
            const paddedBinary = padBinaryWithZeros(binaryValue);
            output.textContent = paddedBinary; // Вывод в 2-ичной системе
        }
    });
}

function padBinaryWithZeros(binaryValue) {
    // Проверяем длину binaryValue и добавляем недостающие нули
    if (binaryValue.length <= 4) {
        return binaryValue.padStart(4, '0');
    } else if (binaryValue.length <= 8) {
        return binaryValue.padStart(8, '0');
    } else if (binaryValue.length <= 16) {
        return binaryValue.padStart(16, '0');
    }
    return binaryValue; // Если длина больше или равна 16, то возвращаем без изменений
}

// Функция для сложения двух чисел в двоичной системе
function divisionBinary(bin1, bin2) {
    const num1 = parseInt(bin1, 2);
    const num2 = parseInt(bin2, 2);
    const schp = num1 + num2;
    return schp.toString(2);
}

// Функция для вычисления и отображения результата
function calculateAndDisplayResult() {
    const firstNumHex = document.getElementById('firstNum').value;
    const secondNumHex = document.getElementById('secondNum').value;
    // Проверяем, что хотя бы одно из полей не пусто
    if (firstNumHex.trim() === '' || secondNumHex.trim() === '') {
        document.querySelector('.output_error').textContent = 'Число не введено';
        return;
    }
    // Проверяем, что хотя бы одно из чисел не является отрицательным
    if (firstNumHex.includes('-') || secondNumHex.includes('-')) {
        document.querySelector('.output_error').textContent = 'Нельзя вводить отрицательные числа';
        return;
    }
    // Проверяем, что хотя бы одно из чисел не содержит кириллицу
    if (/[а-яА-Я]/.test(firstNumHex) || /[а-яА-Я]/.test(secondNumHex)) {
        document.querySelector('.output_error').textContent = 'Некорректный ввод';
        return;
    }
    // Проверяем, содержат ли введенные числа символы, не являющиеся допустимыми для 16-ричной системы
    if (!/^[0-9A-Fa-f]+$/.test(firstNumHex) || !/^[0-9A-Fa-f]+$/.test(secondNumHex)) {
        document.querySelector('.output_error').textContent = 'Некорректный ввод';
        return;
    }
    const firstNumDecimal = parseInt(firstNumHex, 16);
    const secondNumDecimal = parseInt(secondNumHex, 16);
    // Проверяем, что оба числа не превышают 16 бит
    if (firstNumDecimal > 32767) {
        document.querySelector('.output_error').textContent = 'Делимое не должно превышать 15 бит';
        return;
    }
    if (secondNumDecimal > 255) {
        document.querySelector('.output_error').textContent = 'Делитель не должен превышать 8 бит';
        return;
    }
    if (secondNumDecimal > firstNumDecimal) {
        document.querySelector('.output_error').textContent = 'Делитель не должен превышать делимое';
        return;
    }
    const firstNumBinary = (parseInt(firstNumHex, 16)).toString(2);
    const secondNumBinary = (parseInt(secondNumHex, 16)).toString(2);
    const schpBinary = divisionBinary(firstNumBinary, secondNumBinary);
    const schpHex = parseInt(schpBinary, 2).toString(16).toUpperCase();
    // Получаем все элементы с классом 'output_text' и обновляем их содержимое
    const outputTextElements = document.querySelectorAll('.output_text');
    outputTextElements.forEach(element => {
        element.textContent = schpHex;
    });
    // Очищаем сообщение об ошибке, если оно было выведено ранее
    document.querySelector('.output_error').textContent = '';
}