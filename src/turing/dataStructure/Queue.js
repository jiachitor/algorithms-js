/**
 * util.extend(target, source)
 * 队列
 * @param {object} target
 * @param {object} source
 * @return {object}
 */

// 创建数组用于保存队列里面的元素。使用 Symbol 是为了创建一个假的私有属性
let _items = Symbol();

class Queue {
	constructor () {
		this[_items] = []
	}
	// 向队列尾部添加一个（或多个）新的项
	enqueue (element) {
		this[_items].push(element)
	}
	// 移除队列的第一（即排在队列最前面的）项，并返回被移除的元素
	dequeue (element) {
		return this[_items].shift()
	}
	// 返回队列中的第一个元素
	front (element) {
		return this[_items][0]
	}
	// 返回队列中的最后一个元素
	back (element) {
		return this[_items][this[_items].length - 1]
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

module.exports = Queue