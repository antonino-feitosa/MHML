
const RadixTree = require('./RadixTree');

describe('key conversion',()=>{

	it('for a empty key must throws a error',()=>{
		expect(()=> RadixTree.encode()).toThrow(Error);
		expect(()=> RadixTree.decode()).toThrow(Error);
		expect(()=> RadixTree.encode('')).toThrow(Error);
		expect(()=> RadixTree.decode('')).toThrow(Error);
		expect(()=> RadixTree.encode([])).toThrow(Error);
		expect(()=> RadixTree.decode([])).toThrow(Error);
	});

	describe.each([
		['a','0110 0001'],
		['ç','1100 0011 1010 0111'],
		['€','1110 0010 1000 0010 1010 1100'],
		['𐐷','1111 0000 1001 0000 1001 0000 1011 0111']//,
		//['','']
	])('for the text %p with code %p', (text,code)=>{
		it('the encode', ()=>{
			code = code.replaceAll(' ','');
			expect(RadixTree.encode(text)).toBe(code);
		});

		it('the decode', ()=>{
			code = code.replaceAll(' ','');
			let e = RadixTree.decode(code);
			console.log('Equals', JSON.stringify(text), JSON.stringify(e), e === text);
			expect(RadixTree.decode(code)).toBe(text);
		});
	});
});
