
class SampleArray extends Array {

	constructor(rand) {
		super();
		this.rand = rand;
	}

	shuffle() {
		for (let i = 0; i < this.length - 1; i++) {
			let index = (i + 1) + this.rand.nextInt(this.length - i - 1);
			let aux = this[i];
			this[i] = this[index];
			this[index] = aux;
		}
	}

	choice() {
		let index = this.choiceIndex();
		return this[index];
	}

	choiceIndex(){
		let index = this.rand.nextInt(this.length);
		return index;
	}
}

module.exports = SampleArray;
