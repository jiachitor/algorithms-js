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
		this[_tables] = []
	}
	// 向散列表中添加一个新元素
	put (key, value) {
		let position = loseloseHashCode(key)
		this[_tables][position] = value
	}
	// 通过使用键值来从散列表中移除值
	remove(key) {
		this[_tables][loseloseHashCode(key)] = undefined
	}
	// 通过键值查找特定的数值并返回
	get(key){
		return this[_tables][loseloseHashCode(key)]
	}
	print(){
		for(let i = 0, len = this[_tables].length; i < len; ++i){
			if (this[_tables][i] !== undefined) {
				console.log(i + ': ' + this[_tables][i])
			}
		}
	}
	
}

module.exports = HashTable