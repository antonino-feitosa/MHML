
const Heap = require('./Heap');

describe('for a empty heap',()=>{

	it('the length is 0', ()=>{
		expect(new Heap().length).toBe(0);
	});

	it('the isEmpty to be true',()=>{
		expect(new Heap().isEmpty).toBeTruthy();
	});

	it('the peek to throw a error',()=>{
		expect(()=> new Heap().peek).toThrow(Error);
	});
});

describe('for the sequence <5,3,8,1,4> with priority to the lowest value',()=>{

	it('the peek and pop must return the minimum element',()=>{
		let heap = new Heap([5,3,8,1,4]);
		expect(heap.peek).toBe(1);
		expect(heap.length).toBe(5);
		expect(heap.pop()).toBe(1);
		expect(heap.length).toBe(4);
		expect(heap.isEmpty).toBeFalsy();

		expect(heap.peek).toBe(3);
		expect(heap.length).toBe(4);
		expect(heap.pop()).toBe(3);
		expect(heap.length).toBe(3);
		expect(heap.isEmpty).toBeFalsy();

		expect(heap.peek).toBe(4);
		expect(heap.length).toBe(3);
		expect(heap.pop()).toBe(4);
		expect(heap.length).toBe(2);
		expect(heap.isEmpty).toBeFalsy();

		expect(heap.peek).toBe(5);
		expect(heap.length).toBe(2);
		expect(heap.pop()).toBe(5);
		expect(heap.length).toBe(1);
		expect(heap.isEmpty).toBeFalsy();

		expect(heap.peek).toBe(8);
		expect(heap.length).toBe(1);
		expect(heap.pop()).toBe(8);
		expect(heap.length).toBe(0);
		expect(heap.isEmpty).toBeTruthy();
	});

	it('the sequencial push must preserves the priority',()=>{
		let heap = new Heap();
		expect(heap.length).toBe(0);
		expect(heap.isEmpty).toBeTruthy();

		//<5,3,8,1,4>
		expect(heap.push(5)).toBeInstanceOf(Heap);
		expect(heap.peek).toBe(5);
		expect(heap.length).toBe(1);
		expect(heap.isEmpty).toBeFalsy();

		expect(heap.push(3)).toBeInstanceOf(Heap);
		expect(heap.peek).toBe(3);
		expect(heap.length).toBe(2);
		expect(heap.isEmpty).toBeFalsy();
		
		expect(heap.push(8)).toBeInstanceOf(Heap);
		expect(heap.peek).toBe(3);
		expect(heap.length).toBe(3);
		expect(heap.isEmpty).toBeFalsy();

		expect(heap.push(1)).toBeInstanceOf(Heap);
		expect(heap.peek).toBe(1);
		expect(heap.length).toBe(4);
		expect(heap.isEmpty).toBeFalsy();

		expect(heap.push(4)).toBeInstanceOf(Heap);
		expect(heap.peek).toBe(1);
		expect(heap.length).toBe(5);
		expect(heap.isEmpty).toBeFalsy();

		expect(heap.pop()).toBe(1);
		expect(heap.peek).toBe(3);
		expect(heap.length).toBe(4);
		expect(heap.isEmpty).toBeFalsy();
	});
});
