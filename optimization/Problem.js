
const Solve = require("./Solve");

class Problem {

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

	static makeProblem() {
		return new Problem();
	}
}

module.exports = Problem;
