/**
 * util.extend(target, source)
 * 列表
 * @param {object} target
 * @param {object} source
 * @return {object}
 */

// 创建数组用于保存队列里面的元素。使用 Symbol 是为了创建一个假的私有属性
let _items = Symbol();

class List {
	constructor () {
		this[_items] = []
		this.length = 0

		// 指定一个可以访问的元素的位置， 相当于这个列表的游标
		this.pos = 0
	}

	// 给列表添加元素
	append (element) {
		this[_items][this.length++] = element
	}

	// 从列表中删除元素
	remove (element) {
		let foundAt = this.find(element)

		if (foundAt > -1) {
			this[_items].splice(foundAt, 1)
			--this.length
			return true
		}

		return false
	}

	// 在列表中查找某一个元素
	find (element) {
		for (let i = 0; i < this[_items].length; i++) {
			if (this[_items][i] === element) {
				return i
			}
		}

		return -1
	}

	// 返回列表的长度
	length () {
		return this[_items].length
	} 

	// 显示列表中的元素
	toString () {
		return this[_items]
	}

	// 向列表中插入一个元素
	insert (element, after) {
		let insertPos = this.find(element)
		if (insertPos > -1) {
			this[_items].splice(insertPos + 1, 0, element)
			++this.length
			return true
		}
		return false
	}

	// 清空列表中的所有元素
	clear () {
		this[_items] = []
		this.length = this.pos = 0
	}

	// 判断给定值是否在列表中
	contains (element) {
		for (let i = 0; i < this[_items].length; i++) {
			if (this[_items][i] === element) {
				return true
			}
		}

		return false
	}

	//  以下这一组方法允许用户在列表上自由移动
	// 
	front () {
		this.pos = 0
	}

	// 
	end () {
		this.pos = this.length - 1
	}

	// 
	prev () {
		-- this.pos 
	}

	// 
	next () {
		if (this.pos < this.length) {
			++ this.pos
		}
	}

	// 
	currPos () {
		retuen this.pos 
	}

	// 
	moveTo (position) {
		this.pos = position
	}

	// 
	getElement () {
		return this[_items][this.pos]
	}

	// 
	hasNext () {
		retuen this.pos < this.length
	}

	// 
	hasPrev () {
		return this.pos >= 0
	}
}

module.exports = List