
class MinHeap {

	constructor(values = [], compare = (x,y) => x - y) {
		this.compare = compare;
		this.values = values;
		if (values.length > 1) {
			for (let i = values.length / 2; i >= 0; i--) {
				this._down(i);
			}
		}
	}

	get length() {
		return this.values.length;
	}

	push(element) {
		this.values.push(element);
		this._up(this.length - 1);
	}

	_up(index) {
		if (index > 0) {
			let upindex = Math.floor((index - 1) / 2);
			if (this.compare(this.values[index], this.values[upindex]) < 0) {
				this._swap(index, upindex);
				this._up(upindex);
			}
		}
	}

	_swap(a, b) {
		[this.values[a], this.values[b]] = [this.values[b], this.values[a]];
	}

	peek() {
		return this.values[0];
	}

	pop() {
		let e = this.values[0];
		this.values[0] = this.values[this.length - 1];
		this.values.length -= 1;
		if (this.length > 0) { this._down(0); }
		return e;
	}

	_down(index) {
		let left = index * 2 + 1;
		let right = index * 2 + 2;
		if (right < this.length) {
			if (this.compare(this.values[right], this.values[left]) < 0) {
				left = right;
			}
		}
		if (left < this.length && this.compare(this.values[index], this.values[left]) > 0) {
			this._swap(index, left);
			this._down(left);
		}
	}

	isEmpty() {
		return this.values.length === 0;
	}
}

module.exports = MinHeap;