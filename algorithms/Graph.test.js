
const Graph = require('./Graph.js');

describe('Insert Test', () => {
	test('Insert 1 node', () => {
		let g = new Graph();
		g.add('A');
		expect(g.numNodes).toBe(1);
		expect(g.get('A')).not.toBeNull;
		expect(g.get('A').value).toBe('A');
	});

	test('Insert Multiple Nodes', () => {
		let g = new Graph();
		let chars = []
		for (let i = 0; i < 8; i++) {
			chars.push(String.fromCharCode('A'.charCodeAt() + i));
		}
		chars.forEach(c => g.add(c));
		expect(g.numNodes).toBe(8);

		chars.forEach(c => expect(g.get(c).value).toBe(c));
	});
});

describe('Test Connections', () => {

	let g;
	let model = [
		['A', 'B', 2],
		['A', 'C', 1],
		['A', 'D', 3],
		['B', 'E', 3],
		['B', 'F', 1],
		['C', 'E', 2],
		['C', 'F', 3],
		['C', 'G', 1],
		['D', 'F', 2],
		['D', 'G', 3],
		['E', 'H', 2],
		['F', 'H', 3],
		['G', 'H', 1],
	];

	beforeAll(() => {
		g = new Graph();
		['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].forEach(c => g.add(c));
		for (let [source, dest, cost] of model) {
			g.get(source).connect(g.get(dest), cost);
		}
	});

	test('Num Edges', () => {
		expect(g.numEdges).toBe(13);
	});

	test.each(model)('Path %p to %p', (source, dest, _) => {
		expect(g.get(source).hasPathTo(g.get(dest))).toBe(true);
	});

	test.each(model)('Cost %p to %p is %p', (source, dest, cost) => {
		expect(g.get(source).costTo(g.get(dest))).toBe(cost);
	});

	test('Adjacents', () => {
		let adj = g.get('B').adjacents().map(n => n.value);
		let exp = ['E', 'F'];
		expect(adj.sort()).toEqual(exp.sort());
	});

	test('Not a neighbor', () => {
		expect(() => g.get('A').costTo(g.get('F'))).toThrow('F is not a neighbor');
		expect(() => g.get('B').costTo(g.get('A'))).toThrow('A is not a neighbor');
	});

	test('Not directed', () => {
		let edge = g.get('A').connect(g.get('H'), 100, false);
		expect(() => g.get('A').costTo(g.get('H'))).not.toThrow('H is not a neighbor');
		expect(() => g.get('H').costTo(g.get('A'))).not.toThrow('A is not a neighbor');

		let adj = g.get('H').adjacents().map(n => n.value);
		let exp = ['A'];
		expect(adj).toEqual(exp);

		expect(() => g.get('A').connect(g.get('H'))).toThrow('H is a neighbor');;
		expect(() => edge.opposite(g.get('C'))).toThrow('C is not a neighbor');
	});
});
