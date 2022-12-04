
/** Class representing a array storing only the smallest element.
	The comparator function between two elements must be provided.
 	The comparator takes tow elements `a` and `b` and returns:
  		0 if `a` === `b`;
	    negative value if `a` < `b`;
		positive value if `a` > `b`.
*/
class MinArray {

	/** Creates a new MinArray object.
 		@param {Array} values - The initial values of the array, only the minimal values are kept (default []).
   		@param {function(Any,Any):int} compare - The comparator of objects (default: (a,b) => a-b).
	*/
	constructor(values = [], compare = (a, b) => a - b) {
		this._values = [];
		this._minimum = null;
		this.compare = compare;
		values.forEach(x => this.add(x));
	}

	/** @property {int} length - The number os elements in the Array. */
	get length() {
		return this._values.length;
	}

	/** @property {Any} minimum - A minimal element (null if the array is empty.) */
	get minimum() {
		return this._minimum;
	}

	/** @property {Array} toArray - A array with shallow copy of the minimal elements. */
	get toArray (){
		return Array.from(this._values);
	}

	/**	Inserts a value in the array.
 		If the element is small than the minimal, all other elements are discarded.
   		If the `value` is greater than the minimal, the `value` is discarded.
	 	If the `value` is equals to the minimal, the element is inserted and the end of the array.
   		@param {Any} value - The element being inserted.
	 	@returns {MinArray} The current object after insertion.
 	*/
	add(value) {
		if (this.length === 0) {
			this._minimum = value;
			this._values.push(value);
		} else {
			let cmp = this.compare(value, this._minimum);
			if (cmp < 0) {
				this._minimum = value;
				this._values.length = 0;
				this._values.push(value);
			} else if (cmp === 0) {
				this._values.push(value);
			}
		}
		return this;
	}

	/** Iterator of the array.
 		@returns A iterator of the minimal elements.
 	*/
	[Symbol.iterator]() {
		return this._values[Symbol.iterator]();
	}
}

module.exports = MinArray;
