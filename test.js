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

// Функция деления двух чисел в двоичной системе с востановлением
function divisionBinaryRec(bin1, bin2) {
    const recoveryOutput = document.querySelector('.recovery .output_text');

    const resultText = [];

    resultText.push("Step |       bin1      |   bin2  |   SCHP");
    resultText.push("-------------------------------------------");

    let C = 0; // Частное
    let Cx = 0; // Счетчик

    while (Cx !== 9) {
        // Подсчет частного
        if (bin1 >= 0) {
            bin1 = bin1 - (bin2 << 8); // Вычитание делителя из старшего байта делимого
        } else {
            bin1 = bin1 + (bin2 << 8); // Вычитание делителя из старшего байта делимого
        }

        if (bin1 >= 0) {
            C = (C << 1) | 1; // Запись единицы в младший бит частного
        } else {
            C = (C << 1) | 0; // Запись нуля в младший бит частного
            bin1 = bin1 + (bin2 << 8); // Восстановление делимого
        }

        // Формирование строки для вывода
        resultText.push(`  ${Cx}    ${bin1.toString(2).padStart(16, '0')}  ${bin2.toString(2).padStart(8, '0')}  ${C.toString(2).padStart(8, '0')}`);

        bin1 = (bin1 << 1) & (Math.pow(2, 17) - 1); // Сдвиг делимого на 1 разряд влево
        Cx++;
    }

    // Выделение остатка
    let ost = bin1 >> 9;

    // Формирование строки для вывода результата
    if (C > 0xFF) {
        resultText.push("\n\nПроизошло переполнение. Частное превышает разрядность 1 байт!");
    } else {
        resultText.push(`\n\nРезультат: частное = ${C.toString(2).padStart(8, '0')} = ${C}`);
        resultText.push(`\n\nОстаток = ${ost.toString(2).padStart(8, '0')} = ${ost}`);
    }

    // Вывод текста в элемент с классом output_text внутри объекта с классом recovery
    recoveryOutput.innerText = resultText.join('\n');
}

// Функция деления двух чисел в двоичной системе без востановления
function divisionBinarynotRec(bin1, bin2) {
    const recoveryOutput = document.querySelector('.not_recovery .output_text');

    const resultText = [];

    resultText.push("Step |       bin1      |   bin2  |   SCHP");
    resultText.push("-------------------------------------------");

    let C = 0; // частное
    let Cx = 0; // счетчик

    while (Cx !== 9) {
        // Подсчёт частного
        bin1 = bin1 - (bin2 << 8); // вычитание делителя из старшего байта делимого
        
        if (bin1 >= 0) { // проверка остатка
            C = C << 1;
            C = C | 1; // запись единицы в младший бит частного
        } else {
            bin1 = bin1 + (bin2 << 8); // восстановление A
            C = C << 1;
            C = C | 0; // запись нуля в младший бит частного
        }
        
        // Вывод переменных
        resultText.push(`  ${Cx}    ${bin1.toString(2).padStart(16, '0')}  ${bin2.toString(2).padStart(8, '0')}  ${C.toString(2).padStart(8, '0')}`);
        
        bin1 = (bin1 << 1) & (Math.pow(2, 17) - 1); // сдвиг делимого на 1 разряд влево
        Cx += 1;
    }

    // Выделение остатка
    let ost = bin1 >> 9;

    // Вывод результата
    if (C > 0xFF) {
        resultText.push("\n\nПроизошло переполнение. Частное превышает разрядность 1 байт!");
    } else {
        resultText.push(`\n\nРезультат: частное = ${C.toString(2).padStart(8, '0')} = ${C}`);
        resultText.push(`\n\nОстаток = ${ost.toString(2).padStart(8, '0')} = ${ost}`);    }
    // Вывод текста в элемент с классом output_text внутри объекта с классом recovery
    recoveryOutput.innerText = resultText.join('\n');
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
    const firstNumBinary = (parseInt(firstNumHex, 16)).toString(2);
    const secondNumBinary = (parseInt(secondNumHex, 16)).toString(2);
    divisionBinaryRec(firstNumBinary, secondNumBinary);
    divisionBinarynotRec(firstNumBinary, secondNumBinary);
    // Очищаем сообщение об ошибке, если оно было выведено ранее
    document.querySelector('.output_error').textContent = '';
}