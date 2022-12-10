
const Trie = require('./Trie');

describe('key conversion',()=>{

	it('for a empty key must throws a error',()=>{
		expect(()=> Trie.encode()).toThrow(Error);
		expect(()=> Trie.decode()).toThrow(Error);
		expect(()=> Trie.encode('')).toThrow(Error);
		expect(()=> Trie.decode('')).toThrow(Error);
		expect(()=> Trie.encode([])).toThrow(Error);
		expect(()=> Trie.decode([])).toThrow(Error);
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
			expect(Trie.encode(text)).toBe(code);
		});

		it('the decode', ()=>{
			code = code.replaceAll(' ','');
			expect(Trie.decode(code)).toBe(text);
		});
	});
});

describe('the insertion and deletion',()=>{

	it('a simple sequence',()=>{
		let tree = new Trie();
		tree.add('key', 1);
		expect(tree.get('key')).toBe(1);
		tree.add('key 2', 2);
		tree.add('key 4', 4);
		expect(tree.get('key')).toBe(1);
		expect(tree.get('key 2')).toBe(2);
		expect(tree.get('key 4')).toBe(4);

		tree.add('key', 3);
		expect(tree.get('key')).toBe(3);
		tree.add('machine learning', 7);
		expect(tree.get('machine learning')).toBe(7);
	});
});