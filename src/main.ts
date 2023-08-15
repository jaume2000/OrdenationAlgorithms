import {BarSorterZone} from './modules.js'


let container = document.getElementById('container')
if(container){
    let sorterZone = new BarSorterZone(container as HTMLDivElement,100)

    let random_button = document.getElementById('random_button')
    if (random_button){
        random_button.onclick = sorterZone.randomize
    }

    let sort_button = document.getElementById('random_button')
    if (sort_button){
        sort_button.onclick = sorterZone.randomize
    }
}
