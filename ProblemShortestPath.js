
const SampleArray = require("./SampleArray");
const Graph = require("./Graph");
const Solve = require("./Solve");
const Random = require("./Random");

class GeneratorShortestPath {

	constructor(rand, vmin = 10, vmax = 100, emin = 0) {
		this.rand = rand;
		this.vmin = vmin;
		this.vmax = vmax;
		this.emin = emin;
	}

	makeProblem() {
		let graph = new Graph();
		let nv = this.rand.nextRange(this.vmin, this.vmax + 1);
		let nodes = new SampleArray(this.rand);
		for (let i = 0; i < nv; i++) {
			let node = graph.add(i);
			nodes.push(node);
		}
		for (let i = 0; i < nv; i++) {
			let source = graph.nodes[i];
			let ne = rand.nextRange(this.emin, nv);
			nodes.shuffle();
			for (let j = 0; j < ne; j++) {
				if (nodes[j] !== source) {
					source.connect(nodes[j], 1 - rand.nextDouble()); // (0,1]
				}
			}
		}
		let source = nodes.choice();
		let dest = nodes.choice();
		return new ProblemShortestPath(graph, source, dest, this.rand);
	}
}

class ProblemShortestPath {

	// real priority based representation whitout the source
	// decoding by travesing to adajacent vertice of maximum priority

	constructor(graph, source, dest, rand) {
		this.source = source;
		this.dest = dest;
		this.graph = graph;
		this.rand = rand;
	}

	emptySolve() {
		let vet = Array(this.graph.numNodes - 1).fill(0.0);
		let solve = new Solve(vet, this);
		return solve;
	}

	sampleSolve(){
		let solve = this.emptySolve();
		solve.vector = solve.vector.map(_ => this.rand.nextDouble());
		return solve;
	}

	bestCost() {
		return this.bestSolve.cost;
	}

	bestSolve() {
		let inf = this.graph.numNodes() * 10;
		let nodes = new Set(this.graph.nodes);
		let dist = new Map();
		let prev = new Map();
		nodes.forEach(node => dist.set(node, inf));
		nodes.forEach(node => prev.set(node, null));
		dist.set(this.source, 0);
		while (nodes.length > 0) {
			let u = nodes.values().next().value;
			nodes.forEach(x => u = dist.get(x) < dist.get(u) ? x : u);
			nodes.delete(u);
			for (let v of u.node.adjacents().filter(n => nodes.has(n))) {
				let alt = dist.get(u) + u.costTo(v);
				if (alt < dist.get(v)) {
					dist.set(v, alt);
					prev.set(v, u);
				}
			}
		}
		return this._findPath(prev, dest);
	}

	_findPath(prev, dest) {
		if (prev.has(this.dest) || this.source === this.dest) {
			let priority = 1.0;
			let delta = 1.0 / this.graph.numNodes;
			let target = this.dest;
			let index = 0;
			let solve = this.emptySolve();
			while (target) {
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

	path(solve){
		let vet = solve.vector;
		let visited = new Set();
		let sindex = this.source.value;
		let priority = vet.reduce((m, x, i) => m.set(this.graph.nodes[i >= sindex ? i + 1 : i], x), new Map());
		let previous = this.source;
		visited.add(previous);
		let sequence = [previous]
		while (previous && previous !== this.dest && visited.size < vet.length) {
			let node = previous.adjacents().reduce((m, x) => !visited.has(x) && (m === null || priority.get(x) >= priority.get(m)) ? x : m, null);
			//console.log(">>",previous.adjacents().filter(x=> !visited.has(x)).map(x => [x.value, priority.get(x)]));
			//console.log("Selected", node.value);
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
}

let rand = new Random();
let maker = new GeneratorShortestPath(rand);
let p = maker.makeProblem();
let solve = p.emptySolve();
//let path = p.path(solve);
//console.log('Path', path ? path.map(x => x.value) : null);

solve = p.sampleSolve();
//console.log(solve.vector);
path = p.path(solve);
console.log('Path', path ? path.map(x => x.value) : null);