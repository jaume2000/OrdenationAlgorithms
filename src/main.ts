import 'react'

function selectAlgorithm () {

}

abstract class Algorithm {

    abstract execute(array:number[]):void

}

class BarSorterZone {
    constructor(private container:HTMLDivElement, private n_elements:number){

        let sorting_elements = ""
        for(let i = 0; i < n_elements; i++){
            sorting_elements+= "<div class='sorting_element' style='--n_elements: "+n_elements+"'></div>"
        }

        container.innerHTML = `
        <div class='sorting_element_container'>
            `+ sorting_elements +`
        </div>
        `
    }
}