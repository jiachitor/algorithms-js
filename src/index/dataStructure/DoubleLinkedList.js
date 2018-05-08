/**
 * util.extend(target, source)
 * 双向链表
 * @param {object} target
 * @param {object} source
 * @return {object}
 */

// 创建数组用于保存队列里面的元素。使用 Symbol 是为了创建一个假的私有属性
let _items = Symbol();

// node 类表示需要添加到列表的项，它包含一个element属性，即要添加到列表的值，以及一个next属性，即指向列表中下一个节点项的指针。
// 双向链表还有一个链向前一个元素的属性
let Node = function (element){
	this.element = element
	this.prev = null
	this.next = null
}

// 
class DoubleLinkedList {
	constructor () {
		// 存储列表项数目的length属性（内部私有变量）
		this.length = 0
		// 需要存储第一个节点的饮用
		this.head = null
		// 保存对链表最后一项的引用
		this.tail = null
	}
	// 向列表尾部添加一个新的项
	append (element) {
		let node = new Node()
		let current

		if (this.head === null) {
			this.head = node
		} else {
			current = head

			// 循环链表，直到找到最后一项
			while (current.next){
				current = current.next
			}

			// 找到最后一项，将其next赋为node, 建立连接
			current.next = node
		}

		this.length ++
	}
	// 向列表的特定位置添加一个新的项
	insert (position, element) {
		// 检查越界值。检查 position 这个位置是否是有效的，否则返回null
		if (position > -1 && position < this.length) {
			let node = new Node(element)
			let current = this.head
			let previous
			let index = 0

			// 在第一个位置添加
			if (position === 0) {
				if(!head){
					head = node
					tail = node
				} else {
					node.next = current
					current.prev = node
					head = node
				}
			} else if (position === length) {
				current = tail
				current.next = node
				node.prev = current
				tail = node
			} else {
				// current 变量是对想要插入新元素的位置之后一个元素的引用，而previous则是对想要插入新元素的位置之前一个元素的引用。
				// 就是说在 previous 与 current 之间插入元素
				while (index++ < position) {
					previous = current
					current = current.next
				}

				node.next = current
				previous.next = node

				current.prev = node
				node.prev = previous
			}

			// 更新列表长度
			this.length ++

			return true
		} else {
			return false
		}
	}
	// 从列表中特定位置移除一项
	removeAt (element) {
		// 检查越界值。检查 position 这个位置是否是有效的，否则返回null
		if (position > -1 && position < this.length) {
			// current 的目标就是找到该删除的那一项
			let current = this.head
			let previous
			let index = 0

			// 移除第一项
			if (position === 0) {
				// 想要移除第一个元素，就需要让head指向列表的第二个元素。次时代饿current就是列表中第一个元素的引用。如果把head赋为 current.next, 就会移除第一个元素
				this.head = current.head

				// 如果只有一项，更新tail
				if(length === 1){
					this.tail = null
				} else {
					this.head.prev = null
				}
			} else if(position === length -1){
				current = this.tail
				this.tail = current.prev
				this.tail.next = null
			}else {
				// 使用内部控制和递增的index变量，迭代列表直到目标位置。current变量总是对当前所循环链表的当前元素的引用。
				// previous 是对当前元素的前一个元素的引用
				// 最后一项会从循环中跳出，不参与循环内部语句
				while (index++ < position) {
					previous = current
					current = current.next
				}

				// 将previous与current的下一项链接起来。跳过current，从而移除它。
				// 当前元素就会被丢弃在计算机内存中，等着垃圾回收器清除
				previous.next = current.next
				current.next.prev = previous
			}

			this.length--

			return current.element
		} else {
			return null
		}
	}
	// 返回元素在列表中的索引。如果列表中没有改元素则返回-1
	indexOf(){
		let current = this.head
		let index = -1

		while (current) {
			if (current.element === element) {
				return index
			}
			index ++
			current = current.next
		}

		return -1
	}
	// 从列表中移除一项
	remove(element){
		let index = this.indexOf(element)
		return this.removeAt(index)
	}
	// 如果链表中不包含任何元素，返回true, 如果链表长度大于0则返回false
	isEmpty (element) {
		return this.length === 0
	}
	// 返回链表包含的元素个数。与数组的length属性类似
	size (element) {
		return this.length
	}
	// 由于链表中使用了node类，就需要重写继承自Javascript对象默认的toString方法，让其只输出元素的值
	toString(){
		let current = this.head
		let string = ''

		while (current) {
			string += current.element + (current.next ? 'n' : '')
			current = current.next
		}

		return string
	}
	getHead(){
		return this.head
	}
	print (element) {
		console.log(this[_items].toString())
	}
}

module.exports = DoubleLinkedList