
const Solve = require("./Solve");

/** Class represeting a optimization problem. */
class Problem {

	/**
	 * It returns a empty solve of the problem.
	 * @returns A empty solve.
	 */
	emptySolve() {
		return new Solve([], this);
	}

	sampleSolve(rand){
		return this.emptySolve();
	}

	bestCost() {
		return 0;
	}

	bestSolve() {
		return this.emptySolve();
	}

	evaluate(solve) {
		return 0;
	}

	clone(){
		return new Problem();
	}
}

module.exports = Problem;
