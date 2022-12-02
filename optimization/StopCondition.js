
class StopCondition {

	constructor(){
		this.maxSteps = 100;
		this.maxNoUpdt = 10;
		this.maxEvals = 10000;
		this.numSteps = 0;
		this.lastUpdt = 0;
		this.numEvals = 0;
	}

	nextStep(){
		this.numSteps += 1;
	}

	update(){
		this.lastUpdt = this.numSteps;
	}

	countEval(){
		this.numEvals += 1;
	}

	isRunning(){
		return (this.numSteps - this.lastUpdt) < this.maxNoUpdt
			&& this.numSteps < this.maxSteps
			&& this.numEvals < this.maxEvals;
	}
}

module.exports = StopCondition;
