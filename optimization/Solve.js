
class Solve {

	constructor(vector, problem) {
		this.cost = null;
		this._evaluated = false;
		this.vector = vector;
		this.problem = problem;
	}

	get isValid() {
		return this._evaluated && this.cost != null;
	}

	evaluate() {
		if (!this._evaluated) {
			this.cost = this.problem.evaluate(this);
			this._evaluated = true;
		}
		return this.cost;
	}

	get size() {
		return this.vector.length;
	}

	equals(other) {
		if (other && this.vector.length == other.vector.length) {
			for (let i = 0; i < this.vector.length; i++) {
				if (this.vector[i] !== other.vector[i]) {
					return false;
				}
			}
		}
		return false;
	}

	compare(other) {
		let cmp = -1;
		if (other) {
			if (this.isValid && other.isValid) {
				cmp = this.cost - other.cost;
			} else if (this.isValid) {
				cmp = -1;
			} else if (other.isValid) {
				cmp = 1;
			} else {
				cmp = 0;
			}
		}
		return cmp;
	}
}

module.exports = Solve;
