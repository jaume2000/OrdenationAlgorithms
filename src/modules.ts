function selectAlgorithm () {

}

abstract class Algorithm {

    abstract execute(array:number[]):void

}

class BarSorterZone {

    elements:Element[]

    constructor(private container:HTMLDivElement, private n_elements:number, private algorithm?:Algorithm){

        this.elements = [];
        for(let i = 0; i < n_elements; i++){
            let i_element = document.createElement("div");
            i_element.classList.add('bar_sorting_element')
            i_element.style.setProperty('--n_elements', n_elements + '')
            i_element.style.setProperty('--element_id', n_elements + '')
            this.elements.concat(i_element)
            //sorting_elements+= "<div class='bar_sorting_element' style='--n_elements: "+n_elements+"; --element_id: "+i+"'></div>"
        }
    }
    
    randomize(){

        this.elements[6].attributes[1].value = '--n_elements: 100; --element_id: ' + Math.floor(Math.random()*100)
    }

    sort() {
        let ids = Array.from({length:100}, (_,i)=>i)
        for(let i=0; i<100; i++){
            let j = Math.floor(Math.random()*(i+1));
            [ids[i],ids[j]] = [ids[j],ids[i]]
        }
    }
}

export {BarSorterZone}