
class Metaheuristic {

	constructor(problem, stopCondition, random){
		if(!this._supports(problem)){
			throw new Error('It not support the problem!');
		}
		this.random = random;
		this._problem = problem.clone();
		this.stopCondition = stopCondition;
		this.bestSolve = problem.emptySolve();
		this._problem.evaluate = this._evaluate;
	}

	get isRunning(){
		return this.stopCondition.isRunning();
	}

	nextStep(){
		this.stopCondition.nextStep();
	}

	_supports(problem){
		return true;
	}

	_evaluate(solve){
		let cost = problem.evaluate(solve);
		this.stopCondition.countEval();
		if(cost < this.bestSolve.cost){
			this.bestSolve = solve;
			this.stopCondition.update();
		}
	}

	run(){
		return this.bestSolve;
	}
}
