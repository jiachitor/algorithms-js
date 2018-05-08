/**
 * util.extend(target, source)
 * 搜索二叉树
 * @param {object} target
 * @param {object} source
 * @return {object}
 */

function findMinNode(node){
	while (node && node.left !== null) {
		node = node.left
	}

	return node
} 

let insertNode = function (node, newNode){
	if (newNode.key < node.key) {
		if (node.left === null) {
			node.left = newNode
		} else {
			insertNode(node.left, newNode)
		}
	} else {
		if (node.right === null) {
			node.right = newNode
		} else {
			insertNode(node.right, newNode)
		}
	}
}

// 实际上这里要加深理解的就是，迭代本身是附加在每一个键上的，所以当一个键的迭代执行完成，那么会立即执行上一个键的迭代，所以到最后每一个键都会迭代完成。 所以这里感觉到程序的执行还是挺有意思的。这也可以理解到所有的数据处理吧
let inOrderTraverseNode = function (node, callback) {
	if(node !== null){
		// 便遍历左侧节点，知道找到最小的键
		inOrderTraverseNode(node.left, callback)
		// 执行回调
		callback(node.key)
		// 然后遍历右侧节点
		inOrderTraverseNode(node.right, callback)
	}
}

// 实际上这里要加深理解的就是，迭代本身是附加在每一个键上的，所以当一个键的迭代执行完成，那么会立即执行上一个键的迭代，所以到最后每一个键都会迭代完成。 所以这里感觉到程序的执行还是挺有意思的。这也可以理解到所有的数据处理吧
let preOrderTraverseNode = function (node, callback) {
	if(node !== null){
		// 执行回调
		callback(node.key)
		// 便遍历左侧节点，知道找到最小的键
		preOrderTraverseNode(node.left, callback)
		// 然后遍历右侧节点
		preOrderTraverseNode(node.right, callback)
	}
}

// 实际上这里要加深理解的就是，迭代本身是附加在每一个键上的，所以当一个键的迭代执行完成，那么会立即执行上一个键的迭代，所以到最后每一个键都会迭代完成。 所以这里感觉到程序的执行还是挺有意思的。这也可以理解到所有的数据处理吧
let postOrderTraverseNode = function (node, callback) {
	if(node !== null){
		// 便遍历左侧节点，知道找到最小的键
		postOrderTraverseNode(node.left, callback)
		// 然后遍历右侧节点
		postOrderTraverseNode(node.right, callback)
		// 执行回调
		callback(node.key)
	}
}

let minNode = function (node) {
	if (node) {
		while (node && node.left !== null) {
			node = node.left
		}

		return node.key
	}
	return null
}

let maxNode = function (node) {
	if (node) {
		while (node && node.right !== null) {
			node = node.right
		}

		return node.key
	}
	return null
}


let searchNode = function (node, key) {
	if (node === null) {
		return false
	}

	if (key < node.key) {
		return searchNode(node.left, key)
	} else if (key > node.key) {
		return searchNode(node.right, key)
	} else {
		return true
	}
}

let removeNode = function (node, key) {
	if (node === null) {
		return null
	}

	if (key < node.key) {
		node.left = removeNode(node.left, key)
		// 实际上这里的返回值是为了给这个键的父节点的赋值，注意这里的思维逻辑。 因为是自身的引用，所以返回值是为了赋值给 node.left
		return node
	} else if (key > node.key) {
		node.right = removeNode(node.right, key)
		// 实际上这里的返回值是为了给这个键的父节点的赋值，注意这里的思维逻辑。 因为是自身的引用，所以返回值是为了赋值给 node.right
		return node
	} else {
		// 键等于node.key
		// 注意下面任何的返回值是为了给这个键的父节点的赋值，注意这里的思维逻辑。

		// 第一种情况，只有一个叶节点
		if (node.left === null && node.right === null) {
			node = null
			return node
		}

		// 第二种情况，只有一个子节点的节点
		if (node.left === null) {
			node = node.right
			return node
		} else if ( node.right === null) {
			node = node.left
			return node
		}

		// 第三种情况，拥有两个子节点
		// 第一步： 找到了需要移除的节点后，需要找到它右边子树中最小的节点（它的继承者）
		let aux = findMinNode(node.right)
		// 第二步：用它右侧子树中最小节点的键去更新这个节点的值。通过这一步，改变了这个节点的键，也就是说它被移除了
		node.key = aux.key
		// 第三步：此时这个树中就拥有了两个相同键的节点了，这是不行的。要继续把右侧子树中最小节点移除，毕竟它已经被移至要移除节点的位置了
		node.right = removeNode(node.right, aux.key)
		// 第四步：向它的父节点返回更新后节点的引用
		return node
	}
}

function BinarySearchTree() {
	let Node = function(key) {
		this.key = key
		this.left = null
		this.right = null
	}	

	let root = null

	// 向树中插入一个新的键
	this.insert = (key) => {
		let newNode = new Node(key)

		if(root === null){
			root = newNode
		} else {
			insertNode(root, newNode)
		}
	}

	//在书中查找一个键，如果节点存在，则返回true， 如果不存在，则返回false
	this.search = (key) => {
		return searchNode(root, key)
	}

	// 通过中序遍历方式遍历所有的节点,
	// 这种方式一种应用是对树进行排序操作，也就是说会根据键值从小到大进行排序
	this.inOrderTraverse = (callback) => {
		inOrderTraverseNode(root, callback)
	}

	// 通过先序遍历方式遍历所有节点
	// 这种方式一种应用是打印一个结构化的文档
	this.preOrderTraverse = (callback) => {
		preOrderTraverseNode(root, callback)
	}

	// 通过后序遍历方式遍历所有节点
	// 这种方式的一种应用是计算一个目录和它的子目录中所占空间的大小
	this.postOrderTraverse = (callback) => {
		postOrderTraverseNode(root, callback)
	}

	// 返回树中最小的值/键
	this.min = () => {
		return minNode(root)
	}

	// 返回树中最大的值/键
	this.max = () => {
		return maxNode(root)
	}

	// 从树中移除某个键
	this.remove = (key) => {
		root =  removeNode(root, key)
	}

}



module.exports = BinarySearchTree