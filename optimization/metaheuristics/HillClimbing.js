

// Russell, Stuart J.; Norvig, Peter (2003), Artificial Intelligence: A Modern Approach (2nd ed.), Upper Saddle River, New Jersey: Prentice Hall, pp. 123–130, ISBN 0-13-790395-2

const Metaheuristic = require('../Metaheuristic');
const ArrayUtils = require('./algorithms');

class HillClimbing extends Metaheuristic {

	constructor(problem, stopCondition, random, startSolve = null){
		super(problem, stopCondition, random);
		this.startSolve = startSolve;
	}

	_supports(problem){
		return problem.neighbors;
	}

	run(){
		let current = this.startSolve ? this.startSolve : this.problem.sampleSolve(this.random);
		current.evaluate();
		while(this.isRunning()){
			let neighbor = this._bestNeighbor(current);
			if(neighbor != current){
				current = neighbor;
				this.nextStep();
			} else {
				this.stop();
			}
		}
	}

	_bestNeighbor(solve){
		let neighbors = this.problem.neighbors(current);
		let bestSolves = ArrayUtils.minimumArray(neighbors, (a,b) => a.compare(b));
		return solve.compare(bestSolves[0]) <= 0 ? ArrayUtils.choose(bestSolves, this.random) : solve;
	}
}

module.exports = HillClimbing;
