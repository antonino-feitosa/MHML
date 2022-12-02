
const SampleArray = require("../SampleArray");
const Graph = require("../ads/Graph");
const Solve = require("../Solve");

class ProblemShortestPath {

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

	sampleSolve(rand){
		let solve = this.emptySolve();
		solve.vector = solve.vector.map(_ => rand.nextDouble());
		return solve;
	}

	bestCost() {
		return this.bestSolve.cost;
	}

	bestSolve() {
		let inf = this.graph.numNodes * 10;
		let nodes = new Set(this.graph.nodes);
		let dist = new Map();
		let prev = new Map();
		nodes.forEach(node => dist.set(node, inf));
		nodes.forEach(node => prev.set(node, null));
		dist.set(this.source, 0);
		while (nodes.size > 0) {
			let u = nodes.values().next().value;
			nodes.forEach(x => u = dist.get(x) < dist.get(u) ? x : u);
			nodes.delete(u);
			for (let v of u.adjacents().filter(n => nodes.has(n))) {
				let alt = dist.get(u) + u.costTo(v);
				if (alt < dist.get(v)) {
					dist.set(v, alt);
					prev.set(v, u);
				}
			}
		}
		return this._findPath(prev, dist);
	}

	_findPath(prev, dist) {
		if (prev.has(this.dest) || this.source === this.dest) {
			let delta = 1.0 / this.graph.numNodes;
			let priority = delta;
			let target = this.dest;
			let solve = this.emptySolve();
			let sindex = this.graph.nodes.indexOf(this.graph.get(this.source.value));
			while (target !== this.source) {
				let index = this.graph.nodes.indexOf(this.graph.get(target.value));
				if(index >= sindex)
					index--;
				solve.vector[index] = priority;
				priority += delta;
				target = prev.get(target);
			}
			solve.cost = dist.get(this.dest);
			solve.isValid = true;
			return solve;
		} else {
			return this.emptySolve();
		}
	}

	path(solve){
		let vet = solve.vector;
		let visited = new Set();
		let sindex = this.graph.nodes.indexOf(this.graph.get(this.source.value));
		let priority = vet.reduce((m, x, i) => m.set(this.graph.nodes[i >= sindex ? i + 1 : i], x), new Map());
		let previous = this.source;
		visited.add(previous);
		let sequence = [previous];
		while (previous && previous !== this.dest && visited.size < vet.length) {
			let node = previous.adjacents().reduce((m, x) => !visited.has(x) && (m === null || priority.get(x) >= priority.get(m)) ? x : m, null);
			visited.add(node);
			if(node !== previous){
				previous = node;
				sequence.push(previous);
			} else {
				previous = null;
			}
		}
		return previous === this.dest ? sequence : null;
	}

	evaluate(solve) { // decode by priority, from source to dest
		let sequence = this.path(solve);
		if (sequence) {
			solve.cost = 0;
			for(let i=1;i<sequence.length;i++){
				solve.cost += sequence[i-1].costTo(sequence[i]);
			}
			solve.isValid = true;
		} else {
			solve.cost = -1;
			solve.isValid = false;
		}
		return solve.cost;
	}

	static makeProblem(rand, vmin = 10, vmax = 100, emin = 0, emax = 100) {
		let graph = new Graph();
		let nv = rand.nextRange(vmin, vmax + 1);
		let nodes = new SampleArray(rand);
		for (let i = 0; i < nv; i++) {
			let node = graph.add(i);
			nodes.push(node);
		}
		for (let i = 0; i < nv; i++) {
			let source = graph.nodes[i];
			let ne = rand.nextRange(emin, Math.max(nv, emax));
			nodes.shuffle();
			for (let j = 0; j < ne; j++) {
				if (nodes[j] !== source) {
					source.connect(nodes[j], 1 - rand.nextDouble()); // (0,1]
				}
			}
		}
		let source = nodes.choice();
		let dest = nodes.choice();
		return new ProblemShortestPath(graph, source, dest, rand);
	}
}

module.exports = ProblemShortestPath;
