import { BarSorterZone } from './modules.js';
import './algorithms.js';
import { QuickSort, BubbleSort, MergeSort, BidirectionalBubbleSort, InsertionSort } from './algorithms.js';
let container = document.getElementById('container');
if (container) {
    let sorterZone = new BarSorterZone(container, 400, new QuickSort(), 1, true);
    let random_button = document.getElementById('random_button');
    if (random_button) {
        random_button.onclick = () => sorterZone.randomize();
    }
    let sort_button = document.getElementById('sort_button');
    if (sort_button) {
        sort_button.onclick = () => sorterZone.sort();
    }
    let algorithm_selector = document.getElementById('algorithm_selector');
    if (algorithm_selector) {
        algorithm_selector.onchange = () => selectAlgorithm(algorithm_selector.value, sorterZone);
    }
}
let algorithms = {
    'bidirectionalbubble': new BidirectionalBubbleSort(),
    'bubble': new BubbleSort(),
    'quicksort': new QuickSort(),
    'mergesort': new MergeSort(),
    'insertionsort': new InsertionSort()
};
function selectAlgorithm(alg, sorter) {
    let default_option = 'quicksort';
    if (Object.keys(algorithms).includes(alg)) {
        sorter.setAlgorithm(algorithms[alg]);
    }
    else {
        alert('This algorithm is not implemented yet, please, select another one');
    }
}
//# sourceMappingURL=main.js.map