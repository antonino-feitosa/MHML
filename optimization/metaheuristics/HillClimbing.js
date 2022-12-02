

// Russell, Stuart J.; Norvig, Peter (2003), Artificial Intelligence: A Modern Approach (2nd ed.), Upper Saddle River, New Jersey: Prentice Hall, pp. 123–130, ISBN 0-13-790395-2

const Metaheuristic = require('../Metaheuristic');

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
			if(neighbor != current && neighbor.value <= current.value){
				current = neighbor;
			}
			this.nextStep();
		}
	}

	_bestNeighbor(solve){
		let neighbors = this.problem.neighbors(current);
		let best = neighbors.reduce((best, x) => x.value <= best.value ? x : best, solve);
		return best;
	}
}
