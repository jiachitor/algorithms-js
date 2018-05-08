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
		this.top = 0
	}
	// 添加一个或多个元素到栈顶
	push (element) {
		this[_items][this.top++] = element
	}
	// 移除顶部元素，同时返回被删除的元素. 返回栈顶元素，同时将变量 top 的值减1
	pop (element) {
		return this[_items][--this.top]
	}
	// 返回栈顶的元素，不对栈做任何修改
	peek (element) {
		return this[_items][this.top -1]
	}
	// 如果栈里面没有任何元素就返回true， 否则返回false
	isEmpty (element) {
		return this[_items].length === 0
	}
	// 移除栈里面的所有元素
	clear (element) {
		this.top = 0
	}
	// 返回栈里面的所有元素的长度
	length (element) {
		return this.top 
	}
	print (element) {
		console.log(this[_items].toString())
	}
}

module.exports = Stack