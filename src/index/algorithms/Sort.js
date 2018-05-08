/**
 * util.extend(target, source)
 * 排序
 * @param {object} target
 * @param {object} source
 * @return {object}
 */

/*
关于排序算法在实际中的使用。
冒泡排序，选择排序， 插入排序 因为复杂度高，性能不好，因此在实际中不会被使用。
归并排序是第一个被实际使用的排序，firefox 中 sort 使用的就是该排序。
快速排序在chrome 中被用于 sort的实现
*/
module.exports = {
    // 冒泡排序， 复杂度为 O(n2)
    bubbleSort (array) {
        let length = array.length

        // 比较任何相邻的项
        for (let i = 0; i < length ; i++) {
            // 优化之后的
            for (let j = 0; j < length - 1 - i; j++){
                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]]
                }
            }
        }

        return array
    },
    // 选择排序, 复杂度为 O(n2)
    // 其思路是找到数据结构中的最小值并将其放置到第一位，接着找到第二小的值并将其放在第二位，依此类推
    selectionSort(array){
        let length = array.length
        let indexMin

        for (let i = 0; i < length - 1 ; i++) {
            indexMin = i
            for (let j = i; j < length; j++){
                if (array[indexMin] > array[j]) {
                    indexMin = j
                }
            }
            if (i !== indexMin) {
                [array[i], array[indexMin]] = [array[indexMin], array[i]]
            }
        }

        return array
    },
    // 插入排序
    // 原理是数组不停的通过插入赋值，最终将值重制到合理的位置上
    insertionSort (array) {
        let length = array.length

        let j
        let temp

        for (let i = 1; i < length; i++) {

            j = i
            // 缓存值
            temp = array[i]

            // 如果前面的值大于缓存值，那么将前一位的值赋值到后一位上，依此类推，最终在正确的位置上会空出一个位置来
            while (j > 0 && array[j-1] > temp) {
                array[j] = array[j-1]
                j--
            }

            // 在最终空位上插入缓存值
            array[j] = temp
        }

        return array
    },
    // 归并排序
    // 是一种分治算法，思想是将原数组切分为较小的数组，知道每一个数组只有一个位置，接着将小数组归并为较大的数组，知道最后只有一个排序完毕的大数组
    mergeSort (array) {
        function mergeSortRec(_array){
            let length = _array.length

            // 由于算法是递归的，因此设置一个停止条件，就是判断数组的长度是否为1的时候，如果是的时候，则直接返回这个长度为1 的数组，因为它已经排序了
            if (length ===1) {
                return _array
            }

            // 定义数组的中间位
            let mid = Math.floor(length/2)
            let left = _array.slice(0, mid)
            let right = _array.slice(mid, length)

            // 这里不断切分数组
            return merge(mergeSortRec(left), mergeSortRec(right))
        }

        // 负责合并和排序小数组来产生大数组，最小的颗粒为只有一个项
        function merge (left, right) {
            // console.log('1', left)
            // console.log('2', right)

            let result = []
            let il = 0
            let ir = 0

            // 注意这里比较灵活的地方，il 与 ir 只有一个有条件进行自加，自加后，可以进行下一轮的循环，直到最后一项
            // 当小数组合并成大数组的过程中，il 与 ir 是会交替自加的，这样的方式就可以将两个数组中年的值按照正确的顺序插入到result 数组中，这样便完成了排序与合并
            while (il < left.length && ir < right.length) {
                // 我们比较来自left数组的项是否比来自right数组的项小
                if (left[il] < right[ir]) {
                    // 如果是，将该项从left数组添加至归并结果数组，并迭代数组的控制变量
                    result.push(left[il++])
                } else {
                    // 否则，将该项从right数组添加至归并结果数组，并迭代数组的控制变量
                    result.push(right[ir++])
                }
            }

            // console.log('------', result)

            // 如果 il 经过自加后，还是小于原数组的长度，则插入剩余的值
            while (il < left.length) {
                result.push(left[il++])
            }

            // 如果 ir 经过自加后，还是小于原数组的长度，则插入剩余的值
            while (ir < right.length) {
                result.push(right[ir++])
            }

            return result
        }

        return mergeSortRec(array)
    },
    /*希尔排序，
   将表分为几段长度，分别进行排序，然后进行总的排序*/
    shellSort(array) {
        var i, j, temp;
        var increment = array.length;
        do {
            //取到希尔跳跃 因为js取到的是浮点数，我们要把它转化成不大于该值得整数
            increment = Math.floor(increment / 3 + 1);
            for (i = increment; i < array.length; i++) //循环便利increment到t.length的值
            {
                if (array[i] < array[i - increment]) { //前面值大于后面值 则将t[i]插入有序增量子表
                    temp = array[i]; //先将小的数值存储
                    for (j = i - increment; j >= 0 && temp < array[j]; j -= increment) { //跳值便利前面的数值，将比找到的这个小的值大的值往后移
                        array[j + increment] = array[j]; //不断移动，找到这个temp应该插入的位置
                    }
                    array[j + increment] = temp; //插入该位置！
                }
            }
        }
        while (increment > 1)

        return array
    },

    // 快速排序
    // 是最常用的排序算法， 也是采用分治的方法，将原数组划分为较小的数组（不过没有将它们分开）
    quickSort(array){
        // 声明一个主方法来调用递归函数，传递待排序数组，以及索引0及其最末的位置， 第一步的时候我们需要排整个数组，而不是子数组
        function quick (_array, left, right) {
            // 声明index, 该变量能帮助我们将子数组分离为较小值数组和较大值数组，这样我们可以再次递归调用quick 函数
            let index

            if (_array.length > 1) {
                // 得到中间值
                index = partition(_array, left, right)

                if (left < index -1) {
                    quick (_array, left, index - 1)
                }

                if (index < right) {
                    quick (_array, index, right)
                }
            }
        }

        // 这里我们取中间值
        function partition(_array, left, right) {
            // 选择中间项作为主元
            let pivot = _array[Math.floor((right + left) / 2)]
            // 初始化左指针
            let i = left
            // 初始化右指针
            let j = right

            // 只要left 和 right 没有相互交错，就执行划分操作
            while (i <= j) {
                // 首先移动left 指针，直到找到一个元素比主元大，为什么要找比主元大的？因为为了和right比主元小的元素交换位置
                while (_array[i] < pivot) {
                    i++
                }

                // 然后移动right 指针，直到找到一个元素比主元小
                while (_array[j] > pivot) {
                    j--
                }

                // 当左指针指向的元素比主元大且右指针指向的元素比主元小，并且此时左指针索引没有右指针索引大，意思是左项比右项大（值比较）。我们交换它们，然后移动两个指针，并重复此过程
                if (i <= j) {
                    [_array[i], _array[j]] = [_array[j], _array[i]]
                    i++
                    j--
                }
            }

            // 划分操作结束后，返回左指针的索引
            return i
        }   

        quick(array, 0, array.length -1)

        return array
    },
    // 堆排序（二叉堆）
    // 是一种很高效的算法，因其将数组当作二叉树来排序而得名
    /*
        这个算法会根据以下的信息，把数组当作二叉树来管理
        （1）索引0是树的根节点
        （2）除根节点外，任意节点N的父几点是N/2
        （3）节点L的左子节点是2*L
        （4）节点R的右子节点是2*R + 1
    */
    // 还是有问题
    /*
       堆排序：原理是，将数组看成一个完全二叉树；
       完全二叉树的一个“优秀”的性质是，除了最底层之外，每一层都是满的，这使得堆可以利用数组来表示（普通的一般的二叉树通常用链表作为基本容器表示），每一个结点对应数组中的一个元素。
       堆分为：大根堆和小根堆，升序排序采用大根堆，降序排序采用小根堆。
       形如：     0
             1      2
           3   4  5   6
        7   8 9 10
       只需要遍历一半的值，进行循环比对，把最大的节点赋值到根的位置，然后把根部的值和最后一个数值交换，排除最后一个数值
       继续打造大顶堆，最终形成一个小顶堆的算法！

    */
    // 堆排序的基本思想是：将待排序序列构造成一个大顶堆，此时，整个序列的最大值就是堆顶的根节点。将其与末尾元素进行交换，此时末尾就为最大值。然后将剩余n-1个元素重新构造成一个堆，这样会得到n个元素的次小值。如此反复执行，便能得到一个有序序列了
    /*
    对于给定的某个结点的下标 i，可以很容易的计算出这个结点的父结点、孩子结点的下标：
    Parent(i) = floor(i/2)，i 的父节点下标
    Left(i) = 2i，i 的左子节点下标
    Right(i) = 2i + 1，i 的右子节点下标
    */
    // 原理说明：https://www.cnblogs.com/chengxiao/p/6129630.html
    // 我的理解是，其实还是一个数组，但是我们按照二叉堆去理解，就可以使用堆的方法
    heapSort(array){
        let heapSize = array.length

        //构造一个满足array[parent(i)] >= array[i] 的堆结构， 就是大顶堆
        // 这是步骤一 构造初始堆。将给定无序序列构造成一个大顶堆（一般升序采用大顶堆，降序采用小顶堆)。
        buildHeap(array)

        console.log('---------------')

        // 实际上这是步骤二 将堆顶元素与末尾元素进行交换，使末尾元素最大。然后继续调整堆，再将堆顶元素与末尾元素交换，得到第二大元素。如此反复进行交换、重建、交换。
        while (heapSize > 1) {
            heapSize --
            // 交换堆里的第一个元素（数组中较大的值）和最后一个元素的位置。这样，最大的值就会出现在它已排序的位置
            
            [array[0], array[heapSize]] = [array[heapSize], array[0]]

            // 上一步可能会丢掉堆的属性。因此，我们还需要执行一个heapify 函数，再次将数组转换成堆，也就是说，他会找到当前堆的根节点(较小的值),重新放到树的底部
            // 重新调整结构，使其满足堆定义，然后继续交换堆顶元素与当前末尾元素，反复执行调整+交换步骤，直到整个序列有序。
            heapify(array, heapSize, 0)
        }

        function buildHeap(_array) {
            let _heapSize = _array.length

            //从最后一个拥有子节点的节点开始，将该节点连同其子节点进行比较，
            //将最大的数交换与该节点,交换后，再依次向前节点进行相同交换处理，
            //直至构建出大顶堆（升序为大顶，降序为小顶）
            for (let i = Math.floor(_array.length / 2); i >= 0; i--) {
                heapify(_array, _heapSize, i)
            }
        }

        // 初始化结构的时候，buildHeap 函数里面 _heapSize 为 数组的长度。 后续执行 heapify，_heapSize 依次递减
        // i 就是父节点的在数组中的索引值
        function heapify(_array, _heapSize, i){
            // 定义左子节点
            let left = i * 2 + 1
            // 定义右子节点
            let right = i * 2 + 2
            // 其实就是父节点
            let largest = i

            // 如果左子节点大于父节点
            if (left < _heapSize && _array[left] > _array[largest]) {
                largest = left
            }

            // 如果右子节点大于父节点
            if (right < _heapSize && _array[right] > _array[largest]) {
                largest = right
            }

            // 如果存在子节点大于父节点的情况下，则交换子节点与父节点的值
            if (largest !== i) {
                [_array[i], _array[largest]] = [_array[largest], _array[i]]
                // 这一这里 largest 是不断变换的， 因此可以遍历到所有节点
                heapify(_array, _heapSize, largest)
            }
        }

        return array
    },
    // 二分查找
    // 一般的搜索算法都是js引擎内部实现的，比如 indexOf 等
    binarySearch(array, item){
        this.quickSort(array)

        let low = 0
        let high = array.length -1
        let mid
        let element

        while (low <= high) {
            mid = Math.floor((low + high) / 2)
            element = array[mid]

            if (element < item) {
                low = mid + 1
            } else if(element > item) {
                high = mid -1
            } else {
                return mid
            }
        }

        return -1
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