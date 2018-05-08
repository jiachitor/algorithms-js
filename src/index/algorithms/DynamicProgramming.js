/**
 * util.extend(target, source)
 * 动态规划
 * @param {object} target
 * @param {object} source
 * @return {object}
 */


 module.exports = {
 	// 最小硬币找零
 	// _coins 参数代表问题中的面额
 	MinCoinChange(_coins) {
 		let coins = _coins

 		// 为了更高效，不重复计算值，使用cache
 		let cache = {}

 		// 这里的迭代最有意思的是，由于因为条件导致自身没有执行完时， 一旦迭代到了最底层，那么函数自身其余的代码会一层又一层的回溯执行， 这种回溯非常类似于 koa 的洋葱模型。
 		// 所以这里的理解，比如 amount 初始值是 36， coins[0] 值为 1， 那么 makeChange 会在一开始执行36次，直到 amount 参数值为 0， 返回 []， 此时迭代到底了，开始回溯执行代码。回流的时候， amount 的值 会从 0 -> 36 重新执行一遍
 		this.makeChange = function (amount){
 			// 注意这里的this缓存， 这个用法可以学习
 			let me = this

 			if (!amount) {
 				return []
 			}

 			// 如果已经有了缓存结果，则直接返回
 			if (cache[amount]) {
 				return cache[amount]
 			}

 			let min = []
 			let newMin
 			let newAmount

 			for (let i = 0; i < coins.length; i++) {
 				let coin = coins[i]
 				newAmount = amount - coin

 				// console.log(1, coin)
 			    /*
					（1）第一期执行的时候，因为 newAmount 一直是大于0 的，因此 if 语句一直会反复执行，newAmount 递减， 直到 newAmount = 0
					（2）当 newAmount = 0 的时候，me.makeChange() 会返回结果 [], 此时退出 if 语句， 开始执行后续的条件判断
 			    */
 				if (newAmount >= 0) {
 					// console.log('-------------', newAmount)
 					// 因为 newAmount 的值一直在递减， 因此 amount 也一直在递减。 关于递减的幅度，还是根据 coins[i] 的值来决定的。比如，coins[i] = 1 的时候，就是依次减1， 如果 coins[i] = 5 的时候 ，就是依次减5
 					newMin = me.makeChange(newAmount)
 				}

 				/*
					（1）判断 newAmount 是否有效。 newAmount 有可能是负数
					（2）判断 newMin（最少硬币数）是否是最优解
					（3）判断 newMin 和 newAmount 是否是合理的值

					以上条件都满足的时候，就说明有一个比之前更优的答案
 				*/
 				if (newAmount >= 0 && (newMin.length < min.length -1 || !min.length) && (newMin.length || !newAmount)) {
 					min = [coin].concat(newMin)
 					// console.log('new min ' + min + ' for ' + amount)
 				}	

 				// console.log(min)
 			}

 			// 返回数组，包含用来找零的各个面额的硬币数量（最少硬币数）
 			return (cache[amount] = min)
 		}

 	},

 	// 背包问题
 	// capacity 表示总重只能是 5
 	knapSack (capacity, weights, values) {
 		let i
 		let w
 		let a
 		let b
 		let kS = []

 		// n 指价值（values）的数组长度
 		let n = values.length

 		// 初始化用于寻找解决方案的矩阵kS[n+1][capacity+1]
 		for (i = 0; i <= n; i++) {
 			kS[i] = []
 		}

 		// 下面两层循环实际上是对矩阵赋值
 		for (i = 0; i <= n; i++) {
 			for (w = 0; w <= capacity; w++) {
 				// 忽略矩阵的第一列和第一行，只处理索引不为0的列和行
 				if (i === 0 || w === 0) {
 					kS[i][w] = 0
 				} else if (weights[i-1] <= w) {
 					// 物品的重量必须小于约束（capacity）才有可能成为解决方案的一部分
 					a = values[i-1] + kS[i-1][w - weights[i-1]]
 					b = kS[i-1][w]
 					// 当找到可以构成解决方案的物品时，选择价值最大的那个
 					kS[i][w] = (a > b) ? a : b
 				} else {
 					// 如果总重量超出背包能够携带的重量，这是不能发生的，发生这样的情况，只要忽略它，用之前的值就行了
 					kS[i][w] = kS[i-1][w]
 				}
 			}
 		}

 		function findValues(n, capacity, kS, weights, values) {
 			let i = n
 			let k = capacity

 			console.log('解决方案包含以下物品：')

 			while (i > 0 && k > 0) {
 				if (kS[i][k] !== kS[i-1][k]) {
 					console.log('物品' + i + '， 重量: ' + weights[i-1] + ', 价值： ' + values[i-1])
 					i--
 					k = k - kS[i][k]
 				} else {
 					i--
 				}
 			}
 		}

 		findValues(n, capacity, kS, weights, values)

 		return kS[n][capacity]
 	}






 }