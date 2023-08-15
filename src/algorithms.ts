import {ElementCollection,SortHistory} from './modules.js'

export abstract class Algorithm {

    abstract execute(array:ElementCollection):SortHistory

}

export class SampleAlgorithm extends Algorithm{

    execute(array: ElementCollection): SortHistory {

        let sh = Array(array.length-1)

        for(let i = 0; i<array.length-1; i++){
            sh[i] = [i, i+1]
        }
        
        return sh;
    }

}
