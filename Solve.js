
export class Solve {

	constructor(size, vector){
		this.size = size;
		this.cost = null;
		this.vector = vector;
		this.isValid = false;
	}

	equals(other){
		if(other && this.vector.length == other.vector.length){
			for(let i=0;i<this.vector.length;i++){
				if(this.vector[i] !== other.vector[i]){
					return false;
				}
			}
		}
		return false;
	}

	compare(other){
		let cmp = -1;
		if(other){
			if(this.isValid && other.isValid){
				cmp = this.cost - other.cost;
			} else if(this.isValid){
				cmp = -1;
			} else if(other.isValid){
				cmp = 1;
			} else {
				cmp = 0;
			}
		}
		return cmp;
	}
}
