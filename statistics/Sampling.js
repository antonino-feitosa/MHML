
const {predecessor} = require('./algorithms');

/**
 * It performs the sampling on a finite discrete distribution given the corresponding probability function.
 * The probabilities are scalarized to the interval [0,1].
 * @param {*} values - The support of the distribution.
 * @param {function(x:*):int} prob - The probability function mapping the support element into real values.
 * @param {Random} random - The pseudorandom number generator used in the sampling.
 * @returns {int} A random index in the vector with the respect to the probability distribuition.
 */
function rouletteWheelSelection(values = [], prob = x => x, random){
    let f = [];
    let previous = 0;
    values.forEach((x, i) => f[i] = previous + prob(x));
    let sum = values.reduce((sum, x) => sum + prob(x));
    let r = random.nextDouble() * sum;
    let index = predecessor(r, f);
    return index + 1;
}

/**
 * It performs the sampling on a finite discrete distribution given the corresponding probability function.
 * The sum of all probabilities must be 1.
 * @param {*} values - The support of the distribution.
 * @param {function(x:*):int} prob - The probability function mapping the support element into real values.
 * @param {Random} random - The pseudorandom number generator used in the sampling.
 * @returns {int} A random index in the vector with the respect to the probability distribuition.
 */
function rouletteWheelSelectionScalarized(values = [], prob = x => x, random){
    let f = [];
    let previous = 0;
    values.forEach((x, i) => f[i] = previous + prob(x));
    let r = random.nextDouble();
    let index = predecessor(r, f);
    return index + 1;
}

module.exports = {
	rouletteWheelSelection,
    rouletteWheelSelectionScalarized
}
