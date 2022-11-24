
const check = require('./Tests.js');
const Graph = require("../src/Graph");

let g = new Graph();

for(let i=0;i<8;i++){
	g.add(String.fromCharCode('A'.charCodeAt() + i));
}

check('ABCDEFGH', g.nodes.reduce((total, x)=> total + x.value, ''));

let nodea = g.get('A');
check('A', nodea.value);
let nodeb = g.get('B');
check('B', nodeb.value);

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

for(let [source, dest, cost] of model){
	g.get(source).connect(g.get(dest), cost);
}
for(let [source, dest, cost] of model){
	check(true, g.get(source).hasPathTo(g.get(dest)), 'Connect ' + source + ' to ' + dest);
	check(cost, g.get(source).costTo(g.get(dest)), 'Cost ' + source + ' to ' + dest);
}

console.log(g.get('B').adjacents().map(x => x.value));