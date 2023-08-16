import { off } from 'firebase/database'
import {ElementCollection,SortHistory} from './modules.js'

export abstract class Algorithm {

    public dangerous:boolean = false;
    abstract execute(array:number[]):SortHistory

    swap(sh:SortHistory, array:number[], i:number, j:number) {
        sh.push(['swap',i,j])
        let aux = array[i]
        array[i] = array[j]
        array[j] = aux
    }

    setPivot(sh:SortHistory ,p:number){
        sh.push(['set_pivot',p])
    }

    setValue(sh:SortHistory ,p:number, v:number){
        sh.push(['set_value',p,v])
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
        this.setPivot(sh,index)
        
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


export class BubbleSort extends Algorithm{
    execute(array: number[]): SortHistory {

        let sh:SortHistory = [];

        for(let i = 1; i < array.length; i++){
            for(let j=0; j<array.length-i; j++){
                if(array[j] > array[j+1]){
                    this.swap(sh,array,j,j+1)
                }
            }
        }

        return sh
    }
}

export class BidirectionalBubbleSort extends Algorithm{
    execute(array: number[]): SortHistory {

        let sh:SortHistory = [];

        for(let i = 1; i < Math.floor(array.length/2)+1; i++){
            for(let j=i-1; j<array.length-i; j++){
                if(array[j] > array[j+1]){
                    this.swap(sh,array,j,j+1)
                }
            }
            for(let j=array.length-i-1; j>=i; j--){
                if(array[j] < array[j-1]){
                    this.swap(sh,array,j,j-1)
                }
            }
        }

        return sh
    }
}

export class InsertionSort extends Algorithm{
    execute(array: number[]): SortHistory {
        let sh:SortHistory = [];

        for(let i = 0; i < array.length-1; i++){

            if(array[i] > array[i+1]){

                let j = i;
                while(j>0 && array[j] >= array[j+1]){
                    this.swap(sh,array,j,j+1)
                    j--;
                }
            }
        }

        return sh
    }
}




export class MergeSort extends Algorithm{

    dangerous=true;

    execute(array: number[]): SortHistory {

        let sh:SortHistory = []
        this.mergesort(sh, array, 0, array.length-1)
        return sh
    }

    mergesort(sh:SortHistory, array:number[], lo:number, hi:number){
        if(lo < hi){
            console.log(lo,hi)
            let middle = Math.floor((hi+lo)/2)
            this.mergesort(sh,array, lo, middle )
            this.mergesort(sh,array, middle+1, hi )
            this.merge(sh, array, lo, middle, hi)
        }

    }

    merge(sh:SortHistory, array:number[], lo:number, middle:number, hi:number){

        
        let left = lo;
        let right = middle+1;
        let offset = 0;
        let auxArray = new Array(hi-lo+1)

        while(left <= middle && right <= hi){
            if(array[left] < array[right]){
                auxArray[offset] = array[left];
                left++;
            }
            else{
                auxArray[offset] = array[right];
                right++;
            }
            this.setValue(sh, lo+offset, auxArray[offset]);
            offset++;
        }
        while(left <= middle){
            auxArray[offset] = array[left]
            this.setValue(sh, lo+offset, auxArray[offset]);
            left++;
            offset++;
        }
        while(right <= hi){
            auxArray[offset] = array[right]
            this.setValue(sh, lo+offset, auxArray[offset]);
            right++;
            offset++;
        }

        console.log(offset==(hi-lo+1))
        for(let i=0; i<auxArray.length; i++){
            array[lo+i] = auxArray[i]
        }
    }
}

export class Setter extends Algorithm {
    execute(array: number[]): SortHistory {
        let sh:SortHistory = []
        for(let i = 0; i< 100; i++){
            sh.push(['set_value',i,100-i])
        }

        return sh
    }
}

