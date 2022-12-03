
const MinArray = require('./MinArray');

const values = [
	[18,1,[18]],
	[1, 1, [1, 2, 3, 4, 5]],
	[1, 1, [3, 2, 1, 4, 5]],
	[0, 1, [0, 2, 6, 8, 10]],
	[2, 1, [10, 8, 6, 4, 2]],
	[8, 2, [10, 10, 8, 8, 9, 5, 8, 9]],
	[4, 3, [4,4,4]]
];

describe('For simples values', ()=>{
	it('using push method one value', ()=>{
		let arr = new MinArray();
		arr.push(2);
		expect(arr.length).toBe(1);
		expect(arr.minimum).toBe(2);
	});

	it('using push method one value two times', ()=>{
		let arr = new MinArray();
		arr.push(7);
		arr.push(7);
		expect(arr.length).toBe(2);
		expect(arr.minimum).toBe(7);
	});

	it('using push method two values', ()=>{
		let arr = new MinArray();
		arr.push(5);
		arr.push(2);
		expect(arr).toBe([2]);
		expect(arr.length).toBe(1);
		expect(arr.minimum).toBe(2);
	});
});

describe.skip.each(values)('The Min Array must keep only the minimal %p, %p times from %p', (min, rep, vet)=>{

	it('using push method', ()=>{
		let arr = new MinArray();
		arr.push.apply(arr, vet);
		expect(arr.length).toBe(rep);
		expect(arr.minimum).toBe(min);
	});

	it('using constructor', ()=>{
		let arr = new MinArray(vet);
		expect(arr.length).toBe(rep);
		expect(arr.minimum).toBe(min);
	});

	it('using unshift method', ()=>{
		let arr = new MinArray();
		arr.unshift.apply(arr, vet);
		expect(arr.length).toBe(rep);
		expect(arr.minimum).toBe(min);
	});

	it('using fill method', ()=>{
		let arr = new MinArray();
		arr.push.apply(arr, vet);
		arr.fill(min-1, 2, 4);
		expect(arr.length).toBe(3);
		expect(arr.minimum).toBe(min-1);
	});

	it('using index', ()=>{
		let arr = new MinArray();
		arr.forEach((x,i) => arr[i] = x);
		expect(arr.length).toBe(rep);
		expect(arr.minimum).toBe(min);
	});
});
