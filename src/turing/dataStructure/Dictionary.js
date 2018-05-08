/**
 * util.extend(target, source)
 * 字典
 * @param {object} target
 * @param {object} source
 * @return {object}
 */

// 创建数组用于保存队列里面的元素。使用 Symbol 是为了创建一个假的私有属性
let _items = Symbol();

class Dictionary {
	constructor () {
		this[_items] = {}
	}
	// 向字典中添加一个新元素
	set (key, value) {
		if(!this.has(key)){
			this[_items][key] = value
			return true
		}
		return false
	}
	// 通过使用键值来从字典中移除键值对英的数据值
	delete(key) {
		if (this.has(key)) {
			 delete this[_items][key]
			 return true
		} 
		return false
	}
	// 如果键值在字典中，返回true，否则返回false
	has (key) {
		return this[_items].hasOwnProperty(key)
	}
	// 通过键值查找特定的数值并返回
	get(key){
		return this.has(key) ? this[_items][key] : undefined
	}
	getItems(){
		return this[_items]
	}
	// 移除字典中的所有项
	clear () {
		this[_items] = {}
	}
	// 返回字典中包含元素的数量
	size () {
		return Object.keys(this[_items]).length
	}
	// 将字典中所包含的所有键名以数组形式返回
	keys(){
		return Object.keys(this[_items])
	}
	// 将字典中所包含的所有数值以数组形式返回
	values () {
		let values = []
		for(let i = 0, keys = Object.keys(this[_items]); i< keys.length; i++){
			values.push(this[_items][keys[i]])
		}
		return values
	}
	
}

module.exports = Dictionary