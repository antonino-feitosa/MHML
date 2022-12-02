
/** Class representing the stop condition of the metaheuristics.
 */
class StopCondition {

	/** Creates a stop condition with default values. 
		@param {*} maxSteps - The maximum number of iterations (default 100).
		@param {*} maxNoUpdt - The maximum number of iterations whitout update of the best solution (default 10).
		@param {*} maxEvals - The maximum number of evaluations (default 10000).
	 */
	constructor(maxSteps = 100, maxNoUpdt = 10, maxEvals = 10000) {
		this.maxSteps = maxSteps;
		this.maxNoUpdt = maxNoUpdt;
		this.maxEvals = maxEvals;
		this.numSteps = 0;
		this.lastUpdt = 0;
		this.numEvals = 0;
	}

	/**Increment the number of iterations by 1.*/
	nextStep() {
		this.numSteps += 1;
	}

	/**Indicates the best solution atualization.*/
	update() {
		this.lastUpdt = this.numSteps;
	}

	/**Increment the number of evaluations by 1.*/
	countEval() {
		this.numEvals += 1;
	}

	/**Checks if any limit has been reached. */
	isRunning() {
		return (this.numSteps - this.lastUpdt) < this.maxNoUpdt
			&& this.numSteps < this.maxSteps
			&& this.numEvals < this.maxEvals;
	}
}

module.exports = StopCondition;
