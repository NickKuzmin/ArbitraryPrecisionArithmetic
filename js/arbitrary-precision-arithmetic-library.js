function BigInteger(stringBigInteger) {
    this.integerSubsets = [];
    this.subsetLength = 4;

    {
        var tempValue = 0;
        var currentSubsetLength = 0;
        for (var i = stringBigInteger.length - 1; i >= 0; i--) {
            if (currentSubsetLength == this.subsetLength) {
                this.integerSubsets.push(tempValue);
                tempValue = parseInt(stringBigInteger[i]);
                currentSubsetLength = 1;
            }
            else {
                tempValue += Math.round(Math.pow(10, currentSubsetLength)) * parseInt(stringBigInteger[i]);
                currentSubsetLength++;
            }
        }

        if (currentSubsetLength != 0) {
            this.integerSubsets.push(tempValue);
        }
    }

    this.initializeByArray = function (array) {
        this.integerSubsets = array;
        return this;
    };

    this.toString = function () {
        var result = "";
        if(this.integerSubsets.length == 0)
            return "0";
        result += this.integerSubsets[this.integerSubsets.length - 1];
        for (var i = this.integerSubsets.length - 2; i >= 0; i--) {
            var currentSubsetInStringFormat = this.integerSubsets[i];
            var amountLeadingZeros = this.subsetLength - currentSubsetInStringFormat.toString().length;
            for (var j = 0; j < amountLeadingZeros; j++)
                result += '0';
            result += currentSubsetInStringFormat;
        }
        return result;
    };

    this.compareTo = function (otherBigInteger) {
        if (this.toString().length > otherBigInteger.toString().length)
            return 1;
        else if (this.toString().length < otherBigInteger.toString().length)
            return -1;
        else {
            return (this.toString() < otherBigInteger.toString() ? -1 :(this.toString() > otherBigInteger.toString() ? 1 : 0));
        }
    };

    this.add = function (secondSummand) {
        var previousRest = 0;
        var maxAmountSubsetsAmongNumbers = Math.max(this.integerSubsets.length, secondSummand.integerSubsets.length);
        var sumIntegerSubset = [];
        for (var i = 0; i < maxAmountSubsetsAmongNumbers; i++) {
            var subsetFirstSummand = (this.integerSubsets.length > i) ? this.integerSubsets[i] : 0;
            var subsetSecondSummand = (secondSummand.integerSubsets.length > i) ? secondSummand.integerSubsets[i] : 0;
            var currentSubSum = subsetFirstSummand + subsetSecondSummand + previousRest;
            if (currentSubSum.toString().length > this.subsetLength) {
                currentSubSum %= Math.round(Math.pow(10, this.subsetLength));
                previousRest = 1;
            }
            else {
                previousRest = 0;
            }
            sumIntegerSubset.push(currentSubSum);
        }

        if (previousRest == 1)
            sumIntegerSubset.push(previousRest);
        return this.initializeByArray(sumIntegerSubset);
    };

    this.substract = function (subtrahend) {
        var minuend = this;
        var isSubstrahendGreater = false;

        if (minuend.compareTo(subtrahend) < 0) {
            var temp = minuend;
            minuend = subtrahend;
            subtrahend = temp;
            isSubstrahendGreater = true;
        }

        var previousRest = 0;
        var maxAmountSubsetsAmongNumbers = Math.max(minuend.integerSubsets.length, subtrahend.integerSubsets.length);
        var sumIntegerSubset = [];
        for (var i = 0; i < maxAmountSubsetsAmongNumbers; i++) {
            var subsetFirstSummand = (minuend.integerSubsets.length > i) ? minuend.integerSubsets[i] : 0;
            var subsetSecondSummand = (subtrahend.integerSubsets.length > i) ? subtrahend.integerSubsets[i] : 0;
            var currentSubSum = subsetFirstSummand - subsetSecondSummand - previousRest;
            if (currentSubSum < 0) {
                var pow = Math.round(Math.pow(10, this.subsetLength));
                currentSubSum = pow + currentSubSum;
                previousRest = 1;
            }
            else
                previousRest = 0;

            if (!(i == maxAmountSubsetsAmongNumbers - 1 && currentSubSum == 0)) {
                sumIntegerSubset.push(currentSubSum);
            }
        }

        if (isSubstrahendGreater)
            sumIntegerSubset[sumIntegerSubset.length - 1] = -sumIntegerSubset[sumIntegerSubset.length - 1];
        var resultingCustomBigInteger = this.initializeByArray(sumIntegerSubset);
        return resultingCustomBigInteger;
    };

    this.multiply = function (secondFactor) {
        var firstFactorInStringFormat = this.toString();
        var list = [];
        for (var i = firstFactorInStringFormat.length - 1; i >= 0; i--) {
            var currentDigitFirstFactor = parseInt(firstFactorInStringFormat[i]);
            var currentMultiplyProduct = new BigInteger("0");
            for (var j = 0; j < currentDigitFirstFactor; j++) {
                var temp = currentMultiplyProduct.add(secondFactor);
                currentMultiplyProduct = temp;
            }
            var amountEndingZeros = (firstFactorInStringFormat.length - 1) - i;
            var zeros = "";
            for (var k = 0; k < amountEndingZeros; k++) {
                zeros += "0";
            }
            var currentMultiplyProductWithZerosInStringFormat = currentMultiplyProduct + zeros;
            var currentMultiplyProductWithZeros = new BigInteger(currentMultiplyProductWithZerosInStringFormat);
            list.push(currentMultiplyProductWithZeros);
        }
        var totalSum = new BigInteger("0");

        list.forEach(function (item) {
            totalSum = totalSum.add(item);
        });
        return totalSum;
    };
}


