
class Edge {

	constructor(source, dest, cost) {
		this.source = source;
		this.dest = dest;
		this.cost = cost;
	}

	contains(node){
		return this.source === node || this.dest === node;
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

	hasPathTo(node){
		return this.edges.some(e => e.contains(node));
	}

	costTo(node){
		let edge = this.edges.find(e => e.contains(node));
		return edge.cost;
	}

	adjacents() {
		let nodes = this.edges.map(e => e.opposite(this));
		return nodes;
	}
}

export class Graph {

	constructor() {
		this.nodes = [];
		this.edges = [];
		this.valueToNode = new Map();
	}

	get numNodes(){
		return this.nodes.length;
	}

	get nomEdges(){
		return thsi.edges.length;
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
