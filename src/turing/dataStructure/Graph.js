/**
 * util.extend(target, source)
 * 邻接表
 * @param {object} target
 * @param {object} source
 * @return {object}
 */


function Graph(v){
	// 创建私有属性 vertices 和 adjList

	// 使用一个数组来存储图中所有顶点的名字。
	let vertices = v
	let edges = 0

	// 用一个二维数组来保存边
	// 我们将表示图的边的方法称为“邻接表”或者“邻接表数组”。一维为顶点表示索引，二维表示与该顶点相邻的顶点
	let adj = []
	for (let i = 0; i < vertices; ++i) {
		adj[i] = []
		adj[i].push("")
	}	

	// 用于添加顶点之间的边
	// 这个方法接受两个顶点作为参数。
	this.addEdge = function (v, w) {
		// 首先通过将w加入到v的邻接表中，我们添加了一条自顶点V到顶点W 的边。 如果是有向图，这一步就够了
		adj(v).push(w)
		// 如果是无向图, 我们需要添加一条自W向v的边
		adj(w).push(v)
		edges++
	}

	this.showGraph = function() {
		for (let i = 0; i < vertices; ++i) {
			for (let j = 0; j < vertices; ++j) {
				if (adj[i][j] != undefined) {
					console.log(adj[i][j] + '  ')
				}
			}
		}
	}


	// 这部分用于深度优先搜索算法
	// marked 数组用于存储已访问过的顶点，将它所有元素的值全部初始化为 false.
	let marked = []
	for (let i = 0; i < vertices; ++i) {
		marked[i] = false
	}

	// 深度优先算法
	// 访问一个没有访问过的顶点，将它标记为已访问，再递归的去访问在初始顶点的邻接表中其他没有访问过的顶点
	this.dfs = function (v) {
		marked[v] = true

		if (adj[v] != undefined) {
			console.log("Visited vertex: " + v)
		}

		for (let w in adj[v]) {
			if (!marked[w]) {
				this.dfs(w)
			}
		}
	}


	// 广度优先算法
	// 从第一个顶点开始，尽可能的去访问可能靠近它的顶点
	/*
		思想：
		(1) 查找与当前顶点相邻的未访问顶点，将其添加到已访问顶点列表及队列中
		(2) 从图中取出下一个顶点 v, 添加到已访问的顶点列表
		(3)	将所有与 v 相邻的未访问顶点添加到队列
	*/
	this.bfs = function (s) {
		let queue = []
		marked[s] = true

		// 添加到队尾
		queue.push(s)

		// while 和 for 配合， 挺奇妙的
		while (queue.length > 0) {
			// 从队首移除
			let v = queue.shift()

			if (adj[v] != undefined) {
				console.log('Visited vertex: ' + v)
			}

			for(let w in adj[v]) {
				if (!marked[w]) {
					edgeTo[w] = v
					marked[w] = true
					queue.push(w)
				}
			}

		}
	}


	// 这个用于广度优先查找最短路径	
	// 用于保存从一个顶点到下一个顶点的所有边。
	let edgeTo = []

	function hashPathTo (v) {
		return marked[v]
	}

	// 创造一个栈， 用来存储与指定顶点有共同边的所有顶点
	this.pathTo = function (v) {

		// 这里制定原点为 0， 这是示例所固定的
		let source = 0

		if (!hashPathTo[v]) {
			return undefined
		}

		let path = []

		// 这是最关键的地方， 不是很明白
		for (let i = v; i != source; i = edgeTo[i]) {
			path.push(i)
		}

		path.push(source)

		return path
	}
 
}

module.exports = Graph