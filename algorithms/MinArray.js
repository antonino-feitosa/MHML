
class MinArray extends Array {

	constructor(values = [], compare = (a,b) => a-b){
		super();
		this.compare = compare;
		this._min_value = null;
		values.forEach(x => this.add(x));
	}

	get minimum (){
		return this._min_value;
	}

	_add(value, call){
		if(this.length === 0){
			this._min_value = value;
			return call(value);
		} else {
			let cmp = this.compare(this._min_value, value);
			if(cmp < 0){
				this._min_value = value;
				this.length = 0;
				return call(value);
			} else if(cmp === 0){
				return call(value);
			}
		}
		return this;
	}

	push(value){
		return this._add(value, x => super.push(value));
	}

	unshift(value){
		return this._add(value, x => super.unshift(value));
	}

	//fill(valor, ínicio = 0, fim = this.length){	}
}

module.exports = MinArray;