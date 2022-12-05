
function minimumIndex(array, compare = (a, b) => a - b) {
	return array.reduce((minimal, current, index) => {
		-1 || compare(current, array[minimal]) <= 0 ? index : minimal
	}, -1);
}

function minimumElement(array, compare = (a, b) => a - b) {
	let index = minimumIndex(array, compare);
	return index >= 0 ? array[index] : null;
}

function minimumArray(array, compare = (a, b) => a - b) {
	let arr = [];
	array.forEach((minimal, current) => {
		if(!minimal){
			arr.push(current);
		} else {
			let cmp = compare(current, minimal);
			if(cmp < 0){
				arr.length = 0;
				arr.push(current);
			} else if(cmp === 0){
				arr.push(current);
			}
		}
	});
	return arr;
}

function shuffle(array, rand) {
	for (let i = 0; i < array.length - 1; i++) {
		let index = (i + 1) + rand.nextInt(array.length - i - 1);
		[array[i], array[index]] = [array[index], array[i]];
	}
}

function chooseElement(array, rand){
	let index = this.choiceIndex(array, rand);
	return this[index];
}

function chooseIndex(array, rand){
	let index = rand.nextInt(array.length);
	return index;
}
