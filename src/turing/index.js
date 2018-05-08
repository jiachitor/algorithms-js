import './index.scss';

// 数据结构
const Util = require('./util/index.js');

// 栈
const Stack = require('./dataStructure/Stack.js');

const CArray = require('./dataStructure/CArray.js');

console.log(2222)

// 算法
const Sort = require('./algorithms/Sort');
const ShortestPath = require('./algorithms/ShortestPath.js');
const DynamicProgramming = require('./algorithms/DynamicProgramming.js');

let log = console.log;

/* ---------------------------------------- 研究数据结构与算法 ---------------------------------------- */

/* ------  列表的使用  ------ */


/* ------  栈的使用  ------ */

// （1）数制间的相互转换
function mulBase (num, base) {
	let s = new Stack();

	// num % base 取余
	do {
		s.push(num % base)

		// a/=b 等价于 a=a/b
		num = Math.floor(num /= base)
	} while (num > 0)

	let converted = ""

	while (s.length() > 0) {
		converted += s.pop()
	}

	return converted
}

// console.log(mulBase(32, 2))


// （2）使用栈来判断算术表达式中的括号是否匹配
function parentheses(expression) {
	let stack = new Stack();

	let length = expression.length

	for (let i = 0; i < length; i++) { 
		if (expression[i] === '(') { 
			stack.push('('); 
		} 

		if (expression[i] === ')') { 
			if (stack.length() > 0) { 
				stack.pop(); 
			} else { 
				return false; 
			} 
		} 
	} 

	return (stack.length() <= 0) ? true : false; 
}

// console.log(parentheses('2.3 + 23 / 12 + (3.14159 * 0.24'))



/* ------  集合的使用  ------ */



/* ------  二叉树的使用  ------ */


/* ------  数组测试平台测试	  ------ */
// let numElements = 100
// let myNums = new CArray(numElements)

// myNums.setData()
// console.log(myNums.toString())


/* --------------- 研究算法 -------------------------*/

// 1. 冒泡排序
// let numElements = 10
// let myNums = new CArray(numElements)

// myNums.setData()
// console.log(myNums.toString())
// Sort.bubbleSort(myNums.dataStore)
// console.log(myNums.toString())


// 2. 选择排序
// let numElements = 10
// let myNums = new CArray(numElements)

// myNums.setData()
// console.log(myNums.toString())
// Sort.selectionSort(myNums.dataStore)
// console.log(myNums.toString())


// 2. 希尔排序
// let numElements = 20
// let myNums = new CArray(numElements)

// myNums.setData()
// console.log(myNums.toString())
// Sort.shellSort2(myNums.dataStore)
// console.log(myNums.toString())


// 3. 归并排序
// let numElements = 20
// let myNums = new CArray(numElements)

// myNums.setData()
// console.log(myNums.toString())
// Sort.mergeSort(myNums.dataStore)
// console.log(myNums.toString())

// 3. 快速排序
let numElements = 20
let myNums = new CArray(numElements)

myNums.setData()
console.log(myNums.toString())
console.log(Sort.quickSort(myNums.dataStore))

