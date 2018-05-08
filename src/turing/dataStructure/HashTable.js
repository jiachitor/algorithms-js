/**
 * util.extend(target, source)
 * 散列表
 * @param {object} target
 * @param {object} source
 * @return {object}
 */

// 创建数组用于保存队列里面的元素。使用 Symbol 是为了创建一个假的私有属性
let _tables = Symbol();

let loseloseHashCode = function (key){
	let hash = 0
	for(let i = 0; i < key.length; i++){
		hash += key.charCodeAt(i)
	}
	return hash % 37
}

class HashTable {
	constructor () {
		this[_tables] = new Array(137)
	}

	// 生成散列值
	simpleHash (data) {
		let total = 0

		for (let i =0; i < data.length; ++i) {
			total += data.charCodeAt(i)
		}

		return total % this.table.length
	}

	// 更好的散列值
	betterHash (string, arr) {
		const H = 37

		let total = 0

		for (let i = 0 ; i < string.length ; ++i) {
			total += H * total + sting.charCodeAt(i)
		}

		total = total % arr.length

		return parseInt(total)
	}

	// 向散列表中添加一个新元素
	put (data) {
		let pos = this.betterHash(data)
		this[_tables][pos] = data
	}

    get (key) {
    	return this[_tables][this.betterHash(key)]
    }

	// 输出散列表
	showDistro () {
		let n = 0

		for (let i =0; i < this[_tables].length; ++i) {
			if (this[_tables][i] != undefined) {
				print(i + ": " + this[_tables][i])
			}
		}
	}

	// 实现开链法
	buildChains () {
		for (let i = 0; i < this[_tables].length; ++ i) {
			this[_tables][i] = new Array()
		}
	}
	
}

module.exports = HashTable