
class Edge {

	constructor(source, dest, cost) {
		this.source = source;
		this.dest = dest;
		this.cost = cost;
	}

	opposite(node) {
		if (node === this.source) {
			return this.dest;
		} else if (node === this.dest) {
			return this.source;
		} else {
			return null;
		}
	}
}

class Node {

	constructor(value, graph) {
		this.value = value;
		this.edges = [];
		this.graph = graph;
	}

	connect(node, cost) {
		let edge = new Edge(this, node, cost);
		this.edges.push(edge);
		node.edges.push(this);
		this.graph.edges.push(edge);
		return edge;
	}

	adjacents() {
		let nodes = this.edges.map(e => e.opposite(this));
		return nodes;
	}
}

export class Graph {

	constructor() {
		this.size = 0;
		this.nodes = [];
		this.edges = [];
		this.valueToNode = new Map();
	}

	add(value) {
		let node = new Node(value, this);
		this.nodes.push(node);
		this.valueToNode.set(value, node);
		return node;
	}

	get(value) {
		return this.valueToNode.get(value);
	}
}
