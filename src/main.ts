import {BarSorterZone} from './modules.js'

import './algorithms.js'
import {QuickSort} from './algorithms.js'

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
}
