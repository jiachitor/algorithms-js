// import fs from 'fs';
const fs = require('fs');
const url = require('url');

const jokes = require('./jokes');

import './index.scss';

/* ------------------------------------------- 原生JS研究 -----------------------------------------*/

jokes.getOne()
    .then(joke => {
        document.getElementById('joke').innerHTML = joke;
    });

const copy = fs.readFileSync(__dirname + '/copyright.txt', 'utf8');
document.getElementById('copy').innerHTML = copy;


/* ------  demo1  ------ */

document.onclick = function(event) {
    event = event || window.event;
    console.log(event.target.id);
    if (event.target.id == "joke") {
        alert(1);
    }
}

/* ------  demo2  ------ */
const myURL = url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
// console.log(myURL);

/* ------  demo3  ------ */
// 数组排序
let arr1 = [7, 4, 5, 2, 1];
let arr2 = [3, 4, 5, 2, 1];

// 从小到大
function arraySort1(a, b) {
    return a > b ? 1 : -1
}

// 从大到小
function arraySort2(a, b) {
    return a > b ? -1 : 1
}

arr1.sort(arraySort1);
arr2.sort(arraySort2);

/* ------  demo4  ------ */
// 数组去重

function uniqueArray(arr) {
    let x = {};

    for (let i = 0; i < arr.length; i++) {
        if (!x[arr[i]]) {
            x[arr[i]] = i;
        };
    }

    arr.length  =  0;
    for (let j in x) {
        arr[arr.length]  = j;
    }

    return arr;
}

let arr3 = [3, 4, 5, 3, 4];

// console.log(uniqueArray(arr3));


/* ------  demo5  ------ */
// 冒泡排序
let arr4 = [3, 4, 5, 9, 1, 8, 7, 2, 6, 10];

function bubbleSort(arr) {
    let temp = 0;

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }

    return arr;
}

// console.log(bubbleSort(arr4));


// Array.prototype.slice.call(arguments, 1);


/* ------  demo6  ------ */

var bar = function(...args) {
    for (let el of args) {
        console.log(el);
    }
}

// bar(1, 2, 3, 4);
//1
//2
//3
//4


/* ------  demo7  ------ */

function commafy(n) {
    var n = n || 0;
    n = ('' + n).split('.').map(function(s, i) {
        return i ? s : s.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    }).join('.');
    return n;
}

// console.log(commafy(1270001110023.11))


let ss = 'sd.hello'.slice('sd.hello'.lastIndexOf('.'));

const extname = (filename) => {
    // let res = /[^\.]+(\.[^\.]+)/.exec(filename)
    let res = /[^\.]+(\.[^\.]+)/.exec(filename)
    console.log(res);
    return res ? res[1] : ''
}

// console.log(extname('sd.hello'));


function hexToRGB(hex) {
    var triple = /^#([a-f\d])([a-f\d])([a-f\d])$/i.exec(hex)
    console.log(triple) // ["#fff", "f", "f", "f", index: 0, input: "#fff"]
    console.log(triple.slice(1)) // ["f", "f", "f"]
    if (triple) hex = triple.slice(1).reduce((str, char) => str += (char + char), '#')
    console.log(hex)
    var result = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    var h = (p) => parseInt(result[p], 16)
    return result ? `rgb(${h(1)}, ${h(2)}, ${h(3)})` : null
}

// console.log(hexToRGB('#fff'));




/* ------  demo8  ------ */


// const getPageTags = () => [...new Set([...document.getElementsByTagName('*')].map((value) => {return value.nodeName;}))]




// const execute = (exp, ctx) => {
//   return new Function(...Object.keys(ctx), `return ${exp}`)(...Object.values(ctx))
// }


// const type = (obj) => {
//   /* TODO */
//   let type = Object.prototype.toString.call(obj)

//   console.log(type)

//   let reg = type.match(/\[\w*\s(\w+)\]/)

//   return reg[1].toLowerCase()

// }

// console.log(type(123444))


let tree1 = [4, 3, 2, 7, 1, 2, 3, 6, 5, 9, null, null, null, null, null]

const invertTree = (tree) => {
    /* TODO */
    let i = 1;
    let newArr = []

    function a(arr, num) {
        let ss = arr.splice(0, num)
        tree = arr
        return ss.reverse()
    }

    let fn = () => {

        if (i <= tree.length) {
            let result = a(tree, i)

            newArr = newArr.concat(result)

            i = i * 2
            fn()
        }
    }

    fn()

    return newArr
}

// console.log(invertTree(tree1))


const invertTree2 = (tree) => {
    let i = 1;
    if (tree.length < 1)
        return [];

    let newTree = [tree[0]];
    while (Math.pow(2, i) <= tree.length + 1) {
        newTree.push(...tree.slice(Math.pow(2, i) - 1, Math.pow(2, i + 1) - 1).reverse());
        i++;
    }
    return newTree;
}


/* ------  demo9  ------ */

// var arr = ["apple","orange","apple","orange","pear","orange"];

// function getWordnum(arr){
// 	let o = {}
// 	arr.reduce((prev, next, index) => {
// 		if(prev[next]){
// 			prev[next] = prev[next] + 1
// 		} else {
// 			prev[next] = 1
// 		}

// 		return prev
// 	},o)
// }

// var fn = function(a, b, c) {
//     return a + b + c
// };

// console.log(curry(fn)(1)(2)(3)); //6

// function curry(fx) {
//   var arity = fx.length;

//   return function f1() {
//     var args = Array.prototype.slice.call(arguments, 0);
//     if (args.length >= arity) {
//       return fx.apply(null, args);
//     }
//     else {
//       return function f2() {
//         var args2 = Array.prototype.slice.call(arguments, 0);
//         return f1.apply(null, args.concat(args2)); 
//       }
//     }
//   };
// }



// setTimeout(function() {
//     console.log(1)
// }, 0);
// new Promise(function executor(resolve) {
//     console.log(2);
//     for (var i = 0; i < 4; i++) {
//     	console.log(i);
//         i == 3 && resolve();
//     }
//     console.log(3);
// }).then(function() {
//     console.log(4);
// });
// console.log(5);



// 2， 4， 5， 1

// 你猜这是什么
// 给你的惊喜哦



// parseQueryString (url) {
// 	val search = url.split('?')[1];
// 	var temp = search.split('&');
// 	var ss = {}

// 	temp.forEach((item, index) => {
// 		var tmp2 = item.split('=');
// 		ss[tmp2[0]] = tmp2[1];
// 	})

// 	return temp
// }



// function quickSearch (arr) {
// 	var tmpIndex = Math.floor(arr.length/2);
// 	var leftArr = [];
// 	var rightArr = [];

// 	// splice 返回被删除的项目
// 	var pivot = arr.splice(tmpIndex, 1)[0]

// 	for(var i =0, len = arr.lenght; i < len; i++){
// 		if(arr[i] < pivot){
// 			leftArr.push(arr[i])
// 		} else {
// 			rightArr.push(arr[i])
// 		}
// 	}

// 	return quickSearch(leftArr).concat(pivot, quickSearch(rightArr))

// }


let name = 'a'

let aa = {
	name: 'b',
	props: {
		name: 'c',
		getName: function() {
			console.log(this.name)
		}
	}
}

console.log(aa.props.getName())






