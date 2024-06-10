window.addEventListener('keypress', event => {
    if (event.key === '/')
    event.preventDefault();
});

let result = '';
let previousOperator = '';
let operand = '';

const calculatorCurrentDisplay = document.querySelector("#calculatorCurrentDisplay");
const calculatorResultDisplay = document.querySelector("#calculatorResultDisplay");

const operatorNodeList = document.querySelectorAll('.operator');
const numberNodeList = document.querySelectorAll('.number');
const clearNode = document.querySelector('.clear');


/* Main calculator logic */
const simplify = (result, operator, operand) =>
{
    if (result == '')
        return operand;
    num1 = Number(result);
    num2 = Number(operand);
    if (operator == '=')
        return operand;
    if (operator == '+')
        return num1 + num2;
    else if (operator == '*')
        return num1 * num2;
    else if (operator == 'EXP')
        return num1 ** num2;
    else if (operator == '/')
    {
        let res = (num1/num2);
        let stringRes = String(res).split('.');
        if (stringRes.length == 2 && stringRes[1].length > 5)
            return res.toFixed(5);
        else
            return res;
    }
    else if (operator == '%')
        return num1%num2;
    else if (operator == '-')
        return num1 - num2;
}


const detectOperator = (operator) => {
    result = simplify(result, previousOperator, operand);
    operand = '';
    previousOperator = operator;
    calculatorResultDisplay.textContent = result;
    calculatorCurrentDisplay.textContent = operator;
}

const detectNumber = (key) => {
    if (key == 'Backspace')
    {
        operand = operand.slice(0, -1);
        calculatorCurrentDisplay.textContent = operand;
        return;
    }
    if (operand.includes('.'))
    {
        if (key == '.' || operand.length > 15)
            return;
    }
    else if (operand.length >= 15)
        return;
    operand += key;
    calculatorCurrentDisplay.textContent = operand;
}

const detectClear = () => {
    operand = '';
    previousOperator = '';
    result = '';
    calculatorCurrentDisplay.textContent = '';
    calculatorResultDisplay.textContent = '';
}

/* Adding eventListeners */

for (let i = 0; i < operatorNodeList.length; i++)
{
    const node = operatorNodeList[i];
    node.addEventListener('click', () => {
        detectOperator(node.id);
    });
}

for (let i = 0; i < numberNodeList.length; i++)
{
    const node = numberNodeList[i];
    console.log(node.id);
    node.addEventListener('click', () => {
        detectNumber(node.id);
    });
}

clearNode.addEventListener('click', () => {
    detectClear();
});

window.addEventListener('keydown', event => {

    // Numbers
    if ((event.which >= 48 && event.which <= 57) || (event.which >= 96 && event.which <= 105))
        detectNumber(event.key);
    else if (event.key == '.')
        detectNumber(event.key);
    else if (event.key == 'Backspace')
        detectNumber(event.key);

    // Operators
    else if (event.key == '/' || event.key == '*')
        detectOperator(event.key);
    else if (event.key == '+' || event.key == '-')
        detectOperator(event.key);
    else if (event.key == '%')
        detectOperator(event.key);
    else if (event.key == 'e')
        detectOperator('EXP');

    else if (event.key == '=' || event.key == 'Enter')
        detectOperator('=');

    // Clear All
    else if (event.key == 'Delete')
        detectClear();
});