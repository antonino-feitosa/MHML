
class Node {

	constructor(value, isLeaf = false, left = null, right = null) {
		this.value = value;
		this.isLeaf = isLeaf;
		this.left = left;
		this.right = right;
	}
}

class RadixTree {

	constructor() {
		this.root = null;
	}

	get(key, value) {

	}

	add(key, value) {
		return this;
	}

	static _padding(code, n) {
		while (code.length % 8) {
			code = '0' + code;
		}
		return code;
	}

	static encode(text) { // unicode to binary
		if (!text || text.length == 0) {
			throw new Error('The text is empty!');
		}
		let code_array = new TextEncoder().encode(text);
		return code_array.reduce((str, code) => str + code.toString(2).padStart(8, '0'), '')
	}

	static decode(binary) { // binary to unicode
		if (!binary || binary.length == 0) {
			throw new Error('The binary is empty!');
		}
		let code_array = [];
		for (let i = 0; i < binary.length; i += 8){
			let bincode = binary.slice(i, i + 8);
			let intcode = parseInt(bincode, 2);
			code_array.push(intcode)
		}
		return new TextDecoder().decode(new Uint8Array(code_array));
	}
}

module.exports = RadixTree;
