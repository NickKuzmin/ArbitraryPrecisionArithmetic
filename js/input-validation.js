function getCaretPosition(element) {
    var caretPosition = 0;
    if (document.selection) {
        element.focus();
        var selection = document.selection.createRange();
        selection.moveStart('character', -element.value.length);
        caretPosition = selection.text.length;
    }
    else if (element.selectionStart || element.selectionStart == '0')
        caretPosition = element.selectionStart;

    return (caretPosition);
}

function validateInputData(event, element) {
    var theEvent = event || window.event;
    var key = theEvent.keyCode || theEvent.which;
    var text = element.value;
    var caretPosition = getCaretPosition(element);
    key = String.fromCharCode(key);
    var regex = /[0-9]|[-]|\./;
    if (!regex.test(key) || ( (text.indexOf("-") != -1 || caretPosition > 0) && key == "-")) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

function onResultButtonClick() {
    var firstBigIntegerString = document.getElementById('firstNumberInput').value;
    var secondBigIntegerString = document.getElementById('secondNumberInput').value;

    var regex = /[-]?\d+/;
    if (regex.test(firstBigIntegerString) && regex.test(secondBigIntegerString)) {
        var isPositiveFirstNumber = firstBigIntegerString[0] != '-';
        var isPositiveSecondNumber = secondBigIntegerString[0] != '-';
        if (!isPositiveFirstNumber)
            firstBigIntegerString = firstBigIntegerString.substring(1);
        if (!isPositiveSecondNumber)
            secondBigIntegerString = secondBigIntegerString.substring(1);
        var firstBigInteger = new BigInteger(firstBigIntegerString);
        var secondBigInteger = new BigInteger(secondBigIntegerString);
        var arithmeticSelector = document.getElementById('arithmetic-operation-selector');
        var arithmeticOperation = arithmeticSelector.options[arithmeticSelector.selectedIndex].value;
        if (arithmeticOperation == "subtraction") {
            var substractResult;

            if (!isPositiveFirstNumber && !isPositiveSecondNumber) {
                substractResult = secondBigInteger.substract(firstBigInteger);
            }
            else if (!isPositiveFirstNumber) {
                var additionResult = firstBigInteger.add(secondBigInteger);
                substractResult = "-" + additionResult.toString();
            }
            else if (!isPositiveSecondNumber) {
                substractResult = firstBigInteger.add(secondBigInteger);
            }
            else {
                substractResult = firstBigInteger.substract(secondBigInteger);
            }

            var valueResult = substractResult.toString();
            if(valueResult[valueResult.length-1] != 0)
                valueResult = valueResult.replace(/^0+/, '');
            else
            {
                var temp = valueResult.slice(0, valueResult.length);
                valueResult = temp.replace(/^0+/, '') + '0';
            }
            document.getElementById('resultInput').value = valueResult;
        }
        else if (arithmeticOperation == "multiplication") {
            var multiplyResult = firstBigInteger.multiply(secondBigInteger);
            var result = multiplyResult.toString();
            if (isPositiveFirstNumber ^ isPositiveSecondNumber)
                result = "-" + result;
            document.getElementById('resultInput').value = result;
        }
    }
    else
        alert("Некорретные входные данные!");
}