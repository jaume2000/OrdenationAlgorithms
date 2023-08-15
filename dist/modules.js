function selectAlgorithm() {
}
class Algorithm {
}
class BarSorterZone {
    constructor(container, n_elements, algorithm) {
        this.container = container;
        this.n_elements = n_elements;
        this.algorithm = algorithm;
        let sorting_elements = "";
        for (let i = 0; i < n_elements; i++) {
            sorting_elements += "<div class='bar_sorting_element' style='--n_elements: " + n_elements + "; --element_id: " + i + "'></div>";
        }
        container.innerHTML = `
        <div class='bar_sorting_element_container'>
            ` + sorting_elements + `
        </div>
        `;
        this.elements = undefined;
    }
    randomize() {
        if (!this.elements) {
            this.elements = document.getElementsByClassName('bar_sorting_element');
        }
        this.elements[6].attributes[1].value = '--n_elements: 100; --element_id: ' + Math.floor(Math.random() * 100);
    }
    sort() {
        console.log(new Array(100));
    }
}
class BarElement {
    constructor(id, n_elements) {
        this.id = id;
        this.n_elements = n_elements;
    }
    toString() {
        return "<div class='bar_sorting_element' style='--n_elements: " + this.n_elements + "; --element_id: " + this.id + "'></div>";
    }
    getId() { return this.id; }
}
export { BarSorterZone };
//# sourceMappingURL=modules.js.map