import { Err } from '@superfaceai/one-sdk'
import {Algorithm, Randomize} from './algorithms.js'
import { SwapEnvironmentCNAMEsMessage } from 'aws-sdk/clients/elasticbeanstalk.js'

class BarSorterZone {

    private elements:ElementCollection
    private sortingAnimation?: NodeJS.Timeout
    private randomAlgorithm: Algorithm

    constructor(private container:HTMLDivElement, private n_elements:number, private algorithm:Algorithm, private animation_timeout:number=10, private activate_animation:boolean = true){

        this.randomAlgorithm = new Randomize();

        let bar_container = document.createElement('div')
        bar_container.classList.add('bar_sorting_element_container')
        container.appendChild(bar_container)

        this.elements = new ElementCollection(bar_container, n_elements)
        //this.randomize()
    }

    setAlgorithm(alg:Algorithm){
        this.algorithm = alg;
    }
    
    randomize(){
        clearTimeout(this.sortingAnimation)
        this.elements.removePivot();

        //console.log(this.elements[6].style.getPropertyValue('--element_id'))
        /*for(let i=0; i<this.n_elements; i++){
            let j = Math.floor(Math.random()*(i+1));
            this.elements.swapElements(i,j)
        }
        */
       this.sort(this.randomAlgorithm)

    }

    sort(algorithm?:Algorithm) {

        if(algorithm === undefined){
            algorithm = this.algorithm
        }

        clearTimeout(this.sortingAnimation)
        this.elements.removePivot();

        let sortingHistory = algorithm.execute(this.elements.getArray());
        //Animation
        
        let elements = this.elements

        if(this.activate_animation){
            this.animateTillEnd(sortingHistory);
        }
        else{
            for(let i = 0; i<sortingHistory.length; i++){
                if(sortingHistory[i][0] === 'swap'){
                    this.elements.swapElements(sortingHistory[i] as Swap)
                }
                else if( sortingHistory[i][0] === 'set_pivot'){
                    this.elements.setPivot(sortingHistory[i] as SetPivot)
                }
            }
        }
    }
     
    animateTillEnd(sortingHistory:SortHistory,action_id:number = 0){
        if(action_id < sortingHistory.length){
            if(sortingHistory[action_id][0] === 'swap'){
                this.elements.swapElements(sortingHistory[action_id] as Swap)
            }
            else if( sortingHistory[action_id][0] === 'set_pivot'){
                this.elements.setPivot(sortingHistory[action_id] as SetPivot)
            }

            this.sortingAnimation = setTimeout(()=>this.animateTillEnd(sortingHistory, action_id+1), this.animation_timeout)
        }
        else{
            this.elements.removePivot();
        }
    }
}

type Swap = ['swap',number,number]
type SetPivot = ['set_pivot', number]
type SortHistory = (Swap|SetPivot)[]

class ElementCollection {

    private elements:HTMLElement[] 
    private lastPivot?:HTMLElement
    public length:number;

    constructor(private parent:HTMLDivElement, private n_elements:number){
        this.elements = new Array(n_elements)
        this.length = n_elements;
        for(let i = 0; i < n_elements; i++){
            let i_element = document.createElement("div");
            i_element.classList.add('bar_sorting_element')
            i_element.style.setProperty('--n_elements', n_elements + '')
            i_element.style.setProperty('--element_id', i + '')

            parent.appendChild(i_element)
            this.elements[i] = i_element
            //sorting_elements+= "<div class='bar_sorting_element' style='--n_elements: "+n_elements+"; --element_id: "+i+"'></div>"
        }
    }

    getElementValue(id:number):number{
        if(0 > id && id >= this.n_elements){
            throw new Error("Index out of bound in the array")
        }
        return parseInt(this.elements[id].style.getPropertyValue('--element_id'))

    }


    setPivot(p:SetPivot){
        this.lastPivot?.classList.remove('pivot')
        this.lastPivot = this.elements[p[1]]
        this.lastPivot.classList.add('pivot')
    }
    removePivot(){
        this.lastPivot?.classList.remove('pivot')
    }


    public swapElements(id1:number,id2:number):void;
    public swapElements(id1:Swap):void;
    swapElements(arg1:any, arg2?:any):void {

        let id1=0;
        let id2=0;

        if(typeof arg2 === typeof undefined){
            id1 = arg1[1]
            id2 = arg1[2]
        }
        else{
            id1 = arg1;
            id2 = arg2;

        }


        if(id1 < this.n_elements && id2 < this.n_elements && 0 <= id1 && 0 <= id2){
            

            let aux = this.getElementValue(id2).toString()
            this.elements[id2].style.setProperty('--element_id', this.getElementValue(id1).toString());
            this.elements[id1].style.setProperty('--element_id', aux);
            
            let aux2 = this.elements[id1];
            this.elements[id1] = this.elements[id2];
            this.elements[id1] = aux2;

        }
        else{
            throw new Error("Index out of bound in the array, " + id1 + " " + id2)
        }

        
    }

    toString(){
        let str = ""

        for(let i = 0; i< this.elements.length; i++){
            str+= + this.elements[i].style.getPropertyValue('--element_id')+' '
        }
        return str;
    }

    getArray(){
        let array = Array(this.n_elements)

        for(let i=0; i<this.n_elements;i++){
            array[i] = this.getElementValue(i)
        }

        return array
    }
}

export {BarSorterZone, ElementCollection, SortHistory}