
/** Class represeting a solution of a optimization problem.
 * 	The solution is codified as a vector of values and is asociated with a problem.
 *	It assumes a static codification, that is, the length of the codification vector is fixed during the otimization.
 */
class Solve {

	/**
	 * It creates a solution for a initial condification and problem.
	 * The solution is valid with cost equals to the maximum integer.
	 * @param {*} vector - The codification initial. The length must fixed during the optimization.
	 * @param {*} problem - The optimization problem that the solution is associated with.
	 */
	constructor(vector, problem) {
		this.cost = Number.MAX_VALUE;
		this.isValid = true;
		this._evaluated = false;
		this.vector = vector;
		this.problem = problem;
	}

	get size() {
		return this.vector.length;
	}

	evaluate() {
		if (!this._evaluated) {
			this.cost = this.problem.evaluate(this);
			this._evaluated = true;
		}
		return this.cost;
	}

	/**
	 * It checks if two solutions are equals with respect to the codification.
	 * @param {*} other - The solution being compared. It must being associated with the same problem.
	 * @returns {boolean} true if the solutions are equals and false otherwise.
	 */
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

	/**
	 * It compares the solution with other.
	 * The comparison satisfies the following rules listedin order of precedence:
	 * A evaluated solve is minor than a no evaluated;
	 * A valid solve is minor than a invalid solve;
	 * The cost is last criteria so that the solve is minor if it has a minor cost.
	 * @param {*} other - The other solve being compared.
	 * @returns {Number} A numeric value representing the order. If the solve is minor than the other,
	 * it returns a negativa value, 0 if the are equals and a positive value if the solve is greater.
	 */
	compare(other) {
		let cmp = 0;
		if (this !== other) {
			if(this._evaluated && other._evaluated){
				if (this.isValid && other.isValid) {
					cmp = this.cost - other.cost;
				} else if (this.isValid) {
					cmp = -1;
				} else if (other.isValid) {
					cmp = 1;
				}
			} else if(this._evaluated){
				cmp = -1;
			} else if(other._evaluated){
				cmp = 1;
			}
		}
		return cmp;
	}
}

module.exports = Solve;
