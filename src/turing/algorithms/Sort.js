/**
 * util.extend(target, source)
 * 排序算法
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
        let numElements = array.length

        // 比较任何相邻的项
        for (let outer = numElements; outer >= 2 ; --outer) {
            // 优化之后的
            for (let inner = 0; inner < outer - 1 ; ++inner){
                if (array[inner] > array[inner + 1]) {
                    [array[inner], array[inner + 1]] = [array[inner + 1], array[inner]]
                }
            }
        }

        return array
    },
    // 选择排序, 复杂度为 O(n2)
    // 其思路是找到数据结构中的最小值并将其放置到第一位，接着找到第二小的值并将其放在第二位，依此类推
    selectionSort(array){
        let length = array.length

        let min
        let temp

        for (let outer = 0; outer < length - 2 ; ++outer) {
            min = outer
            for (let inner = outer + 1; inner <= length -1; ++inner){
                if (array[min] > array[inner]) {
                    min = inner
                }
            }
            if (outer !== min) {
                [array[outer], array[min]] = [array[min], array[outer]]
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

            // 在最终空位j上插入缓存值
            array[j] = temp
        }

        return array
    },
    // 归并排序
    // 是一种分治算法，思想是将原数组切分为较小的数组，知道每一个数组只有一个位置，接着将小数组归并为较大的数组，知道最后只有一个排序完毕的大数组
    // 两种方案： 一是自顶向下的归并排序， 二是自底向上的归并排序。 考虑到迭代深度问题。 我们采用第二种方案
    mergeSort (array) {

        function mergeSort(arr){
            let length = arr.length

            if (length < 2) {
                return
            }

            // 默认为1 ， 也就是说首先将数据集分解为一组只有一个元素的数组。然后通过创建一组左右子元素数组将它们慢慢合并起来。每次合并都保存一部分排好序的数据，直到最后剩下的这个数组所有的数据都已经完美排序。
            // step 是最关键的变量，它用来控制子序列的大小
            let step = 1
            let left
            let right

            while (step < length) {
                left = 0
                right = step

                while (right + step <= length) {
                    mergeArrays(arr, left, left + step, right, right + step)
                    left = right + step
                    right = left + step
                }

                if (right < length) {
                    mergeArrays(arr, left, left + step, right, length)
                }

                step *= 2
            }
        }

        // 负责合并和排序小数组来产生大数组，最小的颗粒为只有一个项
        function mergeArrays (arr, startLeft, stopLeft, startRight, stopRight) {
            let rightArr = new Array(stopRight - startRight + 1)
            let leftArr = new Array(stopLeft - startLeft + 1)

            k = startRight

            for (let i = 0; i < (rightArr.length - 1); ++i) {
                rightArr[i] = arr[k]
                ++k
            }

            k = startLeft

            for (let i = 0; i < (leftArr.length - 1); ++i) {
                leftArr[i] = arr[k]
                ++k
            }

            rightArr[rightArr.length - 1] = Infinity
            leftArr[leftArr.length - 1] = Infinity

            let m = 0
            let n = 0

            for (let k = startLeft; k < stopRight; ++k) {
                if (leftArr[m] <= rightArr[n]) {
                    arr[k] = leftArr[m]
                    m++
                } else {
                    arr[k] = rightArr[n]
                    n++
                }
            }

            console.log("left array - ", leftArr)
            console.log("right array - ", rightArr)
        }

        return mergeSort(array)
    },
    /*希尔排序，
    将表分为几段长度，分别进行插入排序，然后进行总的排序*/
    // 因为最后一次排序的时候，大部分元素已经在正确的位置上，因此算法不必对很多元素进行交换。这就是比插入排序高效的地方
    shellSort(array) {
        let len = array.length

        // 计算间隔序列
        let gaps = [5, 3, 1]

        for (let g = 0; g < gaps.length; ++ g) {

            // 这里执行插入排序
            for (let i = gaps[g]; i < array.length; ++ i) {
                let j
                let temp = array[i]

                // 注意这里的执行条件，j -= gaps[g] 保证 j 的值是有满足退出循环条件的
                for (j = i; j >= gaps[g] && array[j - gaps[g]] > temp ; j -= gaps[g]) {
                    array[j] = array[j - gaps[g]]
                }

                array[j] = temp
            }

        }

        return array
    },

    // 希尔排序， 动态计算间隔序列
    shellSort2 (array) {
        let N = array.length
        let h = 1

        // 这个公式首先会将 初始间隔值 h 取到最大, 后面的循环中又会依次减小到最低
        while (h < N/3) {
            console.log(h)
            h = 3 * h + 1
        }

        while (h >= 1) {
            
             // 这里执行插入排序
            for (let i = h; i < N; i++) {
                for (let j = i; j >= h && array[j] < array[j-h]; j -= h) {
                    [array[j], array[j-h]] = [array[j-h], array[j]]
                }
            }

            // 这一次依此减少 h
            h = (h - 1) / 3
        }

        return array
    },

    // 快速排序
    // 是最常用的排序算法， 也是采用分治的方法，将原数组划分为较小的数组（不过没有将它们分开）
    quickSort(array){

        function qSort (arr) {
            if (arr.length === 0) {
                return []
            }

            // 创建两个数组，一个用来存放比基准值小的元素，一个用来存放比基准值大的元素
            let left = []
            let right = []

            // (1) 选择一个基准元素，将列表分隔成两个子序列。这里的 基准值取第一个元素
            let pivot = arr[0]

            //（2） 对列表进行重新排序，将所有小于基准的元素放在基准值的前面，所有大雨基准值的元素放在基准值的后面
            for (let i = 1; i < arr.length; i++) {
                if (arr[i] < pivot) {
                    left.push(arr[i])
                } else {
                    right.push(arr[i])
                }
            }

            // 分别对较小元素的子序列和较大元素的子序列重复步骤1 和步骤2
            return qSort(left).concat(pivot, qSort(right))
        }
        
        return qSort(array)
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