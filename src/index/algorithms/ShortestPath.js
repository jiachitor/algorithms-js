/**
 * util.extend(target, source)
 * 求最短路径
 * @param {object} target
 * @param {object} source
 * @return {object}
 */

/*
// 有向图示例
let graphDemo = [
    [0, 2, 4, 0, 0, 0],
    [0, 0, 1, 4, 2, 0],
    [0, 0, 0, 0, 3, 0],
    [0, 0, 0, 0, 0, 2],
    [0, 0, 0, 3, 0, 2],
    [0, 0, 0, 0, 0, 0]
]
*/

// 通过循环比较，找到最小路径的值
let minDistance  = function (dist, visited) {
    // min 实际上就是存储在一轮比较中发现的最小路径值
    let min = Infinity
    let minIndex = -1

    for (let v = 0; v < dist.length; v++) {
        if (visited[v] == false && dist[v] <= min) {
            // 注意这里 min 赋值之后， 后续的循环中会以此min进行比较， 而不一直是 Infinity
            min = dist[v]
            minIndex = v
        }
    }

    return minIndex
}

// 通过循环比较，找到最小路径的值
let minKey  = function (key, visited) {
    // min 实际上就是存储在一轮比较中发现的最小路径值
    let min = Infinity
    let minIndex = -1

    for (let v = 0; v < key.length; v++) {
        if (visited[v] == false && key[v] <= min) {
            // 注意这里 min 赋值之后， 后续的循环中会以此min进行比较， 而不一直是 Infinity
            min = key[v]
            minIndex = v
        }
    }

    return minIndex
}

// 防止 MST 出现环路
let find = function(i, parent){
    while (parent[i]) {
        i = parent[i]
    }   
    return i
}

let union = function (i, j, parent) {
    if (i != j) {
        parent[j] = i
        return true
    }

    return false
}

module.exports = {
    // Dijkstra 算法是一种计算从单个源到所有其他源的最短路径的贪心算法，这意味着我们可以用它来计算从图的一个顶点到其余顶点的最短路径
    dijkstra (graph, src) {
        let dist = []
        let visited = []
        let length = graph.length

        // 首先将所有的距离（dist）初始化为无限大（js的最大数 INF = Number.MAX_SAFE_INTEGRE
        // 并将 visited[] 初始化为 false
        for (let i = 0; i < length; i++) {
            dist[i] = Infinity
            visited[i] = false
        }

        // 然后把源顶点到自己的距离设为0
        dist[src] = 0

        // 接下来是找出到其余顶点的最短路径
        for (let i = 0; i < length -1; i++) {
            // 从尚未处理的顶点中选出距离最近的顶点
            let u = minDistance(dist, visited)

            // 将选出的顶点标记为visited， 以免重复计算
            visited[u] = true

           
            // 实际上 dist[u] 会始终是源点到 u 顶点的最短路径值
            for (let v = 0; v < length; v++) {
                // 如果找到最短路径，则更新最短路径的值
                // !visited[v] 表示还没有被探索的
                // graph[u][v] != 0 表示路径是存在的
                // dist[u] != Infinit 表示不是反向，注意这是有向图
                // dist[u] + graph[u][v] < dist[v] 表示累加路径
                if (!visited[v] && graph[u][v] != 0 && dist[u] != Infinity && dist[u] + graph[u][v] < dist[v]) {

                    // 始终取最短路径， 这里一般会反复赋值数次
                    dist[v] = dist[u] + graph[u][v]
                }
            }
        }

        // 处理完所有顶点之后，返回从源顶点（src）到图中其他顶点最短路径的结果
        return dist
    },
    // Floyd-Waeshall 算法是一种计算图中所有最短路径的动态规划算法。听过该算法，我们可以找到从所有源到所有顶点的最短路径
    floydWarshall (graph) {
        let dist = []
        let length = graph.length

        // 首先将dist数组初始化为每个顶点之间的权值， 因为i 到j 可能的最短距离就是这些顶点间的权值
        for (let i = 0; i < length; i++) {
            dist[i] = []
            for (let j = 0; j < length; j++) {
                dist[i][j] = graph[i][j]
            }
        }

        // 通过k ，可以得到i途径顶点0至k， 到达j 的最短路径
        for (let k = 0; k < length; k++) {
            for (let i = 0; i < length; i++) {
                for (let j = 0; j < length; j++) {
                    // console.log(dist[k][j])
                    // console.log(dist[i][j])

                    // 判断i经过顶点k到达j的路径是否比已有的最短路径更短
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        // 如果是最短路径，则更新最短路径的值
                        // dist[i][j]  = dist[i][k] + dist[k][j]
                        // 这里有问题
                       
                    }
                }
            }
        }

        return dist
    },
    // 该算法是一种求解加权无向连通图的MST问题的贪心算法。它能找出一个边的子集，使得其构成的树包含图中所有顶点，且边的权值之和最小
    prim (graph) {
        let parent = []
        let key = []
        let visited = []
        let length = graph.length

        // 首先把所有顶点(key)初始化为无限大，visited[]初始化为false
        for (let i = 0; i < length; i++) {
            key[i] = Infinity
            visited[i] = false
        }

        // 选择第一个key作为第一个顶点
        key[0] = 0
        // 因为第一个顶点总是MST的根节点，所以parent[0] = -1
        parent[0] = -1

        // 然后对所有顶点求MST
        for (let i = 0; i < length; i++) {
            // 从所有未处理的顶点集合中选出key值最小的顶点
            let u = minKey(key, visited)

            // 将选出的顶点标记为visited, 以免重复计算
            visited[u] = true

            // 如果得到更小的权值，则保存MST路径（parent），并更新其权值
            for (let v = 0; v < length; v++) {
                if (graph[u][v] && visited[v] == false && graph[u][v] < key[v]) {
                    parent[v] = u
                    key[v] = graph[u][v]
                }
            }
        }

        // 处理完所有顶点后，返回包含MST的结果
        return parent
    },
    // Kruskal 也是一种求加权无向连通图的MST的贪心算法
    kruskal (graph) {
        let length = graph.length
        let parent = []
        let cost = []
        let ne = 0
        let a, b, u, v, minIndex
        let min = Infinity

        // 将邻接矩阵的值复制到cost数组，以方便修改且可以保留原始值 initializeCost
        for (let i = 0; i < length; i++) {
            cost[i] = []
            for (let j = 0; j < length; j++) {
                cost[i][j] = graph[i][j]
            }
        }

        // 当MST的边数小于顶点总数减1时
        while (ne < length -1) {
            // 找出权值最小的边
            for (let i = 0; i < length; i++){
                for (let j = 0; j < length; j++){
                    if (cost[i][j] < min) {
                        min = cost[i][j]
                        a = u = i
                        b = v = j
                    }
                }
            }

            console.log(min)

            // 检查MST中是否已存在这条边，以避免环路
            u = find(u, parent)
            v = find(v, parent)

            // 如果u 和 v 是不同边，则将其加入MST
            if (union(u, v, parent)) {
                ne++
            }

            // 从列表中移除这些边，以避免重复计算
            cost[a][b] = cost[b][a] = Infinity
        }

        // 返回MST
        return parent
    },
    getOne() {
        return new Promise((resolve, reject) => {
            // 这个 api 是公开的。
            fetch('http://api.icndb.com/jokes/random')
                .then(res => res.json())
                .then(data => {
                    resolve(data.value.joke);
                })
        })
    }
}