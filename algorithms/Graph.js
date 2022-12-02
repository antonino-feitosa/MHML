
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
			throw node.value + ' is not a neighbor';
		}
	}
}

class Node {

	constructor(value, graph) {
		this.value = value;
		this.edges = [];
		this.graph = graph;
	}

	connect(node, cost, directed = true) {
		if(this.edges.find(e => e.contains(node)))
			throw node.value + ' is a neighbor';

		let edge = new Edge(this, node, cost);
		this.edges.push(edge);
		if(!directed){
			node.edges.push(edge);
		}
		this.graph.edges.push(edge);
		return edge;
	}

	hasPathTo(node){
		return this.edges.some(e => e.contains(node));
	}

	costTo(node){
		let edge = this.edges.find(e => e.contains(node));
		if(!edge)
			throw node.value + ' is not a neighbor';
		return edge.cost;
	}

	adjacents() {
		let nodes = this.edges.map(e => e.opposite(this));
		return nodes;
	}
}

class Graph {

	constructor() {
		this.nodes = [];
		this.edges = [];
		this.valueToNode = new Map();
	}

	get numNodes(){
		return this.nodes.length;
	}

	get numEdges(){
		return this.edges.length;
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

module.exports = Graph;
