/**
 * util.extend(target, source)
 * 检索算法
 * @param {object} target
 * @param {object} source
 * @return {object}
 */
 

 module.exports = {
 	// 二分查找
 	binSearch(arr, data) {
 		let upperBound = arr.length - 1
 		let lowerBound = 0

 		while (lowerBound <= upperBound) {
 			let mid = Math.floor((upperBound + lowerBound) / 2)

 			if (arr[mid] < data) {
 				lowerBound = mid + 1
 			} else if (arr[mid] > data) {
 				upperBound = mid + 1
 			} else {
 				return mid
 			}
 		}

 		return -1
 	}
 }