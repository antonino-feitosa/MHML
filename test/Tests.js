
module.exports = function check(expected, result, name = '', compare = (x,y) => x === y){
	if(compare(expected, result)){
		console.log('Test ' + name + ' OK!');
	} else {
		throw new Error('Test ' + name + ': Expected <' + expected + '> but got <' + result + '>.');
	}
}
