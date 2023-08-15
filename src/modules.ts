function selectAlgorithm () {

}

abstract class Algorithm {

    abstract execute(array:number[]):void

}

class BarSorterZone {

    elements?:HTMLCollectionOf<Element>

    constructor(private container:HTMLDivElement, private n_elements:number, private algorithm?:Algorithm){

        let sorting_elements = ""
        for(let i = 0; i < n_elements; i++){
            sorting_elements+= "<div class='bar_sorting_element' style='--n_elements: "+n_elements+"; --element_id: "+i+"'></div>"
        }

        container.innerHTML = `
        <div class='bar_sorting_element_container'>
            `+ sorting_elements +`
        </div>
        `
        this.elements = undefined
    }
    
    randomize(){

        if(!this.elements){
            this.elements=document.getElementsByClassName('bar_sorting_element')
        }

        this.elements[6].attributes[1].value = '--n_elements: 100; --element_id: ' + Math.floor(Math.random()*100)
    }

    sort() {
        console.log(new Array(100))
        
    }
}

class BarElement {

    constructor(private id:number, private n_elements:number){

    }

    toString():string {
        return "<div class='bar_sorting_element' style='--n_elements: "+this.n_elements+"; --element_id: "+this.id+"'></div>"
    }

    getId():number{return this.id}
}

export {BarSorterZone}