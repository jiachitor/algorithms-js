/**
 * util.extend(target, source)
 * 集合
 * @param {object} target
 * @param {object} source
 * @return {object}
 */

// 创建数组用于保存队列里面的元素。使用 Symbol 是为了创建一个假的私有属性
let _items = Symbol();

class Set {
	constructor () {
		this[_items] = {}
	}
	// 向集合中添加一个新的项
	add (value) {
		if(!this.has(value)){
			this[_items][value] = value
			return true
		}
		return false
	}
	// 从集合中移除一个值
	remove(value) {
		if (this.has(value)) {
			 delete this[_items][value]
			 return true
		} 
		return false
	}
	// 如果值在集合中，返回true，否则返回false
	has (value) {
		return this[_items].hasOwnProperty(value)
	}
	// 移除集合中的所有项
	clear () {
		this[_items] = {}
	}
	// 返回集合中包含元素的数量
	size () {
		return Object.keys(this[_items]).length
	}
	// 返回一个包含集合中所有值的数组
	values () {
		let values = []
		for(let i = 0, keys = Object.keys(this[_items]); i< keys.length; i++){
			values.push(this[_items][keys[i]])
		}
		return values
	}
	// 并集
	union(otherSet){
		// 创建一个新的集合
		let unionSet = new Set()

		let values = this.values()

		// 将自身元素添加到新集合中
		for(let i=0; i < values.length; i++){
			unionSet.add(values[i])
		}

		values = otherSet.values()

		// 将其他集合中的元素添加到新集合中
		for(let i =0; i<values.length; i++){
			unionSet.add(values[i])
		}

		return unionSet
	}
	// 交集
	intersection(otherSet){
		// 创建一个新的集合
		let intersectionSet = new Set()

		let values = this.values()

		// 将自身元素添加到新集合中
		for(let i=0; i < values.length; i++){
			if(otherSet.has(values[i])){
				intersectionSet.add(values[i])
			}
		}

		return intersectionSet
	}
	// 差集，集合A与集合B的差集
	difference(otherSet){
		// 创建一个新的集合
		let differenceSet = new Set()

		let values = this.values()

		// 将自身元素添加到新集合中
		for(let i=0; i < values.length; i++){
			if(!otherSet.has(values[i])){
				differenceSet.add(values[i])
			}
		}

		return differenceSet
	}
	// 子集, 集合A是否是集合B的子集
	subset(otherSet){
		// 创建一个新的集合
		if(this.size() > otherSet.size()){
			return false
		}else {
			let values = this.values()

			// 将自身元素添加到新集合中
			for(let i=0; i < values.length; i++){
				if(!otherSet.has(values[i])){
					return false
				}
			}

			return true
		}
	}
}

module.exports = Set