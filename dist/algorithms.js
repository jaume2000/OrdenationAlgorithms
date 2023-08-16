export class Algorithm {
    constructor() {
        this.dangerous = false;
    }
    swap(sh, array, i, j) {
        sh.push(['swap', i, j]);
        let aux = array[i];
        array[i] = array[j];
        array[j] = aux;
    }
    setPivot(sh, p) {
        sh.push(['set_pivot', p]);
    }
    setValue(sh, p, v) {
        sh.push(['set_value', p, v]);
    }
}
export class Randomize extends Algorithm {
    execute(array) {
        let sh = [];
        for (let i = 0; i < array.length; i++) {
            let j = Math.floor(Math.random() * (i + 1));
            this.swap(sh, array, i, j);
        }
        return sh;
    }
}
export class QuickSort extends Algorithm {
    execute(array) {
        let sh = [];
        this.quickSortInPlace(sh, array, 0, array.length - 1);
        return sh;
    }
    quickSortInPlace(sh, arr, left = 0, right = arr.length - 1) {
        if (left >= right) {
            return;
        }
        const pivot = arr[Math.floor((left + right) / 2)];
        const index = this.partition(sh, arr, left, right, pivot);
        this.setPivot(sh, index);
        this.quickSortInPlace(sh, arr, left, index - 1);
        this.quickSortInPlace(sh, arr, index, right);
    }
    partition(sh, arr, left, right, pivot) {
        while (left <= right) {
            while (arr[left] < pivot) {
                left++;
            }
            while (arr[right] > pivot) {
                right--;
            }
            if (left <= right) {
                this.swap(sh, arr, left, right);
                left++;
                right--;
            }
        }
        return left;
    }
}
export class BubbleSort extends Algorithm {
    execute(array) {
        let sh = [];
        for (let i = 1; i < array.length; i++) {
            for (let j = 0; j < array.length - i; j++) {
                if (array[j] > array[j + 1]) {
                    this.swap(sh, array, j, j + 1);
                }
            }
        }
        return sh;
    }
}
export class BidirectionalBubbleSort extends Algorithm {
    execute(array) {
        let sh = [];
        for (let i = 1; i < Math.floor(array.length / 2) + 1; i++) {
            for (let j = i - 1; j < array.length - i; j++) {
                if (array[j] > array[j + 1]) {
                    this.swap(sh, array, j, j + 1);
                }
            }
            for (let j = array.length - i - 1; j >= i; j--) {
                if (array[j] < array[j - 1]) {
                    this.swap(sh, array, j, j - 1);
                }
            }
        }
        return sh;
    }
}
export class InsertionSort extends Algorithm {
    execute(array) {
        let sh = [];
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] > array[i + 1]) {
                let j = i;
                while (j > 0 && array[j] >= array[j + 1]) {
                    this.swap(sh, array, j, j + 1);
                    j--;
                }
            }
        }
        return sh;
    }
}
export class MergeSort extends Algorithm {
    constructor() {
        super(...arguments);
        this.dangerous = true;
    }
    execute(array) {
        let sh = [];
        this.mergesort(sh, array, 0, array.length - 1);
        return sh;
    }
    mergesort(sh, array, lo, hi) {
        if (lo < hi) {
            console.log(lo, hi);
            let middle = Math.floor((hi + lo) / 2);
            this.mergesort(sh, array, lo, middle);
            this.mergesort(sh, array, middle + 1, hi);
            this.merge(sh, array, lo, middle, hi);
        }
    }
    merge(sh, array, lo, middle, hi) {
        let left = lo;
        let right = middle + 1;
        let offset = 0;
        let auxArray = new Array(hi - lo + 1);
        while (left <= middle && right <= hi) {
            if (array[left] < array[right]) {
                auxArray[offset] = array[left];
                left++;
            }
            else {
                auxArray[offset] = array[right];
                right++;
            }
            this.setValue(sh, lo + offset, auxArray[offset]);
            offset++;
        }
        while (left <= middle) {
            auxArray[offset] = array[left];
            this.setValue(sh, lo + offset, auxArray[offset]);
            left++;
            offset++;
        }
        while (right <= hi) {
            auxArray[offset] = array[right];
            this.setValue(sh, lo + offset, auxArray[offset]);
            right++;
            offset++;
        }
        console.log(offset == (hi - lo + 1));
        for (let i = 0; i < auxArray.length; i++) {
            array[lo + i] = auxArray[i];
        }
    }
}
export class Setter extends Algorithm {
    execute(array) {
        let sh = [];
        for (let i = 0; i < 100; i++) {
            sh.push(['set_value', i, 100 - i]);
        }
        return sh;
    }
}
//# sourceMappingURL=algorithms.js.map