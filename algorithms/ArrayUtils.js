
function minimumIndex(array, compare = (a, b) => a - b) {
	return array.reduce((minimal, current, index) =>
		minimal === -1 ||
		compare(current, array[minimal]) < 0
		? index : minimal, -1);
}

function minimum(array, compare = (a, b) => a - b) {
	let index = minimumIndex(array, compare);
	return index >= 0 ? array[index] : null;
}

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

//  Fisher–Yates shuffle algorithm
function shuffle(array, rand) {
	for (let i = 0; i < array.length - 1; i++) {
		let index = (i + 1) + rand.nextInt(array.length - i - 1);
		[array[i], array[index]] = [array[index], array[i]];
	}
	return array;
}

function choose(array, rand) {
	if (array.length === 0)
		throw new Error('It is not possible to choose a element of a empty set.');
	let index = chooseIndex(array, rand);
	return array[index];
}

function chooseIndex(array, rand) {
	if (array.length === 0)
		throw new Error('It is not possible to choose a element of a empty set.');
	let index = rand.nextInt(array.length);
	return index;
}

module.exports = {
	minimumIndex,
	minimum,
	minimumArray,
	shuffle,
	choose,
	chooseIndex
}