/**
 * util.extend(target, source)
 * 散列表辅助类：分离链接
 * @param {object} target
 * @param {object} source
 * @return {object}
 */

const LinkedList = require('./dataStructure/LinkedList.js');

// 散列函数
let loseloseHashCode = function (key){
	let hash = 0
	for(let i = 0; i < key.length; i++){
		hash += key.charCodeAt(i)
	}
	return hash % 37
}

let ValuePair = function(key, value){
	let table = []

	this.key = key
	this.value = value

	this.toString = function (){
		return '[' + this.key + ' - ' + this.value + ']'
	}

	this.put = function (key, value){
		let position = loseloseHashCode(key)

		// 验证要加入新元素的位置是否已经被占据
		if(table[position] == undefined){
			// 如果这个位置是第一次被加入元素，那么我们会在这个位置上初始化一个 LinkedList 实例
			table[position] = new LinkedList()
		}

		// 在LinkedList实例中添加一个ValuePair实例
		table[position].append(new ValuePair(key, value))
	}

	this.get = function (key){
		let position = loseloseHashCode(key)

		if (table[position] !== undefined){
			// 遍历链表来寻找键/值, 返回第一个元素
			let current = table[position].getHead()

			while (current.next) {
				if (current.element.key === key) {
					return current.element.value
				}

				current = current.next
			}

			// 检查元素在链表第一个或最后一个节点的情况
			if (current.element.key === key) {
				return current.element.value
			}

		}

		return undefined
	}

	this.remove = function (key){
		let position = loseloseHashCode(key)

		if (table[position] !== undefined){
			// 遍历链表来寻找键/值, 返回第一个元素
			let current = table[position].getHead()

			while (current.next) {
				if (current.element.key === key) {
					table[position].remove(current.element)
					if(table[position].isEmpty()){
						table[position] = undefined
					}
					return true
				}

				current = current.next
			}

			// 检查元素在链表第一个或最后一个节点的情况
			if (current.element.key === key) {
				table[position].remove(current.element)
				if(table[position].isEmpty()){
					table[position] = undefined
				}
				return true
			}

		}

		return false
	}
}

module.exports = ValuePair