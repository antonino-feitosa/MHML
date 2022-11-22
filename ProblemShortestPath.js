
import SampleArray from "./SampleArray";
import Graph from "./Graph";
import Solve from "./Solve";

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

	}

	evaluate(solve) {
		let sum = 0;

	}
}
