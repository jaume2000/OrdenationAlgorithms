export class Algorithm {
}
export class SampleAlgorithm extends Algorithm {
    execute(array) {
        let sh = Array(array.length - 1);
        for (let i = 0; i < array.length - 1; i++) {
            sh[i] = [i, i + 1];
        }
        return sh;
    }
}
//# sourceMappingURL=algorithms.js.map