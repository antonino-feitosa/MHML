
import SampleArray from "./SampleArray.js";
import Graph from "./Graph.js";
import Solve from "./Solve.js";

export class GeneratorShortestPath {

	constructor(rand, vmin, vmax, emin, emax) {
		this.rand = rand;
		this.vmin = vmin;
		this.vmax = vmax;
		this.emin = emin;
		this.emax = emax;
	}

	makeProblem() {
		let graph = new Graph();
		let nv = this.rand.range(this.vmin, this.vmax + 1);
		let nodes = new SampleArray(this.rand);
		for (let i = 0; i < nv; i++) {
			let node = graph.add(i);
			nodes.push(node);
		}
		for (let i = 0; i < nv; i++) {
			let source = graph.nodes[i];
			let ne = rand.rand(this.emin, this.emax + 1);
			nodes.shuffle();
			for (let j = 0; j < ne; j++) {
				if (nodes[j] !== source) {
					source.connect(nodes[j], 1 - rand.nextDouble()); // (0,1]
				}
			}
		}
		let source = nodes.choice();
		let dest = nodes.choice();
		return new ProblemShortestPath(graph, source, dest);
	}
}

export class ProblemShortestPath {

	// real priority based representation whitout the source
	// decoding by travesing to adajacent vertice of maximum priority

	constructor(graph, source, dest) {
		this.source = source;
		this.dest = dest;
		this.graph = graph;
	}

	emptySolve() {
		let vet = Array(this.graph.numNodes - 1).fill(0.0);
		let solve = new Solve(vet, this);
		return solve;
	}

	bestCost(){
		return this.bestSolve.cost;
	}

	bestSolve(){
		let inf = this.graph.numNodes() * 10;
		let nodes = this.graph.nodes.map(x => x);
		let dist = nodes.reduce((map, node) => map.set(node, inf), new Map());
		let prev = nodes.reduce((map, node) => map.set(node, null), new Map());
		dist.set(this.source, 0);
		while(nodes.length > 0){
			let [u, cost] = [...dist.entries()].reduce(([mk, mv], [k, v]) => v < mv ? [k,v] : [mk, mv])
			for(let v of u.node.adjacents().filter(n => dist.has(n))){
				let alt = dist.get(u) + u.costTo(v);
				if(alt < dist.get(v)){
					dist.set(v, alt);
					prev.set(v, u);
				}
			}
		}
		return this._findPath(prev, dest);
	}

	_findPath(prev, dest){
		if(prev.has(this.dest) || this.source === this.dest){
			let priority = 1.0;
			let delta = 1.0 / this.graph.numNodes;
			let target = this.dest;
			let index = 0;
			let solve = this.emptySolve();
			while(target){
				solve.vector[index++] = priority;
				priority = priority - delta;
				target = prev.get(target);
			}
			solve.cost = dist.get(this.dest);
			solve.isValid = true;
			return solve;
		} else {
			return this.emptySolve();
		}
	}

	evaluate(solve) { // decode by priority, from source to dest
		let sum = 0;

		return cost;
	}
}
