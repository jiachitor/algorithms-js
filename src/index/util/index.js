// 数据结构
const Stack = require('../dataStructure/Stack.js');
const Queue = require('../dataStructure/Queue.js');

module.exports = {
	// 进制转换, 支持 2，8 ，10， 16
    baseConverter(decNumber, base) {
    	let remStack = new Stack()

    	let rem
    	let baseString = ''
    	let digits = '0123456789ABCDEF'

    	while (decNumber > 0) {
    		// ' % ' 是取余
    		rem = Math.floor(decNumber % base)
    		remStack.push(rem)
    		// ' / ' 是取整
    		decNumber = Math.floor(decNumber / base)
    	}

    	while (!remStack.isEmpty()) {
    		baseString += digits[remStack.pop()]
    	}

        return baseString
    },
    // 击鼓传花
    hotPotato(nameList, num) {
    	let queue = new Queue()

    	for (let i = 0; i < nameList.length; i ++) {
    		queue.enqueue(nameList[i])
    	}

    	let eliminated = ''
    	while (queue.size() > 1) {
    		// 模拟击鼓传花，如果你把花传给了旁边的人，那么你的威胁就没有了。
    		// 从队列的开头移除一项，然后将这一项添加到队列末尾
    		for (let i =0; i < num; i++) {
    			queue.enqueue(queue.dequeue())
    		}
    		// 循环到这一步就是那个拿花的人，淘汰掉
    		eliminated = queue.dequeue()
    		console.log(eliminated + ' 在击鼓传花游戏中被淘汰。')
    	}

    	// 返回最后一人
    	return queue.dequeue()
    }
}

