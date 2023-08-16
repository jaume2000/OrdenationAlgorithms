export class Algorithm {
    swap(sh, array, i, j) {
        sh.push(['swap', i, j]);
        let aux = array[i];
        array[i] = array[j];
        array[j] = aux;
    }
    setPivot(sh, p) {
        sh.push(['set_pivot', p]);
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
export class MergeSort extends Algorithm {
    execute(array) {
        return [];
    }
}
//# sourceMappingURL=algorithms.js.map