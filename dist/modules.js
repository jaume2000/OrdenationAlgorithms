import { Randomize } from './algorithms.js';
class BarSorterZone {
    constructor(container, n_elements, algorithm, animation_timeout = 10, activate_animation = true) {
        this.container = container;
        this.n_elements = n_elements;
        this.algorithm = algorithm;
        this.animation_timeout = animation_timeout;
        this.activate_animation = activate_animation;
        this.randomAlgorithm = new Randomize();
        this.sorting = false;
        let bar_container = document.createElement('div');
        bar_container.classList.add('bar_sorting_element_container');
        container.appendChild(bar_container);
        this.elements = new ElementCollection(bar_container, n_elements);
        //this.randomize()
    }
    setAlgorithm(alg) {
        this.algorithm = alg;
    }
    randomize() {
        //console.log(this.elements[6].style.getPropertyValue('--element_id'))
        /*for(let i=0; i<this.n_elements; i++){
            let j = Math.floor(Math.random()*(i+1));
            this.elements.swapElements(i,j)
        }
        */
        if (!this.sorting) {
            this.sort(this.randomAlgorithm, true);
        }
        else {
            this.clearSort();
        }
    }
    clearSort() {
        this.endSort();
        if (this.algorithm.dangerous) {
            this.elements.reset();
        }
    }
    endSort() {
        clearTimeout(this.sortingAnimation);
        document.getElementById('random_button')?.classList.remove('sorting');
        document.getElementById('sort_button')?.classList.remove('sorting');
        this.elements.removePivot();
        this.sorting = false;
    }
    startSort(random_button) {
        let id = random_button ? 'random_button' : 'sort_button';
        document.getElementById(id)?.classList.add('sorting');
        this.sorting = true;
    }
    sort(algorithm, random_button = false) {
        if (this.sorting) {
            this.clearSort();
            return;
        }
        else {
            this.startSort(random_button);
        }
        if (algorithm === undefined) {
            algorithm = this.algorithm;
        }
        let sortingHistory = algorithm.execute(this.elements.getArray());
        console.log(sortingHistory);
        //Animation
        let elements = this.elements;
        if (this.activate_animation) {
            this.animateTillEnd(sortingHistory, 0, random_button);
        }
        else {
            for (let i = 0; i < sortingHistory.length; i++) {
                if (sortingHistory[i][0] === 'swap') {
                    this.elements.swapElements(sortingHistory[i]);
                }
                else if (sortingHistory[i][0] === 'set_pivot') {
                    this.elements.setPivot(sortingHistory[i]);
                }
                else if (sortingHistory[i][0] === 'set_value') {
                    this.elements.setValue(sortingHistory[i]);
                }
            }
        }
    }
    animateTillEnd(sortingHistory, action_id = 0, random_button = false) {
        if (action_id < sortingHistory.length) {
            if (sortingHistory[action_id][0] === 'swap') {
                this.elements.swapElements(sortingHistory[action_id]);
            }
            else if (sortingHistory[action_id][0] === 'set_pivot') {
                this.elements.setPivot(sortingHistory[action_id]);
            }
            else if (sortingHistory[action_id][0] === 'set_value') {
                this.elements.setValue(sortingHistory[action_id]);
            }
            this.sortingAnimation = setTimeout(() => this.animateTillEnd(sortingHistory, action_id + 1, random_button), this.animation_timeout);
        }
        else {
            this.endSort();
        }
    }
}
class ElementCollection {
    constructor(parent, n_elements) {
        this.parent = parent;
        this.n_elements = n_elements;
        this.elements = new Array(n_elements);
        this.length = n_elements;
        for (let i = 0; i < n_elements; i++) {
            let i_element = document.createElement("div");
            i_element.classList.add('bar_sorting_element');
            i_element.style.setProperty('--n_elements', n_elements + '');
            i_element.style.setProperty('--element_id', i + '');
            parent.appendChild(i_element);
            this.elements[i] = i_element;
            //sorting_elements+= "<div class='bar_sorting_element' style='--n_elements: "+n_elements+"; --element_id: "+i+"'></div>"
        }
    }
    getElementValue(id) {
        if (0 > id && id >= this.n_elements) {
            throw new Error("Index out of bound in the array");
        }
        return parseInt(this.elements[id].style.getPropertyValue('--element_id'));
    }
    reset() {
        for (let i = 0; i < this.n_elements; i++) {
            this.setValue(['set_value', i, i]);
        }
    }
    setValue(p) {
        if (p[1] >= this.n_elements || p[2] >= this.n_elements) {
            throw new Error('Index out of Array bounds');
        }
        this.elements[p[1]].style.setProperty('--element_id', p[2].toString());
    }
    setPivot(p) {
        this.lastPivot?.classList.remove('pivot');
        this.lastPivot = this.elements[p[1]];
        this.lastPivot.classList.add('pivot');
    }
    removePivot() {
        this.lastPivot?.classList.remove('pivot');
    }
    swapElements(arg1, arg2) {
        let id1 = 0;
        let id2 = 0;
        if (typeof arg2 === typeof undefined) {
            id1 = arg1[1];
            id2 = arg1[2];
        }
        else {
            id1 = arg1;
            id2 = arg2;
        }
        if (id1 < this.n_elements && id2 < this.n_elements && 0 <= id1 && 0 <= id2) {
            let aux = this.getElementValue(id2).toString();
            this.elements[id2].style.setProperty('--element_id', this.getElementValue(id1).toString());
            this.elements[id1].style.setProperty('--element_id', aux);
            let aux2 = this.elements[id1];
            this.elements[id1] = this.elements[id2];
            this.elements[id1] = aux2;
        }
        else {
            throw new Error("Index out of bound in the array, " + id1 + " " + id2);
        }
    }
    toString() {
        let str = "";
        for (let i = 0; i < this.elements.length; i++) {
            str += +this.elements[i].style.getPropertyValue('--element_id') + ' ';
        }
        return str;
    }
    getArray() {
        let array = Array(this.n_elements);
        for (let i = 0; i < this.n_elements; i++) {
            array[i] = this.getElementValue(i);
        }
        return array;
    }
}
export { BarSorterZone, ElementCollection };
//# sourceMappingURL=modules.js.map