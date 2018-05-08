import './index.scss';

// 数据结构
const Util = require('./util/index.js');


const HashTable = require('./dataStructure/HashTable.js');
const BinarySearchTree = require('./dataStructure/BinarySearchTree.js');
const Graph = require('./dataStructure/Graph.js');
const Stack = require('./dataStructure/Stack.js');


// 算法
const Sort = require('./algorithms/Sort');
const ShortestPath = require('./algorithms/ShortestPath.js');
const DynamicProgramming = require('./algorithms/DynamicProgramming.js');

let log = console.log;

/* ---------------------------------------- 研究数据结构与算法 ---------------------------------------- */
// https://goo.gl/eojEGK
// https://goo.gl/kZBsGx


/* ------  栈的使用  ------ */
// console.log(Util.baseConverter(100345, 16))

/* ------  集合的使用  ------ */
let hashTableA = new HashTable()

hashTableA.put('a', '1')
hashTableA.put('b', '2')
hashTableA.put('c', '3')


// hashTableA.print()


/* ------  二叉树的使用  ------ */
let tree1 = new BinarySearchTree()
tree1.insert(11)
tree1.insert(7)
tree1.insert(15)
tree1.insert(5)
tree1.insert(3)
tree1.insert(9)
tree1.insert(10)
tree1.insert(13)
tree1.insert(12)
tree1.insert(14)
tree1.insert(20)
tree1.insert(18)
tree1.insert(25)
tree1.insert(6)
// console.log(tree1.search(16))

// function printNode(value){
// 	console.log(value)
// }

// tree1.preOrderTraverse(printNode)


/* ------  图的使用  ------ */
let graph = new Graph()
let myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

for (let i = 0; i < myVertices.length; i++) {
	graph.addVertex(myVertices[i])
}

graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'D')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')

// console.log(graph.toString())

function printNode(value){
	// console.log('Visited verter: ' + value)
}

// graph.bfs(myVertices[0], printNode)

let shortestPathA = graph.BFS(myVertices[0])

// 计算某一点到某一点的最短路径
let fromVertex = myVertices[0]
for (let i = 0; i < myVertices.length; i++ ) {
	let toVertex = myVertices[i]

	// 栈：后进先出
	let path = new Stack()

	// shortestPathA.predecessors = [A:null, B:"A", C:"A", D:"A", E:"B", F:"B", G:"D", H:"D", I:"E"]
	for (let v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) {
		// 这里是将每一个顶点的前溯点推进数组， 因此路径的形成实际上是通过跟踪前溯点来完成的
		path.push(v)
	}

	path.push(fromVertex)

	let s = path.pop()

	while (!path.isEmpty()) {
		s += ' - ' + path.pop()
	}	

	// console.log(s)
}

graph.dfs(printNode)


/* ------  求最短路径  ------ */
// graphDemo1 是一个有向图
let graphDemo1 = [
	[0, 2, 4, 0, 0, 0],
	[0, 0, 1, 4, 2, 0],
	[0, 0, 0, 0, 3, 0],
	[0, 0, 0, 0, 0, 2],
	[0, 0, 0, 3, 0, 2],
	[0, 0, 0, 0, 0, 0]
]

// graphDemo2 是一个有向图
let graphDemo2 = [
	[0, 2, 4, 0, 0, 0],
	[2, 0, 2, 4, 2, 0],
	[4, 2, 0, 0, 3, 0],
	[0, 4, 0, 0, 3, 2],
	[0, 2, 3, 3, 0, 2],
	[0, 0, 0, 2, 2, 0]
]

// 求有向图的最短路径
// console.log(ShortestPath.dijkstra(graphDemo1, 0))

// 求有向图所有的最短路径
// console.log(ShortestPath.floydWarshall(graphDemo1))

// 这个算法还有问题，需要再研究
// console.log(ShortestPath.kruskal(graphDemo2))







/* --------------- 研究算法 -------------------------*/

function ArrayList () {
	let array = []

	this.insert = function (item) {
		array.push(item)
	}

	this.toString = function () {
		return array.join()
	}
}

let arrayDemo1 = [9, 5, 8, 3, 6, 7, 1, 2, 4, 23, 11]

let arrayDemo2 = [3, 5, 1, 6, 4, 7, 2]

// console.log(Sort.heapSort(arrayDemo2))
console.log(Sort.binarySearch(arrayDemo1, 9))



/* --------------- 研究模式 -------------------------*/
/* ------  最小硬币找零  ------ */
// 不懂
let minCoinChange = new DynamicProgramming.MinCoinChange([1, 5, 10, 25])
// console.log(minCoinChange.makeChange(36))



/* ------  背包问题  ------ */
// 不懂
let values = [3, 4, 5]
let weights = [2, 3, 4]
let capacity = 5

console.log(DynamicProgramming.knapSack(capacity, weights, values))


/* ------  最长公共子序列  ------ */












