/**
 * util.extend(target, source)
 * 邻接表
 * @param {object} target
 * @param {object} source
 * @return {object}
 */

const Dictionary = require('./Dictionary.js');
const Queue = require('./Queue.js');


function Graph(){
	// 创建私有属性 vertices 和 adjList

	// 使用一个数组来存储图中所有顶点的名字。
	let vertices = []
	// 使用一个字典来存储邻接表。字典将使用顶点的名字作为键，邻接顶点列表作为值。
	let adjList = new Dictionary()

	// 向图中添加顶点
	this.addVertex = function(v) {
		vertices.push(v)
		adjList.set(v, [])
	}

	// 用于添加顶点之间的边
	// 这个方法接受两个顶点作为参数。
	this.addEdge = function (v, w) {
		// 首先通过将w加入到v的邻接表中，我们添加了一条自顶点V到顶点W 的边。 如果是有向图，这一步就够了
		adjList.get(v).push(w)
		// 如果是无向图, 我们需要添加一条自W向v的边
		adjList.get(w).push(v)
	}

	this.toString = function () {
		let s = ''

		for (let i = 0; i < vertices.length; i++) {
			s += vertices[i] + ' -> '
			let neighbors = adjList.get(vertices[i])
			for(let j = 0; j<neighbors.length; j++){
				s += neighbors[j] + '  '
			}
			s += '\n'
		}

		return s
	}

	/*
	白色：表示该顶点没有被访问
	灰色：表示该顶点被访问过，但未被探索
	黑色：表示该顶点被访问过且被完全探索过
	*/

	// 广度优先搜索和深度优先搜索都需要标注被访问过的顶点，所以需要一个辅助数组color。当算法开始执行的时候，所有顶点颜色都是白色
	let initializeColor = function () {
		let _items = Symbol();
		let color = {}
		
		// 创造唯一数组
		color[_items] = []

		for (let i=0; i < vertices.length; i++){
			color[_items][vertices[i]] = 'white'
		}

		return color[_items]
	}

	// 广度优先算法
	/*
	步骤：
	（1）：创建一个队列Q
	（2）：将 v 标注为被发现的（灰色），并将 v 入队列Q
	（3）：如果Q非空， 则运行以下步骤：
		（a）: 将 u 从Q中出队列
		(b): 将标注 u 为被发现的 (灰色) 
		(c): 将 u 所有未被访问的邻点（白色）	入队列
		(d): 将 u 标注为已被探索的（黑色）
	*/
	this.bfs = function (v, callback) {
		// 初始化颜色数组
		let color = initializeColor()

		// 创建一个队列Q， 用于存储待访问和待探索的顶点
		let queue = new Queue()

		// bfs 算法接受一个顶点作为算法的起始点。将此顶点入队列
		queue.enqueue(v)

		while (!queue.isEmpty()) {
			// 从队列中移出一个顶点
			let u = queue.dequeue()
			// 取得该顶点的邻接表
			let neighbors = adjList.get(u)

			// 标注该顶点为 'grey'
			color[u] = 'grey'

			// 遍历该顶点的每一个邻居
			for (let i =0; i < neighbors.length; i++) {
				let w = neighbors[i]
				if(color[w] === 'white'){
					// 标注已经被发现
					color[w] = 'grey'
					// 将该顶点入队列
					queue.enqueue(w)
				}
			}

			// 完成探索该顶点和其相邻顶点后，我们将该顶点标注为已探索过的（颜色设置为black）
			color[u] = 'black'

			// 执行回调
			if(callback){
				callback(u)
			}
		}
	}

	// 改进版， 用于查找最短路径
	this.BFS = function (v) {
		// 初始化颜色数组
		let color = initializeColor()

		// 创建一个队列Q， 用于存储待访问和待探索的顶点
		let queue = new Queue()

		// 用于表示距离
		let d = []
		// 用于表示前溯点
		let pred = []

		// bfs 算法接受一个顶点作为算法的起始点。将此顶点入队列
		queue.enqueue(v)

		// 对于图中的每一个顶点，我们用0来初始化数组d, 用null来初始化数组pred
		for (let i = 0; i < vertices.length; i++) {
			d[vertices[i]] = 0
			pred[vertices[i]] = null
		}

		while (!queue.isEmpty()) {
			// 从队列中移出一个顶点
			let u = queue.dequeue()
			// 取得该顶点的邻接表
			let neighbors = adjList.get(u)

			// 标注该顶点为 'grey'
			color[u] = 'grey'

			// 遍历该顶点的每一个邻居
			for (let i =0; i < neighbors.length; i++) {
				let w = neighbors[i]
				if(color[w] === 'white'){
					// 标注已经被发现
					color[w] = 'grey'
					// 通过给d[u]加1来设置v 和w 之间的距离（u是w的前溯点，d[u]的值已经有了）
					d[w] = d[u] + 1
					// 当我们发现顶点u 的邻点w 时，则设置w的前溯点为u
					pred[w] = u
					// 将该顶点入队列
					queue.enqueue(w)
				}
			}

			// 完成探索该顶点和其相邻顶点后，我们将该顶点标注为已探索过的（颜色设置为black）
			color[u] = 'black'
		}

		return {
			distances: d,
			predecessors: pred
		}
	}

	// 深度优先
	/*
	步骤：
		（1）：标注v 为被发现的（灰色
		（2）：对于v 的所有未访问的邻点w, 访问顶点 w, 标注 v 为已被搜索的（黑色）
	*/
	// 深度优先搜索的步骤是递归的，这意味着深度优先搜索算法使用栈来存储函数调用（由递归来调用所创建的栈）
	this.dfs = function (callback) {
		let color = initializeColor()

		// 对于图中的每一个顶点，我们用0来初始化数组d, 用null来初始化数组pred
		for (let i = 0; i < vertices.length; i++) {
			if (color[vertices[i]] === 'white') {
				dfsVisit(vertices[i], color, callback)
			}
		}
	}

	let dfsVisit = function (u, color, callback) {
		// 访问了 u 顶点，先标记为被发现的
		color[u] = 'gray'

		if (callback) {
			callback(u)
		}

		// 获取 u 顶点的所有邻点的列表
		let neighbors = adjList.get(u)

		// 遍历该顶点的每一个邻居
		for (let i =0; i < neighbors.length; i++) {
			let w = neighbors[i]
			if(color[w] === 'white'){
				dfsVisit(w, color, callback)
			}
		}

		color[u] = 'block'
	}

	// 改进版。希望遍历图的所有节点，构建“森林”(有根的一个集合)以及一组源顶点（根），并输出两个数组：发现时间和完成探索时间。
	/*
	（1）：顶点u 的发现时间 d[u]
	（2）：当顶点u 被标记为黑色时，u 的完成探索时间f[u]
	 (3): 顶点u 的前溯点p[u]
	*/
	let time = 0
	this.DFS = function () {

		let color = initializeColor()
		let d = []
		let f = []
		let p = []

		time = 0

		for (let i = 0; i < vertices.length; i++) {
			d[vertices[i]] = 0
			f[vertices[i]] = 0
			p[vertices[i]] = null
		}

		for (let j = 0; j < vertices.length; j++) {
			if (color[vertices[j]] === 'white') {
				DFSVisit(vertices[j], color, d, f, p)
			}
		}

		return {
			discovery: d,
			finished: f,
			predecessors: p
		}
	}

	/*	
	对于改进版的深度优先算法，我们需要注意两点：
	（1）时间（time）变量值的范围之可能在图顶点数量的一倍到两倍之间
	（2）对于所有顶点u，d[u] < f[u] （意味着，发现时间的值比完成时间的值小，完成时间意思是所有顶点都已经被探索了）
	*/
	let DFSVisit = function (u, color, d, f, p) {
		console.log('discovered ' + u)

		color[u] = 'grey'

		d[u] = ++time

		// 获取 u 顶点的所有邻点的列表
		let neighbors = adjList.get(u)

		// 遍历该顶点的每一个邻居
		// 深度优先算法背后的思想是什么？边是从最近发现的顶点u处被向外探索的。只有连接到未发现的顶点的边被探索了。当u所有的边都被探索了，该算法回退到u 被发现的地方去探索其他的边。这个过程持续到我们发现了所有从原始顶点能触及的顶点。如果还有其他任何没有被探索的顶点，我们对新源顶点重复这个过程。
		for (let i =0; i < neighbors.length; i++) {
			let w = neighbors[i]
			if(color[w] === 'white'){
				p[w] = u
				DFSVisit(w, color, d, f, p)
			}
		}

		color[u] = 'block'
		f[u] = ++time
		console.log('explored ' + u)
	}

 
}

module.exports = Graph