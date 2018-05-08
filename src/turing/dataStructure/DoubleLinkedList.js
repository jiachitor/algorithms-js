/**
 * util.extend(target, source)
 * 双向链表
 * @param {object} target
 * @param {object} source
 * @return {object}
 */

// 创建数组用于保存队列里面的元素。使用 Symbol 是为了创建一个假的私有属性
let _items = Symbol();

function DoubleLinkedList (){
	// node 类表示需要添加到列表的项，它包含一个element属性，即要添加到列表的值，以及一个next属性，即指向列表中下一个节点项的指针。
	function Node(element){
		this.element = element
		this.next = null
		this.previous = null
	}

	// 需要存储第一个节点的饮用
	let head = new Node('head')

	// 查找
	this.find = function (item) {
		let currNode = this.head
		while (currNode.element != item) {
			currNode = currNode.next
		}
		return currNode
	}

	// 向列表的特定位置添加一个新的项
	this.insert = function(newElement, item) {
		let newNode = new Node(newElement)
		let current = this.find(item)
		newNode.next = current.next
		newNode.previous = current
		current.next = newNode
	}

	// 从列表中移除一项
	this.remove = function(item){
		let currNode = this.find(item)
		if (!(currNode.next == null)) {
			currNode.previous.next = currNode.next
			currNode.next.previous = currNode.previous
			currNode.next = null
			currNode.previous = null
		}
	}

	// 如果链表中不包含任何元素，返回true, 如果链表长度大于0则返回false
	this.display = function(){
		let currNode = this.head
		while (!(current.next == null)) {
			console.log(current.next.element)
			currNode = current.next
		}
	}

	// 找到节点的前一个元素
	this.findPrevious = function (item) {
		let currNode = this.head
		while (!(currNode.next == null) && (currNode.next.element != item)) {
			currNode = currNode.next
		}
		return currNode
	}

	// 找出最后一个节点
	this.findlast = function (argument) {
		let currNode = this.head
		while (!(currNode.next == null)) {
			currNode = currNode.next
		}
		return currNode
	}

	this.dispReverse = function (argument) {
		let currNode = this.head
		while (!(currNode.next == null)) {
			currNode = currNode.next
		}
		return currNode
	}

}

module.exports = DoubleLinkedList