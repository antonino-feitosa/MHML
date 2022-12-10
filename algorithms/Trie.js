
class Node {

	constructor() {
		this.value = null;
		this.left = null;
		this.right = null;
	}

	get hasValue() {
		return this.value !== null;
	}
}

/**
 * Class representing a digital binary tree mapping keys to values.
 * It allows prefixes.
 */
class Trie {

	/** Creates a empty Trie. */
	constructor() {
		this.root = new Node(null);
	}

	/**
	 * Recover a value from a key.
	 * @param {*} key - The query.
	 * @returns {*} The associated value if the key is present in the trie or null otherwise.
	 */
	get(key) {
		let code = Trie.encode(key);
		return this._get(this.root, code, 0);
	}

	_get(root, code, level) {
		if (root === null) {
			return null;
		} else if (level < code.length) {
			let child = code[level] === '0' ? root.left : root.right;
			return this._get(child, code, level + 1);
		} else if (root.hasValue) {
			return root.value;
		} else {
			return null;
		}
	}

	/**
	 * Add a pair key value in the trie.
	 * @param {*} key - The key of the pair.
	 * @param {*} value - The value of the key.
	 * @returns The refence of this object.
	 */
	add(key, value) {
		let code = Trie.encode(key);
		console.log(code);
		this._add(this.root, code, 0, value);
		return this;
	}

	_add(root, code, level, value) {
		if (level < code.length) {
			let child;
			if (code[level] === '0') {
				if (!root.left) root.left = new Node();
				child = root.left;
			} else {
				if (!root.right) root.right = new Node();
				child = root.right;
			}
			return this._add(child, code, level + 1, value);
		} else {
			return root.value = value;
		}
	}

	_toString(key, node, level){
		if(node === null){
			return '';
		} else {
			let str = '';
			str += ' '.repeat(level) + key + ' - ' + node.value + '\n';
			str += this._toString(key + 'R', node.right, level + 1);
			str += this._toString(key + 'L', node.left, level + 1);
			return str;
		}
	}

	toString(){
		return this._toString('', this.root, 0);
	}

	static _padding(code, n) {
		while (code.length % 8) {
			code = '0' + code;
		}
		return code;
	}

	/**
	 * Convert a string into a unicode binary sequence.
	 * Each caractere is represented by 8 bits padding 0 left.
	 * @param {string} text - The text.
	 * @returns {string} The binary sequence.
	 */
	static encode(text) {
		if (!text || text.length == 0) {
			throw new Error('The text is empty!');
		}
		let code_array = new TextEncoder().encode(text);
		return code_array.reduce((str, code) => str + code.toString(2).padStart(8, '0'), '')
	}

	/**
	 * Convert a unicode binary sequence into a string.
	 * Each caractere is represented by 8 bits padding 0 left.
	 * @param {string} binary - The unicode sequence.
	 * @returns {string} The text.
	 */
	static decode(binary) {
		if (!binary || binary.length == 0) {
			throw new Error('The binary is empty!');
		}
		let code_array = [];
		for (let i = 0; i < binary.length; i += 8) {
			let bincode = binary.slice(i, i + 8);
			let intcode = parseInt(bincode, 2);
			code_array.push(intcode)
		}
		return new TextDecoder().decode(new Uint8Array(code_array));
	}
}

module.exports = Trie;
