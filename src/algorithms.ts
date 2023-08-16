import {ElementCollection,SortHistory} from './modules.js'

export abstract class Algorithm {

    abstract execute(array:number[]):SortHistory

    swap(sh:SortHistory, array:number[], i:number, j:number) {
        sh.push([i,j])
        let aux = array[i]
        array[i] = array[j]
        array[j] = aux
    }

}

export class Randomize extends Algorithm{

    execute(array: number[]): SortHistory {

        let sh:SortHistory = []

        for(let i=0; i<array.length; i++){
            let j = Math.floor(Math.random()*(i+1));
            this.swap(sh,array,i,j)
        }
        
        return sh;
    }

}


export class QuickSort extends Algorithm{

    execute(array:number[]): SortHistory {
        
        let sh:SortHistory = []

        this.quickSortInPlace(sh,array,0,array.length-1)
        
        return sh;
    }
     quickSortInPlace(sh:SortHistory ,arr: number[], left: number = 0, right: number = arr.length - 1): void {
        if (left >= right) {
          return;
        }
      
        const pivot = arr[Math.floor((left + right) / 2)];
        const index = this.partition(sh, arr, left, right, pivot);
        
        this.quickSortInPlace(sh, arr, left, index - 1);
        this.quickSortInPlace(sh, arr, index, right);
        
      }
       partition(sh:SortHistory,arr: number[], left: number, right: number, pivot: number): number {
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
