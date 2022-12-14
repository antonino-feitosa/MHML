
/**
 * Callback for compare two elements.
 * It takes two elements A and B, and returns:
 * 0 if A is equals to B;
 * negative value if A < B;
 * and positive value if A > B.
 * @callback Comparator
 * @param {*} A - The first element.
 * @param {*} B - The second element.
 * @returns {int} A value represeting the order between the elements.
 */


/**
 * It returns the index of the first minimum element in a array.
 * Needs a comprator function between two elements.
 * The comparator takes two elements A and B, and returns:
 * 0 if A is equals to B;
 * negative value if A < B;
 * and positive value if A > B.
 * 
 * @param {Array} array - The array of elements.
 * @param {Comparator} compare - The comparator between two elements (default: (a, b) => a - b).
 * @returns {int} The index of the minimum element with respect to the compare function. If there is more than a minimum element, returns the minor index.
 */
function minimumIndex(array, compare = (a, b) => a - b) {
	return array.reduce((minimal, current, index) =>
		minimal === -1 ||
			compare(current, array[minimal]) < 0
			? index : minimal, -1);
}

/**
 * It returns the first minimum element in a array.
 * Needs a comprator function between two elements.
 * The comparator takes two elements A and B, and returns:
 * 0 if A is equals to B;
 * negative value if A < B;
 * and positive value if A > B.
 * 
 * @param {Array} array - The array of elements.
 * @param {Comparator} compare - The comparator between two elements (default: (a, b) => a - b).
 * @returns {int} The minimum element with respect to the compare function. If there is more than a minimum element, returns the minor index.
 */
function minimum(array, compare = (a, b) => a - b) {
	let index = minimumIndex(array, compare);
	return index >= 0 ? array[index] : null;
}

/**
 * It returns a array with the minimum elements of another array.
 * Needs a comprator function between two elements.
 * The comparator takes two elements A and B, and returns:
 * 0 if A is equals to B;
 * negative value if A < B;
 * and positive value if A > B.
 * 
 * @param {Array} array - The array of elements.
 * @param {Comparator} compare - The comparator between two elements (default: (a, b) => a - b).
 * @returns {int} A array with the minimum elements with respect to the compare function. Returns [] if the array is empty.
 */
function minimumArray(array, compare = (a, b) => a - b) {
	return array.reduce((arr, current) => {
		if (arr.length === 0) {
			arr.push(current);
		} else {
			let cmp = compare(current, arr[0]);
			if (cmp < 0) {
				arr.length = 0;
				arr.push(current);
			} else if (cmp === 0) {
				arr.push(current);
			}
		}
		return arr;
	}, []);
}

/**
 * It shuffles the elements of a array, mutating and returning a reference to the array. 
 * Implementation of the Fisher???Yates shuffle algorithm.
 * @see {@link https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle|wikipedia}
 * @param {Array} array - The array of elements.
 * @param {Random} rand - The pseudorandom number generator used for the shuffle.
 * @returns {Array} The shuffled array.
 */
function shuffle(array, rand) {
	for (let i = 0; i < array.length - 1; i++) {
		let index = (i + 1) + rand.nextInt(array.length - i - 1);
		[array[i], array[index]] = [array[index], array[i]];
	}
	return array;
}

/**
 * It returns a random element of the array.
 * @param {Array} array - The array of elements.
 * @param {Random} rand - The pseudorandom number generator for aletorization.
 * @returns {*} A random element.
 * @throws {Error} The array must have at least one element.
 */
function choose(array, rand) {
	if (array.length === 0)
		throw new Error('It is not possible to choose a element of a empty set.');
	let index = chooseIndex(array, rand);
	return array[index];
}

/**
 * It returns a random index of the array.
 * It assumes the valid interval [0,array.length).
 * @param {Array} array - The array of elements.
 * @param {Random} rand - The pseudorandom number generator for aletorization.
 * @returns {int} A random index.
 * @throws {Error} The array must have at least one element.
 */
function chooseIndex(array, rand) {
	if (array.length === 0)
		throw new Error('It is not possible to choose a element of a empty set.');
	let index = rand.nextInt(array.length);
	return index;
}

/**
 * Binary search algorithm.
 * @param {*} x - The queried element.
 * @param {Array} array - A sorted (descending order) array of elements.
 * @param {Comparator} compare - The comparator between two elements (default: (a, b) => a - b).
 * @returns {{index:int, found:boolean, start:int, end, int}} A object with the final state of the binary search.
 */
function _binarySearch(x, array, compare = (a, b) => a - b) {
	let start = 0;
	let end = array.length - 1;
	let index = -1;
	let found = false;
	while (!found && start <= end) {
		index = Math.floor((start + end) / 2);
		let cmp = compare(array[index], x);
		if (cmp === 0) {
			found = true;
		} else {
			if (cmp > 0) {
				end = index - 1;
			} else {
				start = index + 1;
			}
		}
	}
	return { index: index, found: found, start: start, end: end };
}

/**
 * It performs the binary search algorithm on a sorted array.
 * @param {*} x - The queried element.
 * @param {Array} array - A sorted (descending order) array of elements.
 * @param {Comparator} compare - The comparator between two elements (default: (a, b) => a - b).
 * @returns {int} The index of the first ocurrence of `x` in the `array`or -1 if `x` is not present.
 */
function binarySearch(x, array, compare = (a, b) => a - b) {
	let { index, found } = _binarySearch(x, array, compare);
	return found ? index : -1;
}

/**
 * It searchs for the predecessor of a element in a array.
 * @param {*} x - The queried element.
 * @param {*} array - The array of elements.
 * @param {Comparator} compare - The comparator between two elements (default: (a, b) => a - b).
 * @returns {int} The index of the predecessor `x` if it exists or -1 otherwise.
 */
function predecessor(x, array, compare = (a, b) => a - b) {
	let { index, found, end } = _binarySearch(x, array, compare);
	if (found) {
		return index - 1;
	} else {
		return end < 0 ? -1 : end;
	}
}

/**
 * It searchs for the successor of a element in a array.
 * @param {*} x - The queried element.
 * @param {*} array - The array of elements.
 * @param {Comparator} compare - The comparator between two elements (default: (a, b) => a - b).
 * @returns {int} The index of the successor `x` if it exists or -1 otherwise.
 */
function successor(x, array, compare = (a, b) => a - b) {
	let { index, found, start } = _binarySearch(x, array, compare);
	if (found) {
		return index + 1 < array.length ? index + 1 : -1;
	} else {
		return start >= array.length ? -1 : start;
	}
}

module.exports = {
	minimumIndex,
	minimum,
	minimumArray,
	shuffle,
	choose,
	chooseIndex,
	binarySearch,
	predecessor,
	successor
}
