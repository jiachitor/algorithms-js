/**
 * util.extend(target, source)
 * 数组测试平台
 * @param {object} target
 * @param {object} source
 * @return {object}
 */

function CArray(numElements){
	
	this.dataStore = []
	this.pos = 0
	this.numElements = numElements

	for (let i = 0; i < numElements; ++i) {
		this.dataStore[i] = i
	}	

	this.insert = insert

	this.toString = toString

	this.clear = clear

	this.setData = setData

	this.swap = swap
 
}

function setData () {
	for (let i = 0; i < this.numElements; ++i) {
		this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1))
	}	
}

function clear () {
	for (let i = 0; i < this.dataStore.length; ++i) {
		this.dataStore[i] = 0
	}
}

function insert (element) {
	this.dataStore[this.pos++] = element
}

function toString () {
	let restr = ""

	for (let i = 0; i < this.dataStore.length; ++i) {
		restr += this.dataStore[i] + " "

		if (i > 0 & i % 10 == 0) {
			restr += "\n"
		}
	}

	return restr
}

function swap (arr, index1, index2) {
	let temp = arr[index1]

	arr[index1] = arr[index2]
	arr[index2] = temp
}

module.exports = CArray