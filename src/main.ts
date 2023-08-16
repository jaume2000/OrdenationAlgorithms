import {BarSorterZone} from './modules.js'

import './algorithms.js'
import {QuickSort, BubbleSort, MergeSort} from './algorithms.js'

let container = document.getElementById('container')
if(container){
    let sorterZone = new BarSorterZone(container as HTMLDivElement, 400, new QuickSort(), 1, true)

    let random_button = document.getElementById('random_button')
    if (random_button){
        random_button.onclick = ()=>sorterZone.randomize()
    }

    let sort_button = document.getElementById('sort_button')
    if (sort_button){
        sort_button.onclick = ()=>sorterZone.sort()
    }

    let algorithm_selector = document.getElementById('algorithm_selector') as HTMLSelectElement
    if(algorithm_selector){
        algorithm_selector.onchange = ()=>selectAlgorithm(algorithm_selector.value, sorterZone)
    }
}

let algorithms = {
    'bubble': new BubbleSort(),
    'quicksort': new QuickSort(),
    'mergesort': new MergeSort(),
}

function selectAlgorithm(alg:string, sorter:BarSorterZone) {

    let default_option = 'quicksort'

    if(Object.keys(algorithms).includes(alg)){
        sorter.setAlgorithm(algorithms[alg as keyof typeof algorithms])
    }
    else {
        alert('This algorithm is not implemented yet, please, select another one')
    }
}