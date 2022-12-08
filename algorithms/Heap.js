
/** Class represeting a priority queue implementation by binary heap. */
class Heap {

	/**
	 * Creates a priority queue from the `values` array and the comparison function `comparator`.
	 * @param {Array} values - The initial values (default: empty []).
	 * @param {Comparator} compare - The comparator between two elements (default: (a, b) => a - b).
	 */
	constructor(values = [], compare = (x, y) => x - y) {
		this.compare = compare;
		this.values = values;
		if (values.length > 1) {
			for (let i = Math.floor(values.length / 2); i >= 0; i--) {
				this._down(i);
			}
		}
	}

	/** @property {int} length - The number of elements in the heap.*/
	get length() {
		return this.values.length;
	}

	/** @property {boolean} isEmpty - Checks if the heap is empty.*/
	get isEmpty() {
		return this.values.length === 0;
	}

	/**
	 * @property {*} peek - Retrieve but not remove the most important element with respect to the comparator function.
	 * @throws {Error} The heap can not be empty.
	*/
	get peek() {
		if (this.isEmpty) {
			throw new Error('The heap is empty!');
		}
		return this.values[0];
	}

	/**
	 * Add a element to the heap.
	 * @param {*} element - The element.
	 * @returns {Heap} A refenre of this object.
	 */
	push(element) {
		this.values.push(element);
		this._up(this.length - 1);
		return this;
	}

	/**
	 * Retrieve and remove the most important element with respect to the comparator function.
	 * @returns {*} The most important element.
	 * @throws {Error} The heap can not be empty.
	 */
	pop() {
		if (this.isEmpty) {
			throw new Error('The heap is empty!');
		}
		let e = this.values[0];
		this.values[0] = this.values[this.length - 1];
		this.values.length -= 1;
		if (this.length > 0) {
			this._down(0);
		}
		return e;
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
}

module.exports = Heap;
