/**
 * util.extend(target, source)
 * 栈
 * @param {object} target
 * @param {object} source
 * @return {object}
 */

// 创建数组用于保存栈里面的元素。使用 Symbol 是为了创建一个假的私有属性
let _items = Symbol();

class Stack {
	constructor () {
		this[_items] = []
	}
	// 添加一个或多个元素到栈顶
	push (element) {
		this[_items].push(element)
	}
	// 移除顶部元素，同时返回被删除的元素
	pop (element) {
		return this[_items].pop()
	}
	// 返回栈顶的元素，不对栈做任何修改
	peek (element) {
		return this[_items][this[_items].length -1]
	}
	// 如果栈里面没有任何元素就返回true， 否则返回false
	isEmpty (element) {
		return this[_items].length === 0
	}
	// 移除栈里面的所有元素
	clear (element) {
		this[_items] = []
	}
	// 返回栈里面的所有元素的长度
	size (element) {
		return this[_items].length
	}
	print (element) {
		console.log(this[_items].toString())
	}
}

module.exports = Stack