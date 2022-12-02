
/** Class representing edges connecting nodes of a graph.*/
class Edge {

	/** Creates a edge connecting a `source` node with a destination node `dest` with the cost `cost`.
		@param {*} source - The source node.
		@param {*} dest - The destination node.
		@param {*} cost - The cost of the connection.
	 */
	constructor(source, dest, cost) {
		this.source = source;
		this.dest = dest;
		this.cost = cost;
	}

	/** Checks if a `node` is connected by this edge.
		@param {*} node - The node being checked.
		@returns true if the node is connected and false otherwise.
	 */
	contains(node) {
		return this.source === node || this.dest === node;
	}

	opposite(node) {
		if (node === this.source) {
			return this.dest;
		} else if (node === this.dest) {
			return this.source;
		} else {
			throw new Error(node.value + ' is not a neighbor');
		}
	}
}

/**Class representing nodes of a graph.*/
class Node {

	/**	Creates a node with specified `value` and `graph`.
		It must be used only by the graph.
		@param {*} value - The value of the node also used as a key in the graph.
		@param {*} graph - The graph of the node.
	 */
	constructor(value, graph) {
		this.value = value;
		this.edges = [];
		this.graph = graph;
	}

	/** Connects this node with another `node`.
		@param {Node} node - The node being connected.
		@param {Number} cost - The cost of the connection associated with the edge.
		@param {Boolean} directed - Indicates if the connection is directed or undirected.
		@returns {Edge} The edge representing the connection.
		@throws {Error} There must not be a connection between the nodes.
	 */
	connect(node, cost = 0, directed = true) {
		if (this.edges.find(e => e.contains(node)))
			throw new Error(node.value + ' is a neighbor');

		let edge = new Edge(this, node, cost);
		this.edges.push(edge);
		if (!directed) {
			node.edges.push(edge);
		}
		this.graph.edges.push(edge);
		return edge;
	}

	/** Checks if there is a path to `node`
		@param {*} node - The node being checked.
		@returns true if there is a path and false otherwise
	 */
	hasPathTo(node) {
		return this.edges.some(e => e.contains(node));
	}

	/**	Get the cost to a adjacent `node`.
		@param {*} node - A adjacent node.
		@returns {Number} The associated cost
		@throws {Error} The node must be adjacent.
	 */
	costTo(node) {
		let edge = this.edges.find(e => e.contains(node));
		if (!edge)
			throw new Error(node.value + ' is not a neighbor');
		return edge.cost;
	}

	/**	Get the adjacents nodes.
		@returns {Array} A array with the adjacent nodes. It will be empty if none.
	 */
	adjacents() {
		let nodes = this.edges.map(e => e.opposite(this));
		return nodes;
	}
}

/**	Class representing a Graph data structure implemented through adjacency list.
	It does not support remove operations.
	It can be direct or undirect with weights @see {Node.connect}.
	Example:

	<code>
		let g = new Graph();
		let node_a = g.add('A');
		let node_b = g.add('B');
		let node_c = g.add('C');
		node_a.connect(node_b, cost, true); // true for directed (default)
		node_b.connect(noce_c); // undirected with no cost
	</code>
 */
class Graph {

	/** Create a empty graph. */
	constructor() {
		this.nodes = [];
		this.edges = [];
		this.valueToNode = new Map();
	}

	/**	@property {Number} - The number of nodes. */
	get numNodes() {
		return this.nodes.length;
	}

	/**	@property {Number} - The number of edges. */
	get numEdges() {
		return this.edges.length;
	}

	/**	Insert a new node with data `value`
		@param {*} value - The value of the node.
		@return {Node}		 The created node.
	*/
	add(value) {
		let node = new Node(value, this);
		this.nodes.push(node);
		this.valueToNode.set(value, node);
		return node;
	}

	/**	Get the node associated with the `value`
		@param {*} value - The value of a node present in the graph.
		@return {Node}		 The correspondent node if the `value` is present, or null otherwise.
	*/
	get(value) {
		return this.valueToNode.get(value);
	}
}

module.exports = Graph;
